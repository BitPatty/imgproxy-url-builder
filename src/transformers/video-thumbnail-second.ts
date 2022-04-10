// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#video-thumbnail-second-idvideo-thumbnail-second

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
