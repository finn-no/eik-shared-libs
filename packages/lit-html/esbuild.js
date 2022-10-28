import { createRequire } from "module";
import esbuild from 'esbuild';

const { resolve } = createRequire(import.meta.url);

await esbuild.build({
    entryPoints: [resolve("lit-html")],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: './dist/lit-html.min.js',
    target: ['es2017'],
    sourcemap: true,
});