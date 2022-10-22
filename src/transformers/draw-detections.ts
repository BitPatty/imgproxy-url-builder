import { stringifyOptions } from '../common.js';

/**
 * The draw detection options
 */
type DrawDetectionOptions = {
  /**
   * The class names. If omitted, imgproxy draws the
   * bounding boxes of all the detected objects.
   */
  classNames?: string[];
};

/**
 * Detects objects of the provided classes and draws their
 * bounding boxes.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#draw-detections-iddraw-detections for the imgproxy documentation
 *
 * @param options  The detection options
 * @returns        The draw detection param string
 */
const drawDetections = (options: DrawDetectionOptions): string =>
  stringifyOptions('dd', [true, ...(options.classNames ?? [])]);

export default drawDetections;
export { DrawDetectionOptions };
