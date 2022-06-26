import { stringifyOptions } from '../common';

/**
 * The expiration date / unix timestamp
 */
type ExpiresOptions = Date | number;

/**
 * When set, imgproxy will check the provided unix timestamp
 * and return a 404 when expired
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#expires}.
 *
 * @param options  The unix timestamp
 * @returns        The expiration param string
 */
const expires = (options: ExpiresOptions): string =>
  stringifyOptions('exp', [
    typeof options === 'number' ? options : options.getTime(),
  ]);

export default expires;
export { ExpiresOptions };
