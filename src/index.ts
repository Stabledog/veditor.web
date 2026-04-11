import './style.css';

export {
  createEditor,
  getEditorContent,
  isEditorDirty,
  focusEditor,
  destroyEditor,
  exitInsertMode,
  executeExCommand,
  toggleVimMode,
  isVimMode,
  requestSave,
  requestQuit,
  type VEditorCallbacks,
  type VEditorOptions,
} from './veditor';

export { hashTarget } from './util';

export {
  createVimInput,
  type VimInputOptions,
  type VimInputHandle,
} from './vim-input';
