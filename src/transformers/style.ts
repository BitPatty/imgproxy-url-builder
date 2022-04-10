// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#style-idstyle

import { base64urlEncode, utf8encode } from '../crypto/codec';
import { stringifyOptions } from '../utils';

/**
 * The CSS styles to apply to the source SVG image
 */
type StyleOptions = Record<string, string | number> | string;

/**
 * When set, imgproxy will prepend a <style> node with the
 * provided CSS styles to the <svg> node of a source SVG image
 *
 * @param styles The styles to apply
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
