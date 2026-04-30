import { defineConfig } from "tsup"
export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  clean: true,
})
