import { createRequire } from "module";
import plugin from "@eik/rollup-plugin";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const { resolve } = createRequire(import.meta.url);

const versions = ["2", "3"];
const config = [];

const lit = (version) => `https://assets.finn.no/npm/lit-${version}/v${version}/lit.min.js`;

for (const version of versions) {
  config.push({
    input: resolve("@warp-ds/elements"),
    plugins: [
      plugin({ maps: [{ imports: { lit: lit(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/lit-v${version}.js`,
      format: "esm",
    },
  });
}

export default config;
