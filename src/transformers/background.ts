// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#background

import { stringifyOptions } from '../utils';

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
 * Fills the image background with the specified color
 *
 * @param options The background color (hex encoded string or RGB object)
 *
 * @returns The background params
 */
const background = (options: BackgroundOptions): string =>
  stringifyOptions('bg', [
    ...(typeof options === 'string'
      ? [options]
      : [options.r, options.g, options.b]),
  ]);

export default background;
export { BackgroundOptions };
