import pb from '../../src';
import getPixels from 'get-pixels';
import { promisify } from 'util';
import TestImage from '../test-utils/test-image';
import jestGlobals from '../../jest.globals';

describe('Plain / Encoded', () => {
  test('Plain', async () => {
    const res = pb().build(jestGlobals.buildOptions);
    await expect(res).toRespondWith(200);
  });

  test('Plain Pixels', async () => {
    const res = pb().build({
      ...jestGlobals.buildOptions,
      plain: true,
    });
    await expect(res).toRespondWith(200);
    const pixels = (await promisify(getPixels)(res)) as { data: Uint8Array };

    expect(pixels).toHaveProperty(
      'data.length',
      4 * TestImage.width * TestImage.height,
    );

    for (const probePoint of TestImage.probePoints) {
      const sIdx = 4 * TestImage.width * probePoint.y + probePoint.x * 4;
      expect(pixels.data).toContainPixel(sIdx, probePoint);
    }
  });

  test('Encoded', async () => {
    const res = pb().build(jestGlobals.buildOptions);
    await expect(res).toRespondWith(200);

    const pixels = (await promisify(getPixels)(res)) as {
      data: Uint8Array;
    };

    expect(pixels).toHaveProperty(
      'data.length',
      4 * TestImage.width * TestImage.height,
    );

    for (const probePoint of TestImage.probePoints) {
      const sIdx = 4 * TestImage.width * probePoint.y + probePoint.x * 4;
      expect(pixels.data).toContainPixel(sIdx, probePoint);
    }
  });
});
