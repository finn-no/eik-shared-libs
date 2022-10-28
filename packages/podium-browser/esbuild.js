import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./node_modules/@podium/browser/src/index.js"],
  bundle: true,
  minify: true,
  format: "esm",
  outfile: "dist/index.js",
  target: ["es2017"],
  sourcemap: true,
  loader: { ".js_commonjs-module": "js" },
});
