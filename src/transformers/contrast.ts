import { stringifyOptions } from '../common';

/**
 * The percentage (positive floating number from 0-1)
 */
type ContrastOptions = number;

/**
 * When set, imgproxy will adjust contrast of the resulting image.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#contrast-idcontrast}.
 *
 * @param percentage  A positive floating point number, where 1
 *                    keeps the contrast unchanged.
 * @returns           The contrast param string
 */
const contrast = (percentage: ContrastOptions): string =>
  stringifyOptions('co', [percentage]);

export default contrast;
export { ContrastOptions };
