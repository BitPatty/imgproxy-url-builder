import pb, {
  GradientDirection,
  GravityType,
  ResizeType,
  ResizingAlgorithm,
  UnsharpeningMode,
  WatermarkPosition,
} from '../src/index.js';

import { base64urlEncode, utf8encode } from '../src/crypto/codec.js';

describe('Transformers', () => {
  describe('Adjust', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().adjust({})).toIncludeModifierIdentifier('adjust');
    });

    test('Applies Modifier', () => {
      expect(
        pb().adjust({
          brightness: 12,
          contrast: 34,
          saturation: 56,
        }),
      ).toIncludeModifier('a:12:34:56');
    });
  });

  describe('Auto Rotate', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().autoRotate()).toIncludeModifierIdentifier('autoRotate');
    });

    test('Applies Modifier', () => {
      expect(pb().autoRotate()).toIncludeModifier('ar:true');
    });
  });

  describe('Background', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().background({ r: 12, g: 12, b: 12 }),
      ).toIncludeModifierIdentifier('background');
    });

    test('Applies Modifier (RGB)', () => {
      expect(pb().background({ r: 12, g: 23, b: 45 })).toIncludeModifier(
        'bg:12:23:45',
      );
    });

    test('Applies Modifier (Hex Encoded)', () => {
      expect(pb().background('123456')).toIncludeModifier(
        'bg:' + encodeURIComponent('123456'),
      );
    });
  });

  describe('Background Alpha', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().backgroundAlpha(1)).toIncludeModifierIdentifier(
        'backgroundAlpha',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().backgroundAlpha(23)).toIncludeModifier('bga:23');
    });
  });

  describe('Blur', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().blur(3)).toIncludeModifierIdentifier('blur');
    });

    test('Applies Modifier', () => {
      expect(pb().blur(10)).toIncludeModifier('bl:10');
    });
  });

  describe('Blur Detection', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().blurDetections({ sigma: 12 })).toIncludeModifierIdentifier(
        'blurDetections',
      );
    });

    test('Applies Modifier', () => {
      expect(
        pb().blurDetections({
          sigma: 10,
          classNames: ['foo', 'bar'],
        }),
      ).toIncludeModifier('bd:10:foo:bar');
    });
  });

  describe('Brightness', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().brightness(1)).toIncludeModifierIdentifier('brightness');
    });

    test('Applies Modifier', () => {
      expect(pb().brightness(10)).toIncludeModifier('br:10');
    });
  });

  describe('Cache Buster', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().cacheBuster('foo')).toIncludeModifierIdentifier(
        'cacheBuster',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().cacheBuster('#/-abc')).toIncludeModifier(
        'cb:' + encodeURIComponent('#/-abc'),
      );
    });
  });

  describe('Contrast', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().contrast(0.3)).toIncludeModifierIdentifier('contrast');
    });

    test('Applies Modifier', () => {
      expect(pb().contrast(0.3)).toIncludeModifier('co:0.3');
    });
  });

  describe('Crop', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().crop({})).toIncludeModifierIdentifier('crop');
    });

    test('Applies Modifier', () => {
      expect(
        pb().crop({
          width: 12,
          height: 34,
          gravity: {
            type: GravityType.CENTER,
            offset: {
              x: 56,
              y: 78,
            },
          },
        }),
      ).toIncludeModifier('c:12:34:ce:56:78');
    });

    test('Omits Gravity If Not Specified', () => {
      expect(
        pb().crop({
          width: 12,
          height: 34,
        }),
      ).toIncludeModifier('c:12:34');
    });

    test('Uses Default Size If Not Specified', () => {
      expect(pb().crop({})).toIncludeModifier('c:0:0');
    });
  });

  describe('Disable Animation', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().disableAnimation()).toIncludeModifierIdentifier(
        'disableAnimation',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().disableAnimation()).toIncludeModifier('da:true');
    });
  });

  describe('DPR', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().dpr(3)).toIncludeModifierIdentifier('dpr');
    });

    test('Applies Modifier', () => {
      expect(pb().dpr(10)).toIncludeModifier('dpr:10');
    });
  });

  describe('Draw Detection', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().drawDetections({ classNames: ['foo'] }),
      ).toIncludeModifierIdentifier('drawDetections');
    });

    test('Applies Modifier', () => {
      expect(
        pb().drawDetections({ classNames: ['foo', 'bar'] }),
      ).toIncludeModifier('dd:true:foo:bar');
    });
  });

  describe('Enforce Thumbnail', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().enforceThumbnail()).toIncludeModifierIdentifier(
        'enforceThumbnail',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().enforceThumbnail()).toIncludeModifier('eth:true');
    });
  });

  describe('Enlarge', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().enlarge()).toIncludeModifierIdentifier('enlarge');
    });

    test('Applies Modifier', () => {
      expect(pb().enlarge()).toIncludeModifier('el:true');
    });
  });

  describe('Expires', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().expires(new Date())).toIncludeModifierIdentifier('expires');
    });

    test('Applies Modifier (Date)', () => {
      const date = new Date();
      expect(pb().expires(date)).toIncludeModifier(
        `exp:${Math.floor(date.getTime() / 1000)}`,
      );
    });

    test('Applies Modifier (Epoch)', () => {
      expect(pb().expires(123)).toIncludeModifier(`exp:123`);
    });
  });

  describe('Extend', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().extend()).toIncludeModifierIdentifier('extend');
    });

    test('Applies Modifier', () => {
      expect(pb().extend()).toIncludeModifier('ex:true');
    });
  });

  describe('Extend Aspect Ratio', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().extendAspectRatio()).toIncludeModifierIdentifier(
        'extendAspectRatio',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().extendAspectRatio()).toIncludeModifier('exar:true');
    });

    test('Applies Gravity Type', () => {
      expect(
        pb().extendAspectRatio({ gravity: { type: GravityType.NORTH } }),
      ).toIncludeModifier('exar:true:no');
    });

    test('Applies Gravity Offset', () => {
      expect(
        pb().extendAspectRatio({
          gravity: { type: GravityType.NORTH, offset: { x: 1.1, y: 2.2 } },
        }),
      ).toIncludeModifier('exar:true:no:1.1:2.2');
    });
  });

  describe('Fallback Image URL', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().fallbackImageUrl('http://test.test'),
      ).toIncludeModifierIdentifier('fallbackImageUrl');
    });

    test('Applies Modifier', () => {
      const url = 'https://test.test';
      expect(pb().fallbackImageUrl(url)).toIncludeModifier(
        'fiu:' + Buffer.from(url).toString('base64').replace(/=*$/, ''),
      );
    });
  });

  describe('Filename', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().fileName('foo.png')).toIncludeModifierIdentifier('fileName');
    });

    test('Applies Modifier', () => {
      expect(pb().fileName('foo.png')).toIncludeModifier('fn:foo.png');
    });

    test('Applies Encoded Modifier', () => {
      expect(pb().fileName('ZmlsZW5hbWUucG5n', true)).toIncludeModifier(
        'fn:ZmlsZW5hbWUucG5n:true',
      );
    });
  });

  describe('Format Quality', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().formatQuality({})).toIncludeModifierIdentifier(
        'formatQuality',
      );
    });

    test('Applies Modifier', () => {
      expect(
        pb().formatQuality({
          png: 10,
          jpeg: 14,
        }),
      ).toIncludeModifier('fq:png:10:jpeg:14');
    });
  });

  describe('Format', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().format('png')).toIncludeModifierIdentifier('format');
    });

    test('Applies Modifier', () => {
      expect(pb().format('png')).toIncludeModifier('f:png');
    });
  });

  describe('GIF Options', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().gifOptions({})).toIncludeModifierIdentifier('gifOptions');
    });

    test('Applies Modifier', () => {
      expect(
        pb().gifOptions({
          optimizeFrames: true,
          optimizeTransparency: true,
        }),
      ).toIncludeModifier('gifo:true:true');
    });
  });

  describe('Gradient', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().gradient({ opacity: 1 })).toIncludeModifierIdentifier(
        'gradient',
      );
    });

    test('Applies Modifier', () => {
      expect(
        pb().gradient({
          opacity: 1,
          direction: GradientDirection.UP,
          color: 'ff0000',
          start: 1.3,
          stop: 1.6,
        }),
      ).toIncludeModifier('gr:1:ff0000:up:1.3:1.6');
    });

    test('Applies default values', () => {
      expect(
        pb().gradient({
          opacity: 1,
        }),
      ).toIncludeModifier('gr:1:000:down:0.0:1.0');
    });
  });

  describe('Gravity', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().gravity({ type: GravityType.NORTH }),
      ).toIncludeModifierIdentifier('gravity');
    });

    test('Applies Modifier', () => {
      expect(
        pb().gravity({
          type: GravityType.NORTHWEST,
          offset: { x: 12, y: 34 },
        }),
      ).toIncludeModifier('g:nowe:12:34');
    });

    test('Omits offsets if not specified', () => {
      expect(
        pb().gravity({
          type: GravityType.NORTHWEST,
        }),
      ).toIncludeModifier('g:nowe');
    });
  });

  describe('JPEG Options', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().jpegOptions({})).toIncludeModifierIdentifier('jpegOptions');
    });

    test('Applies Modifier', () => {
      expect(
        pb().jpegOptions({
          progressive: true,
          noSubsample: true,
          trellisQuant: true,
          overshootDeringing: true,
          optimizeScans: true,
          quantizationTable: 2,
        }),
      ).toIncludeModifier('jpgo:true:true:true:true:true:2');
    });
  });

  describe('Keep Copyright', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().keepCopyright()).toIncludeModifierIdentifier('keepCopyright');
    });

    test('Applies Modifier', () => {
      expect(pb().keepCopyright()).toIncludeModifier('kcr:true');
    });
  });

  describe('Max Bytes', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().maxBytes(120)).toIncludeModifierIdentifier('maxBytes');
    });

    test('Applies Modifier', () => {
      expect(pb().maxBytes(10)).toIncludeModifier('mb:10');
    });
  });

  describe('Min Height', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().minHeight(12)).toIncludeModifierIdentifier('minHeight');
    });

    test('Applies Modifier', () => {
      expect(pb().minHeight(12)).toIncludeModifier('mh:12');
    });
  });

  describe('Min Width', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().minWidth(12)).toIncludeModifierIdentifier('minWidth');
    });

    test('Applies Modifier', () => {
      expect(pb().minWidth(12)).toIncludeModifier('mw:12');
    });
  });

  describe('Pad', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().pad({})).toIncludeModifierIdentifier('pad');
    });

    test('Applies Modifier', () => {
      expect(
        pb().pad({ top: 12, right: 34, left: 56, bottom: 78 }),
      ).toIncludeModifier('pd:12:34:78:56');
    });
  });

  describe('Page', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().page(1)).toIncludeModifierIdentifier('page');
    });

    test('Applies Modifier', () => {
      expect(pb().page(3)).toIncludeModifier('pg:3');
    });
  });

  describe('Pixelate', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().pixelate(2)).toIncludeModifierIdentifier('pixelate');
    });

    test('Applies Modifier', () => {
      expect(pb().pixelate(12)).toIncludeModifier('pix:12');
    });
  });

  describe('PNG Options', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().pngOptions({})).toIncludeModifierIdentifier('pngOptions');
    });

    test('Applies Modifier', () => {
      expect(
        pb().pngOptions({
          interlaced: true,
          quantization_colors: 3,
          quantize: true,
        }),
      ).toIncludeModifier('pngo:true:true:3');
    });
  });

  describe('Preset', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().preset('foobar')).toIncludeModifierIdentifier('preset');
    });

    test('Applies Modifier (Single Preset)', () => {
      expect(pb().preset('foobar')).toIncludeModifier('pr:foobar');
    });

    test('Applies Modifier (Multiple Presets)', () => {
      expect(pb().preset(['foobar1', 'foobar2'])).toIncludeModifier(
        'pr:foobar1:foobar2',
      );
    });
  });

  describe('Raw', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().raw()).toIncludeModifierIdentifier('raw');
    });

    test('Applies Modifier', () => {
      expect(pb().raw()).toIncludeModifier('raw:true');
    });
  });

  describe('Return Attachment', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().returnAttachment()).toIncludeModifierIdentifier(
        'returnAttachment',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().returnAttachment()).toIncludeModifier('att:true');
    });
  });

  describe('Quality', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().quality(9)).toIncludeModifierIdentifier('quality');
    });

    test('Applies Modifier', () => {
      expect(pb().quality(10)).toIncludeModifier('q:10');
    });
  });

  describe('Resize', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().resize({})).toIncludeModifierIdentifier('resize');
    });

    test('Applies Modifier', () => {
      expect(
        pb().resize({
          type: ResizeType.AUTO,
          width: 12,
          height: 34,
        }),
      ).toIncludeModifier('rs:auto:12:34');
    });
  });

  describe('Resizing Algorithm', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().resizingAlgorithm(ResizingAlgorithm.LANCZOS2),
      ).toIncludeModifierIdentifier('resizingAlgorithm');
    });

    test('Applies Modifier', () => {
      expect(
        pb().resizingAlgorithm(ResizingAlgorithm.LANCZOS3),
      ).toIncludeModifier('ra:lanczos3');
    });
  });

  describe('Rotate', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().rotate(90)).toIncludeModifierIdentifier('rotate');
    });

    test('Applies Modifier', () => {
      expect(pb().rotate(90)).toIncludeModifier('rot:90');
    });
  });

  describe('Saturation', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().saturation(9)).toIncludeModifierIdentifier('saturation');
    });

    test('Applies Modifier', () => {
      expect(pb().saturation(12)).toIncludeModifier('sa:12');
    });
  });

  describe('Sharpen', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().sharpen(9)).toIncludeModifierIdentifier('sharpen');
    });

    test('Applies Modifier', () => {
      expect(pb().sharpen(12)).toIncludeModifier('sh:12');
    });
  });

  describe('Skip Processing', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().skipProcessing([])).toIncludeModifierIdentifier(
        'skipProcessing',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().skipProcessing(['png'])).toIncludeModifier('skp:png');
    });
  });

  describe('Strip Color Profile', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().stripColorProfile()).toIncludeModifierIdentifier(
        'stripColorProfile',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().stripColorProfile()).toIncludeModifier('scp:true');
    });
  });

  describe('Strip Metadata', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().stripMetadata()).toIncludeModifierIdentifier('stripMetadata');
    });

    test('Applies Modifier', () => {
      expect(pb().stripMetadata()).toIncludeModifier('sm:true');
    });
  });

  describe('Style', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().style('')).toIncludeModifierIdentifier('style');
    });

    test('Applies Modifier (String)', () => {
      expect(pb().style('foobar')).toIncludeModifier(
        'st:' + base64urlEncode(utf8encode('foobar')),
      );
    });

    test('Applies Modifier (Record)', () => {
      expect(pb().style({ foo: 'bar', abc: 1 })).toIncludeModifier(
        'st:' + base64urlEncode(utf8encode('foo:bar;abc:1')),
      );
    });
  });

  describe('Trim', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().trim({ threshold: 3 })).toIncludeModifierIdentifier('trim');
    });

    test('Applies Modifier', () => {
      expect(
        pb().trim({
          threshold: 12,
          color: '123123',
          equal: {
            horizontal: true,
            vertical: true,
          },
        }),
      ).toIncludeModifier('t:12:123123:true:true');
    });
  });

  describe('Unsharpen', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().unsharpen({ mode: UnsharpeningMode.NONE }),
      ).toIncludeModifierIdentifier('unsharpen');
    });

    test('Applies Modifier', () => {
      expect(
        pb().unsharpen({
          mode: UnsharpeningMode.NONE,
          weight: 12,
          dividor: 34,
        }),
      ).toIncludeModifier('ush:none:12:34');
    });
  });

  describe('Video Thumbnail Second', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().videoThumbnailSecond(3)).toIncludeModifierIdentifier(
        'videoThumbnailSecond',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().videoThumbnailSecond(12)).toIncludeModifier('vts:12');
    });
  });

  describe('Watermark Shadow', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().watermarkShadow(3)).toIncludeModifierIdentifier(
        'watermarkShadow',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().watermarkShadow(1)).toIncludeModifier('wmsh:1');
    });
  });

  describe('Watermark Size', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().watermarkSize({ width: 3, height: 3 }),
      ).toIncludeModifierIdentifier('watermarkSize');
    });

    test('Applies Modifier', () => {
      expect(
        pb().watermarkSize({
          width: 12,
          height: 34,
        }),
      ).toIncludeModifier('wms:12:34');
    });
  });

  describe('Watermark Text', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().watermarkText('foobar')).toIncludeModifierIdentifier(
        'watermarkText',
      );
    });

    test('Applies Modifier', () => {
      expect(pb().watermarkText('foobar')).toIncludeModifier(
        'wmt:' + base64urlEncode(utf8encode('foobar')),
      );
    });
  });

  describe('Watermark URL', () => {
    test('Uses Proper Identifier', () => {
      expect(
        pb().watermarkUrl('https://test.test'),
      ).toIncludeModifierIdentifier('watermarkUrl');
    });

    test('Applies Modifier', () => {
      expect(pb().watermarkUrl('https://test.test')).toIncludeModifier(
        'wmu:' + base64urlEncode(utf8encode('https://test.test')),
      );
    });
  });

  describe('Watermark', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().watermark({ opacity: 3 })).toIncludeModifierIdentifier(
        'watermark',
      );
    });

    test('Applies Modifier', () => {
      expect(
        pb().watermark({
          opacity: 12,
          position: WatermarkPosition.REPLICATE,
        }),
      ).toIncludeModifier('wm:12:re');
    });
  });

  describe('Zoom', () => {
    test('Uses Proper Identifier', () => {
      expect(pb().zoom(3)).toIncludeModifierIdentifier('zoom');
    });

    test('Applies Modifier (X/Y)', () => {
      expect(pb().zoom(12)).toIncludeModifier('z:12');
    });

    test('Applies Modifier (X, Y)', () => {
      expect(pb().zoom([12, 34])).toIncludeModifier('z:12%2034');
    });
  });
});
