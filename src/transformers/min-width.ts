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
