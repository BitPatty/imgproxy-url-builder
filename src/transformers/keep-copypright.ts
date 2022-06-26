import { stringifyOptions } from '../utils';

/**
 * Preserve the copyright info while stripping metadata.
 */
const keepCopyright = (): string => stringifyOptions('kcr', [true]);

export default keepCopyright;
