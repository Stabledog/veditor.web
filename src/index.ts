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
  type HelpSection,
} from './veditor';

export { hashTarget } from './util';

export { getAutoSaveMs } from './prefs';

export { type DocEntry } from './buffer-manager';

export {
  createVimInput,
  type VimInputOptions,
  type VimInputHandle,
} from './vim-input';

export {
  logError,
  logWarn,
  logInfo,
  logDebug,
  getFormattedLogs,
  clearLogs,
  createLogViewer,
} from './logging';
