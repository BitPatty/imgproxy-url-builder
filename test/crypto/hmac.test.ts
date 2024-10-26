import { createHmac } from 'crypto';
import { utf8encode } from '../../src/crypto/codec.js';
import hmac from '../../src/crypto/hmac.js';
import { wordArrayToByteArray } from '../../src/crypto/common.js';

describe('HMAC', () => {
  const compareHmac = (key: string, message: string) => {
    const expected = createHmac('sha256', Buffer.from(key, 'utf-8'))
      .update(message)
      .digest('hex');
    const actualHmac = hmac(utf8encode(key), utf8encode(message));
    const actual = Array.from(wordArrayToByteArray(actualHmac))
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('');

    expect(actual).toBe(expected);
  };

  // Test for empty key and message
  test('HMAC with empty key and empty message', () => {
    compareHmac('', '');
  });

  // Test for simple key and message
  test('HMAC with simple key and message', () => {
    compareHmac('secret', 'message');
  });

  // Test for long key
  test('HMAC with long key', () => {
    compareHmac('A'.repeat(500), 'message');
  });

  // Test for long message
  test('HMAC with long message', () => {
    compareHmac('secret', 'A'.repeat(1000));
  });

  // Test for special characters in key and message
  test('HMAC with special characters', () => {
    compareHmac('~!@#$%^&*()_+-={}[]:";\'<>?,./|\\', 'Special chars test');
  });

  // Test for UTF-8 characters
  test('HMAC with UTF-8 characters', () => {
    compareHmac('秘密', 'こんにちは世界'); // "secret" and "Hello World" in Japanese
  });

  // Test for binary data in the message
  test('HMAC with binary data in the message', () => {
    const binaryData = new Uint8Array([0, 255, 128, 64, 32, 16, 8]);
    compareHmac('secret', Buffer.from(binaryData).toString('binary'));
  });

  // Test for a key shorter than the block size
  test('HMAC with key shorter than block size', () => {
    compareHmac('short', 'message');
  });

  // Test for a key exactly equal to block size (512 bits / 64 bytes for SHA-256)
  test('HMAC with key equal to block size', () => {
    compareHmac('K'.repeat(64), 'message');
  });

  // Test for a key longer than block size
  test('HMAC with key longer than block size', () => {
    compareHmac('L'.repeat(100), 'message');
  });

  // Test for very short message (1 byte)
  test('HMAC with very short message', () => {
    compareHmac('secret', 'a');
  });

  // Test for very large message
  test('HMAC with very large message', () => {
    compareHmac('secret', 'A'.repeat(10000));
  });
});
