import { byteArrayToWordArray, BLOCK_SIZE } from './common';

const HASH_VALUES: number[] = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
  0x1f83d9ab, 0x5be0cd19,
];

const ROUND_CONSTANTS = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

/**
 * Rotates the word right by the specified
 * number of bits
 *
 * @param word The word
 * @param cnt The number of rotations
 *
 * @returns The rotated word
 */
const rotr = (word: number, cnt: number): number => {
  return (word >>> cnt) | (word << (32 - cnt));
};

/**
 * Prepares the message for chunking
 *
 * @param bytes The message bytes
 *
 * @returns The padded message (32-bit word array)
 */
const prepareMessage = (bytes: number[]): number[] => {
  const msgLen = bytes.length * 8;

  // Append '1' bit
  bytes.push(0b1000_0000);

  // Add '0'-Padding
  const padding =
    ((BLOCK_SIZE - ((bytes.length * 8 + 64) % BLOCK_SIZE)) % BLOCK_SIZE) / 8 +
    4;

  bytes.push(...new Array(padding).fill(0));

  // Append the length of the original message as 64 bit integer
  for (let i = 3; i >= 0; i--) {
    bytes.push((msgLen >>> (i * 8)) & 0xff);
  }

  // Convert the byte array to a word array
  return byteArrayToWordArray(bytes);
};

const processChunk = (chunk: number[], hv: number[]): number[] => {
  const w: number[] = new Array(64).fill(0);

  // Copy chunk into first 16 words
  for (let i = 0; i < chunk.length; i++) w[i] = chunk[i];

  // Extend the schedule array
  for (let i = 16; i < 64; i++) {
    const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
    const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
    w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
  }

  // Compress the chunk
  let [a, b, c, d, e, f, g, h] = hv;

  for (let i = 0; i < w.length; i++) {
    const s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
    const s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
    const ch = (e & f) ^ (~e & g);
    const maj = (a & b) ^ (a & c) ^ (b & c);

    const tmp1 = h + s1 + ch + ROUND_CONSTANTS[i] + w[i];
    const tmp2 = s0 + maj;

    h = g;
    g = f;
    f = e;
    e = (d + tmp1) >>> 0;
    d = c;
    c = b;
    b = a;
    a = (tmp1 + tmp2) >>> 0;
  }

  return [
    (hv[0] + a) >>> 0,
    (hv[1] + b) >>> 0,
    (hv[2] + c) >>> 0,
    (hv[3] + d) >>> 0,
    (hv[4] + e) >>> 0,
    (hv[5] + f) >>> 0,
    (hv[6] + g) >>> 0,
    (hv[7] + h) >>> 0,
  ];
};

/**
 * Calculates the SHA256 of the specified
 * byte array
 *
 * @param bytes The byte array
 * @returns The SHA256 as 32-bit word array
 */
const sha256 = (bytes: number[]): number[] => {
  const pm = prepareMessage(bytes);
  const chunkCount = (pm.length * 32) / BLOCK_SIZE;
  let hash: number[] = HASH_VALUES;

  for (let cIdx = 0; cIdx < chunkCount; cIdx++) {
    const c: number[] = [];
    for (let i = 0; i < BLOCK_SIZE / 32; i++) {
      c.push(pm.shift() as number);
    }
    hash = processChunk(c, hash);
  }

  return hash;
};

export default sha256;
