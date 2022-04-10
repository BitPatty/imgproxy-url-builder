// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#unsharpening-idunsharpening

import UnsharpeningMode from '../enums/unsharpening-mode.enum';
import { stringifyOptions } from '../utils';

type UnsharpeningOptions = {
  /**
   * The mode in which the unsharpening mask
   * should be applied
   */
  mode?: UnsharpeningMode;

  /**
   * A floating-point number that defines how neighbor
   * pixels will affect the current pixel.
   *
   * Greater the value - sharper the image.
   *
   * Should be greater than zero.
   */
  weight?: number;

  /**
   * A floating-point number that defines the
   * unsharpening strength.
   *
   * Lesser the value - sharper the image.
   *
   * Should be greater than zero.
   */
  dividor?: number;
};

/**
 * Allows redefining unsharpening options.
 *
 * @param options The unsharpening options
 *
 * @returns The unsharpening params
 */
const unsharpen = (options: UnsharpeningOptions): string =>
  stringifyOptions('ush', [options.mode, options.weight, options.dividor]);

export default unsharpen;
export { UnsharpeningOptions };
