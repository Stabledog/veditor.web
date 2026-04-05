import './style.css';

export {
  createEditor,
  getEditorContent,
  isEditorDirty,
  focusEditor,
  destroyEditor,
  exitInsertMode,
  executeExCommand,
  type VEditorCallbacks,
  type VEditorOptions,
} from './veditor';

export { hashTarget } from './util';
