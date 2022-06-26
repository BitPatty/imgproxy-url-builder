import { stringifyOptions } from '../common';

/**
 * Automatically rotates the image based on the EXIF orientation parameter
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#auto-rotate}.
 *
 * @returns The auto-rotate param string
 */
const autoRotate = (): string => stringifyOptions('ar', [true]);

export default autoRotate;
