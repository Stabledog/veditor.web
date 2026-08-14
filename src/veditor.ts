import { EditorView, keymap, highlightWhitespace } from '@codemirror/view';
import { EditorState, Compartment, Transaction, type Extension } from '@codemirror/state';
import { vim, Vim, getCM } from '@replit/codemirror-vim';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { indentMore, indentLess } from '@codemirror/commands';
import { basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { hashTarget } from './util';
import { getVimModePref, setVimModePref, getWrapPref, setWrapPref, getListPref, setListPref } from './prefs';
import { urlDecorator } from './url-decorator';
import {
  type DocEntry, type ViewCompartments,
  getActiveBufferId, getActiveBuffer, getBuffer,
  putBuffer, setActiveBufferId, removeBuffer,
  nextBufferId, prevBufferId, bufferCount, bufferIdByIndex, resetBuffers,
  listBufferEntries, detachActiveView, attachView,
} from './buffer-manager';
import { showDocPicker } from './doc-picker';

declare const __APP_VERSION__: string;
const VERSION = __APP_VERSION__;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VEditorCallbacks {
  onSave: () => Promise<void>;
  onQuit: () => void;
  isAppDirty?: () => boolean;
  onListDocuments?: () => Promise<DocEntry[]>;
  onLoadDocument?: (id: string) => Promise<{ content: string; label: string; callbacks: VEditorCallbacks }>;
  onBufferSwitch?: (id: string, label: string) => void;
  /** Fires once when this buffer transitions from clean to dirty (not on every keystroke). Resets after a save or setEditorContent(). */
  onDirty?: () => void;
}

export interface HelpSection {
  title: string;
  entries: Array<[key: string, desc: string]>;
}

export interface VEditorOptions {
  storagePrefix?: string;
  clickableLinks?: boolean;
  exCommands?: Record<string, (...args: unknown[]) => void>;
  normalMappings?: Record<string, () => void>;
  extensions?: Extension[];
  autoSaveMs?: number;
  initialBufferId?: string;
  initialBufferLabel?: string;
  helpSections?: HelpSection[];
}

// ---------------------------------------------------------------------------
// Shared URL regex
// ---------------------------------------------------------------------------

const URL_RE = /https?:\/\/[^\s)\]>]+/g;

function urlOnLine(lineText: string, col: number, exact?: boolean): string | null {
  URL_RE.lastIndex = 0;
  let m;
  let firstOnLine: string | null = null;
  while ((m = URL_RE.exec(lineText)) !== null) {
    if (!firstOnLine) firstOnLine = m[0];
    if (col >= m.index && col < m.index + m[0].length) return m[0];
    if (!exact && m.index >= col) return m[0];
  }
  return exact ? null : firstOnLine;
}

const clickableLinks = EditorView.domEventHandlers({
  click(event: MouseEvent, view: EditorView) {
    if (!event.ctrlKey) return false;
    const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
    if (pos == null) return false;
    const line = view.state.doc.lineAt(pos);
    const col = pos - line.from;
    const url = urlOnLine(line.text, col, true);
    if (url) {
      window.open(url, hashTarget(url));
      event.preventDefault();
      return true;
    }
    return false;
  },
});

// ---------------------------------------------------------------------------
// Module-level state — always uses buffer-manager (even for single buffer)
// ---------------------------------------------------------------------------

let editorParent: HTMLElement | null = null;
let currentPrefix = 'veditor';
let modeToggleEl: HTMLButtonElement | null = null;
let beforeunloadAbort: AbortController | null = null;
let parentListenerAbort: AbortController | null = null;
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;
let quitPromptOpen = false;
let editorOptions: VEditorOptions | undefined;

function activeView(): EditorView | null {
  return getActiveBuffer()?.view ?? null;
}

function activeSavedContent(): string {
  return getActiveBuffer()?.savedContent ?? '';
}

function setActiveSavedContent(content: string): void {
  const buf = getActiveBuffer();
  if (buf) buf.savedContent = content;
}

function activeCallbacks(): VEditorCallbacks | null {
  return getActiveBuffer()?.callbacks ?? null;
}

function activeCompartments(): ViewCompartments | null {
  return getActiveBuffer()?.compartments ?? null;
}

// ---------------------------------------------------------------------------
// doSave — single helper for save + sync dirty state
// ---------------------------------------------------------------------------

async function doSave(): Promise<void> {
  const cbs = activeCallbacks();
  if (!cbs) return;
  await cbs.onSave();
  setActiveSavedContent(getEditorContent());
  const buf = getActiveBuffer();
  if (buf) buf.dirtyNotified = false;
  updateDirtyClass();
}

function updateDirtyClass(): void {
  if (!editorParent) return;
  const dirty = isEditorDirty(activeSavedContent());
  editorParent.classList.toggle('veditor-dirty', dirty);
}

// ---------------------------------------------------------------------------
// Buffer switching
// ---------------------------------------------------------------------------

async function switchToBuffer(targetId: string): Promise<void> {
  if (!editorParent) return;
  const currentId = getActiveBufferId();
  if (currentId === targetId) return;

  if (autoSaveTimer !== null) { clearTimeout(autoSaveTimer); autoSaveTimer = null; }

  const currentBuf = getActiveBuffer();
  if (currentBuf) {
    const content = currentBuf.view.state.doc.toString();
    if (content !== currentBuf.savedContent) {
      await currentBuf.callbacks.onSave();
      currentBuf.savedContent = currentBuf.view.state.doc.toString();
      currentBuf.dirtyNotified = false;
    }
    detachActiveView(editorParent);
  }

  setActiveBufferId(targetId);
  attachView(targetId, editorParent);
  updateDirtyClass();

  const targetBuf = getActiveBuffer();
  if (targetBuf?.callbacks.onBufferSwitch) {
    targetBuf.callbacks.onBufferSwitch(targetId, targetBuf.label);
  }
}

async function openDocPicker(): Promise<void> {
  const cbs = activeCallbacks();
  if (!editorParent || !cbs?.onListDocuments) return;

  const docs = await cbs.onListDocuments();
  const openBuffers = listBufferEntries();
  const activeId = getActiveBufferId();

  const openIds = new Set(openBuffers.map(b => b.id));
  const items = [
    ...openBuffers.map((b, i) => ({ id: b.id, label: b.label, active: b.id === activeId, bufferIndex: i + 1 })),
    ...docs.filter(d => !openIds.has(d.id)).map(d => ({ id: d.id, label: d.label, active: false, bufferIndex: undefined as number | undefined })),
  ];

  const selected = await showDocPicker(items, editorParent);
  if (selected === null) {
    activeView()?.focus();
    return;
  }

  if (openIds.has(selected)) {
    await switchToBuffer(selected);
    return;
  }

  if (!cbs.onLoadDocument) return;
  const { content, label, callbacks } = await cbs.onLoadDocument(selected);

  const { view: newView, compartments: newCompartments } = buildEditorView(content, callbacks);
  putBuffer(selected, label, newView, content, callbacks, newCompartments);

  await switchToBuffer(selected);
}

// ---------------------------------------------------------------------------
// Vim sub-mode indicator
// ---------------------------------------------------------------------------

function updateVimSubMode(mode: string): void {
  if (!editorParent) return;
  editorParent.classList.remove('veditor-vim-normal', 'veditor-vim-insert');
  if (mode === 'insert' || mode === 'replace') {
    editorParent.classList.add('veditor-vim-insert');
  } else {
    editorParent.classList.add('veditor-vim-normal');
  }
}

function attachVimModeListener(view: EditorView): void {
  const buf = getActiveBuffer();
  if (buf?.vimModeListenerAttached) return;
  const cm = getCM(view);
  if (!cm) return;
  cm.on('vim-mode-change', (e: { mode: string }) => {
    updateVimSubMode(e.mode);
  });
  if (buf) buf.vimModeListenerAttached = true;
}

// ---------------------------------------------------------------------------
// CUA keymap (active when vim is off)
// ---------------------------------------------------------------------------

function buildCuaKeymap(
  parent: HTMLElement,
  prefix: string,
): Extension {
  return keymap.of([
    {
      key: 'Escape',
      run: () => {
        const cbs = activeCallbacks();
        if (cbs) handleQuitRequest(false, parent, cbs);
        return true;
      },
    },
    {
      key: 'Mod-Shift-s',
      run: () => {
        (async () => {
          await doSave();
          const cbs = activeCallbacks();
          if (cbs) handleQuitRequest(false, parent, cbs);
        })();
        return true;
      },
    },
    {
      key: 'Mod-Shift-w',
      run: () => {
        const view = activeView();
        const c = activeCompartments();
        if (!view || !c) return false;
        const nowOn = !getWrapPref(prefix);
        setWrapPref(prefix, nowOn);
        view.dispatch({
          effects: c.wrap.reconfigure(nowOn ? EditorView.lineWrapping : []),
        });
        return true;
      },
    },
  ]);
}

// ---------------------------------------------------------------------------
// Mode toggle indicator
// ---------------------------------------------------------------------------

function updateToggleIndicator(vimOn: boolean): void {
  if (modeToggleEl) {
    const label = vimOn ? 'VIM' : 'CUA';
    modeToggleEl.textContent = `${label} · v${VERSION}`;
    modeToggleEl.title = vimOn
      ? 'Vim mode active — click to switch to standard editing'
      : 'Standard editing — click to switch to Vim mode';
  }
}

function createToggleIndicator(parent: HTMLElement, vimOn: boolean): void {
  modeToggleEl?.remove();
  const btn = document.createElement('button');
  btn.className = 'veditor-mode-toggle';
  btn.type = 'button';
  btn.addEventListener('click', () => toggleVimMode());
  parent.appendChild(btn);
  modeToggleEl = btn;
  updateToggleIndicator(vimOn);
}

// ---------------------------------------------------------------------------
// Quit flow
// ---------------------------------------------------------------------------

function handleQuitRequest(
  force: boolean,
  parent: HTMLElement,
  callbacks: VEditorCallbacks,
): void {
  if (force) {
    callbacks.onQuit();
    return;
  }
  if (isEditorDirty(activeSavedContent()) || callbacks.isAppDirty?.()) {
    // The prompt supersedes any pending autosave: firing a save while the
    // prompt is up would silently resolve "Discard"/leave it referring to
    // changes that no longer exist.
    if (autoSaveTimer !== null) { clearTimeout(autoSaveTimer); autoSaveTimer = null; }
    showConfirmBar(parent,
      () => callbacks.onQuit(),
      async () => {
        await doSave();
        callbacks.onQuit();
      },
    );
    return;
  }
  callbacks.onQuit();
}

function showConfirmBar(
  parent: HTMLElement,
  onDiscard: () => void,
  onSaveQuit?: () => void,
): void {
  parent.querySelector('.veditor-confirm-bar')?.remove();

  const underline = (label: string, idx: number) =>
    label.slice(0, idx) + `<u>${label[idx]}</u>` + label.slice(idx + 1);

  const bar = document.createElement('div');
  bar.className = 'veditor-confirm-bar';
  bar.innerHTML = `
    <span>Unsaved changes —</span>
    ${onSaveQuit ? `<button class="veditor-confirm-btn veditor-confirm-save">${underline('Save & Quit', 0)}</button>` : ''}
    <button class="veditor-confirm-btn veditor-confirm-yes">${underline('Discard', 0)}</button>
    <button class="veditor-confirm-btn veditor-confirm-no">${underline('Cancel', 0)}</button>
  `;
  parent.prepend(bar);
  quitPromptOpen = true;

  const dismiss = () => { bar.remove(); quitPromptOpen = false; document.removeEventListener('keydown', onKey, true); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 's' && onSaveQuit) { e.stopPropagation(); e.preventDefault(); dismiss(); onSaveQuit(); }
    else if (e.key === 'd') { e.stopPropagation(); e.preventDefault(); dismiss(); onDiscard(); }
    else if (e.key === 'c' || e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); dismiss(); }
  };
  document.addEventListener('keydown', onKey, true);

  if (onSaveQuit) bar.querySelector('.veditor-confirm-save')!.addEventListener('click', () => { dismiss(); onSaveQuit(); });
  bar.querySelector('.veditor-confirm-yes')!.addEventListener('click', () => { dismiss(); onDiscard(); });
  bar.querySelector('.veditor-confirm-no')!.addEventListener('click', () => { dismiss(); });
}

// ---------------------------------------------------------------------------
// Mobile long-press context menu
// ---------------------------------------------------------------------------

let contextMenuEl: HTMLElement | null = null;

function dismissContextMenu(): void {
  contextMenuEl?.remove();
  contextMenuEl = null;
}

function showMobileContextMenu(
  clientX: number,
  clientY: number,
  parent: HTMLElement,
): void {
  dismissContextMenu();

  const menu = document.createElement('div');
  menu.className = 'veditor-context-menu';

  const makeItem = (label: string, cls: string, onClick: () => void) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `veditor-context-menu-item ${cls}`;
    btn.textContent = label;
    btn.addEventListener('click', () => { dismissContextMenu(); onClick(); });
    menu.appendChild(btn);
  };

  makeItem('Save & Close', 'veditor-cm-save', async () => {
    await doSave();
    activeCallbacks()?.onQuit();
  });

  makeItem('Save', 'veditor-cm-save', () => { doSave(); });

  makeItem('Close', 'veditor-cm-close', () => {
    const cbs = activeCallbacks();
    if (cbs) handleQuitRequest(false, parent, cbs);
  });

  makeItem('Cancel', 'veditor-cm-cancel', () => {});

  document.body.appendChild(menu);
  contextMenuEl = menu;

  const menuW = 180;
  const menuH = 44 * 4 + 2;
  const margin = 10;
  const x = Math.min(Math.max(clientX, margin), window.innerWidth - menuW - margin);
  const y = Math.min(Math.max(clientY, margin), window.innerHeight - menuH - margin);
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;

  const onOutside = (e: Event) => {
    if (!menu.contains(e.target as Node)) {
      dismissContextMenu();
      document.removeEventListener('pointerdown', onOutside, true);
      document.removeEventListener('keydown', onKey, true);
    }
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      dismissContextMenu();
      document.removeEventListener('pointerdown', onOutside, true);
      document.removeEventListener('keydown', onKey, true);
    }
  };
  setTimeout(() => {
    document.addEventListener('pointerdown', onOutside, true);
    document.addEventListener('keydown', onKey, true);
  }, 0);
}

// ---------------------------------------------------------------------------
// Help overlay
// ---------------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showHelpOverlay(extraSections: HelpSection[]): void {
  document.querySelector('dialog.veditor-help')?.remove();

  const builtin: HelpSection[] = [
    {
      title: 'Ex commands',
      entries: [
        [':w', 'Save current buffer'],
        [':q', 'Quit (checks unsaved changes)'],
        [':q!', 'Force quit without saving'],
        [':wq', 'Save and quit'],
        [':cua', 'Switch to CUA (standard) editing mode'],
        [':wrap', 'Toggle line wrapping'],
        [':list / :nol', 'Toggle whitespace character display'],
        [':ls / :buffers', 'Open buffer/document picker'],
        [':b N', 'Switch to buffer N (1-based)'],
        [':bn', 'Next buffer'],
        [':bp', 'Previous buffer'],
        [':bd', 'Delete current buffer'],
        [':help / :h', 'Show this help'],
      ],
    },
    {
      title: 'Normal mode',
      entries: [
        ['u', 'Quit buffer (same as :q)'],
        ['gx', 'Open URL under cursor in new tab'],
        ['jk', 'Exit insert mode'],
      ],
    },
    {
      title: 'CUA mode (vim off)',
      entries: [
        ['Ctrl+s', 'Save'],
        ['Ctrl+w', 'Quit'],
        ['Ctrl+Shift+s', 'Save and quit'],
        ['Ctrl+Shift+w', 'Toggle line wrapping'],
        ['Escape', 'Quit'],
      ],
    },
    {
      title: 'Features',
      entries: [
        ['Ctrl+click URL', 'Open link in new/reused tab'],
        ['Two-finger long-press', 'Mobile context menu (Save, Close, …)'],
        ['Auto-save', 'Configurable delay via autoSaveMs option'],
      ],
    },
  ];

  const allSections = [...builtin, ...extraSections];

  let html = '<div class="veditor-help-header">veditor help <span class="veditor-help-hint">j/k scroll · q, Esc, or Enter to close</span></div>';
  for (const section of allSections) {
    html += `<div class="veditor-help-section"><div class="veditor-help-title">${escapeHtml(section.title)}</div>`;
    for (const [key, desc] of section.entries) {
      html += `<div class="veditor-help-row"><span class="veditor-help-key">${escapeHtml(key)}</span><span class="veditor-help-desc">${escapeHtml(desc)}</span></div>`;
    }
    html += '</div>';
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'veditor-help';
  dialog.innerHTML = html;

  const dismiss = () => { dialog.close(); dialog.remove(); activeView()?.focus(); };

  dialog.addEventListener('cancel', (e) => { e.preventDefault(); dismiss(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'q' || e.key === 'Enter') { e.preventDefault(); dismiss(); }
    else if (e.key === 'j') { e.preventDefault(); dialog.scrollBy(0, 40); }
    else if (e.key === 'k') { e.preventDefault(); dialog.scrollBy(0, -40); }
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dismiss();
  });

  document.body.appendChild(dialog);
  dialog.showModal();
}

// ---------------------------------------------------------------------------
// View factory — builds a detached EditorView with standard extensions
// ---------------------------------------------------------------------------

function buildEditorView(content: string, _callbacks: VEditorCallbacks): { view: EditorView; compartments: ViewCompartments } {
  const prefix = currentPrefix;
  const enableLinks = editorOptions?.clickableLinks ?? true;
  const autoSaveMs = editorOptions?.autoSaveMs ?? 0;
  const vimOn = getVimModePref(prefix);
  const parent = editorParent!;

  const compartments: ViewCompartments = {
    vim: new Compartment(),
    cua: new Compartment(),
    wrap: new Compartment(),
    list: new Compartment(),
  };

  const cuaKeymap = buildCuaKeymap(parent, prefix);

  const exts: Extension[] = [
    compartments.vim.of(vimOn ? vim() : []),
    compartments.cua.of(vimOn ? [] : cuaKeymap),
    basicSetup,
    markdown({ codeLanguages: languages }),
    oneDark,
    urlDecorator,
    keymap.of([
      { key: 'Tab', run: indentMore },
      { key: 'Shift-Tab', run: indentLess },
      {
        key: 'Mod-s',
        run: () => { doSave(); return true; },
      },
      {
        key: 'Mod-w',
        run: () => {
          const cbs = activeCallbacks();
          if (cbs && editorParent) handleQuitRequest(false, editorParent, cbs);
          return true;
        },
      },
    ]),
    compartments.wrap.of(getWrapPref(prefix) ? EditorView.lineWrapping : []),
    compartments.list.of(getListPref(prefix) ? highlightWhitespace() : []),
    EditorView.theme({
      '&': { height: '100%' },
      '.cm-scroller': { overflow: 'auto' },
      '.cm-vim-panel': {
        background: '#45475a',
        color: '#cdd6f4',
        padding: '2px 6px',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontSize: '14px',
      },
      '.cm-vim-panel input': {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#cdd6f4',
        fontFamily: 'inherit',
        fontSize: 'inherit',
      },
    }),
  ];

  exts.push(EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      updateDirtyClass();

      // Resolve by view identity (not getActiveBuffer's id) so a detached/background
      // buffer's own dispatches (e.g. a programmatic setEditorContent) never get
      // misattributed to whichever buffer happens to be active right now.
      const buf = getActiveBuffer();
      const owningBuf = buf && buf.view === update.view ? buf : undefined;
      const dirty = owningBuf ? update.state.doc.toString() !== owningBuf.savedContent : true;

      if (owningBuf) {
        if (dirty && !owningBuf.dirtyNotified) {
          owningBuf.dirtyNotified = true;
          owningBuf.callbacks.onDirty?.();
        } else if (!dirty) {
          owningBuf.dirtyNotified = false;
        }
      }

      // Skip autosave for changes that didn't actually move the doc away from
      // savedContent (e.g. setEditorContent refreshing to the same content it set).
      // Also skip while the quit confirm bar is up — it must stay in sync with
      // whatever the user decides, not get silently resolved out from under them.
      if (dirty && autoSaveMs > 0 && update.view.dom.parentNode && !quitPromptOpen) {
        if (autoSaveTimer !== null) clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => { doSave(); }, autoSaveMs);
      }
    }
  }));

  if (enableLinks) exts.push(clickableLinks);
  if (editorOptions?.extensions) exts.push(...editorOptions.extensions);

  const state = EditorState.create({ doc: content, extensions: exts });
  const view = new EditorView({ state });

  if (vimOn) attachVimModeListener(view);

  return { view, compartments };
}

// ---------------------------------------------------------------------------
// Vim ex commands — registered once globally, operate on active buffer
// ---------------------------------------------------------------------------

let exCommandsRegistered = false;

function registerExCommands(): void {
  if (exCommandsRegistered) return;
  exCommandsRegistered = true;

  Vim.defineEx('w', 'w', () => { doSave(); });

  Vim.defineEx('q', 'q', (_cm: unknown, params: { argString?: string; bang?: boolean }) => {
    const cbs = activeCallbacks();
    if (!cbs || !editorParent) return;
    handleQuitRequest(params?.bang ?? false, editorParent, cbs);
  });

  Vim.defineEx('wq', 'wq', async () => {
    await doSave();
    const cbs = activeCallbacks();
    if (cbs && editorParent) handleQuitRequest(false, editorParent, cbs);
  });

  Vim.defineEx('cua', 'cua', () => {
    if (getVimModePref(currentPrefix)) setTimeout(() => toggleVimMode(), 0);
  });

  Vim.defineEx('wrap', 'wrap', () => {
    const view = activeView();
    const c = activeCompartments();
    if (!view || !c) return;
    const nowOn = !getWrapPref(currentPrefix);
    setWrapPref(currentPrefix, nowOn);
    view.dispatch({
      effects: c.wrap.reconfigure(nowOn ? EditorView.lineWrapping : []),
    });
  });

  Vim.defineEx('list', 'list', () => {
    const view = activeView();
    const c = activeCompartments();
    if (!view || !c) return;
    const nowOn = !getListPref(currentPrefix);
    setListPref(currentPrefix, nowOn);
    view.dispatch({
      effects: c.list.reconfigure(nowOn ? highlightWhitespace() : []),
    });
  });

  Vim.defineEx('nolist', 'nol', () => {
    const view = activeView();
    const c = activeCompartments();
    if (!view || !c) return;
    setListPref(currentPrefix, false);
    view.dispatch({
      effects: c.list.reconfigure([]),
    });
  });

  Vim.defineEx('ls', 'ls', () => { openDocPicker(); });
  Vim.defineEx('buffers', 'buffers', () => { openDocPicker(); });

  Vim.defineEx('b', 'b', (_cm: unknown, params: { argString?: string }) => {
    const arg = (params?.argString ?? '').trim();
    if (!arg) return;
    const num = parseInt(arg, 10);
    if (!isNaN(num)) {
      const id = bufferIdByIndex(num);
      if (id !== null) switchToBuffer(id);
    }
  });

  Vim.defineEx('bn', 'bn', () => {
    const next = nextBufferId();
    if (next) switchToBuffer(next);
  });

  Vim.defineEx('bp', 'bp', () => {
    const prev = prevBufferId();
    if (prev) switchToBuffer(prev);
  });

  Vim.defineEx('bd', 'bd', () => {
    const currentId = getActiveBufferId();
    if (!currentId || bufferCount() <= 1) return;
    const next = nextBufferId() || prevBufferId();
    if (!next) return;
    switchToBuffer(next).then(() => {
      removeBuffer(currentId);
    });
  });

  Vim.defineEx('help', 'h', () => {
    showHelpOverlay(editorOptions?.helpSections ?? []);
  });

  Vim.map('jk', '<Esc>', 'insert');
  Vim.setOption('insertModeEscKeysTimeout', 750);

  Vim.defineAction('veditor_quit', () => {
    const cbs = activeCallbacks();
    if (cbs && editorParent) handleQuitRequest(false, editorParent, cbs);
  });
  Vim.mapCommand('u', 'action', 'veditor_quit', {}, { context: 'normal' });

  Vim.defineAction('veditor_gx', () => {
    const view = activeView();
    if (!view) return;
    const pos = view.state.selection.main.head;
    const line = view.state.doc.lineAt(pos);
    const col = pos - line.from;
    const url = urlOnLine(line.text, col);
    if (url) window.open(url, hashTarget(url));
  });
  Vim.mapCommand('gx', 'action', 'veditor_gx', {}, { context: 'normal' });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function createEditor(
  parent: HTMLElement,
  content: string,
  callbacks: VEditorCallbacks,
  options?: VEditorOptions,
): EditorView {
  destroyEditor();

  editorParent = parent;
  editorOptions = options;
  parent.classList.add('veditor-dirty-aware');
  parent.classList.remove('veditor-dirty');

  const prefix = options?.storagePrefix ?? 'veditor';
  currentPrefix = prefix;
  const vimOn = getVimModePref(prefix);

  registerExCommands();

  if (options?.exCommands) {
    for (const [name, handler] of Object.entries(options.exCommands)) {
      Vim.defineEx(name, name, handler);
    }
  }

  if (options?.normalMappings) {
    for (const [key, action] of Object.entries(options.normalMappings)) {
      const actionName = `veditor_${key}`;
      Vim.defineAction(actionName, action);
      Vim.mapCommand(key, 'action', actionName, {}, { context: 'normal' });
    }
  }

  // Clipboard sync
  const rc = (Vim as Record<string, unknown> as { getRegisterController: () => RegisterController }).getRegisterController();
  const origPush = rc.pushText.bind(rc);
  rc.pushText = (
    regName: string | null | undefined,
    op: string,
    text: string,
    linewise?: boolean,
    blockwise?: boolean,
  ) => {
    origPush(regName, op, text, linewise, blockwise);
    if (regName !== '_') {
      navigator.clipboard.writeText(text).catch(() => {
        window.postMessage({ type: 'barouse:clipboard-write', text }, '*');
      });
    }
  };

  // Build the initial view
  const { view, compartments } = buildEditorView(content, callbacks);
  parent.appendChild(view.dom);

  // Always use buffer-manager — single buffer is just a map with one entry
  resetBuffers();
  const initialId = options?.initialBufferId ?? '__initial__';
  const initialLabel = options?.initialBufferLabel ?? 'untitled';
  putBuffer(initialId, initialLabel, view, content, callbacks, compartments);
  setActiveBufferId(initialId);

  if (vimOn) {
    parent.classList.add('veditor-vim-normal');
  }

  // Clipboard read on p/P — uses AbortController for cleanup
  parentListenerAbort = new AbortController();
  const plSig = { signal: parentListenerAbort.signal };

  // Barouse clipboard bridge for restricted contexts (extension sidebar iframes)
  function readClipboardViaBarouse(): Promise<string | null> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        window.removeEventListener('message', handler);
        resolve(null);
      }, 300);
      function handler(event: MessageEvent) {
        if (event.data?.type !== 'barouse:clipboard-read-result') return;
        clearTimeout(timeout);
        window.removeEventListener('message', handler);
        resolve(event.data.text ?? null);
      }
      window.addEventListener('message', handler);
      window.postMessage({ type: 'barouse:clipboard-read' }, '*');
    });
  }

  parent.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'p' && e.key !== 'P') return;
    if (!getVimModePref(currentPrefix)) return;
    if (!parent.classList.contains('veditor-vim-normal')) return;
    const view = activeView();
    if (!view) return;
    if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

    e.preventDefault();
    e.stopPropagation();

    const cm = getCM(view)!;
    const key = e.key;

    navigator.clipboard.readText().then((text) => {
      if (text) rc.unnamedRegister.setText(text);
    }).catch(() => {
      return readClipboardViaBarouse().then((text) => {
        if (text) rc.unnamedRegister.setText(text);
      });
    }).finally(() => {
      Vim.handleKey(cm, key, 'user');
    });
  }, { capture: true, ...plSig });

  parent.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!getVimModePref(currentPrefix)) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      e.stopPropagation();
    }
  }, { capture: true, ...plSig });

  view.contentDOM.addEventListener('paste', (event: ClipboardEvent) => {
    if (!getVimModePref(currentPrefix)) return;
    const text = event.clipboardData?.getData('text/plain');
    if (text) rc.unnamedRegister.setText(text);
  }, plSig);

  // Trap tab/window close
  beforeunloadAbort = new AbortController();
  window.addEventListener('beforeunload', (event) => {
    if (isEditorDirty(activeSavedContent())) {
      event.preventDefault();
      event.returnValue = '';
    }
  }, { signal: beforeunloadAbort.signal });

  createToggleIndicator(parent, vimOn);

  // Mobile touch menu
  const touchSig = plSig;
  let twoFingerActive = false;
  let twoFingerX = 0;
  let twoFingerY = 0;
  let twoFingerStart: [number, number, number, number] | null = null;

  parent.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      twoFingerStart = [e.touches[0].clientX, e.touches[0].clientY, e.touches[1].clientX, e.touches[1].clientY];
      twoFingerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      twoFingerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      twoFingerActive = true;
    } else { twoFingerActive = false; twoFingerStart = null; }
  }, touchSig);

  parent.addEventListener('touchmove', (e) => {
    if (!twoFingerActive || !twoFingerStart || e.touches.length < 2) { twoFingerActive = false; return; }
    const [sx0, sy0, sx1, sy1] = twoFingerStart;
    if (Math.abs(e.touches[0].clientX - sx0) > 15 || Math.abs(e.touches[0].clientY - sy0) > 15 ||
        Math.abs(e.touches[1].clientX - sx1) > 15 || Math.abs(e.touches[1].clientY - sy1) > 15) {
      twoFingerActive = false;
    }
  }, touchSig);

  parent.addEventListener('touchend', (e) => {
    if (twoFingerActive && e.touches.length === 0) {
      twoFingerActive = false;
      showMobileContextMenu(twoFingerX, twoFingerY, parent);
    }
  }, touchSig);

  parent.addEventListener('touchcancel', () => { twoFingerActive = false; twoFingerStart = null; }, touchSig);

  view.focus();
  return view;
}

export function insertAtCursor(text: string): void {
  const view = activeView();
  if (!view) return;
  const { from, to } = view.state.selection.main;
  view.dispatch({
    changes: { from, to, insert: text },
    selection: { anchor: from + text.length },
  });
}

export function getEditorContent(): string {
  const view = activeView();
  if (!view) return '';
  return view.state.doc.toString();
}

export function isEditorDirty(original: string): boolean {
  return getEditorContent() !== original;
}

/**
 * Replace a buffer's content in place (e.g. to silently pull in an upstream refresh),
 * preserving that buffer's view — unlike destroying and recreating the editor, this
 * does not disturb any other open buffer, and keeps the cursor (clamped to the new
 * document length). Defaults to the active buffer; pass bufferId to target another one.
 * Not added to undo history, since it's not a user edit.
 */
export function setEditorContent(content: string, opts?: { bufferId?: string }): void {
  const buf = opts?.bufferId ? getBuffer(opts.bufferId) : getActiveBuffer();
  if (!buf) return;
  const { view } = buf;
  // Set savedContent/dirtyNotified *before* dispatching: the updateListener fires
  // synchronously from dispatch(), and must see this as a clean change rather than
  // a user edit (which would wrongly fire onDirty and schedule an autosave).
  buf.savedContent = content;
  buf.dirtyNotified = false;
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: content },
    selection: { anchor: Math.min(view.state.selection.main.head, content.length) },
    annotations: Transaction.addToHistory.of(false),
  });
  updateDirtyClass();
}

export function focusEditor(): void {
  activeView()?.focus();
}

export function destroyEditor(): void {
  resetBuffers();
  if (modeToggleEl) { modeToggleEl.remove(); modeToggleEl = null; }
  if (editorParent) {
    editorParent.classList.remove('veditor-dirty', 'veditor-dirty-aware', 'veditor-vim-normal', 'veditor-vim-insert');
    editorParent = null;
  }
  if (beforeunloadAbort) { beforeunloadAbort.abort(); beforeunloadAbort = null; }
  if (parentListenerAbort) { parentListenerAbort.abort(); parentListenerAbort = null; }
  if (autoSaveTimer !== null) { clearTimeout(autoSaveTimer); autoSaveTimer = null; }
  dismissContextMenu();
  editorOptions = undefined;
}

export function exitInsertMode(): void {
  const view = activeView();
  if (!view) return;
  if (!getVimModePref(currentPrefix)) return;
  view.contentDOM.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }),
  );
}

export function executeExCommand(cmd: string): void {
  const view = activeView();
  if (!view) return;
  if (!getVimModePref(currentPrefix)) return;
  const cm = getCM(view);
  if (!cm) return;
  (Vim as any).handleEx(cm, cmd);
}

export function toggleVimMode(): boolean {
  const view = activeView();
  const c = activeCompartments();
  if (!view || !c) return getVimModePref(currentPrefix);
  const nowVim = !getVimModePref(currentPrefix);
  setVimModePref(currentPrefix, nowVim);
  const cuaKeymap = editorParent
    ? buildCuaKeymap(editorParent, currentPrefix)
    : [];
  view.dispatch({
    effects: [
      c.vim.reconfigure(nowVim ? vim() : []),
      c.cua.reconfigure(nowVim ? [] : cuaKeymap),
    ],
  });
  updateToggleIndicator(nowVim);
  if (nowVim) {
    editorParent?.classList.add('veditor-vim-normal');
    editorParent?.classList.remove('veditor-vim-insert');
    attachVimModeListener(view);
  } else {
    editorParent?.classList.remove('veditor-vim-normal', 'veditor-vim-insert');
  }
  view.focus();
  return nowVim;
}

export function isVimMode(): boolean {
  return getVimModePref(currentPrefix);
}

export async function requestSave(): Promise<void> {
  await doSave();
}

export function requestQuit(force?: boolean): void {
  const cbs = activeCallbacks();
  if (!cbs || !editorParent) return;
  handleQuitRequest(force ?? false, editorParent, cbs);
}

// ---------------------------------------------------------------------------
// Internal type for vim register controller
// ---------------------------------------------------------------------------

interface RegisterController {
  pushText: (
    regName: string | null | undefined,
    op: string,
    text: string,
    linewise?: boolean,
    blockwise?: boolean,
  ) => void;
  unnamedRegister: { setText: (text: string) => void };
}
