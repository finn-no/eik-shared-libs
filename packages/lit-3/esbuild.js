import esbuild from "esbuild";
import { plugin, load } from "@eik/esbuild-plugin";

await load({ maps: [{ imports: { "./lit-html.js": "./lit.min.js" } }] });

await esbuild.build({
  entryPoints: ["./lit.min.js", "static-html.js"],
  bundle: true,
  minify: true,
  format: "esm",
  outdir: "dist/",
  target: ["es2017"],
  sourcemap: true,
  plugins: [plugin()],
});
