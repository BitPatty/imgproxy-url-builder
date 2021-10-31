// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#gravity

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
