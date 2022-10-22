import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../common.js';

/**
 * The watermark text
 */
type WatermarkTextOptions = string;

/**
 * Generate an image from the provided text and use it as a watermark.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#watermark-text-idwatermark-text for the imgproxy documentation
 *
 * @param text  The watermark text
 * @returns     The watermark text param string
 */
const watermarkText = (text: WatermarkTextOptions): string =>
  stringifyOptions('wmt', [base64urlEncode(utf8encode(text))]);

export default watermarkText;
export { WatermarkTextOptions };
