import { createRequire } from "module";
import plugin from "@eik/rollup-plugin";
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const { resolve } = createRequire(import.meta.url);

const versions = ["lit/v2", "lit/v3"];
const config = [];

const lit = (version) => `https://assets.finn.no/npm/${version}/lit.min.js`;

for (const version of versions) {
  config.push({
    input: resolve("@warp-ds/elements-core"),
    plugins: [
      plugin({ maps: [{ imports: { lit: lit(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/${version}/elements-core.js`,
      format: "esm",
    },
  });
  config.push({
    input: resolve("@warp-ds/elements-core/global.js"),
    plugins: [
      plugin({ maps: [{ imports: { lit: lit(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/${version}/global.js`,
      format: "esm",
    },
  });
}

export default config;
