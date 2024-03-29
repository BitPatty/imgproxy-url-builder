import { stringifyOptions } from '../common.js';

/**
 * The saturation (positive floating point number from 0 to 1).
 */
type SaturationOptions = number;

/**
 * Adjust saturation of the resulting image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#saturation-idsaturation for the imgproxy documentation
 *
 * @param percentage  A positive floating point number, where 1
 *                    keeps the saturation unchanged
 * @returns           The saturation param string
 */
const saturation = (percentage: SaturationOptions): string =>
  stringifyOptions('sa', [percentage]);

export default saturation;
export { SaturationOptions };
