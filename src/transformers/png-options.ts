// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#png-options-idpng-options

import { stringifyOptions } from '../utils';

type PngOptions = {
  /**
   * If true, enables interlaced PNG compression
   */
  interlaced?: boolean;

  /**
   * If true, enables PNG quantization.
   */
  quantize?: boolean;

  /**
   * Maximum number of quantization palette entries.
   *
   * Should be between 2 and 256.
   */
  quantization_colors?: boolean;
};

/**
 * Allows redefining PNG saving options
 *
 * @param options The png options
 *
 * @returns The png option params
 */
const pngOptions = (options: PngOptions): string =>
  stringifyOptions('pngo', [
    options.interlaced,
    options.quantize,
    options.quantization_colors,
  ]);

export default pngOptions;
export { PngOptions };
