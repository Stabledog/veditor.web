import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { Range } from '@codemirror/state';

/**
 * CodeMirror extension that decorates HTTP(S) URLs in the editor with styling.
 * Makes URLs visually distinct (underlined, colored) so users discover the Ctrl+Click feature.
 */

const urlPattern = /https?:\/\/[^\s)\]>]+/g;

const urlDecoration = Decoration.mark({
  class: 'veditor-url',
  title: 'Ctrl+Click to open',
});

function buildDecorations(view: EditorView): DecorationSet {
  const decorations: Range<Decoration>[] = [];

  for (let i = 1; i <= view.state.doc.lines; i++) {
    const line = view.state.doc.line(i);
    let match;
    urlPattern.lastIndex = 0;
    while ((match = urlPattern.exec(line.text)) !== null) {
      const urlStart = line.from + match.index;
      const urlEnd = urlStart + match[0].length;
      decorations.push(urlDecoration.range(urlStart, urlEnd));
    }
  }

  console.log('[url-decorator] Found', decorations.length, 'URLs');
  return Decoration.set(decorations, true);
}

export const urlDecorator = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      console.log('[url-decorator] Plugin instantiated');
      this.decorations = buildDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.decorations = buildDecorations(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);
