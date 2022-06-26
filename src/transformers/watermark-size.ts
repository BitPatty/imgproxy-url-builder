import { stringifyOptions } from '../utils';

type WatermarkSizeOptions = {
  /**
   * The desired width
   */
  width: number;

  /**
   * The desired height
   */
  height: number;
};

/**
 * Defines the desired width and height of the watermark. imgproxy always
 * uses `fit` resizing type when resizing watermarks and enlarges them
 * when needed.
 *
 * Note: this processing option only takes effect when the `scale` argument
 * of the `watermark` option is set to zero.
 *
 * @param options The size of the blur mask
 *
 * @returns The blur params
 */
const watermarkSize = (options: WatermarkSizeOptions): string =>
  stringifyOptions('wms', [options.width ?? 0, options.height ?? 0]);

export default watermarkSize;
export { WatermarkSizeOptions };
