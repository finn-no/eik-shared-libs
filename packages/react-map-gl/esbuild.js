import { createRequire } from "module";
import * as eik from "@eik/esbuild-plugin";
import { build } from "../../esbuild.js";

const { resolve } = createRequire(import.meta.url);

await eik.load();

await build({
  entryPoints: [resolve("react-map-gl/maplibre")],
  outfile: "./dist/index.js",
  external: ["maplibre-gl"],
  plugins: [eik.plugin()],
});
