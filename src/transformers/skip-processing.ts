import { stringifyOptions } from '../common';

/**
 * The list of formats which should not be processed
 */
type SkipProcessingOptions = string[];

/**
 * Skip the processing of the listed formats.
 *
 * Note: Processing can only be skipped when the requested format is
 * the same as the source format.
 *
 * Note: Video thumbnail processing can't be skipped
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#skip-processing for the imgproxy documentation
 *
 * @param extensions  The list of file extensions
 * @returns           The skip processing param string
 */
const skipProcessing = (extensions: SkipProcessingOptions): string =>
  stringifyOptions('skp', extensions);

export default skipProcessing;
export { SkipProcessingOptions };
