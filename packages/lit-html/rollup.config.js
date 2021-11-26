import { createRequire } from "module";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const { resolve } = createRequire(import.meta.url);

export default {
  input: resolve("lit-html"),
  output: {
    format: "esm",
    sourcemap: true,
    file: `./dist/lit-html.min.js`,
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
