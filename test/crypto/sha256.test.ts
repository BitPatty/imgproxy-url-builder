import { createHash } from 'crypto';
import { utf8encode } from '../../src/crypto/codec';
import sha256 from '../../src/crypto/sha256';

describe('SHA256', () => {
  test.each(new Array(1000).fill(0).map((_, idx) => idx))(
    'Characters: %i',
    (length) => {
      let res = '';

      for (let i = 0; i < length; i++) {
        res += String.fromCharCode(Math.floor(Math.random() * 0xff));
      }

      const h = createHash('sha256').update(res, 'utf-8').digest('hex');
      const m = sha256(utf8encode(res))
        .map((v) => v.toString(16).padStart(8, '0'))
        .join('');

      expect(m).toBe(h);
    },
  );
});
