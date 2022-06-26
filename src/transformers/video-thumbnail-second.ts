import { stringifyOptions } from '../common';

/**
 * The timestamp of the frame in seconds
 */
type VideoThumbnailSecondOptions = number;

/**
 * Redefines the second used for the thumbnail.
 *
 * View the documentation at {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#video-thumbnail-second-idvideo-thumbnail-second}.
 *
 * @param second  The timestamp of the frame in seconds
 *                that will be used for a thumbnail.
 * @returns       The video thumbnail second param string
 */
const videoThumbnailSecond = (second: VideoThumbnailSecondOptions): string =>
  stringifyOptions('vts', [second]);

export default videoThumbnailSecond;
export { VideoThumbnailSecondOptions };
