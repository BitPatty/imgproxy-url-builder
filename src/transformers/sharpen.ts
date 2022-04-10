// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#sharpen

import { stringifyOptions } from '../utils';

type SharpenOptions = number;

/**
 * Applies a sharpen filter to the image
 *
 * @param sigma The size of the sharpen mask
 *
 * @returns The sharpen params
 */
const sharpen = (sigma: SharpenOptions): string =>
  stringifyOptions('sh', [sigma]);

export default sharpen;
export { SharpenOptions };
