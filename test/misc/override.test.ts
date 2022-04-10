/* eslint-disable @typescript-eslint/no-non-null-assertion */

import pb from '../../src';

describe('Override', () => {
  test('Overrides a modifier', () => {
    const res = pb();
    expect(res.modifiers.get('blur')).toBeUndefined();

    res.blur(10);
    expect(res.modifiers.get('blur')).toEqual('bl:10');

    res.blur(5);
    expect(res.modifiers.get('blur')).toEqual('bl:5');
  });
});
