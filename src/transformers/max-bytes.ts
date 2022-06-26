import { stringifyOptions } from '../common';

/**
 * The number of bytes
 */
type MaxBytesOptions = number;

/**
 * Limits the file size to the specified number of bytes.
 *
 * Note: only applicable to jpg, webp, heic and tiff.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#max-bytes}.
 *
 * @param maxBytes  The number of bytes
 * @returns         The max bytes param string
 */
const maxBytes = (bytes: MaxBytesOptions): string =>
  stringifyOptions('mb', [bytes]);

export default maxBytes;
export { MaxBytesOptions };
