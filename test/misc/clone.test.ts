/* eslint-disable @typescript-eslint/no-non-null-assertion */

import pb from '../../src';

describe('Clone', () => {
  test('Clones the instance modifiers', () => {
    const res = pb().trim({ threshold: 0 }).blur(10);

    expect(res.modifiers.get('trim')).not.toBeUndefined();
    expect(res.modifiers.get('blur')).not.toBeUndefined();

    const copy = res.clone();

    expect(copy.modifiers.get('trim')).toEqual(res.modifiers.get('trim'));
    expect(copy.modifiers.get('blur')).toEqual(res.modifiers.get('blur'));

    copy.unset('blur');

    expect(copy.modifiers.get('trim')).toEqual(res.modifiers.get('trim'));
    expect(copy.modifiers.get('blur')).toBeUndefined();
    expect(res.modifiers.get('blur')).not.toBeUndefined();
  });
});
