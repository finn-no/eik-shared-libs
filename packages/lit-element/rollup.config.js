import { createRequire } from "module";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const { resolve } = createRequire(import.meta.url);

export default {
  input: resolve("lit-element/lit-element.js"),
  output: {
    format: "esm",
    sourcemap: true,
    file: `./dist/lit-element.min.js`,
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
