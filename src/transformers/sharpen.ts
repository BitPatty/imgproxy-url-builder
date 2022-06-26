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
