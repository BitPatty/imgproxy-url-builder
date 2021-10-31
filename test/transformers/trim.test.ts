/* eslint-disable @typescript-eslint/no-non-null-assertion */

import pb from '../../src';
import getPixels from 'get-pixels';
import { promisify } from 'util';
import TestImage from '../test-utils/test-image';
import jestGlobals from '../../jest.globals';

const gray = TestImage.probePoints.find((p) => p.name === 'gray')!;
const black = TestImage.probePoints.find((p) => p.name === 'black')!;

describe('Trim', () => {
  test('Trim all sides', async () => {
    const res = pb().trim({ threshold: 0 }).build(jestGlobals.buildOptions);
    await expect(res).toRespondWith(200);

    const pixels = (await promisify(getPixels)(res)) as {
      shape: [number, number];
      data: Uint8Array;
    };

    const [width, height] = pixels.shape;

    const coords = [
      [1, 1],
      [width - 1, 1],
      [width - 1, height - 1],
      [1, height - 1],
    ];

    for (const c of coords) {
      const sIdx = 4 * width * c[1] + 4 * c[0];
      expect(pixels.data).toContainPixel(sIdx, gray);
    }
  });

  test('Trim horizontal/vertical equally', async () => {
    const res = pb()
      .trim({ threshold: 0, equal: { horizontal: true, vertical: true } })
      .build(jestGlobals.buildOptions);
    await expect(res).toRespondWith(200);

    const pixels = (await promisify(getPixels)(res)) as {
      shape: [number, number];
      data: Uint8Array;
    };

    const [width, height] = pixels.shape;

    const coords = [
      [1, 1],
      [width - 1, 1],
      [width - 1, height - 1],
      [1, height - 1],
    ];

    for (const c of coords) {
      const sIdx = 4 * width * c[1] + 4 * c[0];
      expect(pixels.data).toContainPixel(sIdx, c[0] === c[1] ? gray : black);
    }
  });

  test('Trim horizontal equally', async () => {
    const res = pb()
      .trim({ threshold: 0, equal: { horizontal: true } })
      .build(jestGlobals.buildOptions);

    await expect(res).toRespondWith(200);

    const pixels = (await promisify(getPixels)(res)) as {
      shape: [number, number];
      data: Uint8Array;
    };

    const [width, height] = pixels.shape;

    const coords = [
      [1, 1],
      [width - 1, 1],
      [width - 1, height - 1],
      [1, height - 1],
    ];

    for (const c of coords) {
      const sIdx = 4 * width * c[1] + 4 * c[0];
      expect(pixels.data).toContainPixel(sIdx, c[0] === 1 ? gray : black);
    }
  });

  test('Trim vertical equally', async () => {
    const res = pb()
      .trim({ threshold: 0, equal: { vertical: true } })
      .build(jestGlobals.buildOptions);

    await expect(res).toRespondWith(200);

    const pixels = (await promisify(getPixels)(res)) as {
      shape: [number, number];
      data: Uint8Array;
    };

    const [width, height] = pixels.shape;

    const coords = [
      [1, 1],
      [width - 1, 1],
      [width - 1, height - 1],
      [1, height - 1],
    ];

    for (const c of coords) {
      const sIdx = 4 * width * c[1] + 4 * c[0];
      expect(pixels.data).toContainPixel(sIdx, c[1] === 1 ? gray : black);
    }
  });
});
