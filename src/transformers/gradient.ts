import GradientDirection from '../enums/gradient-direction.enum.js';
import { stringifyOptions } from '../common.js';

/**
 * The gradient options
 */
type GradientOptions = {
  /**
   * The opacity
   */
  opacity: number | string;

  /**
   * Hex encoded value of the gradient color
   */
  color?: string;

  /**
   * The gradient direction
   */
  direction?: GradientDirection;

  /**
   * Relative position of the gradient start between 0.0 and 1.0
   */
  start?: number | string;

  /**
   * Relative position of the gradient stop between 0.0 and 1.0
   */
  stop?: number | string;
};

/**
 * Places a gradient on the processed image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/cfa4b596d1f31656f9116cc16f2a4ff7d15c2837/docs/generating_the_url.md#gradient-idgradient for the imgproxy documentation
 *
 * @param options  The gradient options
 * @returns        The gradient param string
 */
const gradient = (options: GradientOptions): string =>
  stringifyOptions('gr', [
    options.opacity,
    options.color ?? '000',
    options.direction ?? GradientDirection.DOWN,
    options.start ?? '0.0',
    options.stop ?? '1.0',
  ]);

export default gradient;
export { GradientOptions };
