import { createRequire } from "module";
import esbuild from "esbuild";

const { resolve } = createRequire(import.meta.url);

await Promise.all([
	esbuild.build({
		entryPoints: [resolve("@lit-labs/ssr-client/lit-element-hydrate-support.js")],
		bundle: true,
		minify: true,
		format: "esm",
		outfile: "./dist/lit-element-hydrate-support.js",
		target: ["es2017"],
		sourcemap: true,
	}),
	esbuild.build({
		entryPoints: [resolve("@lit-labs/ssr-client/directives/render-light.js")],
		bundle: true,
		minify: true,
		format: "esm",
		outfile: "./dist/directives/render-light.js",
		target: ["es2017"],
		sourcemap: true,
	})
]);
