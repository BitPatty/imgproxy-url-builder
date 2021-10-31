// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#enlarge

import { stringifyOptions } from '../utils';

/**
 * If true, imgproxy will enlarge the image
 * if it is smaller than the given size.
 *
 * @returns The enlarge params
 */
const enlarge = (): string => stringifyOptions('el', [true]);

export default enlarge;
