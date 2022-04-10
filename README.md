# imgproxy-url-builder

A helper library for building [imgproxy](https://github.com/imgproxy/imgproxy) URLs.

## Installation

```sh
npm i --save @bitpatty/imgproxy-url-builder
```

## Usage

You can simply import the param builder and chain your transformations.

For a list of available transformations visit the [API documentation page](https://zint.ch/imgproxy-url-builder/classes/ParamBuilder.html).

```typescript
import pb from '@bitpatty/imgproxy-url-builder';

// Just the transformer params
// Returns rot:90/bl:10
pb().rotate(90).blur(10).build();

// The transformer params with the target image
// Returns /-/rot:90/bl:10/czM6Ly9teWJ1Y2tldC9teWltYWdlLnBuZw
pb().rotate(90).blur(10).build({
  path: 's3://mybucket/myimage.png',
});

// You can disable path encoding by setting 'plain' to true
// Returns /-/rot:90/bl:10/plain/s3://mybucket/myimage.png
pb().rotate(90).blur(10).build({
  plain: true,
  path: 's3://mybucket/myimage.png',
});

// To sign your URL provide the key and salt
// The path is required to sign your URL!
// Returns /TXf2QXtZkU-ULvrg0pLDqJlWUb7XdHkXD0h6NFWD-mo/rot:90/bl:10/czM6Ly9teWJ1Y2tldC9teWltYWdlLnBuZw
pb()
  .rotate(90)
  .blur(10)
  .build({
    path: 's3://mybucket/myimage.png',
    signature: {
      key: 'a91bdcda48ce22cd7d8d3a0eda93',
      salt: 'a91bdcda48ce22cd7d8d3a0eda93',
    },
  });

// To automatically prepend the imgproxy URL
// provide it as the 'baseUrl' setting
// Returns https://my-imgproxy-instance.example.com/-/rot:90/bl:10/czM6Ly9teWJ1Y2tldC9teWltYWdlLnBuZw
pb().rotate(90).blur(10).build({
  path: 's3://mybucket/myimage.png',
  baseUrl: 'https://my-imgproxy-instance.example.com',
});

// You can clone the current configuration for templating / reuse
const template = pb().rotate(90);
const copy = template.clone();

// To remove a modifier, use the `unset` function
const t = pb().rotate(90).blur(10);
t.unset('rotate');

// ... Or you can replace the previous setting by calling the
// modifier again
const t = pb().rotate(90).blur(10); // rotate: 90, blur: 10
t.rotate(34); // rotate: 34, blur: 10
```

## Supported Imgproxy Transformations

| Transformation                                                                                                                                                                            | Supported                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`Adjust`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#adjust-idadjust)                                                 | 〰 (via brightness / contrast / saturation) |
| [`Auto Rotate`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#auto-rotate)                                                | ☑                                           |
| [`Background Alpha`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#background-alpha-idbackground-alpha)                   | ☑                                           |
| [`Background`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#background)                                                  | ☑                                           |
| [`Blur`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#blur)                                                              | ☑                                           |
| [`Brightness`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#brightness-idbrightness)                                     | ☑                                           |
| [`Cache Buster`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#cache-buster)                                              | ☑                                           |
| [`Contrast`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#contrast-idcontrast)                                           | ☑                                           |
| [`Crop`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#crop)                                                              | ☑                                           |
| [`Dpr`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#dpr)                                                                | ☑                                           |
| [`Enlarge`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#enlarge)                                                        | ☑                                           |
| [`Expires`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#expires)                                                        | ☑                                           |
| [`Extend`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#extend)                                                          | ☑                                           |
| [`Fallback Image URL`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#fallback-image-url-idfallback-image-url)             | ☑                                           |
| [`Filename`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#filename)                                                      | ☑                                           |
| [`Format`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#format)                                                          | ☑                                           |
| [`Format Quality Options`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#format-quality)                                  | ☑                                           |
| [`GIF options`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#gif-options-idgif-options)                                  | ☑                                           |
| [`Gravity`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#gravity)                                                        | ☑                                           |
| [`Height`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#height)                                                          | 〰 (via Resize)                             |
| [`JPEG options`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#jpeg-options-idjpeg-options)                               | ☑                                           |
| [`Max Bytes`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#max-bytes)                                                    | ☑                                           |
| [`Min Height`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#min-height)                                                  | ☑                                           |
| [`Min Width`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#min-width)                                                    | ☑                                           |
| [`Padding`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#padding)                                                        | ☑                                           |
| [`Page`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#page-idpage)                                                       | ☑                                           |
| [`Pixelate`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#pixelate)                                                      | ☑                                           |
| [`PNG options`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#png-options-idpng-options)                                  | ☑                                           |
| [`Preset`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#preset)                                                          | ☑                                           |
| [`Quality`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#quality)                                                        | ☑                                           |
| [`Resize`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#resize)                                                          | ☑                                           |
| [`Resizing Algorithm`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#resizing-algorithm-idresizing-algorithm)             | ☑                                           |
| [`Rotate`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#rotate)                                                          | ☑                                           |
| [`Saturation`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#saturation-idsaturation)                                     | ☑                                           |
| [`Sharpen`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#sharpen)                                                        | ☑                                           |
| [`Signature`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#signature)                                                    | ☑                                           |
| [`Size`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#size)                                                              | 〰 (via Resize)                             |
| [`Skip Processing`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#skip-processing)                                        | ☑                                           |
| [`Strip Color Profile`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#strip-color-profile)                                | ☑                                           |
| [`Strip Metadata`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#strip-metadata)                                          | ☑                                           |
| [`Style`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#style-idstyle)                                                    | ☑                                           |
| [`Trim`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#trim)                                                              | ☑                                           |
| [`Unsharpening`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#unsharpening-idunsharpening)                               | ☑                                           |
| [`Video Thumbnail Second`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#video-thumbnail-second-idvideo-thumbnail-second) | ☑                                           |
| [`Watermark URL`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#watermark-url-idwatermark-url)                            | ☑                                           |
| [`Watermark Size`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#watermark-size-idwatermark-size)                         | ☑                                           |
| [`Watermark Text`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#watermark-text-idwatermark-text)                         | ☑                                           |
| [`Watermark`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#watermark)                                                    | ☑                                           |
| [`Width`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#width)                                                            | 〰 (via Resize)                             |
| [`Zoom`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#zoom)                                                              | ☑                                           |
