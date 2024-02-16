import fs from "fs";
import path from "path";
import plugin from "@eik/rollup-plugin";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const moduleName = "@warp-ds/elements";

function getSubpathExports(modulePath) {
  let absolutePath = import.meta.resolve(modulePath);
  absolutePath = absolutePath
    .substring(0, absolutePath.indexOf(moduleName) + moduleName.length + "/".length)
    .replace("file:/", "");
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
        if (typeof value !== "string") {
          /**
           * Handle these types of exports by replacing the object with the value of `import`
           *  "./element.js": {
           *    "import": "./src/element.js",
           *    "types": "./types/element.d.ts"
           *  },
           */
          packageJson.exports[key] = value.import;
        } else if (!value.endsWith(".js")) {
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

const modulePath = import.meta.resolve(moduleName);
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
      input: import.meta.resolve(`${moduleName}${subpathImportPart}`).replace("file:/", ""),
      plugins: [
        plugin({
          maps: [
            {
              imports: {
                "@warp-ds/elements-core":
                  "https://assets.finn.no/pkg/@warp-ds/elements-core/v0/element.js",
                "@warp-ds/elements-core/element.js":
                  "https://assets.finn.no/pkg/@warp-ds/elements-core/v0/element.js",
                "@warp-ds/elements-core/global.js":
                  "https://assets.finn.no/pkg/@warp-ds/elements-core/v0/global.js",
                lit: lit(litVersion),
                "lit-html": `https://assets.finn.no/npm/lit-html/v${litVersion}/lit-html.min.js`,
              },
            },
          ],
        }),
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
