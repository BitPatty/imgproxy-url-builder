// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#padding

import { stringifyOptions } from '../utils';

/**
 * The available options for the crop operation
 */
type PaddingOptions = {
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
};

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
