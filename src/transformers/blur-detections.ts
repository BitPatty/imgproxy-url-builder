import { stringifyOptions } from '../utils';

type BlurDetectionOptions = {
  /**
   * The blur radios
   */
  sigma: number;

  /**
   * The class names. If omitted, imgproxy blurs all the detected objects.
   */
  classNames?: string[];
};

/**
 * Detects objects of the provided classes and blurs them
 *
 * @param options The detection options
 * @returns       The blur detection params
 */
const blurDetections = (options: BlurDetectionOptions): string =>
  stringifyOptions('bd', [options.sigma, ...(options.classNames ?? [])]);

export default blurDetections;
export { BlurDetectionOptions };
