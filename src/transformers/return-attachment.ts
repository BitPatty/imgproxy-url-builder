import { stringifyOptions } from '../common.js';

/**
 * Returns attachment in the Content-Disposition header.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#return-attachment for the imgproxy documentation
 *
 * @returns  The attachment param string
 */
const returnAttachment = (): string => stringifyOptions('att', [true]);

export default returnAttachment;
