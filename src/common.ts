import { base64urlEncode, parseHexString, utf8encode } from './crypto/codec.js';
import { wordArrayToByteArray } from './crypto/common.js';
import hmac from './crypto/hmac.js';

/**
 * Stringifies the imgproxy modifier for use within the
 * imgproxy URL.
 *
 * @param opCode  The operation eky
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
 * Encodes the filepath to base64.
 *
 * @param filePath  The file path
 * @returns         The encoded file path
 */
const encodeFilePath = (filePath: string): string => {
  return base64urlEncode(utf8encode(filePath));
};

/**
 * Generates the URL for the specified imgproxy param string.
 *
 * @param paramString  The param string
 * @param key          The hex encoded key
 * @param salt         The hex encoded salt
 * @returns            The signature
 */
const generateSignature = (
  paramString: string,
  key: string,
  salt: string,
): string => {
  const path = paramString.startsWith('/') ? paramString : `/${paramString}`;
  const h = hmac(parseHexString(key), [
    ...parseHexString(salt),
    ...utf8encode(path),
  ]);
  return base64urlEncode(wordArrayToByteArray(h));
};

export { stringifyOptions, encodeFilePath, generateSignature };
