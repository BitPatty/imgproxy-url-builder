import { ParamBuilder } from './src/index.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toIncludeModifier(str: string): jest.CustomMatcherResult;
      toIncludeModifierIdentifier(
        keyof: keyof ParamBuilder,
      ): jest.CustomMatcherResult;
    }
  }
}

expect.extend({
  toIncludeModifier(
    received: ParamBuilder,
    expected: string,
  ): jest.CustomMatcherResult {
    const values = Array.from(received.modifiers.values());
    const hasValue = values.includes(expected);

    return {
      pass: hasValue,
      message: () =>
        hasValue
          ? ''
          : `Could not find modifier "${expected}" in ${JSON.stringify(
              values,
            )} `,
    };
  },

  toIncludeModifierIdentifier(
    received: ParamBuilder,
    expected: keyof ParamBuilder,
  ): jest.CustomMatcherResult {
    const values = Array.from(received.modifiers.keys());
    const hasValue = values.includes(expected);

    return {
      pass: hasValue,
      message: () =>
        hasValue
          ? ''
          : `Could not find modifier identifier "${expected}" in ${JSON.stringify(
              values,
            )} `,
    };
  },
});

export default undefined;
