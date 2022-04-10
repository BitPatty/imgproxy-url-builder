// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#page-idpage

import { stringifyOptions } from '../utils';

type PageOptions = number;

/**
 * When source image supports pagination (PDF, TIFF)
 * or animation (GIF, WebP), this option allows
 * specifying the page to use.
 *
 * Pages numeration starts from zero.
 *
 * @param page The page to use
 *
 * @returns The page params
 */
const page = (pg: PageOptions): string => stringifyOptions('pg', [pg]);

export default page;
export { PageOptions };
