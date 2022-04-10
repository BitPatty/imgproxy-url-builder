// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#gravity

import GravityType from '../enums/gravity-type.enum';
import { stringifyOptions } from '../utils';

type GravityOptions = {
  /**
   * The gravity type
   */
  type: GravityType;

  /**
   * The gravity offset
   */
  offset?: {
    /**
     * The gravity offset on the X axis
     */
    x: number;

    /**
     * The gravity offset on the y axis
     */
    y: number;
  };
};

/**
 * Sets the gravity
 *
 * @param options The gravity options
 *
 * @returns The gravity params
 */
const gravity = (options: GravityOptions): string =>
  stringifyOptions('g', [options.type, options.offset?.x, options.offset?.y]);

export default gravity;
export { GravityOptions };
