import { stringifyOptions } from '../common.js';

/**
 * The number of bytes
 */
type MaxBytesOptions = number;

/**
 * Limits the file size to the specified number of bytes.
 *
 * Note: only applicable to jpg, webp, heic and tiff.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#max-bytes for the imgproxy documentation
 *
 * @param maxBytes  The number of bytes
 * @returns         The max bytes param string
 */
const maxBytes = (bytes: MaxBytesOptions): string =>
  stringifyOptions('mb', [bytes]);

export default maxBytes;
export { MaxBytesOptions };
