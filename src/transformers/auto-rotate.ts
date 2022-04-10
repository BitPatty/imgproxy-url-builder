// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#auto-rotate

import { stringifyOptions } from '../utils';

/**
 * Automatically rotates the image based on
 * the EXIF orientation parameter
 *
 * @returns The auto-rotate params
 */
const autoRotate = (): string => stringifyOptions('ar', [true]);

export default autoRotate;
