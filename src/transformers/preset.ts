// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#preset

import { stringifyOptions } from '../utils';

type PresetOptions = string | [];

/**
 * Sets one or many presets to be used by the imgproxy
 *
 * @returns The preset params
 */
const preset = (presets: PresetOptions): string =>
  stringifyOptions('pr', Array.isArray(presets) ? presets : [presets]);

export default preset;
export { PresetOptions };
