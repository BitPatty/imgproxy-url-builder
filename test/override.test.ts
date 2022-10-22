import pb from '../src/index.js';

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
