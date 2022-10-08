import { stringifyOptions } from '../common';

/**
 * The watermark shadow mask size
 */
type WatermarkShadowOptions = number;

/**
 * Adds a shadow to the watermark.
 *
 * See https://github.com/imgproxy/imgproxy/blob/f95f57bb4df35c69ae2257958006ef54b1c1d8c7/docs/generating_the_url.md#watermark-shadow-idwatermark-shadow for the imgproxy documentation
 *
 * @param sigma  The size of the shadow mask
 * @returns      The watermark shadow param string
 */
const watermarkShadow = (sigma: WatermarkShadowOptions): string =>
  stringifyOptions('wmsh', [sigma]);

export default watermarkShadow;
export { WatermarkShadowOptions };
