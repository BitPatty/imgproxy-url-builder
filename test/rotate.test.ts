import pb from '../src';
import axios from 'axios';
import { RotationOptions } from '../src/transformers/rotate';

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
