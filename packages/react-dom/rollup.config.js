import fs from "fs";
import plugin from "@eik/rollup-plugin";
import { createRequire } from "module";
import semver from 'semver';

const { resolve } = createRequire(import.meta.url);
const reactPkg = new URL("../react/package.json", import.meta.url);
const reactDomPkg = new URL("./package.json", import.meta.url);

const { name } = JSON.parse(fs.readFileSync(reactPkg.pathname, "utf8"));
const { dependencies: { '@esm-bundle/react-dom': version } } = JSON.parse(fs.readFileSync(reactDomPkg.pathname, "utf8"));

const importMap = {
  imports: {
    react: `https://assets.finn.no/npm/${name}/v${semver.major(version)}/react.production.min.js`,
  },
};

export default {
  input: resolve("@esm-bundle/react-dom/esm/react-dom.production.min.js"),
  output: {
    format: "esm",
    sourcemap: true,
    file: `./dist/react-dom.production.min.js`,
  },
  plugins: [plugin({ maps: [importMap] })],
};
