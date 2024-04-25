import { createRequire } from "node:module";
import { build } from "../../esbuild.js";

const { resolve } = createRequire(import.meta.url);

await build({
  entryPoints: [resolve("@podium/browser")],
  outfile: "dist/index.js",
  loader: { ".js_commonjs-module": "js" },
});
