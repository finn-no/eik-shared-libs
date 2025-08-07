import { createRequire } from "module";
import esbuild from "esbuild";

const { resolve } = createRequire(import.meta.url);

await esbuild.build({
  entryPoints: [resolve("workbox-window")],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: "./dist/workbox-window.js",
  target: ["es2017"],
  sourcemap: true,
});
