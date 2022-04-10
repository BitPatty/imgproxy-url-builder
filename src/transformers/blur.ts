// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#blur

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
