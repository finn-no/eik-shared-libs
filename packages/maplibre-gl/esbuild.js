import { build } from "../../esbuild.js";
import { createRequire } from "module";

const { resolve } = createRequire(import.meta.url);
console.log(new URL(import.meta.resolve("maplibre-gl")).pathname)
await build({
  entryPoints: [new URL(import.meta.resolve("maplibre-gl")).pathname],
  outfile: "./dist/index.js",
});
