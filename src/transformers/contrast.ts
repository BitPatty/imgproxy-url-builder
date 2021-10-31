// Reference https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#contrast-idcontrast

import { stringifyOptions } from '../utils';

type ContrastOptions = number;

/**
 * When set, imgproxy will adjust contrast of the resulting image.
 *
 * @param percentage A positive floating point number, where 1
 * keeps the contrast unchanged.
 *
 * @returns The contrast params
 */
const contrast = (percentage: ContrastOptions): string =>
  stringifyOptions('co', [percentage]);

export default contrast;
export { ContrastOptions };
