// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#max-bytes

import { stringifyOptions } from '../utils';

type MaxBytesOptions = number;

/**
 * Specifies the resulting image format
 *
 * Note: only applicable to jpg, webp, heic and tiff
 *
 * @param maxBytes The max bytes
 *
 * @returns The format params
 */
const maxBytes = (bytes: MaxBytesOptions): string =>
  stringifyOptions('mb', [bytes]);

export default maxBytes;
export { MaxBytesOptions };
