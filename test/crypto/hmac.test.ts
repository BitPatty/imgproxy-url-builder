import { createHmac } from 'crypto';
import { utf8encode } from '../../src/crypto/codec.js';
import hmac from '../../src/crypto/hmac.js';

describe('HMAC', () => {
  test.each(new Array(1000).fill(0).map((_, idx) => idx))(
    'Characters: %i',
    (length) => {
      let res = '';

      for (let i = 0; i < length; i++) {
        res += String.fromCharCode(Math.floor(Math.random() * 0xff));
      }

      const h = createHmac('sha256', 'secret')
        .update(res, 'utf-8')
        .digest('hex');

      const b = hmac(utf8encode('secret'), utf8encode(res))
        .map((v) => v.toString(16).padStart(8, '0'))
        .join('');

      expect(b).toBe(h);
    },
  );
});
