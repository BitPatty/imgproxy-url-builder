import { stringifyOptions } from '../common.js';

/**
 * The adjust options
 */
type AdjustOptions = {
  /**
   * Integer ranging from -255 to 255
   */
  brightness?: number;

  /**
   * Floating point number ranging from 0.0 to 1.0
   */
  contrast?: number;

  /**
   * Floating point number ranging from 0.0 to 1.0
   */
  saturation?: number;
};

/**
 * Defines the brightness, contrast, and saturation.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#adjust-idadjust for the imgproxy documentation
 *
 * @param options  The adjustment options
 * @returns        The adjustment param string
 */
const adjust = (options: AdjustOptions): string =>
  stringifyOptions('a', [
    options.brightness,
    options.contrast,
    options.saturation,
  ]);

export default adjust;
export { AdjustOptions };
