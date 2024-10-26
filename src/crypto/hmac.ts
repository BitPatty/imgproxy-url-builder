import { sha256 } from './sha256.js';
import { BLOCK_SIZE, wordArrayToByteArray } from './common.js';

/**
 * Pads the specified byte-array to the block size.
 *
 * @param arr  The Uint8Array
 * @param val  The value to pad the array with
 * @returns    The padded Uint8Array
 */
const blockPad = (arr: Uint8Array, val = 0): Uint8Array => {
  const paddingSize = BLOCK_SIZE / 8 - arr.length;
  const paddedArray = new Uint8Array(arr.length + paddingSize);
  paddedArray.set(arr);
  if (val !== 0) {
    paddedArray.fill(val, arr.length);
  }
  return paddedArray;
};

/**
 * Gets the block-padded key.
 * If the key is longer than the block size, it is hashed using SHA-256.
 * If the key is shorter, it is padded to the block size.
 *
 * @param keyBytes  The key as a Uint8Array
 * @returns         The block-padded key
 */
const getBlockKey = (keyBytes: Uint8Array): Uint8Array => {
  // If key is exactly BLOCK_SIZE (512 bits), return as is.
  if (keyBytes.length === BLOCK_SIZE / 8) return keyBytes;

  // If key is longer than BLOCK_SIZE, hash it and use that as the key.
  if (keyBytes.length > BLOCK_SIZE / 8)
    return blockPad(wordArrayToByteArray(sha256(keyBytes)));

  // Otherwise, pad the key to the block size.
  return blockPad(keyBytes);
};

/**
 * Creates the HMAC of the specified message.
 * Combines the key and message using inner and outer padding and returns the final HMAC as a Uint32Array.
 *
 * @param key      The key (Uint8Array)
 * @param message  The message (Uint8Array)
 * @returns        The HMAC as a Uint32Array
 */
const hmac = (key: Uint8Array, message: Uint8Array): Uint32Array => {
  const bK = getBlockKey(key); // Get block-padded key

  // Initialize inner and outer padding
  const oPad = new Uint8Array(bK.length);
  const iPad = new Uint8Array(bK.length);

  // XOR the key with 0x36 for iPad and 0x5c for oPad
  for (let i = 0; i < bK.length; i++) {
    oPad[i] = bK[i] ^ 0x5c;
    iPad[i] = bK[i] ^ 0x36;
  }

  // Perform inner hash: H( K ⊕ ipad || message )
  const innerHash = sha256(new Uint8Array([...iPad, ...message]));

  // Perform outer hash: H( K ⊕ opad || innerHash )
  return sha256(new Uint8Array([...oPad, ...wordArrayToByteArray(innerHash)]));
};

export default hmac;
