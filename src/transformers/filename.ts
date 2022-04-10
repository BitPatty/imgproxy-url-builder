// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#filename

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
