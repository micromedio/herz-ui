import type { Options } from "tsup"
export const tsup: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  entryPoints: ["src/components/index.ts"],
  dts: true,
  format: ["cjs", "esm"],
  legacyOutput: true,
  external: ["react", "react-dom"],
}
