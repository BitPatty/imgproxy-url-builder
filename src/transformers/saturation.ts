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
