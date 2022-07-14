import GravityType from '../enums/gravity-type.enum';
import { stringifyOptions } from '../common';

/**
 * The available options for the crop operation
 */
type CropOptions = {
  /**
   * The width of the cropped size
   *
   *     if width == 0 or unset : imgproxy uses the full width
   *     if width >= 1          : imgproxy treats it as absolute value
   *     if width <= 1          : imgproxy treats it as relative value
   */
  width?: number;
  /**
   * The height of the cropped size
   *
   *     if height == 0 or unset : imgproxy uses the full height
   *     if height >= 1          : imgproxy treats it as absolute value
   *     if height <= 1          : imgproxy treats it as relative value
   */
  height?: number;
  /**
   * (Optional) The gravity for the cropping operation
   */
  gravity?: {
    /**
     * Specifies the gravity type
     */
    type: GravityType;

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
 * Crops the image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#crop for the imgproxy documentation
 *
 * @param options  The cropping options
 * @returns        The cropping param string
 */
const crop = (options?: CropOptions): string =>
  stringifyOptions('c', [
    options?.width ?? 0,
    options?.height ?? 0,
    options?.gravity?.type,
    options?.gravity?.offset?.x,
    options?.gravity?.offset?.y,
  ]);

export default crop;
export { CropOptions };
