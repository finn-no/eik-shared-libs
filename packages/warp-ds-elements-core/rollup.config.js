import fs from "fs";
import path from "path";
import { createRequire } from "module";
import plugin from "@eik/rollup-plugin";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const moduleName = "@warp-ds/elements-core";

const { resolve } = createRequire(import.meta.url);

function getSubpathExports(modulePath) {
  let absolutePath = resolve(modulePath);
  absolutePath = absolutePath.substring(
    0,
    absolutePath.indexOf(moduleName) + moduleName.length + "/".length
  );
  const packageJsonPath = path.join(absolutePath, "package.json");
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonContent);
    if (!packageJson) {
      console.error(`Error parsing package.json: ${packageJsonPath}`);
      return null;
    }
    if (packageJson.exports) {
      for (const [key, value] of Object.entries(packageJson.exports)) {
        if (!value.endsWith(".js")) {
          delete packageJson.exports[key];
        }
      }
      return packageJson.exports;
    } else {
      return { ".": packageJson.module || packageJson.main };
    }
  } catch (error) {
    console.error(`Error reading package.json: ${error.message}`);
    return null;
  }
}

const modulePath = resolve(moduleName);
const subpathExports = getSubpathExports(modulePath);

const lit = (version) => `https://assets.finn.no/npm/lit-${version}/v${version}/lit.min.js`;
const litVersions = ["2", "3"];
const config = [];
for (const litVersion of litVersions) {
  for (const [subpath] of Object.entries(subpathExports)) {
    const subpathImportPart = subpath !== "." ? `/${subpath.replace("./", "")}` : "";

    // Looks messy, but a few things happen here:
    // - lit-2 gets the root level folder, other versions in named folders.
    // - match the subpath of the input
    //    - default to index.js for the main entrypoint `"."`.
    //    - if the subpath does not include `.js`, create an `index.js` in a directory matching the subpath.
    //    - default to the subpath for all other entrypoints.
    let filePath = `dist/`;
    if (litVersion !== "2") {
      filePath += `lit-${litVersion}/`;
    }
    if (subpath === ".") {
      filePath += "index.js";
    } else if (!subpath.endsWith(".js")) {
      filePath += `${subpath}/index.js`;
    } else {
      filePath += subpath.replace("./", "");
    }

    config.push({
      input: resolve(`${moduleName}${subpathImportPart}`),
      plugins: [
        plugin({ maps: [{ imports: { lit: lit(litVersion) } }] }),
        nodeResolve(),
        commonjs(),
        terser(),
      ],
      output: {
        file: filePath,
        format: "esm",
      },
    });
  }
}

export default config;
