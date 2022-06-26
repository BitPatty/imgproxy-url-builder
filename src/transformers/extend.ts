import GravityType from '../enums/gravity-type.enum';
import { stringifyOptions } from '../utils';

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
 * If true, imgproxy will extend the image if it is smaller
 * than the given size.
 *
 * @returns        The extend params
 * @param options  The extend options
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
