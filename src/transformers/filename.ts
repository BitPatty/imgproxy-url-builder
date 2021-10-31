// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#filename

import { stringifyOptions } from '../utils';

type FileNameOptions = string;

/**
 * Sets the filename for the Content-Disposition header
 *
 * @param name The filename
 *
 * @returns The filename params
 */
const fileName = (name: FileNameOptions): string =>
  stringifyOptions('fn', [name]);

export default fileName;
export { FileNameOptions };
