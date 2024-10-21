import { build } from "../../esbuild.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const turfPackageJsonPath = path.join(
  path.dirname(require.resolve("@turf/turf/package.json")),
  "package.json"
);
const turfPackageJson = JSON.parse(fs.readFileSync(turfPackageJsonPath, "utf8"));

const turfDependencies = Object.keys(turfPackageJson.dependencies).filter((dep) =>
  dep.startsWith("@turf/")
);

turfDependencies.push("@turf/turf");

await Promise.all(
  turfDependencies.map((submodule) => {
    const entryPoint = path.join(
      __dirname,
      "../../node_modules",
      submodule,
      "dist",
      "esm",
      "index.js"
    );

    const outfile = path.join("dist", `${submodule.replace("@turf/", "")}.min.js`);

    return build({
      entryPoints: [entryPoint],
      outfile,
    });
  })
);
