import { EditorView, keymap } from '@codemirror/view';
import { EditorState, type Extension } from '@codemirror/state';
import { vim, Vim } from '@replit/codemirror-vim';
import { oneDark } from '@codemirror/theme-one-dark';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VimInputOptions {
  /** Initial value */
  value?: string;
  /** Placeholder shown when empty and unfocused */
  placeholder?: string;
  /** Called when Enter is pressed in normal mode */
  onEnter?: () => void;
  /** Called when Escape is pressed in normal mode (after already in normal mode) */
  onEscape?: () => void;
  /** Called whenever the value changes */
  onChange?: (value: string) => void;
  /** Additional CodeMirror extensions */
  extensions?: Extension[];
}

export interface VimInputHandle {
  /** Get the current value */
  getValue: () => string;
  /** Set the value programmatically */
  setValue: (value: string) => void;
  /** Focus the input */
  focus: () => void;
  /** Destroy the underlying CodeMirror instance */
  destroy: () => void;
  /** The container DOM element */
  dom: HTMLElement;
}

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export function createVimInput(
  parent: HTMLElement,
  options?: VimInputOptions,
): VimInputHandle {
  const wrapper = document.createElement('div');
  wrapper.className = 'vim-input';
  parent.appendChild(wrapper);

  // Track whether we're in normal mode to distinguish "first Escape" (exit
  // insert) from "second Escape" (app-level escape via onEscape callback).
  let inNormalMode = true;

  const handleEnterEscape = keymap.of([
    {
      key: 'Enter',
      run: () => {
        options?.onEnter?.();
        return true;
      },
    },
  ]);

  const listenForModeChange = EditorView.updateListener.of((update) => {
    // Detect vim mode changes by checking the cm-vim-mode class on the wrapper
    const cmDom = update.view.dom;
    inNormalMode = cmDom.classList.contains('cm-vim-mode-normal')
      || !cmDom.classList.contains('cm-vim-mode-insert');
  });

  const notifyChange = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      options?.onChange?.(update.state.doc.toString());
    }
  });

  // Prevent Enter from inserting a newline — this is a single-line input
  const suppressNewline = EditorState.transactionFilter.of((tr) => {
    if (tr.newDoc.lines > 1) {
      // Collapse to first line only
      return { ...tr, changes: undefined } as unknown as typeof tr;
    }
    return tr;
  });

  Vim.map('jk', '<Esc>', 'insert');

  const exts: Extension[] = [
    vim(),
    oneDark,
    handleEnterEscape,
    listenForModeChange,
    notifyChange,
    suppressNewline,
    EditorView.theme({
      '&': {
        height: 'auto',
        maxHeight: '1.8em',
        overflow: 'hidden',
      },
      '.cm-scroller': {
        overflow: 'hidden',
        lineHeight: '1.6',
      },
      '.cm-content': {
        padding: '2px 4px',
      },
      // Hide line numbers, gutters, etc. — this is an input, not an editor
      '.cm-gutters': { display: 'none' },
      // Hide the vim command bar — it would look odd on a single-line input
      '.cm-vim-panel': {
        background: '#45475a',
        color: '#cdd6f4',
        padding: '1px 4px',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontSize: '13px',
      },
      '.cm-vim-panel input': {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#cdd6f4',
        fontFamily: 'inherit',
        fontSize: 'inherit',
      },
      '.cm-activeLine': { backgroundColor: 'transparent' },
      '.cm-activeLineGutter': { backgroundColor: 'transparent' },
      // Cursor styling to match the main editor
      '&.cm-focused': { outline: 'none' },
    }),
  ];

  if (options?.extensions) {
    exts.push(...options.extensions);
  }

  const state = EditorState.create({
    doc: options?.value ?? '',
    extensions: exts,
  });

  const view = new EditorView({ state, parent: wrapper });

  // Handle Escape in normal mode → call onEscape
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inNormalMode) {
      options?.onEscape?.();
    }
  });

  const handle: VimInputHandle = {
    getValue() {
      return view.state.doc.toString();
    },
    setValue(value: string) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    },
    focus() {
      view.focus();
    },
    destroy() {
      view.destroy();
      wrapper.remove();
    },
    dom: wrapper,
  };

  return handle;
}
