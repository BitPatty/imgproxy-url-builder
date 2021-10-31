// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#resizing-algorithm-idresizing-algorithm

import ResizingAlgorithm from '../enums/resizing-algorithm.enum';
import { stringifyOptions } from '../utils';

type ResizingAlgorithmOptions = ResizingAlgorithm;

/**
 * Defines the algorithm that imgproxy will use for resizing.
 *
 * @param algorithm The resizing algorithm
 *
 * @returns The resizing algorithm params
 */
const resizingAlgorithm = (algorithm: ResizingAlgorithmOptions): string =>
  stringifyOptions('ra', [algorithm]);

export default resizingAlgorithm;
export { ResizingAlgorithmOptions };
