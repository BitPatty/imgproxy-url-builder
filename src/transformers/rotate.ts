import { stringifyOptions } from '../common';

/**
 * The rotation angle
 */
type RotationOptions = 0 | 90 | 180 | 270;

/**
 * Rotates the image by the specified angle.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#rotate for the imgproxy documentation
 *
 * @param angle  The angle
 * @returns      The rotate param string
 */
const rotate = (angle: RotationOptions): string =>
  stringifyOptions('rot', [angle]);

export default rotate;
export { RotationOptions };
