import pb from '../../src';
import axios from 'axios';
import getPixels from 'get-pixels';
import { promisify } from 'util';
import TestImage from '../test-utils/test-image';

const key =
  '91bdcda48ce22cd7d8d3a0eda930b3db1762bc1cba5dc13542e723b68fe55d6f9d18199cbe35191a45faf22593405cad0fe76ffec67d24f8aee861ac8fe44d96';
const salt =
  '72456c286761260f320391fe500fcec53755958dabd288867a6db072e1bc1dbd84b15079838a83a715edc1ecad50c3ce91dd8fdef6f981816fa274f91d8ecf06';

describe('Plain / Encoded', () => {
  test('Plain', async () => {
    const res = pb().build({
      path: 's3://test-bucket/test-image.png',
      baseUrl: 'http://localhost:4000',
      plain: true,
      signature: {
        key,
        salt,
      },
    });

    await expect(axios.get(res)).resolves.toHaveProperty('status', 200);
  });

  test('Plain Pixels', async () => {
    const res = pb().build({
      path: 's3://test-bucket/test-image.png',
      baseUrl: 'http://localhost:4000',
      plain: true,
      signature: {
        key,
        salt,
      },
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
    const res = pb().build({
      path: 's3://test-bucket/test-image.png',
      baseUrl: 'http://localhost:4000',
      plain: false,
      signature: {
        key,
        salt,
      },
    });

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
