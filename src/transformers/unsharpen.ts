import UnsharpeningMode from '../enums/unsharpening-mode.enum';
import { stringifyOptions } from '../common';

/**
 * The unsharpening options
 */
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
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#unsharpening-idunsharpening}.
 *
 * @param options  The unsharpening options
 * @returns        The unsharpening param string
 */
const unsharpen = (options: UnsharpeningOptions): string =>
  stringifyOptions('ush', [options.mode, options.weight, options.dividor]);

export default unsharpen;
export { UnsharpeningOptions };
