/* eslint-disable @typescript-eslint/no-non-null-assertion */

import pb, { chain } from '../src/index.js';

describe('Chain', () => {
  test('Chains A Modifier', () => {
    expect(chain([pb().blur(10), pb().blur(10)])).toEqual('bl:10/-/bl:10');
  });

  test('Chains Multiple Modifiers', () => {
    expect(
      chain([pb().blur(10).rotate(90), pb().blur(10).rotate(270)]),
    ).toEqual('bl:10/rot:90/-/bl:10/rot:270');
  });

  test('Chains More Than 2 Builders', () => {
    expect(
      chain([
        pb().blur(10).rotate(90),
        pb().blur(10).rotate(270),
        pb().autoRotate(),
      ]),
    ).toEqual('bl:10/rot:90/-/bl:10/rot:270/-/ar:true');
  });

  test('Appends Image Path', () => {
    expect(
      chain({
        buildOptions: { path: 'test.png', plain: true },
        builders: [pb().blur(10), pb().autoRotate()],
      }),
    ).toEqual('/-/bl:10/-/ar:true/plain/test.png');
  });

  test('Appends Encoded Image Path', () => {
    expect(
      chain({
        buildOptions: { path: 'test.png' },
        builders: [pb().blur(10), pb().autoRotate()],
      }),
    ).toEqual('/-/bl:10/-/ar:true/dGVzdC5wbmc');
  });

  test('Calculates Signature', () => {
    expect(
      chain({
        buildOptions: {
          path: 'test.png',
          signature: {
            key: '73757065722d7365637265742d6b6579', // super-secret-key
            salt: '73757065722d7365637265742d73616c74', // super-secret-salt
          },
        },
        builders: [pb().blur(10), pb().autoRotate()],
      }),
    ).toEqual(
      '/8q2Ey2URdWizZb8PgAUKMO6C2tD4aXOa2IbCMV9pTKA/bl:10/-/ar:true/dGVzdC5wbmc',
    );
  });

  test('Add Extension from format (encoded)', () => {
    expect(
      pb().format('webp').build({
        path: 'test.png',
        addExtension: true,
      }),
    ).toEqual('/-/f:webp/dGVzdC5wbmc.webp');
  });

  test('Add Extension from format (plain)', () => {
    expect(
      pb().format('webp').build({
        path: 'test.png',
        addExtension: true,
        plain: true,
      }),
    ).toEqual('/-/f:webp/plain/test.png@webp');
  });

  test('Do not Add Extension if no format is set', () => {
    expect(
      pb().build({
        path: 'test.png',
        addExtension: true,
      }),
    ).toEqual('/-/dGVzdC5wbmc');
  });

  test('Do not Add Extension if not requested', () => {
    expect(
      pb().format('webp').build({
        path: 'test.png',
      }),
    ).toEqual('/-/f:webp/dGVzdC5wbmc');
  });
});
