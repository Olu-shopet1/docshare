import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getSafeUrl } from './safeUrl.ts';

// These must NEVER be treated as valid links: they can run code when clicked.
const dangerous = [
  'javascript:alert(document.domain)',
  '  JavaScript:alert(1)  ',
  'data:text/html,<script>alert(1)</script>',
  'vbscript:msgbox(1)',
  'file:///etc/passwd',
  'not a url',
  '',
  undefined,
];

for (const bad of dangerous) {
  test(`rejects dangerous link: ${JSON.stringify(bad)}`, () => {
    assert.equal(getSafeUrl(bad), null);
  });
}

// These are normal links and should be allowed (and normalized).
const allowed: Array<[string, string]> = [
  ['https://example.org/doc', 'https://example.org/doc'],
  ['http://example.com', 'http://example.com/'],
  ['  https://example.org/x  ', 'https://example.org/x'],
];

for (const [input, expected] of allowed) {
  test(`allows safe link: ${JSON.stringify(input)}`, () => {
    assert.equal(getSafeUrl(input), expected);
  });
}
