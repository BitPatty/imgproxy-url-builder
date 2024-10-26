import { stringifyOptions } from '../common.js';

/**
 * The monochrome options
 */
type MonochromeOptions = {
  /**
   * A positive floating-point number between 0 and 1 that defines
   * the intensity of the monochrome effect.
   *
   * When intensity is greater than zero, imgproxy will convert the
   * resulting image to monochrome.
   */
  intensity: number;

  /**
   * A hex-coded value of the color that will be used as a base for the
   * monochrome palette.
   */
  color?: string;
};

/**
 * Converts the image to monochrome.
 *
 * See https://github.com/imgproxy/imgproxy-docs/blob/7d15484aea6a1fae5f1dfd1806b5551a4774658d/docs/usage/processing.mdx?plain=1#L415 for the imgproxy documentation
 *
 * @param options  The monochrome options
 * @returns        The monochrome param string
 */
const monochrome = (options: MonochromeOptions): string =>
  stringifyOptions('mc', [
    options.intensity,
    ...(options.color ? [options.color] : []),
  ]);

export default monochrome;
export { MonochromeOptions };
