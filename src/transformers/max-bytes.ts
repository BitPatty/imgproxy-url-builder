// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#max-bytes

import { stringifyOptions } from '../utils';

type MaxBytesOptions = number;

/**
 * Limits the file size to the specified
 * number of bytes
 *
 * Note: only applicable to jpg, webp, heic and tiff
 *
 * @param maxBytes The number of bytes
 *
 * @returns The maxBytes params
 */
const maxBytes = (bytes: MaxBytesOptions): string =>
  stringifyOptions('mb', [bytes]);

export default maxBytes;
export { MaxBytesOptions };
