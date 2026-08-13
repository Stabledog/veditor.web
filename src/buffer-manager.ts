import type { EditorView } from '@codemirror/view';
import type { Compartment } from '@codemirror/state';
import type { VEditorCallbacks } from './veditor';

export interface ViewCompartments {
  vim: Compartment;
  cua: Compartment;
  wrap: Compartment;
  list: Compartment;
}

export interface BufferEntry {
  id: string;
  label: string;
  view: EditorView;
  savedContent: string;
  callbacks: VEditorCallbacks;
  compartments: ViewCompartments;
  vimModeListenerAttached?: boolean;
  /** Tracks whether onDirty has already fired for the current clean->dirty streak, so it fires once per streak rather than on every keystroke. */
  dirtyNotified?: boolean;
}

export interface DocEntry {
  id: string;
  label: string;
}

let buffers: Map<string, BufferEntry> = new Map();
let activeBufferId: string | null = null;

export function getActiveBufferId(): string | null {
  return activeBufferId;
}

export function getBuffer(id: string): BufferEntry | undefined {
  return buffers.get(id);
}

export function getActiveBuffer(): BufferEntry | undefined {
  return activeBufferId !== null ? buffers.get(activeBufferId) : undefined;
}

export function listBufferEntries(): { id: string; label: string; active: boolean }[] {
  return [...buffers.entries()].map(([id, b]) => ({
    id, label: b.label, active: id === activeBufferId,
  }));
}

export function putBuffer(
  id: string,
  label: string,
  view: EditorView,
  savedContent: string,
  callbacks: VEditorCallbacks,
  compartments: ViewCompartments,
): BufferEntry {
  const existing = buffers.get(id);
  if (existing) {
    if (existing.view !== view) existing.view.destroy();
    existing.view = view;
    existing.savedContent = savedContent;
    existing.label = label;
    existing.callbacks = callbacks;
    existing.compartments = compartments;
    existing.dirtyNotified = false;
    return existing;
  }
  const entry: BufferEntry = { id, label, view, savedContent, callbacks, compartments };
  buffers.set(id, entry);
  return entry;
}

export function setActiveBufferId(id: string): void {
  activeBufferId = id;
}

export function removeBuffer(id: string): void {
  const entry = buffers.get(id);
  if (entry) entry.view.destroy();
  buffers.delete(id);
  if (activeBufferId === id) {
    const ids = [...buffers.keys()];
    activeBufferId = ids.length > 0 ? ids[0] : null;
  }
}

function rotateBufferId(delta: number): string | null {
  const ids = [...buffers.keys()];
  if (activeBufferId === null || ids.length < 2) return null;
  const idx = ids.indexOf(activeBufferId);
  return ids[(idx + delta + ids.length) % ids.length];
}

export function nextBufferId(): string | null { return rotateBufferId(1); }
export function prevBufferId(): string | null { return rotateBufferId(-1); }

export function bufferCount(): number {
  return buffers.size;
}

export function bufferIdByIndex(index: number): string | null {
  const ids = [...buffers.keys()];
  if (index < 1 || index > ids.length) return null;
  return ids[index - 1];
}

export function detachActiveView(container: HTMLElement): void {
  if (activeBufferId === null) return;
  const entry = buffers.get(activeBufferId);
  if (!entry) return;
  if (entry.view.dom.parentNode === container) {
    container.removeChild(entry.view.dom);
  }
}

export function attachView(id: string, container: HTMLElement): void {
  const entry = buffers.get(id);
  if (!entry) return;
  container.appendChild(entry.view.dom);
  entry.view.requestMeasure();
  entry.view.focus();
}

export function resetBuffers(): void {
  for (const entry of buffers.values()) {
    entry.view.destroy();
  }
  buffers = new Map();
  activeBufferId = null;
}
