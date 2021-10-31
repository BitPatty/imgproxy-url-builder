import pb from '../../src';
import axios from 'axios';
import getPixels from 'get-pixels';
import { promisify } from 'util';
import TestImage from '../test-utils/test-image';
import { RotationOptions } from '../../src/transformers/rotate';

const key =
  '91bdcda48ce22cd7d8d3a0eda930b3db1762bc1cba5dc13542e723b68fe55d6f9d18199cbe35191a45faf22593405cad0fe76ffec67d24f8aee861ac8fe44d96';
const salt =
  '72456c286761260f320391fe500fcec53755958dabd288867a6db072e1bc1dbd84b15079838a83a715edc1ecad50c3ce91dd8fdef6f981816fa274f91d8ecf06';

describe('Rotate', () => {
  test.each([90, 180, 270])('Valid Rotation: %i', async (angle) => {
    const res = pb()
      .rotate(angle as RotationOptions)
      .build({
        path: 's3://test-bucket/test-image.png',
        baseUrl: 'http://localhost:4000',
        signature: {
          key,
          salt,
        },
      });

    await expect(axios.head(res)).resolves.toHaveProperty('status', 200);

    const pixels = (await promisify(getPixels)(res)) as {
      data: Uint8Array;
    };

    expect(pixels).toHaveProperty(
      'data.length',
      4 * TestImage.width * TestImage.height,
    );

    for (const probePoint of TestImage.probePoints) {
      const sIdx = (() => {
        switch (angle) {
          case 90:
            return (
              4 * TestImage.height * probePoint.x +
              (TestImage.height - probePoint.y) * 4
            );
          case 180:
            return (
              4 * TestImage.width * (TestImage.height - probePoint.y) +
              (TestImage.width - probePoint.x) * 4
            );
          case 270:
            return (
              4 * TestImage.height * (TestImage.width - probePoint.x) +
              probePoint.y * 4
            );
          default:
            throw new Error('Invalid angle');
        }
      })();

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

  test.each([1, 123, 345])('Invalid Rotation: %i', async (angle) => {
    const res = pb()
      .rotate(angle as RotationOptions)
      .build({
        path: 's3://test-bucket/test-image.png',
        baseUrl: 'http://localhost:4000',
        signature: {
          key,
          salt,
        },
      });

    await expect(axios.get(res)).rejects.toHaveProperty(
      'response.data',
      'Invalid URL',
    );
  });
});
