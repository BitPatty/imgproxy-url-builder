import { stringifyOptions } from '../common.js';

/**
 * Use a single frame of animated images.
 *
 * See https://github.com/imgproxy/imgproxy/blob/cfa4b596d1f31656f9116cc16f2a4ff7d15c2837/docs/generating_the_url.md#disable-animation-iddisable-animation for the imgproxy documentation
 *
 * @returns The disable animation param string
 */
const disableAnimation = (): string => stringifyOptions('da', [true]);

export default disableAnimation;
