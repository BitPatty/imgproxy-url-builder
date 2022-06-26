import { stringifyOptions } from '../common';

/**
 * The size of a pixel
 */
type PixelateOptions = number;

/**
 * When set, imgproxy will apply the pixelate filter to the resulting image.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#pixelate}.
 *
 * @param pixelSize  The size of a pixel
 * @returns          The pixelate param string
 */
const pixelate = (pixelSize: PixelateOptions): string =>
  stringifyOptions('pix', [pixelSize]);

export default pixelate;
export { PixelateOptions };
