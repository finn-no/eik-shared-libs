import fs from "fs";
import eikPlugin from "@eik/rollup-plugin";
import semver from "semver";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import swc from "@rollup/plugin-swc";

const env = process.env.NODE_ENV;

const reactPkg = new URL("../react-18/package.json", import.meta.url);
const reactDomPkg = new URL("./package.json", import.meta.url);

const {
  eik: { name },
} = JSON.parse(fs.readFileSync(reactPkg.pathname, "utf8"));
const {
  dependencies: { "react-dom": version },
} = JSON.parse(fs.readFileSync(reactDomPkg.pathname, "utf8"));

const browserslistrc = new URL("../../.browserslistrc", import.meta.url);
const browserslist = fs.readFileSync(browserslistrc.pathname, "utf-8");

const pluginsAlias = [
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

const pluginsSpecificVersion = [
  eikPlugin({
    maps: [
      {
        imports: {
          react: `https://assets.finn.no/npm/${name}/${version}/react.${env}.min.js`,
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
    plugins: pluginsAlias,
  },
  {
    input: "./react-dom.client.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.client.${env}.js` },
    plugins: pluginsAlias,
  },
  {
    input: "./react-dom.server.browser.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.server.browser.${env}.js` },
    plugins: pluginsAlias,
  },
  {
    input: "./react-dom.server.node.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.server.node.${env}.js` },
    plugins: pluginsAlias,
  },
  {
    input: "./react-dom.js",
    output: { format: "esm", sourcemap: true, file: `./dist/react-dom.${version}.${env}.js` },
    plugins: pluginsSpecificVersion,
  },
  {
    input: "./react-dom.client.js",
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react-dom.client.${version}.${env}.js`,
    },
    plugins: pluginsSpecificVersion,
  },
  {
    input: "./react-dom.server.browser.js",
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react-dom.server.browser.${version}.${env}.js`,
    },
    plugins: pluginsSpecificVersion,
  },
  {
    input: "./react-dom.server.node.js",
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react-dom.server.node.${version}.${env}.js`,
    },
    plugins: pluginsSpecificVersion,
  },
];
