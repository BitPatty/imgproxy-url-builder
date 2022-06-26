import { stringifyOptions } from '../common';

/**
 * The quality in percentage (floating point number from 0.0 to 1.0)
 */
type QualityOptions = number;

/**
 * Redefines the quality of the resulting image.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#quality}. for the imgproxy documentation
 *
 * @param percentage  The percentage as floating point number from 0 to 1
 * @returns           The quality param string
 */
const quality = (percentage: QualityOptions): string =>
  stringifyOptions('q', [percentage]);

export default quality;
export { QualityOptions };
