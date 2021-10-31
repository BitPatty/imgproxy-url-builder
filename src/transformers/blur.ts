// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#blur

import { stringifyOptions } from '../utils';

type BlurOptions = number;

/**
 * Applies a gaussian blur filter to the image
 *
 * @param sigma The size of the blur mask
 *
 * @returns The blur params
 */
const blur = (sigma: BlurOptions): string => stringifyOptions('bl', [sigma]);

export default blur;
export { BlurOptions };
