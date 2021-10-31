/**
 * Masks the lowest 6 bits of the specified number
 *
 * @param num The number
 *
 * @returns The lowest 6 bits
 */
const low6 = (num: number): number => {
  return num & 0b0011_1111;
};

/**
 * UTF-8 encodes the specified message
 *
 * @param msg The message
 *
 * @returns The encoded message as array of bytes
 */
const utf8encode = (msg: string): number[] => {
  const arr: number[] = [];

  for (let i = 0; i < msg.length; i++) {
    const charCode = msg.charCodeAt(i);

    // U+0000 to U+007F
    if (charCode < 0x80) {
      // Byte 1 0xb0xxx_xxxx
      arr.push(charCode);
    }

    // U+0080 to U+07FF
    else if (charCode < 0x800) {
      // Byte 1 0b110x_xxxx
      arr.push(0b1100_0000 | (charCode >>> 6));

      // Byte 2 0b10xx_xxxx
      arr.push(0b1000_0000 | low6(charCode));
    }

    // U+0800 to U+10000
    // | 0b1110_xxxx | 0b10xx_xxxx | 0b10xx_xxxx |
    // Excluding UTF-16 surrogate range U+D800 to U+DFFF
    else if (charCode < 0x10000 && (charCode < 0xd800 || charCode >= 0xe000)) {
      // Byte 1 0b1110_xxxx
      arr.push(0b1110_0000 | ((charCode >>> 12) & 0b1111));

      // Byte 2 0b10xx_xxxx
      arr.push(0b1000_0000 | low6(charCode >>> 6));

      // Byte 3 0b10xx_xxxx
      arr.push(0b1000_0000 | low6(charCode));
    }

    // Surrogates
    else if (charCode < 0x10000 && i + 1 < msg.length) {
      // Surrogates take up two bytes
      i++;

      // Reverse the UTF-16 encoding
      const highSurrogate = (charCode & 0x3ff) << 10;
      const lowSurrogate = msg.charCodeAt(i) & 0x3ff;
      const surrogate = 0x10000 + (highSurrogate | lowSurrogate);

      // Byte 1 0b1111_0xxx
      arr.push(0b1111_0000 | ((surrogate >>> 18) & 0b0111));

      // Byte 2 0b10xx_xxxx
      arr.push(0b1000_0000 | low6(surrogate >>> 12));

      // Byte 3 0b10xx_xxxx
      arr.push(0b1000_0000 | low6(surrogate >>> 6));

      // Byte 4 0b10xx_xxxx
      arr.push(0b1000_0000 | low6(surrogate));
    }
  }

  return arr;
};

/**
 * Parses a hex character and returns its numeric value
 *
 * @param char The hex char
 *
 * @returns The numeric value
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
 * @param str The string
 *
 * @returns The array of parsed bytes
 */
const parseHexString = (str: string): number[] => {
  const res = [];

  for (let i = 0; i < str.length; i += 2) {
    res.push(0);
    res[res.length - 1] |= parseHexChar(str[i]) << 4;

    if (i + 1 < str.length) res[res.length - 1] |= parseHexChar(str[i + 1]);
  }

  return res;
};

/**
 * Encodes the lowest 6 bits of the specified
 * number to its base64url representation
 *
 * @param b The number
 *
 * @returns The base64url encoded bits
 */
const base64urlChar = (b: number): string => {
  const r = (b & 0b0011_1111) >>> 0;

  // Uppercase letters
  if (r <= 25) return String.fromCharCode(65 + r);

  // Numbers
  if (r <= 51) return String.fromCharCode(97 + r - 26);

  // Lowercase letters
  if (r <= 61) return String.fromCharCode(48 + r - 52);

  // Plus (+) in Base64 is replaced with '-'
  // in a Base64 URL
  if (r === 62) return '-';

  // Slash (/) in Base64 is replaced with '_'
  // in a Base64 URL
  return '_';
};

/**
 * Encodes the specified array of 32-bit words to
 * its base64url representation
 *
 * @param words The words
 *
 * @returns The base64url string
 */
const base64urlEncode = (words: number[]): string => {
  let res = '';

  for (let i = 0; i < words.length; i += 3) {
    // Iterate through 3-word packets to have
    // a multiple of 6 bits
    for (let j = 0, carry = 0; j < 3; j++) {
      if (i + j >= words.length) {
        // If there are no words left return the result
        if (carry !== 0) res += base64urlChar(carry);
        return res;
      }

      const p = words[i + j];

      // Encode the current word
      for (let k = 0; k < (j == 2 ? 6 : 5); k++) {
        res += base64urlChar(carry | (p >>> (26 + j * 2 - k * 6)));
        carry = 0;
      }

      // Update the carry
      if (j === 0) carry = (p & 0b0_0011) << 4;
      else if (j === 1) carry = (p & 0b0_1111) << 2;
    }
  }

  return res;
};

export { utf8encode, base64urlEncode, parseHexString };
