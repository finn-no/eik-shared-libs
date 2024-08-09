import { createRequire } from "node:module";
import { join, dirname, basename } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import swc from "@rollup/plugin-swc";

const { resolve } = createRequire(import.meta.url);

// patch react exports to give access to files in cjs directory that we need for our build.
const reactPath = resolve("react");
const reactPackageJSONPath = join(dirname(reactPath), "package.json");
const reactPackageJSON = JSON.parse(readFileSync(reactPackageJSONPath, { encoding: "utf8" }));
reactPackageJSON.exports["./cjs/react.development.js"] = "./cjs/react.development.js";
reactPackageJSON.exports["./cjs/react.production.min.js"] = "./cjs/react.production.min.js";
writeFileSync(reactPackageJSONPath, JSON.stringify(reactPackageJSON, null, 2));

const browserslistrc = new URL("../../.browserslistrc", import.meta.url);
const browserslist = readFileSync(browserslistrc.pathname, "utf-8");

export default [
  {
    input: `./development.js`,
    output: { format: "esm", sourcemap: true, file: `./dist/react.development.min.js` },
    plugins: [
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({
        preventAssignment: true,
        values: { "process.env.NODE_ENV": JSON.stringify("development") },
      }),
    ],
  },
  {
    input: `./production.js`,
    output: { format: "esm", sourcemap: true, file: `./dist/react.production.min.js` },
    plugins: [
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({
        preventAssignment: true,
        values: { "process.env.NODE_ENV": JSON.stringify("production") },
      }),
      swc({
        swc: {
          env: {
            targets: browserslist,
          },
        },
      }),
      terser({ format: { comments: false } }),
    ],
  },
];
