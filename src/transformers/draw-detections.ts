import { stringifyOptions } from '../utils';

type DrawDetectionOptions = {
  /**
   * The class names. If omitted, imgproxy draws the
   * bounding boxes of all the detected objects.
   */
  classNames?: string[];
};

/**
 * Detects objects of the provided classes and draws their
 * bounding boxes
 *
 * @param options The detection options
 * @returns       The draw detection params
 */
const drawDetections = (options: DrawDetectionOptions): string =>
  stringifyOptions('dd', [true, ...(options.classNames ?? [])]);

export default drawDetections;
export { DrawDetectionOptions };
