// buffer-manager.ts — multi-buffer with one EditorView per document.
//
// Each buffer owns its own EditorView (with its own vim state, undo history,
// panels, etc.).  Only one view is attached to the container DOM at a time.
// Detached views are inert (no events, no rendering) but stay alive in memory.

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
}

export interface DocEntry {
  id: string;
  label: string;
}

let buffers: Map<string, BufferEntry> = new Map();
let activeBufferId: string | null = null;
let bufferOrder: string[] = [];
let container: HTMLElement | null = null;

export function setContainer(el: HTMLElement): void {
  container = el;
}

export function getContainer(): HTMLElement | null {
  return container;
}

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
    existing.view = view;
    existing.savedContent = savedContent;
    existing.label = label;
    existing.callbacks = callbacks;
    existing.compartments = compartments;
    return existing;
  }
  const entry: BufferEntry = { id, label, view, savedContent, callbacks, compartments };
  buffers.set(id, entry);
  bufferOrder.push(id);
  return entry;
}

export function setActiveBufferId(id: string): void {
  activeBufferId = id;
}

export function removeBuffer(id: string): void {
  const entry = buffers.get(id);
  if (entry) {
    entry.view.destroy();
  }
  buffers.delete(id);
  bufferOrder = bufferOrder.filter(x => x !== id);
  if (activeBufferId === id) {
    activeBufferId = bufferOrder.length > 0 ? bufferOrder[0] : null;
  }
}

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

// Get buffer id by 1-based index (as shown in :ls)
export function bufferIdByIndex(index: number): string | null {
  if (index < 1 || index > bufferOrder.length) return null;
  return bufferOrder[index - 1];
}

// Detach the active view's DOM from the container (does not destroy it)
export function detachActiveView(): void {
  if (!activeBufferId || !container) return;
  const entry = buffers.get(activeBufferId);
  if (!entry) { console.warn('[bufmgr] detach: no entry for', activeBufferId); return; }
  if (entry.view.dom.parentNode === container) {
    container.removeChild(entry.view.dom);
    console.log('[bufmgr] detached', activeBufferId);
  } else {
    console.warn('[bufmgr] detach: parentNode mismatch', entry.view.dom.parentNode, '!==', container);
  }
}

export function attachView(id: string): void {
  if (!container) { console.warn('[bufmgr] attach: no container'); return; }
  const entry = buffers.get(id);
  if (!entry) { console.warn('[bufmgr] attach: no entry for', id); return; }
  container.appendChild(entry.view.dom);
  entry.view.requestMeasure();
  entry.view.focus();
  console.log('[bufmgr] attached', id, 'children:', container.childNodes.length);
}

export function resetBuffers(): void {
  for (const entry of buffers.values()) {
    entry.view.destroy();
  }
  buffers = new Map();
  activeBufferId = null;
  bufferOrder = [];
  container = null;
}
