// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#unsharpening-idunsharpening

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
