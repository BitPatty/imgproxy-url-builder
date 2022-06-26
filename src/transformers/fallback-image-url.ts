import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../common';

/**
 * The fallback image URL
 */
type FallbackImageUrlOptions = string;

/**
 * Sets a custom fallback image by specifying its URL
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#fallback-image-url-idfallback-image-url}.
 *
 * @param url  The fallback image URL
 * @returns    The fallback image URL param string
 */
const fallbackImageUrl = (url: FallbackImageUrlOptions): string =>
  stringifyOptions('fiu', [base64urlEncode(utf8encode(url))]);

export default fallbackImageUrl;
export { FallbackImageUrlOptions };
