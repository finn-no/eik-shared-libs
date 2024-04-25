import { createRequire } from "module";
import { build } from "../../esbuild.js";

const { resolve } = createRequire(import.meta.url);

await Promise.all([
  build({
    entryPoints: [resolve("@lit-labs/ssr-client/lit-element-hydrate-support.js")],
    outfile: "./dist/lit-element-hydrate-support.js",
  }),
  build({
    entryPoints: [resolve("@lit-labs/ssr-client/directives/render-light.js")],
    outfile: "./dist/directives/render-light.js",
  }),
]);
