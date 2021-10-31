// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#dpr

import { stringifyOptions } from '../utils';

type DprOptions = number;

/**
 * Multiplies the dimensions according to the specified factor
 *
 * @param value the Dpr factor (must be greater than 0)
 *
 * @returns The Dpr params
 */
const dpr = (value: DprOptions): string => stringifyOptions('dpr', [value]);

export default dpr;
export { DprOptions };
