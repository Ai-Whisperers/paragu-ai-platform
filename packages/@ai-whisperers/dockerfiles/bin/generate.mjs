#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const PKG_DIR = dirname(fileURLToPath(import.meta.url)) + "/.."
const TEMPLATES_DIR = resolve(PKG_DIR, "templates")

const MODES = {
  "next-standalone": {
    template: "Dockerfile.next-standalone",
    outFile: "Dockerfile",
    extraFiles: [],
  },
  "static-nginx": {
    template: "Dockerfile.static-nginx",
    outFile: "Dockerfile",
    extraFiles: [{ template: "nginx.conf", outFile: "nginx.conf" }],
  },
}

function parseArgs(argv) {
  const args = {}
  for (const raw of argv.slice(2)) {
    if (!raw.startsWith("--")) continue
    const eq = raw.indexOf("=")
    if (eq === -1) {
      args[raw.slice(2)] = true
    } else {
      args[raw.slice(2, eq)] = raw.slice(eq + 1)
    }
  }
  return args
}

function usage() {
  console.error(
    [
      "Usage: aiw-dockerfile --app=<app-name> --port=<port> --mode=<next-standalone|static-nginx> [--appsDir=<path>] [--force]",
      "",
      "Modes:",
      "  next-standalone   Node 20-slim + pnpm@10, 3-stage, non-root uid 1001 (default for Next apps)",
      "  static-nginx      nginx:1.27-alpine, serves ./out (for `next export`-style static apps)",
      "",
      "Refuses to overwrite an existing file unless --force is passed.",
    ].join("\n")
  )
  process.exit(1)
}

function fillTemplate(text, vars) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error(`Unfilled placeholder in template: {{${key}}}`)
    return String(vars[key])
  })
}

function main() {
  const args = parseArgs(process.argv)
  const app = args.app
  const port = args.port
  const mode = args.mode ?? "next-standalone"
  const force = Boolean(args.force)
  const appsDir = args.appsDir
    ? resolve(String(args.appsDir))
    : resolve(process.cwd(), "apps")

  if (!app || !port) usage()
  if (!MODES[mode]) {
    console.error(`Unknown mode: ${mode}. Valid: ${Object.keys(MODES).join(", ")}`)
    process.exit(1)
  }

  const spec = MODES[mode]
  const targetDir = join(appsDir, String(app))
  if (!existsSync(targetDir)) {
    console.error(`Target app directory does not exist: ${targetDir}`)
    process.exit(1)
  }

  const vars = { APP_NAME: String(app), APP_PORT: String(port) }
  const outputs = [
    { template: spec.template, outFile: spec.outFile },
    ...spec.extraFiles,
  ]

  for (const { template, outFile } of outputs) {
    const tplPath = join(TEMPLATES_DIR, template)
    const outPath = join(targetDir, outFile)
    if (existsSync(outPath) && !force) {
      console.error(`Refusing to overwrite ${outPath} (pass --force to override)`)
      process.exit(1)
    }
    const tpl = readFileSync(tplPath, "utf8")
    const filled = fillTemplate(tpl, vars)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, filled)
    console.log(`wrote ${outPath}`)
  }
}

main()
