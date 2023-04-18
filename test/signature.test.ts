import pb from '../src/index.js';

describe('Signature', () => {
  test('Adds Signature', () => {
    expect(
      pb()
        .rotate(90)
        .blur(10)
        .build({
          path: 's3://mybucket/myimage.png',
          signature: {
            key: 'a91bdcda48ce22cd7d8d3a0eda93',
            salt: 'a91bdcda48ce22cd7d8d3a0eda93',
          },
        }),
    ).toEqual(
      '/TXf2QXtZkU-ULvrg0pLDqJlWUb7XdHkXD0h6NFWD-mo/rot:90/bl:10/czM6Ly9teWJ1Y2tldC9teWltYWdlLnBuZw',
    );
  });

  test('Handles Uncommon Characters', () => {
    expect(
      pb()
        .rotate(90)
        .blur(10)
        .build({
          path: 's3://mybucket/💯🎆👌.png',
          signature: {
            key: 'a91bdcda48ce22cd7d8d3a0eda93',
            salt: 'a91bdcda48ce22cd7d8d3a0eda93',
          },
        }),
    ).toEqual(
      '/NJK9tMbW4O1rz2r4n7DJjsOAkRCZnIkiay31aKMnEb8/rot:90/bl:10/czM6Ly9teWJ1Y2tldC_wn5Kv8J-OhvCfkYwucG5n',
    );
  });

  test.each(new Array(32).fill(0).map((_, idx) => idx))(
    'Adds Truncated Signature, Size: %i',
    (size) => {
      expect(
        pb()
          .rotate(90)
          .blur(10)
          .build({
            path: 's3://mybucket/myimage.png',
            signature: {
              key: 'a91bdcda48ce22cd7d8d3a0eda93',
              salt: 'a91bdcda48ce22cd7d8d3a0eda93',
              size,
            },
          }),
      ).toEqual(
        `/${Buffer.from(
          'TXf2QXtZkU-ULvrg0pLDqJlWUb7XdHkXD0h6NFWD-mo',
          'base64url',
        )
          .subarray(0, size)
          .toString(
            'base64url',
          )}/rot:90/bl:10/czM6Ly9teWJ1Y2tldC9teWltYWdlLnBuZw`,
      );
    },
  );
});
