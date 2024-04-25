import fs from "node:fs/promises";
import path from "node:path";
import { build } from "../../esbuild.js";

// Run after npm run copy, and pass through an esbuild of the file
// to ensure it respects our browserslist.
const dir = await fs.readdir(path.resolve(import.meta.dirname, "dist"));

for (const file of dir) {
  if (file.endsWith(".js")) {
    const filePath = path.resolve(import.meta.dirname, "dist", file);
    if (filePath.includes(".cjs")) {
      // These shouldn't be used by any of us, but they've been included in the Eik asset
      await build({
        allowOverwrite: true,
        sourcemap: false,
        format: "cjs",
        entryPoints: [filePath],
        outfile: filePath,
      });
    } else {
      await build({
        allowOverwrite: true,
        sourcemap: false,
        entryPoints: [filePath],
        outfile: filePath,
      });
    }
  }
}
