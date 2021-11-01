// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#gif-options-idgif-options

import { stringifyOptions } from '../utils';

type GifOptions = {
  /**
   * If true, enables GIF frames optimization.
   */
  optimizeFrames?: boolean;

  /**
   * If true, enables GIF transparency optimization.
   */
  optimizeTransparency?: boolean;
};

/**
 * Allows redefining GIF saving options
 *
 * @param options The gif options
 *
 * @returns The gif option params
 */
const gifOptions = (options: GifOptions): string =>
  stringifyOptions('gifo', [
    options.optimizeFrames,
    options.optimizeTransparency,
  ]);

export default gifOptions;
export { GifOptions };
