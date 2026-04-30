#!/usr/bin/env node
import { writeFileSync, mkdirSync, cpSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { createInterface } from "readline"

const __dirname = dirname(fileURLToPath(import.meta.url))

const rl = createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(r => rl.question(q + " ", r))

async function main() {
  console.log(`
╔══════════════════════════════════════╗
║  ParaguAI Client Generator v0.2      ║
╚══════════════════════════════════════╝`)
  
  const name = await ask("Client slug (e.g. fun4me):")
  const domain = await ask("Subdomain (e.g. fun4me):")
  const locale = (await ask("Default locale [es]:")) || "es"
  const langs = (await ask("Locales (comma-separated) [es]:")) || "es"
  const locales = langs.split(",").map(l => l.trim())
  
  const dest = join(process.cwd(), name)
  if (existsSync(dest)) { console.error(`ERROR: ${dest} already exists`); process.exit(1) }
  
  const tmpl = join(__dirname, "templates")
  cpSync(tmpl, dest, { recursive: true })
  
  // Clean .next + node_modules from template
  rmSync(join(dest, ".next"), { recursive: true, force: true })
  rmSync(join(dest, "node_modules"), { recursive: true, force: true })
  
  // Write site-specific files
  writeFileSync(join(dest, "content", `${locale}.json`), JSON.stringify({ 
    navigation: [], footer: { businessName: name, columns: [] },
    home: { hero: { title: name, subtitle: "Coming soon" } }
  }, null, 2))
  
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
  
  writeFileSync(join(dest, "package.json"), JSON.stringify({
    name, version: "1.0.0", private: true,
    scripts: { dev: "next dev", build: "next build", start: "next start" },
    dependencies: {
      "next": "^15.5.15", "react": "^19.1.0", "react-dom": "^19.1.0",
      "lucide-react": "^0.501.0",
      "@ai-whisperers/ui": "latest",
      "@ai-whisperers/sections": "latest"
    }
  }, null, 2))
  
  console.log(`\n✅ Generated ${name} at ${dest}`)
  console.log(`  cd ${name}`)
  console.log(`  npm install --legacy-peer-deps`)
  console.log(`  npm run build`)
  console.log(`  docker build -t ${name}:prod .`)
  console.log(`  docker stack deploy -c docker-compose.yml ${name.replace(/-/g,"_")}`)
  console.log(`  Add A record: ${domain}.paragu-ai.com → 72.61.44.159 (proxied)`)
  
  rl.close()
}

main().catch(console.error)
