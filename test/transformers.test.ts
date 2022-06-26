import pb, {
  GravityType,
  ResizeType,
  ResizingAlgorithm,
  UnsharpeningMode,
  WatermarkPosition,
} from '../src';

import { base64urlEncode, utf8encode } from '../src/crypto/codec';

describe('Transformers', () => {
  describe('Adjust', () => {
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
    test('Applies Modifier', () => {
      expect(pb().autoRotate()).toIncludeModifier('ar:true');
    });
  });

  describe('Background', () => {
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
    test('Applies Modifier', () => {
      expect(pb().backgroundAlpha(23)).toIncludeModifier('bga:23');
    });
  });

  describe('Blur', () => {
    test('Applies Modifier', () => {
      expect(pb().blur(10)).toIncludeModifier('bl:10');
    });
  });

  describe('Blur Detection', () => {
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
    test('Applies Modifier', () => {
      expect(pb().brightness(10)).toIncludeModifier('br:10');
    });
  });

  describe('Cache Buster', () => {
    test('Applies Modifier', () => {
      expect(pb().cacheBuster('#/-abc')).toIncludeModifier(
        'cb:' + encodeURIComponent('#/-abc'),
      );
    });
  });

  describe('Contrast', () => {
    test('Applies Modifier', () => {
      expect(pb().contrast(0.3)).toIncludeModifier('co:0.3');
    });
  });

  describe('Crop', () => {
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

  describe('DPR', () => {
    test('Applies Modifier', () => {
      expect(pb().dpr(10)).toIncludeModifier('dpr:10');
    });
  });

  describe('Draw Detection', () => {
    test('Applies Modifier', () => {
      expect(
        pb().drawDetections({ classNames: ['foo', 'bar'] }),
      ).toIncludeModifier('dd:true:foo:bar');
    });
  });

  describe('Enforce Thumbnail', () => {
    test('Applies Modifier', () => {
      expect(pb().enforceThumbnail()).toIncludeModifier('eth:true');
    });
  });

  describe('Enlarge', () => {
    test('Applies Modifier', () => {
      expect(pb().enlarge()).toIncludeModifier('el:true');
    });
  });

  describe('Expires', () => {
    test('Applies Modifier (Date)', () => {
      const date = new Date();
      expect(pb().expires(date)).toIncludeModifier(`exp:${date.getTime()}`);
    });

    test('Applies Modifier (Epoch)', () => {
      expect(pb().expires(123)).toIncludeModifier(`exp:123`);
    });
  });

  describe('Extend', () => {
    test('Applies Modifier', () => {
      expect(pb().extend()).toIncludeModifier('ex:true');
    });
  });

  describe('Fallback Image URL', () => {
    test('Applies Modifier', () => {
      const url = 'https://test.test';
      expect(pb().fallbackImageUrl(url)).toIncludeModifier(
        'fiu:' + Buffer.from(url).toString('base64').replace(/=*$/, ''),
      );
    });
  });

  describe('Filename', () => {
    test('Applies Modifier', () => {
      expect(pb().filename('foo.png')).toIncludeModifier('fn:foo.png');
    });
  });

  describe('Format Quality', () => {
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
    test('Applies Modifier', () => {
      expect(pb().format('png')).toIncludeModifier('f:png');
    });
  });

  describe('GIF Options', () => {
    test('Applies Modifier', () => {
      expect(
        pb().gifOptions({
          optimizeFrames: true,
          optimizeTransparency: true,
        }),
      ).toIncludeModifier('gifo:true:true');
    });
  });

  describe('Gravity', () => {
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
    test('Applies Modifier', () => {
      expect(pb().keepCopyright()).toIncludeModifier('kcr:true');
    });
  });

  describe('Max Bytes', () => {
    test('Applies Modifier', () => {
      expect(pb().maxBytes(10)).toIncludeModifier('mb:10');
    });
  });

  describe('Min Height', () => {
    test('Applies Modifier', () => {
      expect(pb().minHeight(12)).toIncludeModifier('mh:12');
    });
  });

  describe('Min Width', () => {
    test('Applies Modifier', () => {
      expect(pb().minWidth(12)).toIncludeModifier('mw:12');
    });
  });

  describe('Pad', () => {
    test('Applies Modifier', () => {
      expect(
        pb().pad({ top: 12, right: 34, left: 56, bottom: 78 }),
      ).toIncludeModifier('pd:12:34:78:56');
    });
  });

  describe('Page', () => {
    test('Applies Modifier', () => {
      expect(pb().page(3)).toIncludeModifier('pg:3');
    });
  });

  describe('Pixelate', () => {
    test('Applies Modifier', () => {
      expect(pb().pixelate(12)).toIncludeModifier('pix:12');
    });
  });

  describe('PNG Options', () => {
    test('Applies Modifier', () => {
      expect(
        pb().pngOptions({
          interlaced: true,
          quantization_colors: true,
          quantize: true,
        }),
      ).toIncludeModifier('pngo:true:true:true');
    });
  });

  describe('Preset', () => {
    test('Applies Modifier (Single Preset)', () => {
      expect(pb().preset('foobar')).toIncludeModifier('pr:foobar');
    });

    test('Applies Modifier (Multiple Presets)', () => {
      expect(pb().preset(['foobar1', 'foobar2'])).toIncludeModifier(
        'pr:foobar1:foobar2',
      );
    });
  });

  describe('Return Attachment', () => {
    test('Applies Modifier', () => {
      expect(pb().returnAttachment()).toIncludeModifier('att:true');
    });
  });

  describe('Quality', () => {
    test('Applies Modifier', () => {
      expect(pb().quality(10)).toIncludeModifier('q:10');
    });
  });

  describe('Resize', () => {
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
    test('Applies Modifier', () => {
      expect(
        pb().resizingAlgorithm(ResizingAlgorithm.LANCZOS3),
      ).toIncludeModifier('ra:lanczos3');
    });
  });

  describe('Rotate', () => {
    test('Applies Modifier', () => {
      expect(pb().rotate(90)).toIncludeModifier('rot:90');
    });
  });

  describe('Saturation', () => {
    test('Applies Modifier', () => {
      expect(pb().saturation(12)).toIncludeModifier('sa:12');
    });
  });

  describe('Sharpen', () => {
    test('Applies Modifier', () => {
      expect(pb().sharpen(12)).toIncludeModifier('sh:12');
    });
  });

  describe('Skip Processing', () => {
    test('Applies Modifier', () => {
      expect(pb().skipProcessing(['png'])).toIncludeModifier('skp:png');
    });
  });

  describe('Strip Color Profile', () => {
    test('Applies Modifier', () => {
      expect(pb().stripColorProfile()).toIncludeModifier('scp:true');
    });
  });

  describe('Strip Metadata', () => {
    test('Applies Modifier', () => {
      expect(pb().stripMetadata()).toIncludeModifier('sm:true');
    });
  });

  describe('Style', () => {
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
    test('Applies Modifier', () => {
      expect(pb().videoThumbnailSecond(12)).toIncludeModifier('vts:12');
    });
  });

  describe('Watermark Size', () => {
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
    test('Applies Modifier', () => {
      expect(pb().watermarkText('foobar')).toIncludeModifier(
        'wmt:' + base64urlEncode(utf8encode('foobar')),
      );
    });
  });

  describe('Watermark URL', () => {
    test('Applies Modifier', () => {
      expect(pb().watermarkUrl('https://test.test')).toIncludeModifier(
        'wmu:' + base64urlEncode(utf8encode('https://test.test')),
      );
    });
  });

  describe('Watermark', () => {
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
    test('Applies Modifier (X/Y)', () => {
      expect(pb().zoom(12)).toIncludeModifier('z:12');
    });

    test('Applies Modifier (X, Y)', () => {
      expect(pb().zoom([12, 34])).toIncludeModifier('z:12%2034');
    });
  });
});
