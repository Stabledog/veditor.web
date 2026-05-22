// buffer-manager.ts — multi-buffer state for veditor
//
// Each buffer holds a CM6 EditorState snapshot, a saved-content baseline,
// and per-buffer callbacks.  The active buffer's state lives in the
// EditorView; background buffers are frozen snapshots.

import type { EditorState } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type { VEditorCallbacks } from './veditor';

export interface BufferEntry {
  id: string;
  label: string;
  state: EditorState;
  savedContent: string;
  callbacks: VEditorCallbacks;
}

export interface DocEntry {
  id: string;
  label: string;
}

let buffers: Map<string, BufferEntry> = new Map();
let activeBufferId: string | null = null;
let bufferOrder: string[] = [];  // tracks insertion order for :bn/:bp

export function getActiveBufferId(): string | null {
  return activeBufferId;
}

export function getBuffer(id: string): BufferEntry | undefined {
  return buffers.get(id);
}

export function getActiveBuffer(): BufferEntry | undefined {
  return activeBufferId ? buffers.get(activeBufferId) : undefined;
}

export function listBufferIds(): string[] {
  return [...bufferOrder];
}

export function listBufferEntries(): { id: string; label: string; active: boolean }[] {
  return bufferOrder.map(id => {
    const b = buffers.get(id)!;
    return { id, label: b.label, active: id === activeBufferId };
  });
}

// Snapshot the current EditorView state into the active buffer entry
export function snapshotActiveBuffer(view: EditorView, savedContent: string): void {
  if (!activeBufferId) return;
  const entry = buffers.get(activeBufferId);
  if (!entry) return;
  entry.state = view.state;
  entry.savedContent = savedContent;
}

// Add or update a buffer.  Returns the entry.
export function putBuffer(
  id: string,
  label: string,
  state: EditorState,
  savedContent: string,
  callbacks: VEditorCallbacks,
): BufferEntry {
  const existing = buffers.get(id);
  if (existing) {
    existing.state = state;
    existing.savedContent = savedContent;
    existing.label = label;
    existing.callbacks = callbacks;
    return existing;
  }
  const entry: BufferEntry = { id, label, state, savedContent, callbacks };
  buffers.set(id, entry);
  bufferOrder.push(id);
  return entry;
}

export function setActiveBufferId(id: string): void {
  activeBufferId = id;
}

export function removeBuffer(id: string): void {
  buffers.delete(id);
  bufferOrder = bufferOrder.filter(x => x !== id);
  if (activeBufferId === id) {
    activeBufferId = bufferOrder.length > 0 ? bufferOrder[0] : null;
  }
}

// Navigate: returns the next/previous buffer id, or null
export function nextBufferId(): string | null {
  if (!activeBufferId || bufferOrder.length < 2) return null;
  const idx = bufferOrder.indexOf(activeBufferId);
  return bufferOrder[(idx + 1) % bufferOrder.length];
}

export function prevBufferId(): string | null {
  if (!activeBufferId || bufferOrder.length < 2) return null;
  const idx = bufferOrder.indexOf(activeBufferId);
  return bufferOrder[(idx - 1 + bufferOrder.length) % bufferOrder.length];
}

export function bufferCount(): number {
  return buffers.size;
}

export function resetBuffers(): void {
  buffers = new Map();
  activeBufferId = null;
  bufferOrder = [];
}
