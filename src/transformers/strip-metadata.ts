// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#strip-metadata

import { stringifyOptions } from '../utils';

/**
 * Strips the metadata from the image
 *
 * @returns The strip metadata params
 */
const stripMetadata = (): string => stringifyOptions('sm', [true]);

export default stripMetadata;
