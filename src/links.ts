/**
 * Link detection shared by Ctrl+Click, `gx` and the URL decorator.
 * Kept free of imports so tests can load it directly under Node.
 */

export interface LinkSpan {
  /** Column where the span starts (inclusive). */
  from: number;
  /** Column where the span ends (exclusive). */
  to: number;
  url: string;
}

// A markdown link `[text](url)` is one span covering the text and the URL;
// otherwise a bare URL. The markdown form comes first so it wins at `[`.
const LINK_RE = /\[[^\]\n]*\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s)\]>]+/g;

// Sentence punctuation that ends a bare URL rather than belonging to it.
const TRAILING_PUNCT_RE = /[.,;:!?'"]+$/;

export function findLinks(lineText: string): LinkSpan[] {
  const spans: LinkSpan[] = [];
  LINK_RE.lastIndex = 0;
  let m;
  while ((m = LINK_RE.exec(lineText)) !== null) {
    if (m[1]) {
      spans.push({ from: m.index, to: m.index + m[0].length, url: m[1] });
    } else {
      const url = m[0].replace(TRAILING_PUNCT_RE, '');
      spans.push({ from: m.index, to: m.index + url.length, url });
    }
  }
  return spans;
}

/**
 * The URL of the link at `col`. With `exact`, only a link under `col` counts;
 * otherwise fall back to the next link after `col`, then the first on the line.
 */
export function urlOnLine(lineText: string, col: number, exact?: boolean): string | null {
  const spans = findLinks(lineText);
  for (const s of spans) {
    if (col >= s.from && col < s.to) return s.url;
    if (!exact && s.from >= col) return s.url;
  }
  return exact || spans.length === 0 ? null : spans[0].url;
}
