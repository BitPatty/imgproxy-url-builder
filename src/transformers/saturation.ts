// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#saturation-idsaturation

import { stringifyOptions } from '../utils';

type SaturationOptions = number;

/**
 * When set, imgproxy will adjust saturation of the resulting image.
 *
 * @param percentage A positive floating point number, where 1
 * keeps the saturation unchanged.
 *
 * @returns The saturation params
 */
const saturation = (percentage: SaturationOptions): string =>
  stringifyOptions('sa', [percentage]);

export default saturation;
export { SaturationOptions };
