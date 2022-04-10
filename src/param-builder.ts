import autoRotate from './transformers/auto-rotate';
import background, { BackgroundOptions } from './transformers/background';
import backgroundAlpha, {
  BackgroundAlphaOptions,
} from './transformers/background-alpha';
import blur, { BlurOptions } from './transformers/blur';
import brightness, { BrightnessOptions } from './transformers/brightness';
import cacheBuster, { CacheBusterOptions } from './transformers/cache-buster';
import contrast, { ContrastOptions } from './transformers/contrast';
import crop, { CropOptions } from './transformers/crop';
import dpr, { DprOptions } from './transformers/dpr';
import enlarge from './transformers/enlarge';
import expires, { ExpiresOptions } from './transformers/expires';
import extend from './transformers/extend';
import fallbackImageUrl, {
  FallbackImageUrlOptions,
} from './transformers/fallback-image-url';
import fileName, { FileNameOptions } from './transformers/filename';
import format, { FormatOptions } from './transformers/format';
import formatQuality, {
  FormatQualityOptions,
} from './transformers/format-quality';
import gifOptions, { GifOptions } from './transformers/gif-options';
import gravity, { GravityOptions } from './transformers/gravity';
import jpegOptions, { JpegOptions } from './transformers/jpeg-options';
import maxBytes, { MaxBytesOptions } from './transformers/max-bytes';
import pad, { PaddingOptions } from './transformers/pad';
import page, { PageOptions } from './transformers/page';
import pixelate, { PixelateOptions } from './transformers/pixelate';
import pngOptions, { PngOptions } from './transformers/png-options';
import preset, { PresetOptions } from './transformers/preset';
import quality, { QualityOptions } from './transformers/quality';
import resize, { ResizeOptions } from './transformers/resize';
import resizingAlgorithm, {
  ResizingAlgorithmOptions,
} from './transformers/resizing-algorithm';
import rotate, { RotationOptions } from './transformers/rotate';
import saturation, { SaturationOptions } from './transformers/saturation';
import sharpen, { SharpenOptions } from './transformers/sharpen';
import skipProcessing, {
  SkipProcessingOptions,
} from './transformers/skip-processing';
import stripColorProfile from './transformers/strip-color-profile';
import stripMetadata from './transformers/strip-metadata';
import style, { StyleOptions } from './transformers/style';
import trim, { TrimOptions } from './transformers/trim';
import unsharpen, { UnsharpeningOptions } from './transformers/unsharpen';
import videoThumbnailSecond, {
  VideoThumbnailSecondOptions,
} from './transformers/video-thumbnail-second';
import watermark, { WatermarkOptions } from './transformers/watermark';
import watermarkSize, {
  WatermarkSizeOptions,
} from './transformers/watermark-size';
import watermarkText, {
  WatermarkTextOptions,
} from './transformers/watermark-text';
import watermarkUrl, {
  WatermarkUrlOptions,
} from './transformers/watermark-url';
import zoom, { ZoomOptions } from './transformers/zoom';

import { encodeFilePath, generateSignature } from './utils';

class ParamBuilder {
  public readonly modifiers: Map<keyof ParamBuilder, string>;

  public constructor(
    initialModifiers: Map<keyof ParamBuilder, string> = new Map(),
  ) {
    this.modifiers = initialModifiers;
  }

  /**
   * Creates a new param builder instance with the
   * current modifiers
   *
   * @returns A copy of this param builder
   */
  public clone(this: this): ParamBuilder {
    return new ParamBuilder(new Map(this.modifiers));
  }

  /**
   * Unsets the specified modifier
   *
   * @param modifier  The modifier
   */
  public unset(this: this, modifier: keyof ParamBuilder): this {
    this.modifiers.delete(modifier);
    return this;
  }

  /**
   * Builds the imgproxy URL
   *
   * @param options The URL options
   *
   * @returns The imgproxy URL
   */
  public build(options?: {
    path: string;
    baseUrl?: string;
    plain?: boolean;
    signature?: { key: string; salt: string };
  }): string {
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
   * Automatically rotates the image based on
   * the EXIF orientation parameter
   */
  public autoRotate(this: this): this {
    this.modifiers.set('autoRotate', autoRotate());
    return this;
  }

  /**
   * Fills the image background with the specified color
   *
   * @param options The background color (hex encoded string or RGB object)
   */
  public background(this: this, options: BackgroundOptions): this {
    this.modifiers.set('background', background(options));
    return this;
  }

  /**
   * Adds alpha channel to background.
   *
   * @param options A positive floating point number between 0 and 1.
   */
  public backgroundAlpha(this: this, options: BackgroundAlphaOptions): this {
    this.modifiers.set('backgroundAlpha', backgroundAlpha(options));
    return this;
  }

  /**
   * Applies a gaussian blur filter to the image
   *
   * @param sigma The size of the blur mask
   */
  public blur(this: this, options: BlurOptions): this {
    this.modifiers.set('blur', blur(options));
    return this;
  }

  /**
   * When set, imgproxy will adjust brightness of the resulting image.
   *
   * @param options An integer number in range from -255 to 255.
   */
  public brightness(this: this, options: BrightnessOptions): this {
    this.modifiers.set('brightness', brightness(options));
    return this;
  }

  /**
   * Adds a cache buster to the imgproxy params
   */
  public cacheBuster(this: this, options: CacheBusterOptions): this {
    this.modifiers.set('cacheBuster', cacheBuster(options));
    return this;
  }

  /**
   * When set, imgproxy will adjust contrast of the resulting image.
   *
   * @param percentage A positive floating point number, where 1
   * keeps the contrast unchanged.
   */
  public contrast(this: this, options: ContrastOptions): this {
    this.modifiers.set('contrast', contrast(options));
    return this;
  }

  /**
   * Crops the image
   *
   * @param options The cropping options
   */
  public crop(this: this, options: CropOptions): this {
    this.modifiers.set('crop', crop(options));
    return this;
  }

  /**
   * Multiplies the dimensions according to the specified factor
   *
   * @param options the Dpr factor (must be greater than 0)
   */
  public dpr(this: this, options: DprOptions): this {
    this.modifiers.set('dpr', dpr(options));
    return this;
  }

  /**
   * Enlarges the image of it is smaller than the given size
   */
  public enlarge(this: this): this {
    this.modifiers.set('enlarge', enlarge());
    return this;
  }

  /**
   * Returns a 404 if the provided timestamp expired
   *
   * @param options The expiration date / timestamp
   */
  public expires(this: this, options: ExpiresOptions): this {
    this.modifiers.set('expires', expires(options));
    return this;
  }

  /**
   * Extends the image of it is smaller than the given size
   */
  public extend(this: this): this {
    this.modifiers.set('extend', extend());
    return this;
  }

  /**
   * Sets the fallback image url
   *
   * @param options The image URL
   */
  public fallbackImageUrl(this: this, options: FallbackImageUrlOptions): this {
    this.modifiers.set('fallbackImageUrl', fallbackImageUrl(options));
    return this;
  }

  /**
   * Sets the filename for the Content-Disposition header
   *
   * @param options The filename
   */
  public filename(this: this, options: FileNameOptions): this {
    this.modifiers.set('filename', fileName(options));
    return this;
  }

  /**
   * Specifies the resulting image format
   *
   * @param options The target format
   */
  public format(this: this, options: FormatOptions): this {
    this.modifiers.set('format', format(options));
    return this;
  }

  /**
   * Specifies the format quality
   *
   * @param options The format quality options
   */
  public formatQuality(this: this, options: FormatQualityOptions): this {
    this.modifiers.set('formatQuality', formatQuality(options));
    return this;
  }

  /**
   * Allows redefining GIF saving options
   *
   * @param options The gif options
   */
  public gifOptions(this: this, options: GifOptions): this {
    this.modifiers.set('gifOptions', gifOptions(options));
    return this;
  }

  /**
   * Sets the gravity
   *
   * @param options The gravity options
   */
  public gravity(this: this, options: GravityOptions): this {
    this.modifiers.set('gravity', gravity(options));
    return this;
  }

  /**
   * Allows redefining JPEG saving options
   *
   * @param options The jpeg options
   */
  public jpegOptions(this: this, options: JpegOptions): this {
    this.modifiers.set('jpegOptions', jpegOptions(options));
    return this;
  }

  /**
   * Limits the file size to the specified
   * number of bytes
   *
   * Note: only applicable to jpg, webp, heic and tiff
   *
   * @param options The number of bytes
   */
  public maxBytes(this: this, options: MaxBytesOptions): this {
    this.modifiers.set('maxBytes', maxBytes(options));
    return this;
  }

  /**
   * Applies the specified padding to the image
   *
   * @param options The padding options
   */
  public pad(this: this, options: PaddingOptions): this {
    this.modifiers.set('pad', pad(options));
    return this;
  }

  /**
   * When source image supports pagination (PDF, TIFF)
   * or animation (GIF, WebP), this option allows
   * specifying the page to use.
   *
   * Pages numeration starts from zero.
   *
   * @param page The page to use
   */
  public page(this: this, options: PageOptions): this {
    this.modifiers.set('page', page(options));
    return this;
  }

  /**
   * Applies a pixelate filter to the resulting image.
   *
   * @param options The size of a pixel
   */
  public pixelate(this: this, options: PixelateOptions): this {
    this.modifiers.set('pixelate', pixelate(options));
    return this;
  }

  /**
   * Allows redefining PNG saving options
   *
   * @param options The png options
   */
  public pngOptions(this: this, options: PngOptions): this {
    this.modifiers.set('pngOptions', pngOptions(options));
    return this;
  }

  /**
   * Sets one or many presets to be used by the imgproxy
   *
   * @param options The presets
   */
  public preset(this: this, options: PresetOptions): this {
    this.modifiers.set('preset', preset(options));
    return this;
  }

  /**
   * Defines the algorithm that imgproxy will use for resizing.
   *
   * @param options The resizing algorithm
   */
  public resizingAlgorithm(
    this: this,
    options: ResizingAlgorithmOptions,
  ): this {
    this.modifiers.set('resizingAlgorithm', resizingAlgorithm(options));
    return this;
  }

  /**
   * Redefines the quality of the resulting image
   *
   * @param options The quality in percentage (between 0 and 1)
   */
  public quality(this: this, options: QualityOptions): this {
    this.modifiers.set('quality', quality(options));
    return this;
  }

  /**
   * Resizes the image
   *
   * @param options The resizing options
   */
  public resize(this: this, options: ResizeOptions): this {
    this.modifiers.set('resize', resize(options));
    return this;
  }

  /**
   * Rotates the image by the specified angle
   *
   * @param options The angle
   */
  public rotate(this: this, options: RotationOptions): this {
    this.modifiers.set('rotate', rotate(options));
    return this;
  }

  /**
   * When set, imgproxy will adjust saturation of the resulting image.
   *
   * @param options A positive floating point number, where 1
   * keeps the saturation unchanged.
   */
  public saturation(this: this, options: SaturationOptions): this {
    this.modifiers.set('saturation', saturation(options));
    return this;
  }

  /**
   * Applies a sharpen filter to the image
   *
   * @param sigma The size of the sharpen mask
   */
  public sharpen(this: this, options: SharpenOptions): this {
    this.modifiers.set('sharpen', sharpen(options));
    return this;
  }

  /**
   * Skips the processing for the specified extensions
   *
   * @param options The list of formats / extensions
   */
  public skipProcessing(this: this, options: SkipProcessingOptions): this {
    this.modifiers.set('skipProcessing', skipProcessing(options));
    return this;
  }

  /**
   * Strips the color profile from the image
   */
  public stripColorProfile(this: this): this {
    this.modifiers.set('stripColorProfile', stripColorProfile());
    return this;
  }

  /**
   * Strips the metadata from the image
   */
  public stripMetadata(this: this): this {
    this.modifiers.set('stripMetadata', stripMetadata());
    return this;
  }

  /**
   * Applies the specified CSS styles to an SVG source image
   *
   * @param options The CSS styles
   */
  public style(this: this, options: StyleOptions): this {
    this.modifiers.set('style', style(options));
    return this;
  }

  /**
   * Trims the image background
   *
   * @param options The trimming options
   */
  public trim(this: this, options: TrimOptions): this {
    this.modifiers.set('trim', trim(options));
    return this;
  }

  /**
   * Allows redefining unsharpening options.
   *
   * @param options The unsharpening options
   */
  public unsharpen(this: this, options: UnsharpeningOptions): this {
    this.modifiers.set('unsharpen', unsharpen(options));
    return this;
  }

  /**
   * Redefines the second used for the thumbnail
   *
   * @param options The timestamp of the frame in seconds
   * that will be used for a thumbnail.
   */
  public videoThumbnailSecond(
    this: this,
    options: VideoThumbnailSecondOptions,
  ): this {
    this.modifiers.set('videoThumbnailSecond', videoThumbnailSecond(options));
    return this;
  }

  /**
   * Applies a gaussian blur filter to the image
   *
   * @param options The size of the blur mask
   */
  public watermark(this: this, options: WatermarkOptions): this {
    this.modifiers.set('watermark', watermark(options));
    return this;
  }

  /**
   * Sets the watermark size
   *
   * @param options The watermark size
   */
  public watermarkSize(this: this, options: WatermarkSizeOptions): this {
    this.modifiers.set('watermarkSize', watermarkSize(options));
    return this;
  }

  /**
   * Sets the watermark Text
   *
   * @param options The watermark text
   */
  public watermarkText(this: this, options: WatermarkTextOptions): this {
    this.modifiers.set('watermarkText', watermarkText(options));
    return this;
  }

  /**
   * Sets the watermark URL
   *
   * @param options The watermark URL
   */
  public watermarkUrl(this: this, options: WatermarkUrlOptions): this {
    this.modifiers.set('watermarkUrl', watermarkUrl(options));
    return this;
  }

  /**
   * Multiplies the image according to the specified factors.
   * The values must be greater than 0.
   *
   * @param options The zoom options
   */
  public zoom(this: this, options: ZoomOptions): this {
    this.modifiers.set('zoom', zoom(options));
    return this;
  }
}

const pb = (): ParamBuilder => new ParamBuilder();

export default pb;
export { ParamBuilder };
