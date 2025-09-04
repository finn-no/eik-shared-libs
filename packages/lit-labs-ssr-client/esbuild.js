import { join, dirname } from "node:path";
import { createRequire } from "module";
import * as eik from "@eik/esbuild-plugin";
import { build } from "../../esbuild.js";

const { resolve } = createRequire(import.meta.url);

const renderLightDirectivePath = resolve("@lit-labs/ssr-client/directives/render-light.js");
const litElementHydrateSupportPath = join(dirname(renderLightDirectivePath), '..', 'lit-element-hydrate-support.js');

await eik.load({
  maps: [
    { imports: { "lit-html": "https://assets.finn.no/npm/lit/v3/lit.min.js" } }
  ],
});

await Promise.all([
  build({
    entryPoints: [litElementHydrateSupportPath],
    outfile: "./dist/lit-element-hydrate-support.js",
    plugins: [eik.plugin()],
  }),
  build({
    entryPoints: [renderLightDirectivePath],
    outfile: "./dist/directives/render-light.js",
  }),
]);
