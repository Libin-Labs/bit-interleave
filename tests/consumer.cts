import { interleave, deinterleave } from '@lp-labs/bit-interleave';
if (deinterleave(interleave(12, 34)).y !== 34) throw new Error('Morton');
// @ts-expect-error invalid argument must be rejected by declarations
interleave('12', 34);
