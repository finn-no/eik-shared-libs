import { createRequire } from "module";
import { build } from "../../esbuild.js";

const { resolve } = createRequire(import.meta.url);

await build({
  entryPoints: [resolve("lit-element/lit-element.js")],
  outfile: "./dist/lit-element.min.js",
});
