import { stringifyOptions } from '../utils';

/**
 * If true, imgproxy will extend the image
 * if it is smaller than the given size.
 *
 * @returns The extend params
 */
const extend = (): string => stringifyOptions('ex', [true]);

export default extend;
