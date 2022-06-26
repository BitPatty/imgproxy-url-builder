import { stringifyOptions } from '../common';

/**
 * Returns attachment in the Content-Disposition header.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#return-attachment}.
 *
 * @returns  The attachment param string
 */
const returnAttachment = (): string => stringifyOptions('att', [true]);

export default returnAttachment;
