import { createRequire } from "module";

const { resolve } = createRequire(import.meta.url);

export default {
  input: resolve("@podium/browser"),
  output: {
    format: "esm",
    sourcemap: true,
    file: `./dist/index.js`,
    
  },
};
