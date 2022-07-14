import ResizeType from '../enums/resize-type.enum';
import { stringifyOptions } from '../common';

/**
 * The resize options
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
 * Resizes the image.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#resize for the imgproxy documentation
 *
 * @param options  The resizing options
 * @returns        The resizing param string
 */
const resize = (options: ResizeOptions): string =>
  stringifyOptions('rs', [options.type, options.width, options.height]);

export default resize;
export { ResizeOptions };
