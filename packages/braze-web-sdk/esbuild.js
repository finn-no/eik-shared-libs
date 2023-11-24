import { createRequire } from "node:module";
import esbuild from "esbuild";

const { resolve } = createRequire(import.meta.url);

await esbuild.build({
  entryPoints: [resolve("@braze/web-sdk")],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: "dist/braze.min.js",
  target: ["es2017"],
  sourcemap: true,
});
