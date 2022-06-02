import fs from "fs";
import eikPlugin from "@eik/rollup-plugin";
import semver from "semver";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

const env = process.env.NODE_ENV;

const reactPkg = new URL("../react/package.json", import.meta.url);
const reactDomPkg = new URL("./package.json", import.meta.url);

const { name } = JSON.parse(fs.readFileSync(reactPkg.pathname, "utf8"));
const {
  dependencies: { "react-dom": version },
} = JSON.parse(fs.readFileSync(reactDomPkg.pathname, "utf8"));

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
  {
    input: "./react-dom.server.browser.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.server.browser.${env}.js` },
    plugins,
  },
  {
    input: "./react-dom.server.node.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.server.node.${env}.js` },
    plugins,
  },
];
