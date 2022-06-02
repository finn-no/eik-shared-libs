import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './index.js',
  output: {
    format: "esm",
    sourcemap: true,
    file: `./dist/lit.min.js`,
  },
  plugins: [
    nodeResolve(),
    commonjs({
        include: /node_modules/,
    }),
    terser({
        format: {
            comments: false,
        },
    }),
  ],
};
