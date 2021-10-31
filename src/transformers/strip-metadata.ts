// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#strip-metadata

import { stringifyOptions } from '../utils';

/**
 * Strips the metadata from teh image
 *
 * @returns The strip metadata params
 */
const stripMetadata = (): string => stringifyOptions('sm', [true]);

export default stripMetadata;
