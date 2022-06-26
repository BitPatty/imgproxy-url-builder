import GravityType from '../enums/gravity-type.enum';
import { stringifyOptions } from '../common';

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
 * If true, imgproxy will extend the image if it is smaller
 * than the given size.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#extend}.
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
