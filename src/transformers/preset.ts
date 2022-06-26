import { stringifyOptions } from '../common';

/**
 * A preset or a list of presets
 */
type PresetOptions = string | string[];

/**
 * Sets one or many presets to be used by the imgproxy.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#preset}. for the imgproxy documentation
 *
 * @param presets  The preset(s)
 * @returns        The preset param string
 */
const preset = (presets: PresetOptions): string =>
  stringifyOptions('pr', Array.isArray(presets) ? presets : [presets]);

export default preset;
export { PresetOptions };
