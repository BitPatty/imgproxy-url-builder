import { stringifyOptions } from '../common';

/**
 * The zoom level. Can either be specified for both X/Y or
 * as an array in the format [x zoom level, y zoom level]
 */
type ZoomOptions = number | [number, number];

/**
 * When set, imgproxy will multiply the image dimensions according to these factors.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#zoom}. for the imgproxy documentation
 *
 * The values must be greater than 0.
 *
 * @param options  The zoom options
 * @returns        The zoom param string
 */
const zoom = (options: ZoomOptions): string =>
  stringifyOptions('z', [
    typeof options === 'number' ? options : options.join(' '),
  ]);

export default zoom;
export { ZoomOptions };
