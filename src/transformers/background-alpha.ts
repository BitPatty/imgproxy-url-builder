import { stringifyOptions } from '../common.js';

/**
 * The background alpha, a positive floating point number ranging from 0 to 1
 */
type BackgroundAlphaOptions = number;

/**
 * Adds alpha channel to background.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#background-alpha-idbackground-alpha for the imgproxy documentation
 *
 * @param percentage  A positive floating point number between 0 and 1
 * @returns           The background alpha param string
 */
const backgroundAlpha = (percentage: BackgroundAlphaOptions): string =>
  stringifyOptions('bga', [percentage]);

export default backgroundAlpha;
export { BackgroundAlphaOptions };
