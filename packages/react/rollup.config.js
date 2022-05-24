import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: './development.js',
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react.development.js`,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
    ],
  },
  {
    input: './production.js',
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react.production.min.js`,
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
  },
];
