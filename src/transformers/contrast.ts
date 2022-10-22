import { stringifyOptions } from '../common.js';

/**
 * The percentage (positive floating number from 0-1)
 */
type ContrastOptions = number;

/**
 * Adjust contrast of the resulting image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#contrast-idcontrast for the imgproxy documentation
 *
 * @param percentage  A positive floating point number, where 1
 *                    keeps the contrast unchanged.
 * @returns           The contrast param string
 */
const contrast = (percentage: ContrastOptions): string =>
  stringifyOptions('co', [percentage]);

export default contrast;
export { ContrastOptions };
