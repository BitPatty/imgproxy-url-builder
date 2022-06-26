import { stringifyOptions } from '../utils';

/**
 * If true, imgproxy will enlarge the image
 * if it is smaller than the given size.
 *
 * @returns The enlarge params
 */
const enlarge = (): string => stringifyOptions('el', [true]);

export default enlarge;
