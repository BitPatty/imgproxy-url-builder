import adjust from './transformers/adjust';
import autoRotate from './transformers/auto-rotate';
import background from './transformers/background';
import backgroundAlpha from './transformers/background-alpha';
import blur from './transformers/blur';
import blurDetections from './transformers/blur-detections';
import brightness from './transformers/brightness';
import cacheBuster from './transformers/cache-buster';
import contrast from './transformers/contrast';
import crop from './transformers/crop';
import dpr from './transformers/dpr';
import drawDetections from './transformers/draw-detections';
import enforceThumbnail from './transformers/enforce-thumbnail';
import enlarge from './transformers/enlarge';
import expires from './transformers/expires';
import extend from './transformers/extend';
import fallbackImageUrl from './transformers/fallback-image-url';
import fileName from './transformers/filename';
import format from './transformers/format';
import formatQuality from './transformers/format-quality';
import gifOptions from './transformers/gif-options';
import gravity from './transformers/gravity';
import jpegOptions from './transformers/jpeg-options';
import keepCopyright from './transformers/keep-copypright';
import maxBytes from './transformers/max-bytes';
import minHeight from './transformers/min-height';
import minWidth from './transformers/min-width';
import pad from './transformers/pad';
import page from './transformers/page';
import pixelate from './transformers/pixelate';
import pngOptions from './transformers/png-options';
import preset from './transformers/preset';
import quality from './transformers/quality';
import resize from './transformers/resize';
import resizingAlgorithm from './transformers/resizing-algorithm';
import returnAttachment from './transformers/return-attachment';
import rotate from './transformers/rotate';
import saturation from './transformers/saturation';
import sharpen from './transformers/sharpen';
import skipProcessing from './transformers/skip-processing';
import stripColorProfile from './transformers/strip-color-profile';
import stripMetadata from './transformers/strip-metadata';
import style from './transformers/style';
import trim from './transformers/trim';
import unsharpen from './transformers/unsharpen';
import videoThumbnailSecond from './transformers/video-thumbnail-second';
import watermark from './transformers/watermark';
import watermarkSize from './transformers/watermark-size';
import watermarkText from './transformers/watermark-text';
import watermarkUrl from './transformers/watermark-url';
import zoom from './transformers/zoom';

import { encodeFilePath, generateSignature } from './common';

/**
 * The build options
 */
export type BuildOptions = {
  /**
   * The path to the target image, e.g. `https://example.com/foo.png`
   */
  path: string;

  /**
   * The base URL of the imgproxy instance, e.g. https://my-imgproxy.test
   */
  baseUrl?: string;

  /**
   * Whether to append the path in plain.
   *
   * Defaults to false. If true, encodes the path to a  base64url
   */
  plain?: boolean;

  /**
   * The signature to apply
   */
  signature?: {
    /**
     * The hex-encoded key of the signature
     */
    key: string;

    /**
     * The hex encoded salt of the signature
     */
    salt: string;
  };
};

class ParamBuilder {
  /**
   * The currently applied imgproxy modifiers
   */
  public readonly modifiers: Map<keyof ParamBuilder, string>;

  public constructor(
    initialModifiers: Map<keyof ParamBuilder, string> = new Map(),
  ) {
    this.modifiers = initialModifiers;
  }

  /**
   * Creates a new param builder instance with a copy of the
   * current modifiers
   *
   * @returns A copy of this param builder
   */
  public clone(this: this): ParamBuilder {
    return new ParamBuilder(new Map(this.modifiers));
  }

  /**
   * Removes the specified modifier from the currently applied
   * modifiers
   *
   * @param modifier  The modifier
   */
  public unset(
    this: this,
    modifier: Omit<
      keyof ParamBuilder,
      'build' | 'unset' | 'clone' | 'modifiers'
    >,
  ): this {
    this.modifiers.delete(modifier as keyof ParamBuilder);
    return this;
  }

  /**
   * Builds the imgproxy URL
   *
   * If a path is supplied, the full URL path will be returned,
   * else only the stringified modifiers will be returned.
   *
   * If a base URL is supplied, the full imgproxy URL will be returned.
   *
   * @param options  The build options
   * @returns        The imgproxy URL
   */
  public build(options?: BuildOptions): string {
    const { baseUrl, path, plain, signature } = options ?? {};
    const mods = Array.from(this.modifiers.values());
    if (!path) return mods.join('/');

    if (path && plain) mods.push('plain', path);
    else mods.push(encodeFilePath(path));

    const res = mods.join('/');

    // If no signature is calculated add a - as placeholder
    // See https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/signing_the_url.md
    const finalPath = signature
      ? `${generateSignature(res, signature.key, signature.salt)}/${res}`
      : `-/${res}`;

    return baseUrl ? `${baseUrl}/${finalPath}` : `/${finalPath}`;
  }

  /**
   * Defines the brightness, contrast, and saturation.
   */
  public adjust(this: this, ...options: Parameters<typeof adjust>): this {
    this.modifiers.set('adjust', adjust(...options));
    return this;
  }

  /**
   * Automatically rotates the image based on the EXIF orientation parameter.
   */
  public autoRotate(this: this): this {
    this.modifiers.set('autoRotate', autoRotate());
    return this;
  }

  /**
   * Fills the image background with the specified color.
   */
  public background(
    this: this,
    ...options: Parameters<typeof background>
  ): this {
    this.modifiers.set('background', background(...options));
    return this;
  }

  /**
   * Adds alpha channel to background.
   */
  public backgroundAlpha(
    this: this,
    ...options: Parameters<typeof backgroundAlpha>
  ): this {
    this.modifiers.set('backgroundAlpha', backgroundAlpha(...options));
    return this;
  }

  /**
   * Applies a gaussian blur filter to the image.
   */
  public blur(this: this, ...options: Parameters<typeof blur>): this {
    this.modifiers.set('blur', blur(...options));
    return this;
  }

  /**
   * Detects objects of the provided classes and blurs them.
   */
  public blurDetections(
    this: this,
    ...options: Parameters<typeof blurDetections>
  ): this {
    this.modifiers.set('blurDetections', blurDetections(...options));
    return this;
  }

  /**
   * Adjusts the brightness of an image.
   */
  public brightness(
    this: this,
    ...options: Parameters<typeof brightness>
  ): this {
    this.modifiers.set('brightness', brightness(...options));
    return this;
  }

  /**
   * Adds a cache buster to the imgproxy params.
   */
  public cacheBuster(
    this: this,
    ...options: Parameters<typeof cacheBuster>
  ): this {
    this.modifiers.set('cacheBuster', cacheBuster(...options));
    return this;
  }

  /**
   * Adjust contrast of the resulting image.
   */
  public contrast(this: this, ...options: Parameters<typeof contrast>): this {
    this.modifiers.set('contrast', contrast(...options));
    return this;
  }

  /**
   * Crops the image.
   */
  public crop(this: this, ...options: Parameters<typeof crop>): this {
    this.modifiers.set('crop', crop(...options));
    return this;
  }

  /**
   * Multiplies the dimensions according to the specified factor.
   */
  public dpr(this: this, ...options: Parameters<typeof dpr>): this {
    this.modifiers.set('dpr', dpr(...options));
    return this;
  }

  /**
   * Detects objects of the provided classes and draws their
   * bounding boxes.
   */
  public drawDetections(
    this: this,
    ...options: Parameters<typeof drawDetections>
  ): this {
    this.modifiers.set('drawDetections', drawDetections(...options));
    return this;
  }

  /**
   * If the source image has an embedded thumbnail, imgproxy will use the
   * embedded thumbnail instead of the main image.
   */
  public enforceThumbnail(this: this): this {
    this.modifiers.set('enforceThumbnail', enforceThumbnail());
    return this;
  }

  /**
   * Enlarges the image if it is smaller than the given size.
   */
  public enlarge(this: this): this {
    this.modifiers.set('enlarge', enlarge());
    return this;
  }

  /**
   * Returns a 404 if the expiration date is reached.
   */
  public expires(this: this, ...options: Parameters<typeof expires>): this {
    this.modifiers.set('expires', expires(...options));
    return this;
  }

  /**
   * Extends the image if it is smaller than the given size.
   */
  public extend(this: this, ...options: Parameters<typeof extend>): this {
    this.modifiers.set('extend', extend(...options));
    return this;
  }

  /**
   * Sets a custom fallback image by specifying its URL.
   */
  public fallbackImageUrl(
    this: this,
    ...options: Parameters<typeof fallbackImageUrl>
  ): this {
    this.modifiers.set('fallbackImageUrl', fallbackImageUrl(...options));
    return this;
  }

  /**
   * Sets the filename for the Content-Disposition header.
   */
  public filename(this: this, ...options: Parameters<typeof fileName>): this {
    this.modifiers.set('filename', fileName(...options));
    return this;
  }

  /**
   * Specifies the resulting image format.
   */
  public format(this: this, ...options: Parameters<typeof format>): this {
    this.modifiers.set('format', format(...options));
    return this;
  }

  /**
   * Sets the desired quality for each format.
   */
  public formatQuality(
    this: this,
    ...options: Parameters<typeof formatQuality>
  ): this {
    this.modifiers.set('formatQuality', formatQuality(...options));
    return this;
  }

  /**
   * Allows redefining GIF saving options.
   */
  public gifOptions(
    this: this,
    ...options: Parameters<typeof gifOptions>
  ): this {
    this.modifiers.set('gifOptions', gifOptions(...options));
    return this;
  }

  /**
   * Sets the gravity.
   */
  public gravity(this: this, ...options: Parameters<typeof gravity>): this {
    this.modifiers.set('gravity', gravity(...options));
    return this;
  }

  /**
   * Allows redefining JPEG saving options.
   */
  public jpegOptions(
    this: this,
    ...options: Parameters<typeof jpegOptions>
  ): this {
    this.modifiers.set('jpegOptions', jpegOptions(...options));
    return this;
  }

  /**
   * Preserve the copyright info while stripping metadata.
   */
  public keepCopyright(this: this): this {
    this.modifiers.set('keepCopyright', keepCopyright());
    return this;
  }

  /**
   * Limits the file size to the specified number of bytes.
   */
  public maxBytes(this: this, ...options: Parameters<typeof maxBytes>): this {
    this.modifiers.set('maxBytes', maxBytes(...options));
    return this;
  }

  /**
   * Defines the minimum height of the resulting image.
   */
  public minHeight(this: this, ...options: Parameters<typeof minHeight>): this {
    this.modifiers.set('minHeight', minHeight(...options));
    return this;
  }

  /**
   * Defines the minimum width of the resulting image.
   */
  public minWidth(this: this, ...options: Parameters<typeof minWidth>): this {
    this.modifiers.set('minWidth', minWidth(...options));
    return this;
  }

  /**
   * Applies the specified padding to the image.
   */
  public pad(this: this, ...options: Parameters<typeof pad>): this {
    this.modifiers.set('pad', pad(...options));
    return this;
  }

  /**
   * When source image supports pagination (PDF, TIFF) or animation (GIF, WebP), this option allows
   * specifying the page to use.
   */
  public page(this: this, ...options: Parameters<typeof page>): this {
    this.modifiers.set('page', page(...options));
    return this;
  }

  /**
   * Apply the pixelate filter to the resulting image.
   */
  public pixelate(this: this, ...options: Parameters<typeof pixelate>): this {
    this.modifiers.set('pixelate', pixelate(...options));
    return this;
  }

  /**
   * Allows redefining PNG saving options.
   */
  public pngOptions(
    this: this,
    ...options: Parameters<typeof pngOptions>
  ): this {
    this.modifiers.set('pngOptions', pngOptions(...options));
    return this;
  }

  /**
   * Sets one or many presets to be used by the imgproxy.
   */
  public preset(this: this, ...options: Parameters<typeof preset>): this {
    this.modifiers.set('preset', preset(...options));
    return this;
  }

  /**
   * Defines the algorithm that imgproxy will use for resizing.
   */
  public resizingAlgorithm(
    this: this,
    ...options: Parameters<typeof resizingAlgorithm>
  ): this {
    this.modifiers.set('resizingAlgorithm', resizingAlgorithm(...options));
    return this;
  }

  /**
   * Returns attachment in the Content-Disposition header.
   */
  public returnAttachment(this: this): this {
    this.modifiers.set('returnAttachment', returnAttachment());
    return this;
  }

  /**
   * Redefines the quality of the resulting image.
   */
  public quality(this: this, ...options: Parameters<typeof quality>): this {
    this.modifiers.set('quality', quality(...options));
    return this;
  }

  /**
   * Resizes the image.
   */
  public resize(this: this, ...options: Parameters<typeof resize>): this {
    this.modifiers.set('resize', resize(...options));
    return this;
  }

  /**
   * Rotates the image by the specified angle.
   */
  public rotate(this: this, ...options: Parameters<typeof rotate>): this {
    this.modifiers.set('rotate', rotate(...options));
    return this;
  }

  /**
   * Adjust saturation of the resulting image.
   */
  public saturation(
    this: this,
    ...options: Parameters<typeof saturation>
  ): this {
    this.modifiers.set('saturation', saturation(...options));
    return this;
  }

  /**
   * Applies a sharpen filter to the image.
   */
  public sharpen(this: this, ...options: Parameters<typeof sharpen>): this {
    this.modifiers.set('sharpen', sharpen(...options));
    return this;
  }

  /**
   * Skip the processing of the listed formats.
   */
  public skipProcessing(
    this: this,
    ...options: Parameters<typeof skipProcessing>
  ): this {
    this.modifiers.set('skipProcessing', skipProcessing(...options));
    return this;
  }

  /**
   * Strips the color profile from the image.
   */
  public stripColorProfile(this: this): this {
    this.modifiers.set('stripColorProfile', stripColorProfile());
    return this;
  }

  /**
   * Strips the metadata from the image.
   */
  public stripMetadata(this: this): this {
    this.modifiers.set('stripMetadata', stripMetadata());
    return this;
  }

  /**
   * Prepend a <style> node with the provided CSS styles to the
   *  <svg> node of a source SVG image.
   */
  public style(this: this, ...options: Parameters<typeof style>): this {
    this.modifiers.set('style', style(...options));
    return this;
  }

  /**
   * Trims the image background.
   */
  public trim(this: this, ...options: Parameters<typeof trim>): this {
    this.modifiers.set('trim', trim(...options));
    return this;
  }

  /**
   * Allows redefining unsharpening options.
   */
  public unsharpen(this: this, ...options: Parameters<typeof unsharpen>): this {
    this.modifiers.set('unsharpen', unsharpen(...options));
    return this;
  }

  /**
   * Redefines the second used for the thumbnail.
   */
  public videoThumbnailSecond(
    this: this,
    ...options: Parameters<typeof videoThumbnailSecond>
  ): this {
    this.modifiers.set(
      'videoThumbnailSecond',
      videoThumbnailSecond(...options),
    );
    return this;
  }

  /**
   * Places a watermark on the processed image.
   */
  public watermark(this: this, ...options: Parameters<typeof watermark>): this {
    this.modifiers.set('watermark', watermark(...options));
    return this;
  }

  /**
   * Defines the desired width and height of the watermark. imgproxy always
   * uses `fit` resizing type when resizing watermarks and enlarges them
   * when needed.
   */
  public watermarkSize(
    this: this,
    ...options: Parameters<typeof watermarkSize>
  ): this {
    this.modifiers.set('watermarkSize', watermarkSize(...options));
    return this;
  }

  /**
   * Generate an image from the provided text and use it as a watermark.
   */
  public watermarkText(
    this: this,
    ...options: Parameters<typeof watermarkText>
  ): this {
    this.modifiers.set('watermarkText', watermarkText(...options));
    return this;
  }

  /**
   * Use the image from the specified URL as a watermark.
   */
  public watermarkUrl(
    this: this,
    ...options: Parameters<typeof watermarkUrl>
  ): this {
    this.modifiers.set('watermarkUrl', watermarkUrl(...options));
    return this;
  }

  /**
   * Multiply the image dimensions according to the specified factors.
   */
  public zoom(this: this, ...options: Parameters<typeof zoom>): this {
    this.modifiers.set('zoom', zoom(...options));
    return this;
  }
}

/**
 * Creates a new param builder instance
 *
 * @returns  The param builder instance
 */
const pb = (): ParamBuilder => new ParamBuilder();

export default pb;
export { ParamBuilder };
