import { stringifyOptions } from '../common.js';

/**
 * The video thumbnail tile options
 */
type VideoThumbnailTileOptions = {
  /**
   * The step of timestamp (in seconds) between video frames that
   * should be used for thumbnail generation
   */
  step: number;

  /**
   * The number of columns in the sprite
   */
  columns: number;

  /**
   * The number of rows in the sprite
   */
  rows: number;

  /**
   * The width of the tile
   */
  tileWidth: number;

  /**
   * The height of the tile
   */
  tileHeight: number;

  /**
   * When set to true, imgproxy will extend each tile to the
   * requested size using a black background
   */
  extendTile?: boolean;

  /**
   * When set to true, imgproxy will trim th eunused space
   * from the sprite.
   */
  trim?: boolean;

  /**
   * When set to true, imgproxy will use the fill resizing type
   * for the tiles
   */
  fill?: boolean;

  /**
   * Floating point number between 0 and 1 that define
   * the coordinates of the center of the tile.
   */
  focusX?: number;

  /**
   * Floating point number between 0 and 1 that define
   * the coordinates of the center of the tile.
   */
  focusY?: number;
};

/**
 * Generates a tiled sprite using hte source video frames
 *
 * See https://github.com/imgproxy/imgproxy-docs/blob/676c6d4b1f5d9fee79abfecf130fc7dda3f9124e/versioned_docs/version-3.24.x/usage/processing.mdx#video-thumbnail-tile-pro-video-thumbnail-tile for the imgproxy documentation
 *
 * @param second  The video thumbnail tile options
 * @returns       The video thumbnail tile param string
 */
const videoThumbnailTile = (options: VideoThumbnailTileOptions): string =>
  stringifyOptions('vtt', [
    options.step,
    options.columns,
    options.rows,
    options.tileWidth,
    options.tileHeight,
    options.extendTile ?? false,
    options.trim ?? false,
    options.fill ?? false,
    options.focusX ?? '0.5',
    options.focusY ?? '0.5',
  ]);

export default videoThumbnailTile;
export { VideoThumbnailTileOptions };
