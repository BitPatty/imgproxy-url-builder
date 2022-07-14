import { stringifyOptions } from '../common';

/**
 * The trim options
 */
type TrimOptions = {
  /**
   * The color similarity tolerance
   */
  threshold: number;

  /**
   * The (hex-encoded) color to cut off
   */
  color?: string;

  /**
   * Equalize the horizontal or vertical
   * trimming distance
   */
  equal?: {
    /**
     * If true, equalizes the trimming distance
     * on the horizontal axis
     */
    horizontal?: boolean;

    /**
     * If true, equalizes the trimming distance
     * on the vertical axis
     */
    vertical?: boolean;
  };
};

/**
 * Trims the image background.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#trim for the imgproxy documentation
 *
 * @param options  The trimming options
 * @returns        The trim param string
 */
const trim = (options: TrimOptions): string =>
  stringifyOptions('t', [
    options.threshold,
    options.color,
    options.equal?.horizontal,
    options.equal?.vertical,
  ]);

export default trim;
export { TrimOptions };
