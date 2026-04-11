// ---------------------------------------------------------------------------
// Shared localStorage preference helpers
// ---------------------------------------------------------------------------

// --- Vim mode (shared across all veditor instances) ---

const VIM_MODE_KEY = 'veditor_vim_mode';

export function getVimModePref(_prefix: string): boolean {
  return localStorage.getItem(VIM_MODE_KEY) === 'true'; // default off (CUA)
}

export function setVimModePref(_prefix: string, on: boolean): void {
  localStorage.setItem(VIM_MODE_KEY, String(on));
}

// --- Line wrap ---

function wrapKey(prefix: string): string {
  return `${prefix}_line_wrap`;
}

export function getWrapPref(prefix: string): boolean {
  return localStorage.getItem(wrapKey(prefix)) !== 'false'; // default on
}

export function setWrapPref(prefix: string, on: boolean): void {
  localStorage.setItem(wrapKey(prefix), String(on));
}
