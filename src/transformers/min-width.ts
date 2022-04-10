// Reference https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#min-width

import { stringifyOptions } from '../utils';

/**
 * The min width of the resulting image
 */
type MinWidthOptions = number;

/**
 * Defines the minimum width of the resulting image
 *
 * @param width The minimum width
 */
const minWidth = (width: MinWidthOptions): string =>
  stringifyOptions('mw', [width]);

export default minWidth;
export { MinWidthOptions };
