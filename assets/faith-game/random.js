const UINT32_RANGE = 0x100000000;

/** Uniform integer in [0,max). Reject the small remainder to avoid modulo bias. */
export function randomIndex(max, source = globalThis.crypto) {
  if (!Number.isInteger(max) || max < 1 || max > UINT32_RANGE) {
    throw new RangeError('Random range must be an integer from 1 to 2^32.');
  }
  if (typeof source?.getRandomValues !== 'function') {
    throw new Error('Secure browser randomness is unavailable.');
  }
  const limit = UINT32_RANGE - (UINT32_RANGE % max);
  const word = new Uint32Array(1);
  do { source.getRandomValues(word); } while (word[0] >= limit);
  return word[0] % max;
}

/** One fair six-sided die; repeated values are allowed. */
export function randomDie(source = globalThis.crypto) {
  return randomIndex(6, source) + 1;
}

/** Fisher–Yates shuffle across the entire list, preserving the input list. */
export function shuffle(list, source = globalThis.crypto) {
  if (!Array.isArray(list)) throw new TypeError('Shuffle needs an array.');
  const result = list.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1, source);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
