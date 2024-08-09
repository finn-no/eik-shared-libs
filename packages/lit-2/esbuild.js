import { build } from "../../esbuild.js";
import { plugin, load } from "@eik/esbuild-plugin";

await load({ maps: [{ imports: { "./lit-html.js": "./lit.min.js" } }] });

await build({
  entryPoints: ["./lit.min.js", "static-html.js"],
  outdir: "dist/",
  plugins: [plugin()],
});
