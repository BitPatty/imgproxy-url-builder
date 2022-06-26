import { stringifyOptions } from '../utils';

type VideoThumbnailSecondOptions = number;

/**
 * Redefines the second used for the thumbnail
 *
 * @param second The timestamp of the frame in seconds
 * that will be used for a thumbnail.
 *
 * @returns The video thumbnail second params
 */
const videoThumbnailSecond = (second: VideoThumbnailSecondOptions): string =>
  stringifyOptions('vts', [second]);

export default videoThumbnailSecond;
export { VideoThumbnailSecondOptions };
