// Reference https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#contrast-idcontrast

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
