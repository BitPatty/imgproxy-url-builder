// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#rotate

import { stringifyOptions } from '../utils';

type RotationOptions = 90 | 180 | 270;

/**
 * Rotates the image by the specified angle
 *
 * @param angle The angle
 *
 * @returns The rotate params
 */
const rotate = (angle: RotationOptions): string =>
  stringifyOptions('rot', [angle]);

export default rotate;
export { RotationOptions };
