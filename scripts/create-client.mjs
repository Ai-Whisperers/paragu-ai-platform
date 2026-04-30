#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from "fs"
import { join, resolve } from "path"
import { execSync } from "child_process"
import prompts from "prompts"

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "name",
      message: "Client name (kebab-case):",
      validate: (s) => /^[a-z0-9-]+$/.test(s) || "Use kebab-case (e.g., dayah-litworks)",
    },
    {
      type: "text",
      name: "domain",
      message: "Domain (optional, e.g., dayah-litworks.com):",
    },
    {
      type: "select",
      name: "colorScheme",
      message: "Color scheme:",
      choices: [
        { title: "Dark (book covers, premium)", value: "dark" },
        { title: "Light (restaurants, salons)", value: "light" },
      ],
    },
  ])

  const dir = resolve(process.cwd(), response.name)
  if (existsSync(dir)) {
    console.error(`Directory ${dir} already exists`)
    process.exit(1)
  }

  console.log(`\nCreating client: ${response.name}\n`)

  // Create directory structure
  mkdirSync(join(dir, "content"), { recursive: true })
  mkdirSync(join(dir, "public/images"), { recursive: true })
  mkdirSync(join(dir, "app"), { recursive: true })
  mkdirSync(join(dir, "lib"), { recursive: true })

  // package.json
  writeFileSync(join(dir, "package.json"), JSON.stringify({
    name: response.name,
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },
    dependencies: {
      "@ai-whisperers/sections": "latest",
      "@ai-whisperers/engine": "latest",
      next: "^15.3.6",
      react: "^19.0.0",
      "react-dom": "^19.0.0",
    },
    devDependencies: {
      typescript: "^5.8.0",
      "@types/react": "^19.0.0",
      "@types/node": "^22.0.0",
    },
  }, null, 2))

  // next.config
  writeFileSync(join(dir, "next.config.js"), `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
}
module.exports = nextConfig
`)

  // tsconfig
  writeFileSync(join(dir, "tsconfig.json"), JSON.stringify({
    compilerOptions: {
      target: "ES2022", lib: ["ES2022", "DOM", "DOM.Iterable"],
      module: "ESNext", moduleResolution: "bundler",
      jsx: "react-jsx", strict: true,
      paths: { "@/*": ["./*"] },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  }, null, 2))

  // Home page with all sections
  writeFileSync(join(dir, "app/page.tsx"), `import { Hero, ServicesSection, PortfolioSection, TestimonialsSection, WhatsAppFloat } from "@ai-whisperers/sections"
import { resolveContent, fillPlaceholders } from "@ai-whisperers/engine"
import content from "./content/es.json"

export default function Home() {
  const hero = resolveContent(content, "home.hero")
  const services = resolveContent(content, "home.services")
  const portfolio = resolveContent(content, "home.portfolio")
  const testimonials = resolveContent(content, "home.testimonials")

  return (
    <>
      {hero && (
        <Hero
          headline={hero.headline}
          subheadline={hero.subheadline}
          ctaPrimary={{ text: hero.ctaPrimary, href: hero.ctaPrimaryHref || "#" }}
          ctaSecondary={{ text: hero.ctaSecondary, href: hero.ctaSecondaryHref || "#" }}
          backgroundImage={hero.backgroundImage}
          overlayColor={hero.overlayColor}
        />
      )}
      {services && <ServicesSection title={services.title} subtitle={services.subtitle} items={services.items} />}
      {portfolio && <PortfolioSection title={portfolio.title} subtitle={portfolio.subtitle} items={portfolio.items} />}
      {testimonials && <TestimonialsSection title={testimonials.title} subtitle={testimonials.subtitle} items={testimonials.items} />}
      <WhatsAppFloat phone={content.footer?.whatsapp || "595981000000"} />
    </>
  )
}
`)

  // Layout
  writeFileSync(join(dir, "app/layout.tsx"), `import type { Metadata } from "next"

export const metadata: Metadata = {
  title: process.env.SITE_NAME || "My Site",
  description: process.env.SITE_DESCRIPTION || "",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
`)

  // Content template
  writeFileSync(join(dir, "content/es.json"), JSON.stringify({
    home: {
      hero: {
        headline: "Tu titulo aqui",
        subheadline: "Tu subtitulo",
        ctaPrimary: "Comenzar",
        ctaPrimaryHref: "#",
        backgroundImage: "",
        overlayColor: "rgba(10,10,20,0.85)",
      },
      services: {
        title: "Servicios",
        subtitle: "Lo que ofrecemos",
        items: [],
      },
      portfolio: {
        title: "Portafolio",
        subtitle: "Trabajos recientes",
        items: [],
      },
      testimonials: {
        title: "Testimonios",
        subtitle: "Lo que dicen nuestros clientes",
        items: [],
      },
    },
    footer: {
      whatsapp: "595981000000",
    },
  }, null, 2))

  console.log(`\n✅ Client ${response.name} created at ${dir}`)
  console.log("\nNext steps:")
  console.log(`  cd ${response.name}`)
  console.log("  npm install")
  console.log("  npm run dev")
  console.log("\nThen edit content/es.json with your client's data.\n")
}

main().catch(console.error)
