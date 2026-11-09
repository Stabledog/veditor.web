// Run with: npm test   (Node's built-in runner; links.ts has no imports)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findLinks, urlOnLine } from '../src/links.ts';

const URL = 'https://server/path/doc';

test('bare URL surrounded by whitespace', () => {
  const line = `see ${URL} here`;
  assert.deepEqual(findLinks(line), [{ from: 4, to: 4 + URL.length, url: URL }]);
  assert.equal(urlOnLine(line, 10, true), URL);
  assert.equal(urlOnLine(line, 0, true), null);
});

test('markdown link: span covers text and URL', () => {
  const line = `x [name](${URL}) y`;
  const md = `[name](${URL})`;
  assert.deepEqual(findLinks(line), [{ from: 2, to: 2 + md.length, url: URL }]);
});

test('markdown link: click on the link text opens the URL', () => {
  const line = `x [name](${URL}) y`;
  assert.equal(urlOnLine(line, 2, true), URL); // on '['
  assert.equal(urlOnLine(line, 4, true), URL); // inside 'name'
});

test('markdown link: click on the URL part opens the URL', () => {
  const line = `x [name](${URL}) y`;
  assert.equal(urlOnLine(line, line.indexOf('server'), true), URL);
  assert.equal(urlOnLine(line, line.length - 3, true), URL); // closing ')'
  assert.equal(urlOnLine(line, line.length - 1, true), null); // 'y'
});

test('bare URL followed by punctuation drops the punctuation', () => {
  for (const p of ['.', ',', ';', ':', '!', '?', '),', ').']) {
    assert.equal(findLinks(`see ${URL}${p}`)[0].url, URL, `punct ${p}`);
  }
  assert.equal(findLinks(`(see ${URL})`)[0].url, URL);
});

test('gx (non-exact) falls back to next link, then first on line', () => {
  const a = 'https://a.example/';
  const b = 'https://b.example/';
  const line = `${a} mid [b](${b}) end`;
  assert.equal(urlOnLine(line, line.indexOf('mid')), b);
  assert.equal(urlOnLine(line, line.indexOf('end')), a);
  assert.equal(urlOnLine('no links here', 0), null);
});

test('several links on one line are all found', () => {
  const line = `[one](https://a/) and https://b/ and [three](https://c/x)`;
  assert.deepEqual(findLinks(line).map(s => s.url), ['https://a/', 'https://b/', 'https://c/x']);
});
