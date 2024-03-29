import { stringifyOptions } from '../common.js';

/**
 * The expiration date / unix timestamp
 */
type ExpiresOptions = Date | number;

/**
 * Returns a 404 if the expiration date is reached.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#expires for the imgproxy documentation
 *
 * @param options  The unix timestamp
 * @returns        The expiration param string
 */
const expires = (options: ExpiresOptions): string =>
  stringifyOptions('exp', [
    typeof options === 'number'
      ? options
      : Math.floor(options.getTime() / 1000),
  ]);

export default expires;
export { ExpiresOptions };
