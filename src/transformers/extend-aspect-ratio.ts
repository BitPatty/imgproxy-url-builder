import { stringifyOptions } from '../common.js';

import { GravityType } from '../index.js';

/**
 * The extend aspect ratio options
 */
type ExtendAspectRatioOptions = {
  /**
   * (Optional) The gravity for the cropping operation
   */
  gravity?: {
    /**
     * Specifies the gravity type
     */
    type: Exclude<GravityType, GravityType.CENTER>;

    /**
     * (Optional) Specifies the offset by X and Y axes
     */
    offset?: {
      /**
       * The gravity offset on the X axis
       */
      x: number;
      /**
       * The gravity offset on the Y axis
       */
      y: number;
    };
  };
};

/**
 * Extends the image to the requested aspect ratio.
 *
 * See https://github.com/imgproxy/imgproxy/blob/1a9768a2c682e88820064aa3d9a05ea234ff3cc4/docs/generating_the_url.md#extend-aspect-ratio for the imgproxy documentation
 *
 * @returns The extend aspect ratio param string
 */
const extendAspectRatio = (options?: ExtendAspectRatioOptions): string =>
  stringifyOptions('exar', [
    true,
    options?.gravity?.type,
    options?.gravity?.offset?.x,
    options?.gravity?.offset?.y,
  ]);

export default extendAspectRatio;
export { ExtendAspectRatioOptions };
