import { stringifyOptions } from '../common';

/**
 * The brightness, an integer ranging from -255 to 255.
 */
type BrightnessOptions = number;

/**
 * When set, imgproxy will adjust brightness of the resulting image.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#brightness-idbrightness}.
 *
 * @param value  An integer number ranging from -255 to 255.
 * @returns      The brightness param string
 */
const brightness = (value: BrightnessOptions): string =>
  stringifyOptions('br', [value]);

export default brightness;
export { BrightnessOptions };
