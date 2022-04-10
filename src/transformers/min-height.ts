// Reference https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#min-height

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
