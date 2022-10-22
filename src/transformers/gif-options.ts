// Removed in version 3.0.0
// See: https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/CHANGELOG.md#removed

import { stringifyOptions } from '../common.js';

/**
 * The GIF options
 */
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
 * Allows redefining GIF saving options.
 *
 * @deprecated     Automatically applied since version 3.0.0
 * @param options  The gif options
 * @returns        The gif option param string
 */
const gifOptions = (options: GifOptions): string =>
  stringifyOptions('gifo', [
    options.optimizeFrames,
    options.optimizeTransparency,
  ]);

export default gifOptions;
export { GifOptions };
