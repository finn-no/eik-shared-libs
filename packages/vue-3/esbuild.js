import fs from "node:fs/promises";
import path from "node:path";
import { build } from "../../esbuild.js";

// Run after npm run copy, and pass through an esbuild of the file
// to ensure it respects our browserslist.
const dir = await fs.readdir(path.resolve(import.meta.dirname, "dist"));

for (const file of dir) {
  if (file.endsWith(".js")) {
    const filePath = path.resolve(import.meta.dirname, "dist", file);
    let buildFile = filePath;
    if (filePath.includes(".cjs")) {
      // Rename .cjs.js to a .tmp.cjs file to prevent Esbuild choking
      buildFile = filePath.replace(".cjs", ".tmp").replace(".js", ".cjs");
      await fs.rename(filePath, buildFile);
    }
    await build({
      allowOverwrite: true,
      sourcemap: false,
      entryPoints: [buildFile],
      outfile: filePath,
    });
    if (filePath.includes(".cjs")) {
      // cleanup by removing the .tmp.cjs file
      await fs.unlink(buildFile);
    }
  }
}
