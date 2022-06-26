import { stringifyOptions } from '../common';

/**
 * Preserve the copyright info while stripping metadata.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#keep-copyright}.
 *
 * @returns  The keep copyright param string
 */
const keepCopyright = (): string => stringifyOptions('kcr', [true]);

export default keepCopyright;
