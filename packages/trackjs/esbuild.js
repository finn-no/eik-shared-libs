import { build } from "../../esbuild.js";
import { createRequire } from "module";

const { resolve } = createRequire(import.meta.url);

await build({
  entryPoints: [resolve("trackjs")],
  outfile: "./dist/trackjs.production.min.js",
});
