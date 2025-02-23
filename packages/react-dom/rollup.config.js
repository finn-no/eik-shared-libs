import fs from "fs";
import eikPlugin from "@eik/rollup-plugin";
import semver from "semver";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import swc from "@rollup/plugin-swc";

const env = process.env.NODE_ENV;

const reactPkg = new URL("../react/package.json", import.meta.url);
const reactDomPkg = new URL("./package.json", import.meta.url);

const {
  eik: { name },
} = JSON.parse(fs.readFileSync(reactPkg.pathname, "utf8"));
const {
  dependencies: { "react-dom": version },
} = JSON.parse(fs.readFileSync(reactDomPkg.pathname, "utf8"));

const browserslistrc = new URL("../../.browserslistrc", import.meta.url);
const browserslist = fs.readFileSync(browserslistrc.pathname, "utf-8");

const plugins = [
  eikPlugin({
    maps: [
      {
        imports: {
          react: `https://assets.finn.no/npm/${name}/v${semver.major(version)}/react.${env}.min.js`,
        },
      },
    ],
  }),
  nodeResolve(),
  commonjs({ include: /node_modules/ }),
  replace({ preventAssignment: true, values: { "process.env.NODE_ENV": JSON.stringify(env) } }),
  env === "production"
    ? swc({
        swc: {
          env: {
            targets: browserslist,
          },
        },
      })
    : null,
  env === "production" ? terser({ format: { comments: false } }) : null,
];

export default [
  {
    input: "./react-dom.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.${env}.js` },
    plugins,
  },
  {
    input: "./react-dom.client.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.client.${env}.js` },
    plugins,
  },
];
