import './style.css';

declare const __APP_VERSION__: string;
export const VERSION = __APP_VERSION__;

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
