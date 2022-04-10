// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#expires

import { stringifyOptions } from '../utils';

/**
 * The expiration date / unix timestamp
 */
type ExpiresOptions = Date | number;

/**
 * When set, imgproxy will check the provided unix timestamp
 * and return a 404 when expired
 *
 * @param options The unix timestamp
 */
const expires = (options: ExpiresOptions): string =>
  stringifyOptions('exp', [
    typeof options === 'number' ? options : options.getTime(),
  ]);

export default expires;
export { ExpiresOptions };
