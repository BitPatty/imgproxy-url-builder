// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#pixelate-idpixelate

import { stringifyOptions } from '../utils';

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
