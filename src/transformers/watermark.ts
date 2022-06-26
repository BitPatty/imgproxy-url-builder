import WatermarkPosition from '../enums/watermark-position.enum';
import { stringifyOptions } from '../utils';

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
 * Applies a gaussian blur filter to the image
 *
 * @param options The size of the blur mask
 *
 * @returns The blur params
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
