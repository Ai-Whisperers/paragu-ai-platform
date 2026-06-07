import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import Link from "next/link"
import fs from "fs"
import path from "path"

interface Project {
  slug: string
  title: string
  client: string
  category: string
  year: string
}

function getProjects(): Project[] {
  const dir = path.join(process.cwd(), "content/portfolio")
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"))
  return files.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"))
    return { slug: f.replace(".json", ""), ...data }
  }).sort((a, b) => parseInt(b.year) - parseInt(a.year))
}

export default async function PortfolioPage(props: { searchParams?: Promise<{ cat?: string }> }) {
  const searchParams = await props.searchParams
  const projects = getProjects()
  const activeCat = searchParams?.cat || "all"
  const categories = ["all", "video", "foto", "marca", "eventos", "marketing"]
  const filtered = activeCat === "all" ? projects : projects.filter(p => p.category === activeCat)

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm tracking-widest uppercase mb-3">Nuestro Trabajo</p>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Portfolio</h1>
            <p className="text-foreground-light max-w-xl mx-auto">Proyectos que nos enorgullecen.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <Link key={cat} href={cat === "all" ? "/portfolio" : `/?cat=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCat === cat ? "bg-secondary text-white" : "bg-surface-light text-foreground-light hover:text-foreground"}`}>
                {cat === "all" ? "Todo" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-secondary/30 transition-all">
                <div className="aspect-video bg-surface-light flex items-center justify-center">
                  <span className="text-foreground-muted text-sm">{p.category}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-secondary font-medium">{p.category} &middot; {p.year}</span>
                  <h3 className="font-heading text-lg font-bold text-foreground mt-1 group-hover:text-secondary transition-colors">{p.title}</h3>
                  <p className="text-sm text-foreground-light mt-1">{p.client}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <CtaBanner />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
