import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./index.js"],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: "dist/lit.min.js",
  target: ["es2017"],
  sourcemap: true,
});
