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
