import { stringifyOptions } from '../common';

/**
 * The size of the sharpen mask (floating point number)
 */
type SharpenOptions = number;

/**
 * Applies a sharpen filter to the image.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#sharpen}. for the imgproxy documentation
 *
 * @param sigma  The size of the sharpen mask
 * @returns      The sharpen param string
 */
const sharpen = (sigma: SharpenOptions): string =>
  stringifyOptions('sh', [sigma]);

export default sharpen;
export { SharpenOptions };
