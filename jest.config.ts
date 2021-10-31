import type { Config } from '@jest/types';

export default (): Config.InitialOptions => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: ['lcov', 'html', 'json'],
    verbose: true,
    testMatch: ['**/*.test.ts'],
  };
};
