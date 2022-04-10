// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#format

import { stringifyOptions } from '../utils';

type FormatOptions =
  | 'png'
  | 'jpg'
  | 'webp'
  | 'avif'
  | 'gif'
  | 'ico'
  | 'heic'
  | 'bmp'
  | 'tiff';

/**
 * Specifies the resulting image format
 *
 * @param imageFormat The target format
 *
 * @returns The format params
 */
const format = (imageFormat: FormatOptions): string =>
  stringifyOptions('f', [imageFormat]);

export default format;
export { FormatOptions };
