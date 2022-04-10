// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#background-alpha-idbackground-alpha

import { stringifyOptions } from '../utils';

type BackgroundAlphaOptions = number;

/**
 * Adds alpha channel to background.
 *
 * @param percentage A positive floating point number between 0 and 1.
 *
 * @returns The background alpha params
 */
const backgroundAlpha = (percentage: BackgroundAlphaOptions): string =>
  stringifyOptions('bga', [percentage]);

export default backgroundAlpha;
export { BackgroundAlphaOptions };
