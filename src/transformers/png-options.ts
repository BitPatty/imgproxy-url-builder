import { stringifyOptions } from '../common';

/**
 * The PNG options
 */
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
  quantization_colors?: number;
};

/**
 * Allows redefining PNG saving options.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#png-options-idpng-options}. for the imgproxy documentation
 *
 * @param options  The png options
 * @returns        The png option param string
 */
const pngOptions = (options: PngOptions): string =>
  stringifyOptions('pngo', [
    options.interlaced,
    options.quantize,
    options.quantization_colors,
  ]);

export default pngOptions;
export { PngOptions };
