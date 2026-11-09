import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { Range } from '@codemirror/state';
import { findLinks } from './links';

/**
 * CodeMirror extension that decorates HTTP(S) URLs in the editor with styling.
 * A markdown link `[text](url)` is decorated as one span, text included.
 * Makes URLs visually distinct (underlined, colored) so users discover the Ctrl+Click feature.
 */

const urlDecoration = Decoration.mark({
  class: 'veditor-url',
  title: 'Ctrl+Click to open',
});

function buildDecorations(view: EditorView): DecorationSet {
  const decorations: Range<Decoration>[] = [];

  for (let i = 1; i <= view.state.doc.lines; i++) {
    const line = view.state.doc.line(i);
    for (const span of findLinks(line.text)) {
      decorations.push(urlDecoration.range(line.from + span.from, line.from + span.to));
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
