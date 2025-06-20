/* eslint-disable jest/expect-expect */

import { createHash } from 'crypto';
import { utf8encode } from '../../src/crypto/codec.js';
import { sha256 } from '../../src/crypto/sha256.js';
import { wordArrayToByteArray } from '../../src/crypto/common.js';

describe('SHA256', () => {
  const expectSameSHA256 = (message: string): void => {
    const expected = createHash('sha256')
      .update(message, 'utf-8')
      .digest('hex');
    const actualSha256 = sha256(utf8encode(message));
    const actual = Array.from(wordArrayToByteArray(actualSha256))
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('');

    expect(actual).toBe(expected);
  };

  // Empty string case
  test('SHA256 with empty string', () => {
    expectSameSHA256('');
  });

  // Simple message case
  test('SHA256 with simple message', () => {
    expectSameSHA256('Hello World');
  });

  // Long message case
  test('SHA256 with long message', () => {
    expectSameSHA256('A'.repeat(1000));
  });

  // Special characters case
  test('SHA256 with special characters', () => {
    expectSameSHA256('~!@#$%^&*()_+-={}[]:";\'<>?,./|\\');
  });

  // UTF-8 characters case
  test('SHA256 with UTF-8 characters', () => {
    expectSameSHA256('こんにちは世界'); // "Hello World" in Japanese
  });

  // Binary data case
  test('SHA256 with binary data', () => {
    const binaryData = new Uint8Array([0, 255, 128, 64, 32, 16, 8]);
    expectSameSHA256(Buffer.from(binaryData).toString('binary'));
  });

  // Repeated pattern case
  test('SHA256 with repeated pattern', () => {
    expectSameSHA256('abcabcabcabc');
  });

  // Very short message (1 character)
  test('SHA256 with very short message', () => {
    expectSameSHA256('a');
  });

  // Extremely long message
  test('SHA256 with extremely long message', () => {
    expectSameSHA256('A'.repeat(100000));
  });

  // Edge case with numeric string
  test('SHA256 with numeric string', () => {
    expectSameSHA256('1234567890');
  });

  // Edge case with whitespace
  test('SHA256 with whitespace characters', () => {
    expectSameSHA256('   \n\t ');
  });

  // Edge case with null characters
  test('SHA256 with null characters', () => {
    expectSameSHA256('\0\0\0');
  });
});
