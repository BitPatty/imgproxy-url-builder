import { stringifyOptions } from '../common.js';

/**
 * Whether the latest keyframe before the video thumbnail second
 * should be used for thumbnail generation
 */
type VideoThumbnailKeyframesOptions = boolean;

/**
 * Specifies whether the latest keyframe before the video thumbnail second
 * should be used for thumbnail generation
 *
 * See https://github.com/imgproxy/imgproxy-docs/blob/676c6d4b1f5d9fee79abfecf130fc7dda3f9124e/versioned_docs/version-3.24.x/usage/processing.mdx#video-thumbnail-keyframes-pro-video-thumbnail-keyframes for the imgproxy documentation
 *
 * @param keyframes  The keyframes to be used.
 * @returns          The video thumbnail keyframes param string
 */
const videoThumbnailKeyframes = (
  keyframes: VideoThumbnailKeyframesOptions,
): string => stringifyOptions('vtk', [keyframes]);

export default videoThumbnailKeyframes;
export { VideoThumbnailKeyframesOptions };
