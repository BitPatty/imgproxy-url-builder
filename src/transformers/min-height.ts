import { stringifyOptions } from '../common';

/**
 * The min height of the resulting image
 */
type MinHeightOptions = number;

/**
 * Defines the minimum height of the resulting image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#min-height for the imgproxy documentation
 *
 * @param height  The minimum height
 * @returns       The min height param string
 */
const minHeight = (height: MinHeightOptions): string =>
  stringifyOptions('mh', [height]);

export default minHeight;
export { MinHeightOptions };
