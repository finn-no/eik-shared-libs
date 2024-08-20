import { join, dirname } from "node:path";
import { createRequire } from "module";
import { build } from "../../esbuild.js";

const { resolve } = createRequire(import.meta.url);

const renderLightDirectivePath = resolve("@lit-labs/ssr-client/directives/render-light.js");
const litElementHydrateSupportPath = join(dirname(renderLightDirectivePath), '..', 'lit-element-hydrate-support.js');

await Promise.all([
  build({
    entryPoints: [litElementHydrateSupportPath],
    outfile: "./dist/lit-element-hydrate-support.js",
  }),
  build({
    entryPoints: [renderLightDirectivePath],
    outfile: "./dist/directives/render-light.js",
  }),
]);
