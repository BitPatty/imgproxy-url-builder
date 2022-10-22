import { stringifyOptions } from '../common.js';

/**
 * Returns a raw unprocessed and unchecked source image
 *
 * See https://github.com/imgproxy/imgproxy/blob/f95f57bb4df35c69ae2257958006ef54b1c1d8c7/docs/generating_the_url.md#raw for the imgproxy documentation
 *
 * @returns           The raw param string
 */
const raw = (): string => stringifyOptions('raw', [true]);

export default raw;
