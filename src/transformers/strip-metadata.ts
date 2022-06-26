import { stringifyOptions } from '../common';

/**
 * Strips the metadata from the image.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#strip-metadata}.
 *
 * @returns The strip metadata param string
 */
const stripMetadata = (): string => stringifyOptions('sm', [true]);

export default stripMetadata;
