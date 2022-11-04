import fs from "node:fs";
import { createRequire } from "node:module";
import plugin from "@eik/rollup-plugin";
import semver from "semver";

const { resolve } = createRequire(import.meta.url);
const reactDomPkg = new URL("./package.json", import.meta.url);

const {
  dependencies: { "@esm-bundle/react-dom": version },
} = JSON.parse(fs.readFileSync(reactDomPkg.pathname, "utf8"));

const versionWithoutPrelease = `${semver.major(version)}.${semver.minor(version)}.${semver.patch(
  version
)}`;

export default [
  {
    input: resolve("@esm-bundle/react-dom/esm/react-dom.production.min.js"),
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
              react: `https://assets.finn.no/npm/react/v${semver.major(
                version
              )}/react.production.min.js`,
            },
          },
        ],
      }),
    ],
  },
  {
    input: resolve("@esm-bundle/react-dom/esm/react-dom.production.min.js"),
    output: {
      format: "esm",
      sourcemap: true,
      file: `./dist/react-dom.${versionWithoutPrelease}.production.min.js`,
    },
    plugins: [
      plugin({
        maps: [
          {
            imports: {
              react: `https://assets.finn.no/npm/react/${versionWithoutPrelease}/react.production.min.js`,
            },
          },
        ],
      }),
    ],
  },
];
