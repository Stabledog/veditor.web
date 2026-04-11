// ---------------------------------------------------------------------------
// Shared localStorage preference helpers
// ---------------------------------------------------------------------------

// --- Vim mode ---

function vimModeKey(prefix: string): string {
  return `${prefix}_vim_mode`;
}

export function getVimModePref(prefix: string): boolean {
  return localStorage.getItem(vimModeKey(prefix)) !== 'false'; // default on
}

export function setVimModePref(prefix: string, on: boolean): void {
  localStorage.setItem(vimModeKey(prefix), String(on));
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
