import { stringifyOptions } from '../utils';

/**
 * Strips the metadata from the image
 *
 * @returns The strip metadata params
 */
const stripMetadata = (): string => stringifyOptions('sm', [true]);

export default stripMetadata;
