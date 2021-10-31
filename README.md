# imgproxy-js

WIP TS imgproxy library

## Supported Transformations

| Transformation                                                                                                                    | Supported                |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [`Signature`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#signature)                     | :white_check_mark:       |
| [`Blur`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#blur)                               | :white_check_mark:       |
| [`Resize`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#resize)                           | :white_check_mark:       |
| [`Size`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#size)                               | :wavy_dash: (via Resize) |
| [`Width`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#width)                             | :wavy_dash: (via Resize) |
| [`Height`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#height)                           | :wavy_dash: (via Resize) |
| [`Dpr`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#dpr)                                 | :white_check_mark:       |
| [`Enlarge`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#enlarge)                         | :wavy_dash: (via Resize) |
| [`Extend`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#extend)                           | :wavy_dash: (via Resize) |
| [`Gravity`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#gravity)                         | :white_check_mark:       |
| [`Crop`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#crop)                               | :white_check_mark:       |
| [`Padding`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#padding)                         | :white_check_mark:       |
| [`Trim`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#trim)                               | :white_check_mark:       |
| [`Rotate`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#rotate)                           | :white_check_mark:       |
| [`Quality`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#quality)                         | :white_check_mark:       |
| [`Max Bytes`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#max-bytes)                     | :white_check_mark:       |
| [`Background`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#background)                   | :white_check_mark:       |
| [`Sharpen`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#sharpen)                         | :white_check_mark:       |
| [`Watermark`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#watermark)                     | :white_check_mark:       |
| [`Preset`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#preset)                           | :white_check_mark:       |
| [`Cache Buster`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#cache-buster)               | :white_check_mark:       |
| [`Strip Metadata`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#strip-metadata)           | :white_check_mark:       |
| [`Strip Color Profile`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#strip-color-profile) | :white_check_mark:       |
| [`Auto Rotate`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#auto-rotate)                 | :white_check_mark:       |
| [`Filename`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#filename)                       | :white_check_mark:       |
| [`Format`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#format)                           | :white_check_mark:       |

## Suported PRO transformations

| Transformation                                                                                                                                                   | Supported |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| [`Resizing Algorithm`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#resizing-algorithm-idresizing-algorithm)             | :x:       |
| [`Background Alpha`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#background-alpha-idbackground-alpha)                   | :x:       |
| [`Adjust`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#adjust)                                                          | :x:       |
| [`Brightness`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#brightness-idbrightness)                                     | :x:       |
| [`Contrast`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#contrast-idcontrast)                                           | :x:       |
| [`Saturation`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#saturation-idsaturation)                                     | :x:       |
| [`Pixelate`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#pixelate-idpixelate)                                           | :x:       |
| [`Unsharpening`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#unsharpening-idunsharpening)                               | :x:       |
| [`Watermark URL`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#watermark-url-idwatermark)                                | :x:       |
| [`Style`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#style-idstyle)                                                    | :x:       |
| [`JPEG options`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#jpeg-options-idjpeg-options)                               | :x:       |
| [`PNG options`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#png-options-idpng-options)                                  | :x:       |
| [`GIF options`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#gif-options-idgif-options)                                  | :x:       |
| [`Page`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#page-idpage)                                                       | :x:       |
| [`Video Thumbnail Second`](https://github.com/imgproxy/imgproxy/blob/master/docs/generating_the_url_advanced.md#video-thumbnail-second-idvideo-thumbnail-second) | :x:       |
