import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.types,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.types.json',
    }),
  ],
  external: [],
};
