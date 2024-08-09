import browserslistToEsbuild from "browserslist-to-esbuild";
import esbuild from "esbuild";

/**
 * @param {import('esbuild').BuildOptions} options
 * @return {Promise<import('esbuild').BuildResult>}
 */
export async function build(options) {
  const target = browserslistToEsbuild();
  return esbuild.build({
    target,
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
    ...options,
  });
}
