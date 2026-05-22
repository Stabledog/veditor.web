export interface PickerItem {
  id: string;
  label: string;
  active?: boolean;
  bufferIndex?: number;
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
    let renderedList: HTMLLIElement[] = [];

    function fuzzyMatch(text: string, query: string): boolean {
      const lower = text.toLowerCase();
      const q = query.toLowerCase();
      let qi = 0;
      for (let i = 0; i < lower.length && qi < q.length; i++) {
        if (lower[i] === q[qi]) qi++;
      }
      return qi === q.length;
    }

    function formatLabel(item: PickerItem): string {
      const prefix = item.bufferIndex != null ? `${item.bufferIndex}: ` : '   ';
      return prefix + item.label;
    }

    function render() {
      listEl.innerHTML = '';
      renderedList = [];
      filtered.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'veditor-doc-picker-item';
        if (i === highlightIdx) li.classList.add('highlighted');
        if (item.active) li.classList.add('active-buffer');
        li.textContent = formatLabel(item);
        if (item.active) {
          const badge = document.createElement('span');
          badge.className = 'veditor-doc-picker-badge';
          badge.textContent = ' %';
          li.appendChild(badge);
        }
        li.addEventListener('click', () => {
          cleanup();
          resolve(item.id);
        });
        listEl.appendChild(li);
        renderedList.push(li);
      });
      renderedList[highlightIdx]?.scrollIntoView({ block: 'nearest' });
    }

    function applyFilter() {
      const q = input.value;
      filtered = q ? items.filter(it => fuzzyMatch(it.label, q)) : [...items];
      highlightIdx = Math.min(highlightIdx, Math.max(0, filtered.length - 1));
      render();
    }

    function moveHighlight(delta: number) {
      const prev = highlightIdx;
      highlightIdx = Math.max(0, Math.min(highlightIdx + delta, filtered.length - 1));
      if (prev === highlightIdx) return;
      renderedList[prev]?.classList.remove('highlighted');
      renderedList[highlightIdx]?.classList.add('highlighted');
      renderedList[highlightIdx]?.scrollIntoView({ block: 'nearest' });
    }

    function cleanup() {
      dialog.close();
      dialog.remove();
    }

    input.addEventListener('input', () => {
      highlightIdx = 0;
      applyFilter();
    });

    input.addEventListener('keydown', (e: KeyboardEvent) => {
      const filterEmpty = input.value === '';

      if (e.key === 'ArrowDown' || (e.key === 'j' && filterEmpty)) {
        e.preventDefault();
        moveHighlight(1);
      } else if (e.key === 'ArrowUp' || (e.key === 'k' && filterEmpty)) {
        e.preventDefault();
        moveHighlight(-1);
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
