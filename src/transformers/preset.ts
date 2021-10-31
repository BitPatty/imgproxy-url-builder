// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#preset

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
