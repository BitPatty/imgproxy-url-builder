// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#resize

import GravityType from '../enums/gravity-type.enum';
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

  /**
   * If true, enlarge the image if it is smaller
   * than the given size
   */
  enlarge?: boolean;

  /**
   * If true, extend the image if it is smaller
   * than the given size.
   *
   * Uses the gravity option if specified
   */
  extend?:
    | boolean
    | {
        type: Omit<GravityType, GravityType.SMART>;
        offset?: {
          x: number;
          y: number;
        };
      };
};

/**
 * Resizes the image
 *
 * @param options The resizing options
 *
 * @returns The resizing params
 */
const resize = (options: ResizeOptions): string =>
  stringifyOptions('rs', [
    options.type,
    options.width,
    options.height,
    options.enlarge,
    ...(typeof options.extend === 'boolean'
      ? [options.extend]
      : [
          options.extend?.type as string,
          options.extend?.offset?.x,
          options.extend?.offset?.y,
        ]),
  ]);

export default resize;
export { ResizeOptions };
