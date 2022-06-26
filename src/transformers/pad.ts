import { stringifyOptions } from '../common';

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
 * Applies the specified padding to the image.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#padding}.
 *
 * @param options  The padding options
 * @returns        The padding param string
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
