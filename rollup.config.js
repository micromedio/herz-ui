import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';

export default {
  input: ['src/components/index.ts'],
  output: [
    {
      dir: `./lib`,
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    cleaner({
      targets: ['lib'],
    }),
    peerDepsExternal(),
    terser(),
    typescript({
      exclude: ['node_modules/*', '**/*.stories.tsx', '**/*.test.tsx'],
      useTsconfigDeclarationDir: true,
    }),
    babel({
      babelHelpers: 'external',
      exclude: /node_modules/,
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      plugins: ['@babel/plugin-external-helpers'],
    }),
  ],
};
