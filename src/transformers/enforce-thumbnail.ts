import { stringifyOptions } from '../utils';

/**
 * If the source image has an embedded thumbnail, imgproxy will use the
 * embedded thumbnail instead of the main image
 */
const enforceThumbnail = (): string => stringifyOptions('eth', [true]);

export default enforceThumbnail;
