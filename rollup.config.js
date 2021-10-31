import typescript from 'rollup-plugin-typescript2';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: true,
      compact: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
    compiler(),
  ],
  external: [],
};
