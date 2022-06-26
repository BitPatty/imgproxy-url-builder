import { stringifyOptions } from '../common';

/**
 * Strips the color profile from the image.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#strip-color-profile}. for the imgproxy documentation
 *
 * @returns  The strip color profile param string
 */
const stripColorProfile = (): string => stringifyOptions('scp', [true]);

export default stripColorProfile;
