import { stringifyOptions } from '../common';

/**
 * The DPR factor (must be greater than 0)
 */
type DprOptions = number;

/**
 * Multiplies the dimensions according to the specified factor.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#dpr for the imgproxy documentation
 *
 * @param value  The DPR factor
 * @returns      The DPR param string
 */
const dpr = (value: DprOptions): string => stringifyOptions('dpr', [value]);

export default dpr;
export { DprOptions };
