import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../utils';

/**
 * The watermark text
 */
type WatermarkTextOptions = string;

/**
 * When set, imgproxy will generate an image from the provided text
 * and use it as a watermark.
 *
 * @param text The watermark URL
 *
 * @returns The watermark url param string
 */
const watermarkText = (text: WatermarkTextOptions): string =>
  stringifyOptions('wmt', [base64urlEncode(utf8encode(text))]);

export default watermarkText;
export { WatermarkTextOptions };
