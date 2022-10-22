import { stringifyOptions } from '../common.js';

/**
 * The min width of the resulting image
 */
type MinWidthOptions = number;

/**
 * Defines the minimum width of the resulting image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#min-width for the imgproxy documentation
 *
 * @param width  The minimum width
 * @returns      The min width param string
 */
const minWidth = (width: MinWidthOptions): string =>
  stringifyOptions('mw', [width]);

export default minWidth;
export { MinWidthOptions };
