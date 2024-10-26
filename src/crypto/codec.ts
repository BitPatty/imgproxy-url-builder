/**
 * Masks the lowest 6 bits of the specified number
 *
 * @param num  The number
 * @returns    The lowest 6 bits
 */
const low6 = (num: number): number => num & 0b0011_1111;

/**
 * UTF-8 encodes the specified message
 *
 * @param msg  The message
 * @returns    The encoded message as a Uint8Array of bytes
 */
const utf8encode = (msg: string): Uint8Array => {
  const encoder = new TextEncoder();
  return encoder.encode(msg);
};

/**
 * Parses a hex character and returns its numeric value
 *
 * @param char  The hex char
 * @returns     The numeric value
 */
const parseHexChar = (char: string): number => {
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char))
    return +char;
  switch (char.toUpperCase()) {
    case 'A':
      return 0xa;
    case 'B':
      return 0xb;
    case 'C':
      return 0xc;
    case 'D':
      return 0xd;
    case 'E':
      return 0xe;
    case 'F':
      return 0xf;
  }

  throw new Error(`Invalid hex char: ${char}`);
};

/**
 * Parses a string containing hex characters
 * into an array of bytes
 *
 * @param str  The string
 * @returns    The Uint8Array of parsed bytes
 */
const parseHexString = (str: string): Uint8Array => {
  const res = new Uint8Array(Math.ceil(str.length / 2));

  for (let i = 0; i < str.length; i += 2) {
    res[i / 2] = (parseHexChar(str[i]) << 4) | parseHexChar(str[i + 1] || '0');
  }

  return res;
};

/**
 * Encodes the lowest 6 bits of the specified
 * number to its base64url representation
 *
 * @param b  The number
 * @returns  The base64url encoded character
 */
const base64urlChar = (b: number): string => {
  const r = low6(b);

  // Uppercase letters
  if (r <= 25) return String.fromCharCode(65 + r);
  // Lowercase letters
  if (r <= 51) return String.fromCharCode(97 + r - 26);
  // Numbers
  if (r <= 61) return String.fromCharCode(48 + r - 52);
  // Base64 URL replacements for '+' and '/'
  return r === 62 ? '-' : '_';
};

/**
 * Encodes the specified array of bytes to
 * its base64url representation
 *
 * @param bytes  The Uint8Array of bytes
 * @returns      The base64url string
 */
const base64urlEncode = (bytes: Uint8Array): string => {
  let res = '';

  for (let i = 0; i < bytes.length; i += 3) {
    // First byte
    res += base64urlChar(bytes[i] >>> 2);
    // Second byte
    res += base64urlChar(((bytes[i] & 0b11) << 4) | (bytes[i + 1] >>> 4));
    // Handle cases where fewer than 3 bytes are available
    if (i + 1 < bytes.length) {
      res += base64urlChar(
        ((bytes[i + 1] & 0b1111) << 2) | (bytes[i + 2] >>> 6),
      );
      if (i + 2 < bytes.length) {
        res += base64urlChar(bytes[i + 2] & 0b0011_1111);
      }
    }
  }

  return res;
};

export { utf8encode, base64urlEncode, parseHexString };
