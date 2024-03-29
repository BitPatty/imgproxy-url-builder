import { stringifyOptions } from '../common.js';

/**
 * The blur radius
 */
type BlurOptions = number;

/**
 * Applies a gaussian blur filter to the image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#blur for the imgproxy documentation
 *
 * @param sigma  The size of the blur mask
 * @returns      The blur param string
 */
const blur = (sigma: BlurOptions): string => stringifyOptions('bl', [sigma]);

export default blur;
export { BlurOptions };
