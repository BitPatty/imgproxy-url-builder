import { stringifyOptions } from '../common.js';

/**
 * The DPI value
 */
type DPIOptions = number;

/**
 * When set, imgproxy will replace the image's DPI metadata with the provided value.
 *
 * See https://github.com/imgproxy/imgproxy/blob/8629c5eca1e422908363f471513bfc887d778a85/docs/generating_the_url.md#dpi-iddpi for the imgproxy documentation
 *
 * @param value  The DPI value
 * @returns      The DPI param string
 */
const dpi = (value: DPIOptions): string => stringifyOptions('dpi', [value]);

export default dpi;
export { DPIOptions };
