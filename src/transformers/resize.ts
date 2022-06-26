import ResizeType from '../enums/resize-type.enum';
import { stringifyOptions } from '../utils';

/**
 * The available options for the crop operation
 */
type ResizeOptions = {
  /**
   * The resizing strategy
   */
  type?: ResizeType;

  /**
   * The target width
   */
  width?: number;

  /**
   * The target height
   */
  height?: number;
};

/**
 * Resizes the image
 *
 * @param options The resizing options
 *
 * @returns The resizing params
 */
const resize = (options: ResizeOptions): string =>
  stringifyOptions('rs', [options.type, options.width, options.height]);

export default resize;
export { ResizeOptions };
