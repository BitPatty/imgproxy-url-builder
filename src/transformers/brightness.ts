// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#brightness-idbrightness

import { stringifyOptions } from '../utils';

type BrightnessOptions = number;

/**
 * When set, imgproxy will adjust brightness of the resulting image.
 *
 * @param value An integer number in range from -255 to 255.
 *
 * @returns The brightness params
 */
const brightness = (value: BrightnessOptions): string =>
  stringifyOptions('br', [value]);

export default brightness;
export { BrightnessOptions };
