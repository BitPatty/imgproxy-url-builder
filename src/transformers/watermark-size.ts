import { stringifyOptions } from '../common';

/**
 * The watermark size
 */
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
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#watermark-size-idwatermark-size} for the imgproxy documentation
 *
 * @param options  The size of the blur mask
 * @returns        The blur param string
 */
const watermarkSize = (options: WatermarkSizeOptions): string =>
  stringifyOptions('wms', [options.width ?? 0, options.height ?? 0]);

export default watermarkSize;
export { WatermarkSizeOptions };
