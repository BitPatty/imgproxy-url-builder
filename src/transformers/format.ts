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
