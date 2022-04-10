// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#dpr

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
