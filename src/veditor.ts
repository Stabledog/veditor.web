import { EditorView, keymap } from '@codemirror/view';
import { EditorState, Compartment, type Extension } from '@codemirror/state';
import { vim, Vim, getCM } from '@replit/codemirror-vim';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { indentMore, indentLess } from '@codemirror/commands';
import { basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { hashTarget } from './util';
import { getVimModePref, setVimModePref, getWrapPref, setWrapPref } from './prefs';
import { urlDecorator } from './url-decorator';

declare const __APP_VERSION__: string;
const VERSION = __APP_VERSION__;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VEditorCallbacks {
  onSave: () => Promise<void>;
  /** Called when the quit is confirmed (or forced). The app should navigate away / close. */
  onQuit: () => void;
  /** If provided, the quit flow checks this alongside the editor's own dirty state.
   *  Return true if the app has unsaved state the editor doesn't know about. */
  isAppDirty?: () => boolean;
}

export interface VEditorOptions {
  /** localStorage key prefix for preferences (default: 'veditor') */
  storagePrefix?: string;
  /** Enable Ctrl+Click to open URLs in hashed tabs (default: true) */
  clickableLinks?: boolean;
  /** Custom vim ex commands: name -> handler */
  exCommands?: Record<string, (...args: unknown[]) => void>;
  /** Custom vim normal-mode mappings: key -> action */
  normalMappings?: Record<string, () => void>;
  /** Additional CodeMirror extensions */
  extensions?: Extension[];
}

// ---------------------------------------------------------------------------
// Ctrl+Click link handler
// ---------------------------------------------------------------------------

function urlAtPosition(lineText: string, col: number): string | null {
  const urlRe = /https?:\/\/[^\s)\]>]+/g;
  let m;
  while ((m = urlRe.exec(lineText)) !== null) {
    if (col >= m.index && col < m.index + m[0].length) return m[0];
  }
  return null;
}

const clickableLinks = EditorView.domEventHandlers({
  click(event: MouseEvent, view: EditorView) {
    if (!event.ctrlKey) return false;
    const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
    if (pos == null) return false;
    const line = view.state.doc.lineAt(pos);
    const col = pos - line.from;
    const url = urlAtPosition(line.text, col);
    if (url) {
      window.open(url, hashTarget(url));
      event.preventDefault();
      return true;
    }
    return false;
  },
});

// Preferences (getVimModePref, setVimModePref, getWrapPref, setWrapPref)
// are imported from ./prefs.ts

// ---------------------------------------------------------------------------
// Editor state
// ---------------------------------------------------------------------------

let editorView: EditorView | null = null;
let savedContent = '';  // baseline for dirty-checking; updated on save
let editorParent: HTMLElement | null = null;
let currentPrefix = 'veditor';
let currentCallbacks: VEditorCallbacks | null = null;
const wrapCompartment = new Compartment();
const vimCompartment = new Compartment();
const cuaCompartment = new Compartment();
let modeToggleEl: HTMLButtonElement | null = null;
let beforeunloadAbort: AbortController | null = null;

function updateDirtyClass(): void {
  if (!editorParent) return;
  const dirty = isEditorDirty(savedContent);
  editorParent.classList.toggle('veditor-dirty', dirty);
}

function updateVimSubMode(mode: string): void {
  if (!editorParent) return;
  editorParent.classList.remove('veditor-vim-normal', 'veditor-vim-insert');
  if (mode === 'insert' || mode === 'replace') {
    editorParent.classList.add('veditor-vim-insert');
  } else {
    editorParent.classList.add('veditor-vim-normal');
  }
}

function attachVimModeListener(): void {
  if (!editorView) return;
  const cm = getCM(editorView);
  if (!cm) return;
  cm.on('vim-mode-change', (e: { mode: string }) => {
    updateVimSubMode(e.mode);
  });
}

// ---------------------------------------------------------------------------
// CUA keymap (active when vim is off)
// ---------------------------------------------------------------------------

function buildCuaKeymap(
  callbacks: VEditorCallbacks,
  parent: HTMLElement,
  prefix: string,
): Extension {
  return keymap.of([
    {
      key: 'Mod-s',
      run: () => {
        (async () => {
          await callbacks.onSave();
          savedContent = getEditorContent();
          updateDirtyClass();
        })();
        return true;
      },
    },
    {
      key: 'Escape',
      run: () => {
        handleQuitRequest(false, parent, callbacks);
        return true;
      },
    },
    {
      key: 'Mod-Shift-s',
      run: () => {
        (async () => {
          await callbacks.onSave();
          savedContent = getEditorContent();
          updateDirtyClass();
          handleQuitRequest(false, parent, callbacks);
        })();
        return true;
      },
    },
    {
      key: 'Mod-Shift-w',
      run: () => {
        if (!editorView) return false;
        const nowOn = !getWrapPref(prefix);
        setWrapPref(prefix, nowOn);
        editorView.dispatch({
          effects: wrapCompartment.reconfigure(nowOn ? EditorView.lineWrapping : []),
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
  if (isEditorDirty(savedContent) || callbacks.isAppDirty?.()) {
    showConfirmBar(parent,
      () => callbacks.onQuit(),
      async () => {
        await callbacks.onSave();
        savedContent = getEditorContent();
        updateDirtyClass();
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

  const dismiss = () => { bar.remove(); document.removeEventListener('keydown', onKey, true); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 's' && onSaveQuit) { e.stopPropagation(); e.preventDefault(); dismiss(); onSaveQuit(); }
    else if (e.key === 'd') { e.stopPropagation(); e.preventDefault(); dismiss(); onDiscard(); }
    else if (e.key === 'c' || e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); dismiss(); }
  };
  // Capture phase so we intercept before CodeMirror consumes the keystroke
  document.addEventListener('keydown', onKey, true);

  if (onSaveQuit) bar.querySelector('.veditor-confirm-save')!.addEventListener('click', () => { dismiss(); onSaveQuit(); });
  bar.querySelector('.veditor-confirm-yes')!.addEventListener('click', () => { dismiss(); onDiscard(); });
  bar.querySelector('.veditor-confirm-no')!.addEventListener('click', () => { dismiss(); });
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
  savedContent = content;
  editorParent = parent;
  parent.classList.add('veditor-dirty-aware');
  parent.classList.remove('veditor-dirty');

  const prefix = options?.storagePrefix ?? 'veditor';
  currentPrefix = prefix;
  currentCallbacks = callbacks;
  const enableLinks = options?.clickableLinks ?? true;
  const vimOn = getVimModePref(prefix);

  // --- Vim ex commands ---

  Vim.defineEx('w', 'w', async () => {
    await callbacks.onSave();
    savedContent = getEditorContent();
    updateDirtyClass();
  });

  Vim.defineEx('q', 'q', (_cm: unknown, params: { argString?: string; bang?: boolean }) => {
    const force = params?.bang ?? false;
    handleQuitRequest(force, parent, callbacks);
  });

  Vim.defineEx('wq', 'wq', async () => {
    await callbacks.onSave();
    savedContent = getEditorContent();
    updateDirtyClass();
    handleQuitRequest(false, parent, callbacks);
  });

  Vim.defineEx('cua', 'cua', () => {
    // Defer so the ex command fully completes before vim is removed
    if (getVimModePref(currentPrefix)) setTimeout(() => toggleVimMode(), 0);
  });

  Vim.defineEx('wrap', 'wrap', () => {
    if (!editorView) return;
    const nowOn = !getWrapPref(prefix);
    setWrapPref(prefix, nowOn);
    editorView.dispatch({
      effects: wrapCompartment.reconfigure(nowOn ? EditorView.lineWrapping : []),
    });
  });

  Vim.map('jk', '<Esc>', 'insert');
  Vim.setOption('insertModeEscKeysTimeout', 750);

  // 'u' in normal mode triggers the quit flow (same as :q)
  Vim.defineAction('veditor_quit', () => {
    handleQuitRequest(false, parent, callbacks);
  });
  Vim.mapCommand('u', 'action', 'veditor_quit', {}, { context: 'normal' });

  // --- Custom ex commands from host app ---
  if (options?.exCommands) {
    for (const [name, handler] of Object.entries(options.exCommands)) {
      Vim.defineEx(name, name, handler);
    }
  }

  // --- Custom normal-mode mappings from host app ---
  if (options?.normalMappings) {
    for (const [key, action] of Object.entries(options.normalMappings)) {
      const actionName = `veditor_${key}`;
      Vim.defineAction(actionName, action);
      Vim.mapCommand(key, 'action', actionName, {}, { context: 'normal' });
    }
  }

  // --- Clipboard sync ---
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
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  // --- CUA keymap (active when vim is off) ---
  const cuaKeymap = buildCuaKeymap(callbacks, parent, prefix);

  // --- Build extensions ---
  console.log('[veditor] Creating editor with urlDecorator extension');
  const exts: Extension[] = [
    vimCompartment.of(vimOn ? vim() : []),
    cuaCompartment.of(vimOn ? [] : cuaKeymap),
    basicSetup,
    markdown({ codeLanguages: languages }),
    oneDark,
    urlDecorator,
    keymap.of([
      { key: 'Tab', run: indentMore },
      { key: 'Shift-Tab', run: indentLess },
    ]),
    wrapCompartment.of(getWrapPref(prefix) ? EditorView.lineWrapping : []),
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
    if (update.docChanged) updateDirtyClass();
  }));

  if (enableLinks) {
    exts.push(clickableLinks);
  }

  if (options?.extensions) {
    exts.push(...options.extensions);
  }

  // --- Create editor ---
  const state = EditorState.create({ doc: content, extensions: exts });
  editorView = new EditorView({ state, parent });

  // --- Vim sub-mode indicator (normal / insert via bottom border) ---
  if (vimOn) {
    parent.classList.add('veditor-vim-normal');
    attachVimModeListener();
  }

  // Sync OS clipboard → vim unnamed register on p/P (normal tabs).
  // navigator.clipboard.readText() requires a user activation; a keydown
  // qualifies.  In restricted contexts (extension iframes) this is denied
  // and p/P falls through to whatever is in the register; the user can
  // Ctrl+Shift+V to paste via the browser's native paste event instead.
  parent.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'p' && e.key !== 'P') return;
    if (!getVimModePref(currentPrefix)) return;
    if (!parent.classList.contains('veditor-vim-normal')) return;
    if (!editorView) return;
    if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

    e.preventDefault();
    e.stopPropagation();

    const cm = getCM(editorView)!;
    const key = e.key;

    navigator.clipboard.readText().then((text) => {
      if (text) rc.unnamedRegister.setText(text);
    }).catch(() => {}).finally(() => {
      Vim.handleKey(cm, key, 'user');
    });
  }, { capture: true });

  // Seed unnamed register from browser-native paste (Ctrl+V / Ctrl+Shift+V).
  // This is the only clipboard path that works in extension iframes.
  editorView.contentDOM.addEventListener('paste', (event: ClipboardEvent) => {
    if (!getVimModePref(currentPrefix)) return;
    const text = event.clipboardData?.getData('text/plain');
    if (text) {
      rc.unnamedRegister.setText(text);
    }
  });

  // --- Trap tab/window close with unsaved changes ---
  beforeunloadAbort = new AbortController();
  window.addEventListener('beforeunload', (event) => {
    if (isEditorDirty(savedContent)) {
      event.preventDefault();
      event.returnValue = '';
    }
  }, { signal: beforeunloadAbort.signal });

  // --- Mode toggle indicator ---
  createToggleIndicator(parent, vimOn);

  editorView.focus();
  return editorView;
}

export function getEditorContent(): string {
  if (!editorView) return '';
  return editorView.state.doc.toString();
}

export function isEditorDirty(original: string): boolean {
  return getEditorContent() !== original;
}

export function focusEditor(): void {
  editorView?.focus();
}

export function destroyEditor(): void {
  if (editorView) {
    editorView.destroy();
    editorView = null;
  }
  if (modeToggleEl) {
    modeToggleEl.remove();
    modeToggleEl = null;
  }
  if (editorParent) {
    editorParent.classList.remove('veditor-dirty', 'veditor-dirty-aware', 'veditor-vim-normal', 'veditor-vim-insert');
    editorParent = null;
  }
  if (beforeunloadAbort) {
    beforeunloadAbort.abort();
    beforeunloadAbort = null;
  }
  currentCallbacks = null;
}

/** Send an Escape key to the editor, exiting insert mode.
 *  No-op when vim mode is off. */
export function exitInsertMode(): void {
  if (!editorView) return;
  if (!getVimModePref(currentPrefix)) return;
  editorView.contentDOM.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }),
  );
}

/** Execute a vim ex command programmatically (e.g., 'w', 'q', 'wq').
 *  No-op when vim mode is off. */
export function executeExCommand(cmd: string): void {
  if (!editorView) return;
  if (!getVimModePref(currentPrefix)) return;
  const cm = getCM(editorView);
  if (!cm) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Vim as any).handleEx(cm, cmd);
}

/** Toggle vim mode on/off. Returns the new state (true = vim). */
export function toggleVimMode(): boolean {
  if (!editorView) return getVimModePref(currentPrefix);
  const nowVim = !getVimModePref(currentPrefix);
  setVimModePref(currentPrefix, nowVim);
  const cuaKeymap = currentCallbacks && editorParent
    ? buildCuaKeymap(currentCallbacks, editorParent, currentPrefix)
    : [];
  editorView.dispatch({
    effects: [
      vimCompartment.reconfigure(nowVim ? vim() : []),
      cuaCompartment.reconfigure(nowVim ? [] : cuaKeymap),
    ],
  });
  updateToggleIndicator(nowVim);
  if (nowVim) {
    editorParent?.classList.add('veditor-vim-normal');
    editorParent?.classList.remove('veditor-vim-insert');
    attachVimModeListener();
  } else {
    editorParent?.classList.remove('veditor-vim-normal', 'veditor-vim-insert');
  }
  editorView.focus();
  return nowVim;
}

/** Returns true if vim mode is currently enabled. */
export function isVimMode(): boolean {
  return getVimModePref(currentPrefix);
}

/** Trigger a save directly (works in both vim and CUA mode). */
export async function requestSave(): Promise<void> {
  if (!currentCallbacks) return;
  await currentCallbacks.onSave();
  savedContent = getEditorContent();
  updateDirtyClass();
}

/** Trigger the quit flow directly (works in both vim and CUA mode). */
export function requestQuit(force?: boolean): void {
  if (!currentCallbacks || !editorParent) return;
  handleQuitRequest(force ?? false, editorParent, currentCallbacks);
}

// ---------------------------------------------------------------------------
// Internal type for vim register controller (not exported by @replit/codemirror-vim)
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
