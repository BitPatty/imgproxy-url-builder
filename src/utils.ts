import { ParamBuilder } from './param-builder.js';

/**
 * Chains the specified param builders
 *
 * @param options  The chain options
 * @returns        The build result
 */
const chain = (
  options:
    | {
        buildOptions?: Parameters<ParamBuilder['build']>[0];
        builders: [ParamBuilder, ParamBuilder, ...ParamBuilder[]];
      }
    | [ParamBuilder, ParamBuilder, ...ParamBuilder[]],
): ReturnType<ParamBuilder['build']> => {
  const modifiers = new Map();

  modifiers.set(
    'chain',
    (Array.isArray(options) ? options : options.builders)
      .map((p) => Array.from(p.modifiers.values()).join('/'))
      .join('/-/'),
  );

  return new ParamBuilder(modifiers).build(
    Array.isArray(options) ? undefined : options.buildOptions,
  );
};

export { chain };
