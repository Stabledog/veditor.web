// doc-picker.ts — <dialog>-based fuzzy document picker for veditor
//
// Shows a modal overlay with a filter input and a scrollable list.
// j/k navigate, typing filters, Enter selects, Escape cancels.
// Uses native <dialog>.showModal() for focus trapping and inertness.

export interface PickerItem {
  id: string;
  label: string;
  active?: boolean;
}

export function showDocPicker(
  items: PickerItem[],
  parent: HTMLElement,
): Promise<string | null> {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.className = 'veditor-doc-picker';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'veditor-doc-picker-filter';
    input.placeholder = 'Filter documents...';

    const listEl = document.createElement('ul');
    listEl.className = 'veditor-doc-picker-list';

    dialog.appendChild(input);
    dialog.appendChild(listEl);

    let filtered = [...items];
    let highlightIdx = 0;

    function fuzzyMatch(text: string, query: string): boolean {
      const lower = text.toLowerCase();
      const q = query.toLowerCase();
      let qi = 0;
      for (let i = 0; i < lower.length && qi < q.length; i++) {
        if (lower[i] === q[qi]) qi++;
      }
      return qi === q.length;
    }

    function render() {
      listEl.innerHTML = '';
      filtered.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'veditor-doc-picker-item';
        if (i === highlightIdx) li.classList.add('highlighted');
        if (item.active) li.classList.add('active-buffer');
        li.textContent = item.label;
        if (item.active) {
          const badge = document.createElement('span');
          badge.className = 'veditor-doc-picker-badge';
          badge.textContent = ' (current)';
          li.appendChild(badge);
        }
        li.addEventListener('click', () => {
          cleanup();
          resolve(item.id);
        });
        listEl.appendChild(li);
      });
      // scroll highlighted into view
      const highlighted = listEl.querySelector('.highlighted') as HTMLElement;
      highlighted?.scrollIntoView({ block: 'nearest' });
    }

    function applyFilter() {
      const q = input.value;
      filtered = q ? items.filter(it => fuzzyMatch(it.label, q)) : [...items];
      highlightIdx = Math.min(highlightIdx, Math.max(0, filtered.length - 1));
      render();
    }

    function cleanup() {
      dialog.close();
      dialog.remove();
    }

    input.addEventListener('input', () => {
      highlightIdx = 0;
      applyFilter();
    });

    dialog.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'j' && e.ctrlKey)) {
        e.preventDefault();
        highlightIdx = Math.min(highlightIdx + 1, filtered.length - 1);
        render();
      } else if (e.key === 'ArrowUp' || (e.key === 'k' && e.ctrlKey)) {
        e.preventDefault();
        highlightIdx = Math.max(highlightIdx - 1, 0);
        render();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered.length > 0) {
          cleanup();
          resolve(filtered[highlightIdx].id);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cleanup();
        resolve(null);
      }
    });

    // click on backdrop dismisses
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        cleanup();
        resolve(null);
      }
    });

    parent.appendChild(dialog);
    dialog.showModal();
    input.focus();
    applyFilter();
  });
}
