import { EditorView, keymap } from '@codemirror/view';
import { EditorState, Compartment, type Extension } from '@codemirror/state';
import { vim, Vim } from '@replit/codemirror-vim';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { hashTarget } from './util';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VEditorCallbacks {
  onSave: () => Promise<void>;
  /** Called when the quit is confirmed (or forced). The app should navigate away / close. */
  onQuit: () => void;
  /** Called before dirty-check on non-forced quit. Return false to veto the close.
   *  The app can also call markDirty() here to influence the dirty check. */
  onCloseRequest?: () => boolean | void;
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

// ---------------------------------------------------------------------------
// Line wrap preference
// ---------------------------------------------------------------------------

function wrapKey(prefix: string): string {
  return `${prefix}_line_wrap`;
}

function getWrapPref(prefix: string): boolean {
  return localStorage.getItem(wrapKey(prefix)) !== 'false'; // default on
}

function setWrapPref(prefix: string, on: boolean): void {
  localStorage.setItem(wrapKey(prefix), String(on));
}

// ---------------------------------------------------------------------------
// Editor state
// ---------------------------------------------------------------------------

let editorView: EditorView | null = null;
let dirtyFlag = false;
const wrapCompartment = new Compartment();

// ---------------------------------------------------------------------------
// Quit flow
// ---------------------------------------------------------------------------

function handleQuitRequest(
  force: boolean,
  originalContent: string,
  parent: HTMLElement,
  callbacks: VEditorCallbacks,
): void {
  if (force) {
    callbacks.onQuit();
    return;
  }
  // Let the app vote on the close
  if (callbacks.onCloseRequest) {
    const result = callbacks.onCloseRequest();
    if (result === false) return; // vetoed
  }
  // Check dirty (editor content OR app-set flag)
  if (dirtyFlag || isEditorDirty(originalContent)) {
    showConfirmBar(parent, 'Unsaved changes. Discard?', () => callbacks.onQuit());
    return;
  }
  callbacks.onQuit();
}

function showConfirmBar(parent: HTMLElement, message: string, onConfirm: () => void): void {
  parent.querySelector('.veditor-confirm-bar')?.remove();

  const bar = document.createElement('div');
  bar.className = 'veditor-confirm-bar';
  bar.innerHTML = `
    <span>${message}</span>
    <button class="veditor-confirm-btn veditor-confirm-yes">Yes</button>
    <button class="veditor-confirm-btn veditor-confirm-no">No</button>
  `;
  parent.prepend(bar);

  const dismiss = () => { bar.remove(); document.removeEventListener('keydown', onKey, true); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'y' || e.key === 'Enter') { e.stopPropagation(); e.preventDefault(); dismiss(); onConfirm(); }
    else if (e.key === 'n' || e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); dismiss(); }
  };
  // Capture phase so we intercept before CodeMirror consumes the keystroke
  document.addEventListener('keydown', onKey, true);

  bar.querySelector('.veditor-confirm-yes')!.addEventListener('click', () => { dismiss(); onConfirm(); });
  bar.querySelector('.veditor-confirm-no')!.addEventListener('click', () => { dismiss(); });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Mark the editor as dirty from external state (e.g. a changed title field).
 *  Typically called from onCloseRequest. Resets after each quit flow. */
export function markDirty(): void {
  dirtyFlag = true;
}

export function createEditor(
  parent: HTMLElement,
  content: string,
  callbacks: VEditorCallbacks,
  options?: VEditorOptions,
): EditorView {
  destroyEditor();
  dirtyFlag = false;

  const prefix = options?.storagePrefix ?? 'veditor';
  const enableLinks = options?.clickableLinks ?? true;

  // --- Vim ex commands ---

  Vim.defineEx('w', 'w', () => {
    callbacks.onSave();
  });

  Vim.defineEx('q', 'q', (_cm: unknown, params: { argString?: string; bang?: boolean }) => {
    const force = params?.bang ?? false;
    handleQuitRequest(force, content, parent, callbacks);
  });

  Vim.defineEx('wq', 'wq', async () => {
    await callbacks.onSave();
    handleQuitRequest(false, content, parent, callbacks);
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

  // --- Build extensions ---
  const exts: Extension[] = [
    vim(),
    basicSetup,
    markdown({ codeLanguages: languages }),
    oneDark,
    keymap.of([]),
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

  if (enableLinks) {
    exts.push(clickableLinks);
  }

  if (options?.extensions) {
    exts.push(...options.extensions);
  }

  // --- Create editor ---
  const state = EditorState.create({ doc: content, extensions: exts });
  editorView = new EditorView({ state, parent });

  // Pull system clipboard into unnamed register on focus
  editorView.contentDOM.addEventListener('focus', () => {
    navigator.clipboard.readText().then((text) => {
      if (text) {
        rc.unnamedRegister.setText(text);
      }
    }).catch(() => {});
  });

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
}

/** Send an Escape key to the editor, exiting insert mode. */
export function exitInsertMode(): void {
  if (!editorView) return;
  // Simulate Escape keydown on the editor's content DOM
  editorView.contentDOM.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }),
  );
}

/** Execute a vim ex command programmatically (e.g., 'w', 'q', 'wq'). */
export function executeExCommand(cmd: string): void {
  if (!editorView) return;
  (Vim as Record<string, unknown> as { handleEx: (cm: EditorView, cmd: string) => void }).handleEx(editorView, cmd);
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
