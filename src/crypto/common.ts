/**
 * The block size used for hashing functions
 */
const BLOCK_SIZE = 512;

/**
 * Converts an array of 8-bit bytes to an array
 * of 32-bit words
 *
 * @param arr  The array of 8-bit bytes
 * @returns    The array of 32-bit words
 */
const byteArrayToWordArray = (arr: number[]): number[] => {
  const res = [];
  for (let i = 0; i < arr.length; i += 4) {
    res.push(
      ((arr[i] << 24) | (arr[i + 1] << 16) | (arr[i + 2] << 8) | arr[i + 3]) >>>
        0,
    );
  }
  return res;
};

/**
 * Converts an array of 32-bit words to an array
 * of 8-bit bytes
 *
 * @param arr  The array of 32-bit words
 * @returns    The array of 8-bit words
 */
const wordArrayToByteArray = (arr: number[]): number[] => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(
      (arr[i] >> 24) & 0xff,
      (arr[i] >> 16) & 0xff,
      (arr[i] >> 8) & 0xff,
      arr[i] & 0xff,
    );
  }

  return res;
};

export { BLOCK_SIZE, byteArrayToWordArray, wordArrayToByteArray };
