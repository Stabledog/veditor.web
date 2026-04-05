import './style.css';

export {
  createEditor,
  getEditorContent,
  isEditorDirty,
  markDirty,
  focusEditor,
  destroyEditor,
  exitInsertMode,
  executeExCommand,
  type VEditorCallbacks,
  type VEditorOptions,
} from './veditor';

export { hashTarget } from './util';
