import { stringifyOptions } from '../utils';

type AdjustOptions = {
  brightness?: number;
  contrast?: number;
  saturation?: number;
};

/**
 * Defines the brightness, contrast, and saturation.
 *
 * @param options  The adjustment options
 * @returns        The adjustment params
 */
const adjust = (options: AdjustOptions): string =>
  stringifyOptions('a', [
    options.brightness,
    options.contrast,
    options.saturation,
  ]);

export default adjust;
export { AdjustOptions };
