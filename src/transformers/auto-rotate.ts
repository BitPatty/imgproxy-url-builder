// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#auto-rotate

import { stringifyOptions } from '../utils';

/**
 * Automatically rotates the image based on
 * the EXIF orientation parameter
 *
 * @returns The auto-rotate params
 */
const autoRotate = (): string => stringifyOptions('ar', [true]);

export default autoRotate;
