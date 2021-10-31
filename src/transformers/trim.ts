// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#trim

import { OneOrMany, stringifyOptions } from '../utils';

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
  equal?: OneOrMany<{
    horizontal?: boolean;
    vertical?: boolean;
  }>;
};

/**
 * Trims the image background
 *
 * @param options The trimming options
 *
 * @returns The trim params
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
