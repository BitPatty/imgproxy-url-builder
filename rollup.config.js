import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// import compiler from '@ampproject/rollup-plugin-closure-compiler';

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
    // compiler(),
  ],
  external: [],
};
