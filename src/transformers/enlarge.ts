// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#enlarge

import { stringifyOptions } from '../utils';

/**
 * If true, imgproxy will enlarge the image
 * if it is smaller than the given size.
 *
 * @returns The enlarge params
 */
const enlarge = (): string => stringifyOptions('el', [true]);

export default enlarge;
