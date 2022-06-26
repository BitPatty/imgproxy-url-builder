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
