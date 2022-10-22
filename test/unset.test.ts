/* eslint-disable @typescript-eslint/no-non-null-assertion */

import pb from '../src/index.js';

describe('Unset', () => {
  test('Unsets the specified modifier', () => {
    const res = pb().trim({ threshold: 0 }).blur(10);

    expect(res.modifiers.get('trim')).not.toBeUndefined();
    expect(res.modifiers.get('blur')).not.toBeUndefined();

    res.unset('trim');

    expect(res.modifiers.get('trim')).toBeUndefined();
    expect(res.modifiers.get('blur')).not.toBeUndefined();

    res.unset('blur');

    expect(res.modifiers.get('trim')).toBeUndefined();
    expect(res.modifiers.get('blur')).toBeUndefined();
  });
});
