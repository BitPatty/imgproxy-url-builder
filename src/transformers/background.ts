import { stringifyOptions } from '../common';

/**
 * The background color
 */
type BackgroundOptions =
  | string
  | {
      /**
       * The red channel (0-255)
       */
      r: number;

      /**
       * The green channel (0-255)
       */
      g: number;

      /**
       * The blue channel (0-255)
       */
      b: number;
    };

/**
 * Fills the image background with the specified color.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#background}. for the imgproxy documentation
 *
 * @param options  The background color (hex encoded string or RGB object)
 * @returns        The background param string
 */
const background = (options: BackgroundOptions): string =>
  stringifyOptions('bg', [
    ...(typeof options === 'string'
      ? [options]
      : [options.r, options.g, options.b]),
  ]);

export default background;
export { BackgroundOptions };
