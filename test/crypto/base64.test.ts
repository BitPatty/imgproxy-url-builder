import { base64urlEncode, utf8encode } from '../../src/crypto/codec.js';

const allBytes = new Array(256).fill(0).map((_, idx) => idx);

describe('Base64 URL Encoder', () => {
  // Test conversion of all possible byte values to Base64 URL
  test.each(allBytes.map((b) => [b]))('Converts byte %i to Base64 URL', (b) => {
    const buff = Buffer.alloc(1).fill(b);
    expect(base64urlEncode(new Uint8Array([b]))).toEqual(
      buff.toString('base64url'),
    );
  });

  // Test encoding an empty string
  test('Converts empty string to Base64 URL', () => {
    expect(base64urlEncode(utf8encode(''))).toEqual(
      Buffer.from('', 'utf-8').toString('base64url'),
    );
  });

  // Test encoding ASCII characters
  test('Converts ASCII string to Base64 URL', () => {
    const str = 'Hello World';
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding special characters
  test('Converts special characters to Base64 URL', () => {
    const str = '~!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding UTF-8 characters
  test('Converts UTF-8 string to Base64 URL', () => {
    const str = '你好，世界'; // "Hello, World" in Chinese
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding long strings
  test('Converts long string to Base64 URL', () => {
    const str = 'A'.repeat(1000);
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding binary data
  test('Converts binary data to Base64 URL', () => {
    const binaryData = new Uint8Array([0, 255, 128, 64, 32, 16, 8]);
    expect(base64urlEncode(binaryData)).toEqual(
      Buffer.from(binaryData).toString('base64url'),
    );
  });

  // Test encoding a very short string (1 character)
  test('Converts very short string to Base64 URL', () => {
    const str = 'a';
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding a string that results in padding
  test('Converts string requiring padding to Base64 URL', () => {
    const str = 'AB'; // Should result in padding
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding a long binary data input
  test('Converts long binary data to Base64 URL', () => {
    const binaryData = new Uint8Array(1000).fill(1);
    expect(base64urlEncode(binaryData)).toEqual(
      Buffer.from(binaryData).toString('base64url'),
    );
  });

  // Test encoding a string with null characters
  test('Converts string with null characters to Base64 URL', () => {
    const str = '\0\0\0';
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding numeric characters
  test('Converts numeric string to Base64 URL', () => {
    const str = '1234567890';
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });

  // Test encoding whitespace characters
  test('Converts whitespace string to Base64 URL', () => {
    const str = '   \n\t ';
    expect(base64urlEncode(utf8encode(str))).toEqual(
      Buffer.from(str, 'utf-8').toString('base64url'),
    );
  });
});
