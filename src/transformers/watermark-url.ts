import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../common';

/**
 * The watermark URL
 */
type WatermarkUrlOptions = string;

/**
 * Use the image from the specified URL as a watermark.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#watermark-url-idwatermark-url}. for the imgproxy documentation
 *
 * @param url  The watermark URL
 * @returns    The watermark URL param string
 */
const watermarkUrl = (url: WatermarkUrlOptions): string =>
  stringifyOptions('wmu', [base64urlEncode(utf8encode(url))]);

export default watermarkUrl;
export { WatermarkUrlOptions };
