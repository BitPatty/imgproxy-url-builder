import { base64urlEncode, utf8encode } from '../../src/crypto/codec.js';

describe('Base 64', () => {
  test.each(new Array(1000).fill(0).map((_, idx) => idx))(
    'Characters: %i',
    (length) => {
      let res = '';

      for (let i = 0; i < length; i++) {
        res += String.fromCharCode(Math.floor(Math.random() * 0xff));
      }

      const h = Buffer.from(res, 'utf-8').toString('base64url');
      const b = base64urlEncode(utf8encode(res));
      expect(b).toBe(h);
    },
  );
});
