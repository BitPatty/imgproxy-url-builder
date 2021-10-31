import pb from '../../src';
import axios from 'axios';
import getPixels from 'get-pixels';
import { promisify } from 'util';
import TestImage from '../test-utils/test-image';
import jestGlobals from '../../jest.globals';

describe('Plain / Encoded', () => {
  test('Plain', async () => {
    const res = pb().build(jestGlobals.buildOptions);

    await expect(axios.get(res)).resolves.toHaveProperty('status', 200);
  });

  test('Plain Pixels', async () => {
    const res = pb().build({
      ...jestGlobals.buildOptions,
      plain: true,
    });

    const pixels = (await promisify(getPixels)(res)) as { data: Uint8Array };

    expect(pixels).toHaveProperty(
      'data.length',
      4 * TestImage.width * TestImage.height,
    );

    for (const probePoint of TestImage.probePoints) {
      const sIdx = 4 * TestImage.width * probePoint.y + probePoint.x * 4;

      const r = pixels.data[sIdx];
      const g = pixels.data[sIdx + 1];
      const b = pixels.data[sIdx + 2];
      const a = pixels.data[sIdx + 3];

      expect(r).toBe(probePoint.r);
      expect(g).toBe(probePoint.g);
      expect(b).toBe(probePoint.b);
      expect(a).toBe(probePoint.a);
    }
  });

  test('Encoded', async () => {
    const res = pb().build(jestGlobals.buildOptions);

    await expect(axios.get(res)).resolves.toHaveProperty('status', 200);

    const pixels = (await promisify(getPixels)(res)) as {
      data: Uint8Array;
    };

    expect(pixels).toHaveProperty(
      'data.length',
      4 * TestImage.width * TestImage.height,
    );

    for (const probePoint of TestImage.probePoints) {
      const sIdx = 4 * TestImage.width * probePoint.y + probePoint.x * 4;

      const r = pixels.data[sIdx];
      const g = pixels.data[sIdx + 1];
      const b = pixels.data[sIdx + 2];
      const a = pixels.data[sIdx + 3];

      expect(r).toBe(probePoint.r);
      expect(g).toBe(probePoint.g);
      expect(b).toBe(probePoint.b);
      expect(a).toBe(probePoint.a);
    }
  });
});
