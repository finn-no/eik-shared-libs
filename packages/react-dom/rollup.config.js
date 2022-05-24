import fs from "fs";
import plugin from "@eik/rollup-plugin";
import semver from "semver";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

const reactPkg = new URL("../react/package.json", import.meta.url);
const reactDomPkg = new URL("./package.json", import.meta.url);

const { name } = JSON.parse(fs.readFileSync(reactPkg.pathname, "utf8"));
const {
  dependencies: { "react-dom": version },
} = JSON.parse(fs.readFileSync(reactDomPkg.pathname, "utf8"));

export default [
  {
    input: "./react-dom.development.js",
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react-dom.development.js`,
    },
    plugins: [
      plugin({
        maps: [
          {
            imports: {
              react: `https://assets.finn.no/npm/${name}/v${semver.major(
                version
              )}/react.development.js`,
            },
          },
        ],
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
    ],
  },
  {
    input: "./react-dom.production.min.js",
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react-dom.production.min.js`,
    },
    plugins: [
      plugin({
        maps: [
          {
            imports: {
              react: `https://assets.finn.no/npm/${name}/v${semver.major(
                version
              )}/react.production.min.js`,
            },
          },
        ],
      }),
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
