import { stringifyOptions } from '../utils';

/**
 * Returns attachment in the Content-Disposition header
 */
const returnAttachment = (): string => stringifyOptions('att', [true]);

export default returnAttachment;
