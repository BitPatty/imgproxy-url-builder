import WatermarkPosition from '../enums/watermark-position.enum';
import { stringifyOptions } from '../common';

/**
 * The watermark options
 */
type WatermarkOptions = {
  /**
   * The opacity.
   * The final opacity is calculated like base_opacity * opacity
   */
  opacity: number;

  /**
   * The scale factor of the watermark
   */
  scale?: number;
} & (
  | {
      /**
       * The position of the watermark
       */
      position?: WatermarkPosition.REPLICATE;
    }
  | {
      /**
       * The position of the watermark
       */
      position?: Exclude<WatermarkPosition, WatermarkPosition.REPLICATE>;

      /**
       * The offset of the watermark
       */
      offset?: {
        /**
         * The offset of the water mark on the X axis
         */
        x: number;

        /**
         * The offset of the water mark on the Y axis
         */
        y: number;
      };
    }
);

/**
 * Places a watermark on the processed image.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#watermark}.
 *
 * @param options  The watermark options
 * @returns        The watermark param string
 */
const watermark = (options: WatermarkOptions): string =>
  stringifyOptions('wm', [
    options.opacity,
    options.position,
    (options as { offset?: { x: number } }).offset?.x,
    (options as { offset?: { y: number } }).offset?.y,
    options.scale,
  ]);

export default watermark;
export { WatermarkOptions };
