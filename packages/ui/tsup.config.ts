import { defineConfig } from "tsup"
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@radix-ui/react-slot", "@radix-ui/react-label", "@radix-ui/react-dialog", "@radix-ui/react-popover"],
  esbuildOptions(options) {
    options.alias = { "@": "./src" }
  },
  tsconfig: "tsconfig.json",
})
