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
