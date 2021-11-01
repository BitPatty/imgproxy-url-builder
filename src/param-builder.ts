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
import extend from './transformers/extend';
import fileName, { FileNameOptions } from './transformers/filename';
import format, { FormatOptions } from './transformers/format';
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
import stripColorProfile from './transformers/strip-color-profile';
import stripMetadata from './transformers/strip-metadata';
import trim, { TrimOptions } from './transformers/trim';
import unsharpen, { UnsharpeningOptions } from './transformers/unsharpen';
import videoThumbnailSecond, {
  VideoThumbnailSecondOptions,
} from './transformers/video-thumbnail-second';
import watermark, { WatermarkOptions } from './transformers/watermark';
import watermarkUrl, {
  WatermarkUrlOptions,
} from './transformers/watermark-url';

import { encodeFilePath, generateSignature } from './utils';

type ForwardType = Partial<ParamBuilder> & {
  readonly modifiers: string[];
};

type OmitTransformer<
  T extends ForwardType,
  K extends keyof ParamBuilder,
> = Omit<T, K>;

class ParamBuilder {
  public readonly modifiers: string[];

  public constructor(initialModifiers: string[] = []) {
    this.modifiers = initialModifiers;
  }

  /**
   * Creates a new param builder instance with the
   * current modifiers
   *
   * @returns A copy of this param builder
   */
  public clone<T extends ForwardType>(this: T): T {
    return new ParamBuilder([...this.modifiers]) as T;
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
    if (!path) return this.modifiers.join('/');
    const mods = [...this.modifiers];

    if (path && plain) mods.push('plain', path);
    else mods.push(encodeFilePath(path));

    const res = mods.join('/');

    // If no signature is calculated add a - as placeholder
    // See https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_basic.md#signature
    const finalPath = signature
      ? `${generateSignature(res, signature.key, signature.salt)}/${res}`
      : `-/${res}`;

    return baseUrl ? `${baseUrl}/${finalPath}` : `/${finalPath}`;
  }

  /**
   * Automatically rotates the image based on
   * the EXIF orientation parameter
   */
  public autoRotate<T extends ForwardType>(
    this: T,
  ): OmitTransformer<T, 'autoRotate'> {
    this.modifiers.push(autoRotate());
    return this;
  }

  /**
   * Fills the image background with the specified color
   *
   * @param options The background color (hex encoded string or RGB object)
   */
  public background<T extends ForwardType>(
    this: T,
    options: BackgroundOptions,
  ): OmitTransformer<T, 'background'> {
    this.modifiers.push(background(options));
    return this;
  }

  /**
   * Adds alpha channel to background.
   *
   * @param options A positive floating point number between 0 and 1.
   */
  public backgroundAlpha<T extends ForwardType>(
    this: T,
    options: BackgroundAlphaOptions,
  ): OmitTransformer<T, 'backgroundAlpha'> {
    this.modifiers.push(backgroundAlpha(options));
    return this;
  }

  /**
   * Applies a gaussian blur filter to the image
   *
   * @param sigma The size of the blur mask
   */
  public blur<T extends ForwardType>(
    this: T,
    options: BlurOptions,
  ): OmitTransformer<T, 'blur'> {
    this.modifiers.push(blur(options));
    return this;
  }

  /**
   * When set, imgproxy will adjust brightness of the resulting image.
   *
   * @param options An integer number in range from -255 to 255.
   */
  public brightness<T extends ForwardType>(
    this: T,
    options: BrightnessOptions,
  ): OmitTransformer<T, 'blur'> {
    this.modifiers.push(brightness(options));
    return this;
  }

  /**
   * Adds a cache buster to the imgproxy params
   */
  public cacheBuster<T extends ForwardType>(
    this: T,
    options: CacheBusterOptions,
  ): OmitTransformer<T, 'cacheBuster'> {
    this.modifiers.push(cacheBuster(options));
    return this;
  }

  /**
   * When set, imgproxy will adjust contrast of the resulting image.
   *
   * @param percentage A positive floating point number, where 1
   * keeps the contrast unchanged.
   */
  public contrast<T extends ForwardType>(
    this: T,
    options: ContrastOptions,
  ): OmitTransformer<T, 'contrast'> {
    this.modifiers.push(contrast(options));
    return this;
  }

  /**
   * Crops the image
   *
   * @param options The cropping options
   */
  public crop<T extends ForwardType>(
    this: T,
    options: CropOptions,
  ): OmitTransformer<T, 'crop'> {
    this.modifiers.push(crop(options));
    return this;
  }

  /**
   * Multiplies the dimensions according to the specified factor
   *
   * @param options the Dpr factor (must be greater than 0)
   */
  public dpr<T extends ForwardType>(
    this: T,
    options: DprOptions,
  ): OmitTransformer<T, 'dpr'> {
    this.modifiers.push(dpr(options));
    return this;
  }

  /**
   * Enlarges the image of it is smaller than the given size
   */
  public enlarge<T extends ForwardType>(
    this: T,
  ): OmitTransformer<T, 'enlarge'> {
    this.modifiers.push(enlarge());
    return this;
  }

  /**
   * Extends the image of it is smaller than the given size
   */
  public extend<T extends ForwardType>(this: T): OmitTransformer<T, 'extend'> {
    this.modifiers.push(extend());
    return this;
  }

  /**
   * Sets the filename for the Content-Disposition header
   *
   * @param options The filename
   */
  public filename<T extends ForwardType>(
    this: T,
    options: FileNameOptions,
  ): OmitTransformer<T, 'filename'> {
    this.modifiers.push(fileName(options));
    return this;
  }

  /**
   * Specifies the resulting image format
   *
   * @param options The target format
   */
  public format<T extends ForwardType>(
    this: T,
    options: FormatOptions,
  ): OmitTransformer<T, 'format'> {
    this.modifiers.push(format(options));
    return this;
  }

  /**
   * Allows redefining GIF saving options
   *
   * @param options The gif options
   */
  public gifOptions<T extends ForwardType>(
    this: T,
    options: GifOptions,
  ): OmitTransformer<T, 'gifOptions'> {
    this.modifiers.push(gifOptions(options));
    return this;
  }

  /**
   * Sets the gravity
   *
   * @param options The gravity options
   */
  public gravity<T extends ForwardType>(
    this: T,
    options: GravityOptions,
  ): OmitTransformer<T, 'gravity'> {
    this.modifiers.push(gravity(options));
    return this;
  }

  /**
   * Allows redefining JPEG saving options
   *
   * @param options The jpeg options
   */
  public jpegOptions<T extends ForwardType>(
    this: T,
    options: JpegOptions,
  ): OmitTransformer<T, 'jpegOptions'> {
    this.modifiers.push(jpegOptions(options));
    return this;
  }

  /**
   * Limits the file size to the specified
   * Specifies the resulting image format
   *
   * Note: only applicable to jpg, webp, heic and tiff
   *
   * @param options The number of bytes
   */
  public maxBytes<T extends ForwardType>(
    this: T,
    options: MaxBytesOptions,
  ): OmitTransformer<T, 'maxBytes'> {
    this.modifiers.push(maxBytes(options));
    return this;
  }

  /**
   * Applies the specified padding to the image
   *
   * @param options The padding options
   */
  public pad<T extends ForwardType>(
    this: T,
    options: PaddingOptions,
  ): OmitTransformer<T, 'pad'> {
    this.modifiers.push(pad(options));
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
  public page<T extends ForwardType>(
    this: T,
    options: PageOptions,
  ): OmitTransformer<T, 'page'> {
    this.modifiers.push(page(options));
    return this;
  }

  /**
   * Applies a pixelate filter to the resulting image.
   *
   * @param options The size of a pixel
   */
  public pixelate<T extends ForwardType>(
    this: T,
    options: PixelateOptions,
  ): OmitTransformer<T, 'pixelate'> {
    this.modifiers.push(pixelate(options));
    return this;
  }

  /**
   * Allows redefining PNG saving options
   *
   * @param options The png options
   */
  public pngOptions<T extends ForwardType>(
    this: T,
    options: PngOptions,
  ): OmitTransformer<T, 'pngOptions'> {
    this.modifiers.push(pngOptions(options));
    return this;
  }

  /**
   * Sets one or many presets to be used by the imgproxy
   *
   * @param options The presets
   */
  public preset<T extends ForwardType>(
    this: T,
    options: PresetOptions,
  ): OmitTransformer<T, 'preset'> {
    this.modifiers.push(preset(options));
    return this;
  }

  /**
   * Defines the algorithm that imgproxy will use for resizing.
   *
   * @param options The resizing algorithm
   */
  public resizingAlgorithm<T extends ForwardType>(
    this: T,
    options: ResizingAlgorithmOptions,
  ): OmitTransformer<T, 'resizingAlgorithm'> {
    this.modifiers.push(resizingAlgorithm(options));
    return this;
  }

  /**
   * Redefines the quality of the resulting image
   *
   * @param options The quality in percentage (between 0 and 1)
   */
  public quality<T extends ForwardType>(
    this: T,
    options: QualityOptions,
  ): OmitTransformer<T, 'quality'> {
    this.modifiers.push(quality(options));
    return this;
  }

  /**
   * Resizes the image
   *
   * @param options The resizing options
   */
  public resize<T extends ForwardType>(
    this: T,
    options: ResizeOptions,
  ): OmitTransformer<T, 'resize'> {
    this.modifiers.push(resize(options));
    return this;
  }

  /**
   * Rotates the image by the specified angle
   *
   * @param options The angle
   */
  public rotate<T extends ForwardType>(
    this: T,
    options: RotationOptions,
  ): OmitTransformer<T, 'rotate'> {
    this.modifiers.push(rotate(options));
    return this;
  }

  /**
   * When set, imgproxy will adjust saturation of the resulting image.
   *
   * @param options A positive floating point number, where 1
   * keeps the saturation unchanged.
   */
  public saturation<T extends ForwardType>(
    this: T,
    options: SaturationOptions,
  ): OmitTransformer<T, 'saturation'> {
    this.modifiers.push(saturation(options));
    return this;
  }

  /**
   * Applies a sharpen filter to the image
   *
   * @param sigma The size of the sharpen mask
   */
  public sharpen<T extends ForwardType>(
    this: T,
    options: SharpenOptions,
  ): OmitTransformer<T, 'sharpen'> {
    this.modifiers.push(sharpen(options));
    return this;
  }

  /**
   * Strips the color profile from teh image
   */
  public stripColorProfile<T extends ForwardType>(
    this: T,
  ): OmitTransformer<T, 'stripColorProfile'> {
    this.modifiers.push(stripColorProfile());
    return this;
  }

  /**
   * Strips the metadata from teh image
   */
  public stripMetadata<T extends ForwardType>(
    this: T,
  ): OmitTransformer<T, 'stripMetadata'> {
    this.modifiers.push(stripMetadata());
    return this;
  }

  /**
   * Trims the image background
   *
   * @param options The trimming options
   */
  public trim<T extends ForwardType>(
    this: T,
    options: TrimOptions,
  ): OmitTransformer<T, 'trim'> {
    this.modifiers.push(trim(options));
    return this;
  }

  /**
   * Allows redefining unsharpening options.
   *
   * @param options The unsharpening options
   */
  public unsharpen<T extends ForwardType>(
    this: T,
    options: UnsharpeningOptions,
  ): OmitTransformer<T, 'unsharpen'> {
    this.modifiers.push(unsharpen(options));
    return this;
  }

  /**
   * Redefines the second used for the thumbnail
   *
   * @param options The timestamp of the frame in seconds
   * that will be used for a thumbnail.
   */
  public videoThumbnailSecond<T extends ForwardType>(
    this: T,
    options: VideoThumbnailSecondOptions,
  ): OmitTransformer<T, 'unsharpen'> {
    this.modifiers.push(videoThumbnailSecond(options));
    return this;
  }

  /**
   * Applies a gaussian blur filter to the image
   *
   * @param options The size of the blur mask
   */
  public watermark<T extends ForwardType>(
    this: T,
    options: WatermarkOptions,
  ): OmitTransformer<T, 'watermark'> {
    this.modifiers.push(watermark(options));
    return this;
  }

  /**
   * Sets the watermark URL
   *
   * @param options The watermark URL
   */
  public watermarkUrl<T extends ForwardType>(
    this: T,
    options: WatermarkUrlOptions,
  ): OmitTransformer<T, 'watermarkUrl'> {
    this.modifiers.push(watermarkUrl(options));
    return this;
  }
}

const pb = (): ParamBuilder => new ParamBuilder();

export default pb;
export { ParamBuilder };
