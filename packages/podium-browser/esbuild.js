import esbuild from 'esbuild';
import { createRequire } from "module";

const { resolve } = createRequire(import.meta.url);

await esbuild.build({
    entryPoints: [resolve("@podium/browser")],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'dist/index.js',
    target: ['es2017'],
    sourcemap: true,
    loader: { '.js_commonjs-module': 'js' }
});