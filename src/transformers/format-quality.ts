// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#format-quality

import { stringifyOptions } from '../utils';

/**
 * A record consisting of a mapping from extension/format to the quality factor
 */
type FormatQualityOptions = Record<string, number>;

/**
 * Sets the desired quality for each format
 *
 * @param options The format quality options
 */
const formatQuality = (options: FormatQualityOptions): string =>
  stringifyOptions(
    'fq',
    Object.entries(options).flatMap((e) => e),
  );

export default formatQuality;
export { FormatQualityOptions };
