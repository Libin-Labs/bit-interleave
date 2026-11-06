function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function big(value: bigint): bigint {
  if (typeof value !== 'bigint') throw new TypeError('Expected bigint');
  const limit = (1n << 4096n) - 1n;
  if (value > limit || value < -limit) throw new RangeError('4096-bit budget exceeded');
  return value;
}
export function interleave(x: number, y: number): bigint {
  integer(x, 0, 4294967295);
  integer(y, 0, 4294967295);
  let word = 0n;
  for (let i = 0; i < 32; i++) {
    word |= BigInt((x >>> i) & 1) << BigInt(2 * i);
    word |= BigInt((y >>> i) & 1) << BigInt(2 * i + 1);
  }
  return word;
}
export function deinterleave(word: bigint): { x: number; y: number } {
  big(word);
  if (word < 0n || word > 0xffffffffffffffffn) throw new RangeError('Expected uint64');
  let x = 0,
    y = 0;
  for (let i = 0; i < 32; i++) {
    x += Number((word >> BigInt(2 * i)) & 1n) * 2 ** i;
    y += Number((word >> BigInt(2 * i + 1)) & 1n) * 2 ** i;
  }
  return { x, y };
}
