import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('bit layout', () => {
  assert.equal(api.interleave(3, 2), 13n);
});
test('zero', () => {
  assert.deepEqual(api.deinterleave(0n), { x: 0, y: 0 });
});
test('all bits', () => {
  assert.equal(api.interleave(4294967295, 4294967295), 0xffffffffffffffffn);
});
test('grid exhaustive', () => {
  for (let x = 0; x < 32; x++)
    for (let y = 0; y < 32; y++) assert.deepEqual(api.deinterleave(api.interleave(x, y)), { x, y });
});
test('coordinate validation', () => {
  assert.throws(() => api.interleave(-1, 0));
  assert.throws(() => api.interleave(0.5, 0));
  assert.throws(() => api.interleave(4294967296, 0));
});
test('word bounds', () => {
  assert.throws(() => api.deinterleave(-1n));
  assert.throws(() => api.deinterleave(1n << 64n));
  assert.throws(() => api.deinterleave(1));
});
