import { createRequire } from "module";
import { build } from "../../esbuild.js";

const { resolve } = createRequire(import.meta.url);

await build({
  entryPoints: [resolve("lit-html")],
  outfile: "./dist/lit-html.min.js",
});
