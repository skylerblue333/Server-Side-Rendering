import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeHtml, homePage, renderPage } from '../src/index.js';

test('escapeHtml encodes active markup characters', () => {
  assert.equal(
    escapeHtml(`<script data-x="1">'&</script>`),
    '&lt;script data-x=&quot;1&quot;&gt;&#39;&amp;&lt;/script&gt;',
  );
});

test('renderPage returns deterministic escaped HTML', () => {
  const html = renderPage({
    title: 'A & B',
    heading: '<Hello>',
    body: 'safe <strong>text</strong>',
    requestId: 'req-123',
  });
  assert.match(html, /<title>A &amp; B<\/title>/);
  assert.match(html, /<h1>&lt;Hello&gt;<\/h1>/);
  assert.doesNotMatch(html, /<strong>/);
  assert.match(html, /data-request-id="req-123"/);
});

test('renderPage rejects empty and oversized fields', () => {
  assert.throws(() => renderPage({ title: '', heading: 'h', body: 'b' }), RangeError);
  assert.throws(
    () => renderPage({ title: 't', heading: 'h', body: 'x'.repeat(8_193) }),
    RangeError,
  );
});

test('homePage identifies the engineering service', () => {
  const html = homePage('trace-44');
  assert.match(html, /Sky SSR Core/);
  assert.match(html, /trace-44/);
});
