// Reference: https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#video-thumbnail-second-idvideo-thumbnail-second

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
  stringifyOptions('pg', [second]);

export default videoThumbnailSecond;
export { VideoThumbnailSecondOptions };
