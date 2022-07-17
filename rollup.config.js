import pkg from './package.json';

import fs from 'fs';
import path from 'path';

import typescript from 'rollup-plugin-typescript2';

const createPackageJson = {
  writeBundle: (opts) => {
    if (!['es', 'cjs'].includes(opts.format)) return;
    const dirName = path.join(__dirname, path.dirname(opts.file));
    const output = JSON.stringify({
      type: opts.format === 'es' ? 'module' : 'commonjs',
    });
    fs.writeFileSync(path.join(dirName, 'package.json'), output);
  },
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: true,
        compact: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.build.json',
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
      createPackageJson,
    ],
    external: [],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true,
        strict: true,
        compact: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.build.json',
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
      createPackageJson,
    ],
    external: [],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.types,
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.build.json',
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            emitDeclarationOnly: true,
          },
        },
      }),
    ],
    external: [],
  },
];
