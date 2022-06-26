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
