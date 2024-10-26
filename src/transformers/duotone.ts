import { stringifyOptions } from '../common';

type DuotoneOptions = {
  /**
   * A positive floating-point number between 0 and 1 that
   * defines the intensity of the duotone effect
   */
  intensity: number;

  /**
   * The hex-coded value for the dark areas
   */
  color1: string;

  /**
   * The hex-coded value for the light areas
   */
  color2: string;
};

/**
 * Converts the image to duotone with specified intensity and colors.
 *
 * See https://github.com/imgproxy/imgproxy-docs/blob/7d15484aea6a1fae5f1dfd1806b5551a4774658d/docs/usage/processing.mdx?plain=1#L429 for the imgproxy documentation
 *
 * @param options  The duotone options
 * @returns        The duotone param string
 */
const duotone = (options: DuotoneOptions): string =>
  stringifyOptions('dt', [options.intensity, options.color1, options.color2]);

export default duotone;
export { DuotoneOptions };
