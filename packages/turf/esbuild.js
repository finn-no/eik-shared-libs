import { build } from "../../esbuild.js";

await build({
  entryPoints: ["./index.js"],
  outfile: "dist/turf.min.js",
});
