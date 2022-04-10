# imgproxy-url-builder

A helper library for building Imgproxy URLs.

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
```

## Supported Imgproxy Transformations

| Transformation                                                                                                                                             | Supported       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| [`Signature`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#signature)                     | ☑               |
| [`Blur`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#blur)                               | ☑               |
| [`Resize`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#resize)                           | ☑               |
| [`Size`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#size)                               | 〰 (via Resize) |
| [`Width`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#width)                             | 〰 (via Resize) |
| [`Height`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#height)                           | 〰 (via Resize) |
| [`Dpr`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#dpr)                                 | ☑               |
| [`Enlarge`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#enlarge)                         | ☑               |
| [`Extend`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#extend)                           | ☑               |
| [`Gravity`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#gravity)                         | ☑               |
| [`Crop`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#crop)                               | ☑               |
| [`Padding`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#padding)                         | ☑               |
| [`Trim`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#trim)                               | ☑               |
| [`Rotate`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#rotate)                           | ☑               |
| [`Quality`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#quality)                         | ☑               |
| [`Max Bytes`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#max-bytes)                     | ☑               |
| [`Background`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#background)                   | ☑               |
| [`Sharpen`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#sharpen)                         | ☑               |
| [`Watermark`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#watermark)                     | ☑               |
| [`Preset`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#preset)                           | ☑               |
| [`Cache Buster`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#cache-buster)               | ☑               |
| [`Strip Metadata`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#strip-metadata)           | ☑               |
| [`Strip Color Profile`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#strip-color-profile) | ☑               |
| [`Auto Rotate`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#auto-rotate)                 | ☑               |
| [`Filename`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#filename)                       | ☑               |
| [`Format`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#format)                           | ☑               |

## Suported Imgproxy PRO transformations

| Transformation                                                                                                                                                                            | Supported                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`Resizing Algorithm`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#resizing-algorithm-idresizing-algorithm)             | ☑                                           |
| [`Background Alpha`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#background-alpha-idbackground-alpha)                   | ☑                                           |
| [`Adjust`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#adjust-idadjust)                                                 | 〰 (via brightness / contrast / saturation) |
| [`Brightness`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#brightness-idbrightness)                                     | ☑                                           |
| [`Contrast`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#contrast-idcontrast)                                           | ☑                                           |
| [`Saturation`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#saturation-idsaturation)                                     | ☑                                           |
| [`Pixelate`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#pixelate)                                                      | ☑                                           |
| [`Unsharpening`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#unsharpening-idunsharpening)                               | ☑                                           |
| [`Watermark URL`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#watermark-url-idwatermark-url)                            | ☑                                           |
| [`Style`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#style-idstyle)                                                    | ❌                                          |
| [`JPEG options`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#jpeg-options-idjpeg-options)                               | ☑                                           |
| [`PNG options`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#png-options-idpng-options)                                  | ☑                                           |
| [`GIF options`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#gif-options-idgif-options)                                  | ☑                                           |
| [`Page`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#page-idpage)                                                       | ☑                                           |
| [`Video Thumbnail Second`](https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#video-thumbnail-second-idvideo-thumbnail-second) | ☑                                           |
