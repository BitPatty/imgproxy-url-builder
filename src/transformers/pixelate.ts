// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#pixelate

import { stringifyOptions } from '../utils';

/**
 * The size of a pixel
 */
type PixelateOptions = number;

/**
 * When set, imgproxy will apply the pixelate filter to the resulting image.
 *
 * @param pixelSize The size of a pixel
 *
 * @returns The pixelate params
 */
const pixelate = (pixelSize: PixelateOptions): string =>
  stringifyOptions('pix', [pixelSize]);

export default pixelate;
export { PixelateOptions };
