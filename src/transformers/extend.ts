import GravityType from '../enums/gravity-type.enum';
import { stringifyOptions } from '../common.js';

/**
 * The extend options
 */
type ExtendOptions = {
  /**
   * The gravity
   */
  gravity: {
    type: Exclude<GravityType, GravityType.SMART>;

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
};

/**
 * Extends the image if it is smaller than the given size.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#extend for the imgproxy documentation
 *
 * @param options  The extend options
 * @returns        The extend param string
 */
const extend = (options?: ExtendOptions): string =>
  stringifyOptions('ex', [
    true,
    options?.gravity.type,
    options?.gravity.offset?.x,
    options?.gravity.offset?.y,
  ]);

export default extend;
export { ExtendOptions };
