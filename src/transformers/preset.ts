import { stringifyOptions } from '../utils';

type PresetOptions = string | string[];

/**
 * Sets one or many presets to be used by the imgproxy
 *
 * @returns The preset params
 */
const preset = (presets: PresetOptions): string =>
  stringifyOptions('pr', Array.isArray(presets) ? presets : [presets]);

export default preset;
export { PresetOptions };
