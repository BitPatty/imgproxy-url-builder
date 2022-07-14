import { stringifyOptions } from '../common';

/**
 * The page number (starting from 0)
 */
type PageOptions = number;

/**
 * When source image supports pagination (PDF, TIFF) or animation (GIF, WebP), this option allows
 * specifying the page to use.
 *
 * Pages numeration starts from zero.
 *
 * See https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#page-idpage for the imgproxy documentation
 *
 * @param pg  The page to use
 * @returns   The page param string
 */
const page = (pg: PageOptions): string => stringifyOptions('pg', [pg]);

export default page;
export { PageOptions };
