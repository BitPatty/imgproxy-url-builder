// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#fallback-image-url-idfallback-image-url

import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../utils';

/**
 * The fallback image URL
 */
type FallbackImageUrlOptions = string;

/**
 * Sets a custom fallback image by specifying its URL
 *
 * @param url  The fallback image URL
 */
const fallbackImageUrl = (url: FallbackImageUrlOptions): string =>
  stringifyOptions('fiu', [base64urlEncode(utf8encode(url))]);

export default fallbackImageUrl;
export { FallbackImageUrlOptions };
