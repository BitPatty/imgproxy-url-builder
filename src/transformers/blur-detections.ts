import { stringifyOptions } from '../common';

/**
 * The blur detection options
 */
type BlurDetectionOptions = {
  /**
   * The blur radius
   */
  sigma: number;

  /**
   * The class names. If omitted, imgproxy blurs all the detected objects.
   */
  classNames?: string[];
};

/**
 * Detects objects of the provided classes and blurs them.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#blur-detections-idblur-detections for the imgproxy documentation
 *
 * @param options  The detection options
 * @returns        The blur detection param string
 */
const blurDetections = (options: BlurDetectionOptions): string =>
  stringifyOptions('bd', [options.sigma, ...(options.classNames ?? [])]);

export default blurDetections;
export { BlurDetectionOptions };
