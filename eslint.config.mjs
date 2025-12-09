import globals from 'globals';

import typescriptPlugin from '@typescript-eslint/eslint-plugin';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'coverage/**/*',
      'dist/**/*',
      'scripts/**/*',
      '**/*.sh',
      '**/*.js',
      'eslint.config.mjs',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
  ),
  {
    plugins: { '@typescript-eslint': typescriptPlugin },
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parserOptions: { project: 'tsconfig.json', tsConfigRootDir: './' },
    },
    rules: {
      /******************************************************************
       * Async / Promises
       ******************************************************************/

      // Don't allow a function to be async if there's no await
      'require-await': 'error',

      // Don't allow returning await statements
      'no-return-await': 'error',

      // Prevent unreachable code
      'no-unreachable': 'error',

      // Don't allow awaiting calls that are not thenable
      // (such as example promises)
      '@typescript-eslint/await-thenable': 'error',

      //
      '@typescript-eslint/no-floating-promises': 'error',

      // Prevent promises from being used ad illogical locations
      // such as in if statements, as this is usually forgetting an await
      '@typescript-eslint/no-misused-promises': 'error',

      /******************************************************************
       * Classes
       ******************************************************************/

      // Always declare accessibility of class members (public, private, ...)
      '@typescript-eslint/explicit-member-accessibility': 'error',

      // Don't allow unused methods/attributes in classes
      // that are not public
      'no-unused-private-class-members': 'error',

      /******************************************************************
       * Misc
       ******************************************************************/

      // Always require a return type on methods
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        },
      ],

      // Don't allow for..in loops (should generally be for..of)
      '@typescript-eslint/no-for-in-array': 'error',

      // Warn when working with deprecated code
      '@typescript-eslint/no-deprecated': 'error',

      // Don't require explicit argument typings but warn if they
      // have not been provided
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      // Don't allow the use of `any`
      '@typescript-eslint/no-explicit-any': 'off',

      // Ensure all cases are handled in a switch
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { considerDefaultExhaustiveForUnions: true },
      ],

      // Don't allow shadowing of variables (i.e. redeclaring a
      // variable with the same name)
      '@typescript-eslint/no-shadow': 'error',

      // Only allow toString to be called on values where
      // it makes sense
      '@typescript-eslint/no-base-to-string': 'error',

      // Require variable initialization
      // Only use the typescript-eslint version
      'init-declarations': 'off',
      '@typescript-eslint/init-declarations': 'error',

      // Don't allow unused variables unless they start with _
      // Only use the typescript-eslint version
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Don't allow unused expressions unless they start with _
      // Only use typescript-eslint version
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',

      // Don't allow ts-comments
      '@typescript-eslint/ban-ts-comment': 'error',

      // Warn on deprecations
      '@typescript-eslint/no-deprecated': 'warn',
    },
  },
  {
    files: ['test/**'],
    rules: {
      // Allow non-null assertions in test files
      '@typescript-eslint/no-non-null-assertion': 'off',

      // Don't require intialization in test files
      'init-declarations': 'off',
      '@typescript-eslint/init-declarations': 'off',
    },
  },
  {
    files: ['mock-server/**'],
    rules: {
      // Allow non-boolan statements
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // Allow returning promises where no promises are expected
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
];
