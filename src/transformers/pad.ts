// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#padding

import { OneOrMany, stringifyOptions } from '../utils';

/**
 * The available options for the crop operation
 */
type PaddingOptions = OneOrMany<{
  /**
   * The top padding (and all other sides if not set explicitly)
   */
  top?: number;

  /**
   * The right padding (and left if it won't be set explicitly)
   */
  right?: number;

  /**
   * The bottom padding
   */
  bottom?: number;

  /**
   * The left padding
   */
  left?: number;
}>;

/**
 * Applies the specified padding to the image
 *
 * @param options The padding options
 *
 * @returns The padding params
 */
const pad = (options: PaddingOptions): string =>
  stringifyOptions('pd', [
    options.top,
    options.right,
    options.bottom,
    options.left,
  ]);

export default pad;
export { PaddingOptions };
