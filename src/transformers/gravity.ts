import GravityType from '../enums/gravity-type.enum';
import { stringifyOptions } from '../common';

/**
 * The gravity options
 */
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
 * Sets the gravity.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#gravity}.
 *
 * @param options  The gravity options
 * @returns        The gravity param string
 */
const gravity = (options: GravityOptions): string =>
  stringifyOptions('g', [options.type, options.offset?.x, options.offset?.y]);

export default gravity;
export { GravityOptions };
