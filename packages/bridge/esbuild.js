import { createRequire } from "module";
import esbuild from "esbuild";

const { resolve } = createRequire(import.meta.url);

await esbuild.build({
  entryPoints: [resolve("@podium/bridge")],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: "./dist/index.js",
  target: ["es2017"],
  sourcemap: true,
});
