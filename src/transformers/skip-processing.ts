import { stringifyOptions } from '../utils';

/**
 * The list of formats which should not be processed
 */
type SkipProcessingOptions = string[];

/**
 * When set, imgproxy will skip the processing of the listed formats
 *
 * Note: Processing can only be skipped when the requested format is
 * the same as the source format.
 *
 * Note: Video thumbnail processing can't be skipped
 *
 * @param extensions The list of file extensions
 */
const skipProcessing = (extensions: SkipProcessingOptions): string =>
  stringifyOptions('skp', extensions);

export default skipProcessing;
export { SkipProcessingOptions };
