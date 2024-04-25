import { build } from "../../esbuild.js";
import { createRequire } from "module";

const { resolve } = createRequire(import.meta.url);

await build({
  entryPoints: [resolve("@finn-no/trackjs")],
  outfile: "./dist/index.esm.js",
});
