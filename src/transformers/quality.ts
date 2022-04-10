// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#quality

import { stringifyOptions } from '../utils';

type QualityOptions = number;

/**
 * Redefines the quality of the resulting image
 *
 * @param percentage The quality in percentage (between 0 and 1)
 *
 * @returns The quality params
 */
const quality = (percentage: QualityOptions): string =>
  stringifyOptions('q', [percentage]);

export default quality;
export { QualityOptions };
