// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#strip-color-profile

import { stringifyOptions } from '../utils';

/**
 * Strips the color profile from the image
 *
 * @returns The strip color profile params
 */
const stripColorProfile = (): string => stringifyOptions('scp', [true]);

export default stripColorProfile;
