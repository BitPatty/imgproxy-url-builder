// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#strip-color-profile

import { stringifyOptions } from '../utils';

/**
 * Strips the color profile from teh image
 *
 * @returns The strip color profile params
 */
const stripColorProfile = (): string => stringifyOptions('scp', [true]);

export default stripColorProfile;
