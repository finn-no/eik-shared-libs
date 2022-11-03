import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: `./development.js`,
    output: { format: "esm", sourcemap: true, file: `./dist/react.development.min.js` },
    plugins: [
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({ preventAssignment: true, values: { "process.env.NODE_ENV": JSON.stringify('development') } }),
    ],
  },
  {
    input: `./production.js`,
    output: { format: "esm", sourcemap: true, file: `./dist/react.production.min.js` },
    plugins: [
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({ preventAssignment: true, values: { "process.env.NODE_ENV": JSON.stringify('production') } }),
      terser({ format: { comments: false } }),
    ],
  },
];
