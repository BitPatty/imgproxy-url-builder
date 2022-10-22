import sha256 from './sha256.js';
import { BLOCK_SIZE, wordArrayToByteArray } from './common.js';

/**
 * Pads the specified byte-array to the block size
 *
 * @param arr  The array
 * @param val  The value to pad the array with
 * @returns    The padded array
 */
const blockPad = (arr: number[], val = 0): number[] => {
  return [
    ...arr,
    ...new Array<number>((BLOCK_SIZE - arr.length * 8) / 8).fill(val),
  ];
};

/**
 * Gets the block-padded key
 *
 * @param keyBytes  The key bytes
 * @returns         The padded key
 */
const getBlockKey = (keyBytes: number[]): number[] => {
  if (keyBytes.length * 8 === BLOCK_SIZE) return keyBytes;
  if (keyBytes.length * 8 > BLOCK_SIZE) return blockPad(sha256(keyBytes));
  return blockPad(keyBytes);
};

/**
 * Creates the HMAC of the specified message
 *
 * @param key      The key (byte-array)
 * @param message  The message (byte-array)
 * @returns        The HMAC as array of 32 bit words
 */
const hmac = (key: number[], message: number[]): number[] => {
  const bK = getBlockKey(key);

  const oPad = bK.map((v) => v ^ 0x5c);
  const iPad = bK.map((v) => v ^ 0x36);

  return sha256([
    ...oPad,
    ...wordArrayToByteArray(sha256([...iPad, ...message])),
  ]);
};

export default hmac;
