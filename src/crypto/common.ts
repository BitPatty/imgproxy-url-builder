/**
 * The block size used for hashing functions
 */
const BLOCK_SIZE = 512;

/**
 * Converts a word array (Uint32Array) into a byte array (Uint8Array)
 *
 * @param wordArray  The Uint32Array
 * @returns          The Uint8Array
 */
const wordArrayToByteArray = (wordArray: Uint32Array): Uint8Array => {
  const byteArray = new Uint8Array(wordArray.length * 4);
  for (let i = 0; i < wordArray.length; i++) {
    byteArray[i * 4] = (wordArray[i] >>> 24) & 0xff;
    byteArray[i * 4 + 1] = (wordArray[i] >>> 16) & 0xff;
    byteArray[i * 4 + 2] = (wordArray[i] >>> 8) & 0xff;
    byteArray[i * 4 + 3] = wordArray[i] & 0xff;
  }
  return byteArray;
};

/**
 * Converts a byte array (Uint8Array) into a word array (Uint32Array)
 *
 * @param byteArray  The Uint8Array
 * @returns          The Uint32Array
 */
const byteArrayToWordArray = (byteArray: Uint8Array): Uint32Array => {
  const wordArray = new Uint32Array(byteArray.length / 4);
  for (let i = 0; i < wordArray.length; i++) {
    wordArray[i] =
      (byteArray[i * 4] << 24) |
      (byteArray[i * 4 + 1] << 16) |
      (byteArray[i * 4 + 2] << 8) |
      byteArray[i * 4 + 3];
  }
  return wordArray;
};

export { BLOCK_SIZE, wordArrayToByteArray, byteArrayToWordArray };
