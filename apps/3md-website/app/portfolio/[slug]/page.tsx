import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import fs from "fs"
import path from "path"

interface Project {
  slug: string
  title: string
  client: string
  category: string
  year: string
  hero_description: string
  description: string
  approach: string
  results: string
  tags: string[]
}

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/portfolio")
  return fs.readdirSync(dir).filter(f => f.endsWith(".json")).map(f => ({ slug: f.replace(".json", "") }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "content/portfolio", `${slug}.json`)
  const p: Project = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  p.slug = slug

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-foreground-light hover:text-foreground text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al portfolio
          </Link>
          <div className="aspect-video bg-surface-light rounded-xl flex items-center justify-center mb-10">
            <span className="text-foreground-muted">[ {p.category} - {p.year} ]</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full">{p.category}</span>
            <span className="text-xs bg-surface-light text-foreground-light px-3 py-1 rounded-full">{p.year}</span>
            <span className="text-xs bg-surface-light text-foreground-light px-3 py-1 rounded-full">{p.client}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{p.title}</h1>
          <p className="text-lg text-foreground-light mb-8">{p.hero_description}</p>
          <div className="space-y-8">
            <section>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">Descripcion</h2>
              <p className="text-foreground-light leading-relaxed">{p.description}</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">Enfoque</h2>
              <p className="text-foreground-light leading-relaxed">{p.approach}</p>
            </section>
            <section>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">Resultados</h2>
              <p className="text-foreground-light leading-relaxed">{p.results}</p>
            </section>
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <a href="https://wa.me/595991691501?text=Hola!%20Vi%20el%20proyecto%20${encodeURIComponent(p.title)}%20y%20quiero%20algo%20similar"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-all">
              Quiero un proyecto similar
            </a>
          </div>
        </div>
      </main>
      <CtaBanner />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
