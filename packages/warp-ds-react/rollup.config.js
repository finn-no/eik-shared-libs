import { createRequire } from "module";
import plugin from "@eik/rollup-plugin";
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const { resolve } = createRequire(import.meta.url);

const versions = ["v17", "v18"];
const config = [];

const react = (version) => `https://assets.finn.no/npm/react/${version}/react.production.min.js`;

for (const version of versions) {
  config.push({
    input: resolve("@warp-ds/react"),
    plugins: [
      plugin({ maps: [{ imports: { react: react(version) } }] }),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
    output: {
      file: `dist/react-${version}.js`,
      format: "esm",
    },
  });
}

export default config;
