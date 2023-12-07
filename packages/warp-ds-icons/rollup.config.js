import { createRequire } from "module";
import plugin from "@eik/rollup-plugin";
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const { resolve } = createRequire(import.meta.url);

const config = [];

const lit = (version) => `https://assets.finn.no/npm/lit/${version}/lit.min.js`;
const react = (version) => `https://assets.finn.no/npm/react/${version}/react.production.min.js`;
const vue = (version) => `https://assets.finn.no/npm/vue/${version}/vue.runtime.esm-browser.prod.js`;

for (const version of ["v2", "v3"]) {
  config.push({
    input: resolve("@warp-ds/icons/elements"),
    plugins: [
      plugin({ maps: [{ imports: { lit: lit(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/elements/lit-${version}.js`,
      format: "esm",
    },
  });
}

for (const version of ["v17", "v18"]) {
  config.push({
    input: resolve("@warp-ds/icons/react"),
    plugins: [
      plugin({ maps: [{ imports: { react: react(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/react/react-${version}.js`,
      format: "esm",
    },
  });
}

for (const version of ["v3"]) {
  config.push({
    input: resolve("@warp-ds/icons/vue"),
    plugins: [
      plugin({ maps: [{ imports: { vue: vue(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/vue/vue-${version}.js`,
      format: "esm",
    },
  });
}

export default config;
