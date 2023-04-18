import { stringifyOptions } from '../common.js';

/**
 * The file name
 */
type FileNameOptions = string;

/**
 * Sets the filename for the Content-Disposition header.
 *
 * See https://github.com/imgproxy/imgproxy/blob/41b9ebe9277ef3e664e0a842fbc0e912b2640969/docs/generating_the_url.md#filename for the imgproxy documentation
 *
 * @param name           The filename
 * @param base64Encoded  Whether the file name is base64 encoded
 * @returns              The filename param string
 */
const fileName = (name: FileNameOptions, base64Encoded = false): string =>
  stringifyOptions('fn', [name, base64Encoded ? true : undefined]);

export default fileName;
export { FileNameOptions };
