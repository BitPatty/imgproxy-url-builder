import { stringifyOptions } from '../common';

/**
 * The cache buster
 */
type CacheBusterOptions = string;

/**
 * Adds a cache buster to the imgproxy params.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#cache-buster}. for the imgproxy documentation
 *
 * @param buster  The cache buster
 * @returns       The cache buster param string
 */
const cacheBuster = (buster: CacheBusterOptions): string =>
  stringifyOptions('cb', [buster]);

export default cacheBuster;
export { CacheBusterOptions };
