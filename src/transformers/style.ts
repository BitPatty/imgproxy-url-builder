import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../common';

/**
 * The CSS styles to apply to the source SVG image
 */
type StyleOptions = Record<string, string | number> | string;

/**
 * When set, imgproxy will prepend a <style> node with the
 * provided CSS styles to the <svg> node of a source SVG image.
 *
 * @see {@link https://github.com/imgproxy/imgproxy/blob/6f292443eafb2e39f9252175b61faa6b38105a7c/docs/generating_the_url.md#style-idstyle}. for the imgproxy documentation
 *
 * @param styles  The styles to apply
 * @returns       The style param string
 */
const style = (styles: StyleOptions): string => {
  const styleString =
    typeof styles === 'string'
      ? styles
      : Object.entries(styles)
          .flatMap((v) => `${v[0]}:${v[1]}`)
          .join(';');

  return stringifyOptions('st', [base64urlEncode(utf8encode(styleString))]);
};

export default style;
export { StyleOptions };
