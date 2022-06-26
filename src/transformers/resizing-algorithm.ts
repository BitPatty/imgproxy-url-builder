import ResizingAlgorithm from '../enums/resizing-algorithm.enum';
import { stringifyOptions } from '../common';

/**
 * The resizing algorithm
 */
type ResizingAlgorithmOptions = ResizingAlgorithm;

/**
 * Defines the algorithm that imgproxy will use for resizing.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#resizing-algorithm-idresizing-algorithm}.
 *
 * @param algorithm  The resizing algorithm
 * @returns          The resizing algorithm param string
 */
const resizingAlgorithm = (algorithm: ResizingAlgorithmOptions): string =>
  stringifyOptions('ra', [algorithm]);

export default resizingAlgorithm;
export { ResizingAlgorithmOptions };
