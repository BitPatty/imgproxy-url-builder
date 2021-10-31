// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#watermark-url-idwatermark

import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../utils';

type WatermarkUrlOptions = string;

/**
 * When set, imgproxy will use the image
 * from the specified URL as a watermark.
 *
 * @param url The watermark URL
 *
 * @returns The watermark url param string
 */
const watermarkUrl = (url: WatermarkUrlOptions): string =>
  stringifyOptions('wmu', [base64urlEncode(utf8encode(url))]);

export default watermarkUrl;
export { WatermarkUrlOptions };
