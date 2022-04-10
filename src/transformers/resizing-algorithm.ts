// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#resizing-algorithm-idresizing-algorithm

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
