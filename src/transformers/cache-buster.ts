// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#cache-buster

import { stringifyOptions } from '../utils';

type CacheBusterOptions = string;

/**
 * Adds a cache buster to the imgproxy params
 *
 * @returns The buster string
 */
const cacheBuster = (buster: CacheBusterOptions): string =>
  stringifyOptions('cb', [buster]);

export default cacheBuster;
export { CacheBusterOptions };
