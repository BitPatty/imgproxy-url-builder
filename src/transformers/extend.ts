// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#extend

import { stringifyOptions } from '../utils';

/**
 * If true, imgproxy will extend the image
 * if it is smaller than the given size.
 *
 * @returns The extend params
 */
const extend = (): string => stringifyOptions('ex', [true]);

export default extend;
