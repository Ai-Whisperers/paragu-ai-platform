#!/usr/bin/env node
const { writeFileSync, mkdirSync, cpSync, existsSync } = require("fs")
const { join } = require("path")
const readline = require("readline")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(r => rl.question(q + " ", r))

async function main() {
  console.log(`\n╔══════════════════════════════════════╗\n║  ParaguAI Client Generator v0.4      ║\n╚══════════════════════════════════════╝`)

  const name = await ask("Client slug (e.g. fun4me):")
  const domain = await ask("Subdomain (e.g. fun4me):")
  const locale = (await ask("Default locale [es]:")) || "es"
  const langs = (await ask("Locales (comma-separated) [es]:")) || "es"
  const locales = langs.split(",").map(l => l.trim())

  const dest = join(process.cwd(), name)
  if (existsSync(dest)) { console.error(`ERROR: ${dest} already exists`); process.exit(1) }

  mkdirSync(join(dest, "app"), { recursive: true })
  mkdirSync(join(dest, "content"), { recursive: true })
  mkdirSync(join(dest, "public"), { recursive: true })

  // Generate files
  const mainJs = locales.length > 1 
    ? locales.map(l => `export { default as ${l} } from "./${l}.json"`).join("\n")
    : `export { default } from "./${locale}.json"`

  writeFileSync(join(dest, "content", `${locale}.json`), JSON.stringify({
    navigation: [], footer: { businessName: name, columns: [] },
    home: { hero: { title: name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()), subtitle: "Coming soon" } }
  }, null, 2))

  writeFileSync(join(dest, "app/layout.tsx"), `import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "${name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}",
  description: "Coming soon",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="${locale}"><body>{children}</body></html>
}
`)

  writeFileSync(join(dest, "app/page.tsx"), `export default function Home() {
  return (
    <main style={{fontFamily:"sans-serif",background:"#fafafa",minHeight:"100vh"}}>
      <header style={{background:"#1B2A4A",padding:"20px",textAlign:"center"}}>
        <a href="/" style={{color:"white",textDecoration:"none",fontSize:"20px",fontWeight:700}}>${name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</a>
      </header>
      <div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px",textAlign:"center"}}>
        <h1 style={{fontSize:"48px",margin:0,color:"#1B2A4A"}}>Coming Soon</h1>
        <p style={{fontSize:"18px",color:"#6B7280",marginTop:"12px"}}>Our new website is being built.</p>
      </div>
      <footer style={{background:"#1B2A4A",padding:"40px",textAlign:"center"}}>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:"14px"}}>&copy; 2026 ${name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}.</p>
      </footer>
    </main>
  )
}
`)

  writeFileSync(join(dest, "package.json"), JSON.stringify({
    name, version: "1.0.0", private: true,
    scripts: { dev: "next dev", build: "next build", start: "next start" },
    dependencies: { next: "^15.5.15", react: "^19.1.0", "react-dom": "^19.1.0" }
  }, null, 2))

  writeFileSync(join(dest, "next.config.ts"), `import type { NextConfig } from "next"
const config: NextConfig = {
  images: { unoptimized: true },
  output: "standalone",
  async redirects() { return [{ source: "/s/:path*", destination: "/", permanent: true }] },
}
export default config
`)

  writeFileSync(join(dest, "tsconfig.json"), JSON.stringify({
    compilerOptions: {
      target: "ES2017", lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true, skipLibCheck: true, strict: false, noEmit: true,
      esModuleInterop: true, module: "esnext", moduleResolution: "bundler",
      resolveJsonModule: true, isolatedModules: true, jsx: "preserve",
      incremental: true, plugins: [{ name: "next" }], paths: { "@/*": ["./*"] }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2))

  writeFileSync(join(dest, "Dockerfile"), `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package.json ./\nRUN npm install --legacy-peer-deps\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/public ./public\nCOPY --from=builder /app/.next/static ./.next/static\nEXPOSE 3000\nCMD ["node", "server.js"]\n`)

  writeFileSync(join(dest, ".gitignore"), "node_modules/\n.next/\n*.log\n.env\n.env.local\n")

  writeFileSync(join(dest, "docker-compose.yml"), `version: '3.8'
services:
  web:
    build: .
    image: ${name}:prod
    ports: ["3000"]
    networks: ["agent-net"]
    deploy:
      mode: replicated
      replicas: 2
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.${name.replace(/-/g,"_")}.entrypoints=websecure"
        - "traefik.http.routers.${name.replace(/-/g,"_")}.rule=Host(\`${domain}.paragu-ai.com\`)"
        - "traefik.http.routers.${name.replace(/-/g,"_")}.tls=true"
        - "traefik.http.routers.${name.replace(/-/g,"_")}.tls.certresolver=letsencryptresolver"
        - "traefik.http.services.${name.replace(/-/g,"_")}.loadbalancer.server.port=3000"
        - "traefik.docker.network=agent-net"
networks:
  agent-net:
    external: true
`)

  writeFileSync(join(dest, "CLAUDE.md"), `# ${name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} — Agent Guide

Standalone Next.js app deployed with Docker Swarm on Hermes VPS.

## Quick Links
- **Live:** https://${domain}.paragu-ai.com
- **GitHub:** https://github.com/Ai-Whisperers/${name}
- **Docker:** \`docker service logs ${name.replace(/-/g,"_")}_web --tail 50\`

## Deploy
\`\`\`bash
docker build -t ${name}:prod .
docker stack deploy -c docker-compose.yml ${name.replace(/-/g,"_")}
\`\`\`

## DNS
| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | ${domain} | 72.61.44.159 | Proxied |
`)

  console.log(`\n✅ Generated ${name} at ${dest}`)
  console.log(`  cd ${name}`)
  console.log(`  npm install --legacy-peer-deps`)
  console.log(`  npm run build`)
  console.log(`  docker build -t ${name}:prod .`)
  console.log(`  docker stack deploy -c docker-compose.yml ${name.replace(/-/g,"_")}`)
  console.log(`  Add A record: ${domain}.paragu-ai.com → 72.61.44.159`)

  rl.close()
}

main().catch(console.error)
