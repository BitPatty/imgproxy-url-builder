import type { Config } from '@jest/types';

export default (): Config.InitialOptions => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: ['lcov', 'html', 'json'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    verbose: true,
    testMatch: [
      // '**/test/crypto/*.test.ts',
      '**/test/misc/*.test.ts',
      '**/test/transformers/*.test.ts',
    ],
  };
};
