import { stringifyOptions } from '../utils';

/**
 * The min height of the resulting image
 */
type MinHeightOptions = number;

/**
 * Defines the minimum height of the resulting image
 *
 * @param height The minimum height
 */
const minHeight = (height: MinHeightOptions): string =>
  stringifyOptions('mh', [height]);

export default minHeight;
export { MinHeightOptions };
