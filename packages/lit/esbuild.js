import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./lit.min.js"],
  bundle: true,
  minify: true,
  format: "esm",
  outdir: "dist/",
  target: ["es2017"],
  sourcemap: true,
});
