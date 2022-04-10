// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#zoom

import { stringifyOptions } from '../utils';

/**
 * The zoom level. Can either be specified for both X/Y or
 * as an array in the format [x zoom level, y zoom level]
 */
type ZoomOptions = number | [number, number];

/**
 * When set, imgproxy will multiply the image dimensions according to these factors.
 *
 * The values must be greater than 0.
 *
 * @param options The zoom options
 */
const zoom = (options: ZoomOptions): string =>
  stringifyOptions('z', [
    typeof options === 'number' ? options : options.join(' '),
  ]);

export default zoom;
export { ZoomOptions };
