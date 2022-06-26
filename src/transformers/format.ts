import { stringifyOptions } from '../common';

/**
 * The file format
 */
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
 * Specifies the resulting image format.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#format}. for the imgproxy documentation
 *
 * @param imageFormat  The target format
 * @returns            The format param string
 */
const format = (imageFormat: FormatOptions): string =>
  stringifyOptions('f', [imageFormat]);

export default format;
export { FormatOptions };
