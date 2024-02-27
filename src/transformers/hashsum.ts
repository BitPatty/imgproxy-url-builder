import { stringifyOptions } from '../common.js';

import HashsumType from '../enums/hashsum-type.enum.js';

type HashsumOptions = {
  /**
   * The expected hex-encoded hashsum of the source image
   */
  hashsum: string;

  /**
   * The hashsum type
   */
  type?: HashsumType;
};

/**
 * When `hashsum_type` is not `none`, imgproxy will calculate the hashsum of the source image
 * and compare it with the provided hashsum.
 *
 * If they don't match, imgproxy will respond with 422.
 *
 * See https://github.com/imgproxy/imgproxy-docs/blob/f9d7908d253ec2b31425b988a48f8c28cb271c58/docs/usage/processing.mdx#L916 for the imgproxy documentation
 *
 * @returns The auto-rotate param string
 */
const hashsum = (options: HashsumOptions): string =>
  stringifyOptions('hashsum', [
    options.type ?? HashsumType.NONE,
    options.hashsum,
  ]);

export default hashsum;
export { HashsumOptions };
