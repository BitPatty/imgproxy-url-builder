import { stringifyOptions } from '../utils';

/**
 * Strips the color profile from the image
 *
 * @returns The strip color profile params
 */
const stripColorProfile = (): string => stringifyOptions('scp', [true]);

export default stripColorProfile;
