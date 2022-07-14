import { stringifyOptions } from '../common';

/**
 * If the source image has an embedded thumbnail, imgproxy will use the
 * embedded thumbnail instead of the main image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#enforce-thumbnail for the imgproxy documentation
 *
 * @returns  The enforce thumbnail param string
 */
const enforceThumbnail = (): string => stringifyOptions('eth', [true]);

export default enforceThumbnail;
