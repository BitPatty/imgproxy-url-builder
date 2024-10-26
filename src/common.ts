import { base64urlEncode, parseHexString, utf8encode } from './crypto/codec.js';
import { wordArrayToByteArray } from './crypto/common.js';
import { hmac } from './crypto/hmac.js';

/**
 * Stringifies the imgproxy modifier for use within the
 * imgproxy URL.
 *
 * @param opCode  The operation key
 * @param values  The values
 * @returns       The stringified modifier
 */
const stringifyOptions = (
  opCode: string,
  values: Array<string | number | boolean | undefined>,
): string => {
  return [
    opCode,
    ...values.map((v) => (v == null ? '' : encodeURIComponent(v))),
  ]
    .join(':')
    .replace(/:+$/, '');
};

/**
 * Encodes the filepath to base64url.
 *
 * @param filePath  The file path
 * @returns         The base64url encoded file path
 */
const encodeFilePath = (filePath: string): string => {
  return base64urlEncode(utf8encode(filePath));
};

/**
 * Generates the URL signature for the specified imgproxy param string.
 *
 * See https://github.com/imgproxy/imgproxy/blob/947d65cf29fe26e5e4d38ca8a17e44c7402e437c/docs/configuration.md#url-signature
 *
 * @param paramString  The param string
 * @param key          The hex-encoded key
 * @param salt         The hex-encoded salt
 * @param length       The number of bytes to use for the signature before encoding to Base64
 * @returns            The base64url encoded signature
 */
const generateSignature = (
  paramString: string,
  key: string,
  salt: string,
  length: number,
): string => {
  const path = paramString.startsWith('/') ? paramString : `/${paramString}`;

  // Parse key and salt from hex and ensure they're Uint8Array
  const keyBytes = parseHexString(key);
  const saltBytes = parseHexString(salt);

  // Create HMAC using the key and the combination of salt and path
  const h = hmac(keyBytes, new Uint8Array([...saltBytes, ...utf8encode(path)]));

  // Convert the HMAC output (Uint32Array) into a byte array (Uint8Array)
  const truncated = wordArrayToByteArray(h).slice(0, length);

  // Return the base64url-encoded signature
  return base64urlEncode(truncated);
};

export { stringifyOptions, encodeFilePath, generateSignature };
