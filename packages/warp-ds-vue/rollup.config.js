import { createRequire } from "module";
import plugin from "@eik/rollup-plugin";
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const { resolve } = createRequire(import.meta.url);

const versions = ["v3"];
const config = [];

const vue = (version) => `https://assets.finn.no/npm/vue/${version}/vue.runtime.esm-browser.prod.js`;

for (const version of versions) {
  config.push({
    input: resolve("@warp-ds/vue"),
    plugins: [
      plugin({ maps: [{ imports: { vue: vue(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/vue-${version}.js`,
      format: "esm",
    },
  });
}

export default config;
