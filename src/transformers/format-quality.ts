import { stringifyOptions } from '../common';

/**
 * A record consisting of a mapping from extension/format to the quality factor
 */
type FormatQualityOptions = Record<string, number>;

/**
 * Sets the desired quality for each format
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#format-quality}. for the imgproxy documentation
 *
 * @param options  The format quality options
 * @returns        The format quality param string
 */
const formatQuality = (options: FormatQualityOptions): string =>
  stringifyOptions(
    'fq',
    Object.entries(options).flatMap((e) => e),
  );

export default formatQuality;
export { FormatQualityOptions };
