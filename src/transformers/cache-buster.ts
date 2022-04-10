// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#cache-buster

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
