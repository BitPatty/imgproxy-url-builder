import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      strict: true,
      compact: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.esm.json',
    }),
  ],
  external: [],
};
