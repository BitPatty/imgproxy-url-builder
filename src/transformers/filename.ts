import { stringifyOptions } from '../common';

/**
 * The file name
 */
type FileNameOptions = string;

/**
 * Sets the filename for the Content-Disposition header.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#filename for the imgproxy documentation
 *
 * @param name  The filename
 * @returns     The filename param string
 */
const fileName = (name: FileNameOptions): string =>
  stringifyOptions('fn', [name]);

export default fileName;
export { FileNameOptions };
