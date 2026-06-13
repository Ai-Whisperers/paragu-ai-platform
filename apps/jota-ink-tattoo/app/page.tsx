"use client"
import Link from "next/link"
import content from "@/content/es.json"
import { Gallery } from "@/components/gallery"
import { TrustStrip, TRUST_ITEMS_VISUAL } from "@/components/truststrip"

const c = content as Record<string, unknown>
const h = c.home || {}
const stats = h.stats || []
const styles = h.styles?.items || []
const process = h.process?.steps || []

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="py-24 px-4 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #111111 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 25% 50%, var(--color-accent) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 border border-accent/30 rounded-full text-xs tracking-widest text-accent/80 mb-6 uppercase">
            Tatuajes en Paraguay 🇵🇾
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight"
            dangerouslySetInnerHTML={{ __html: h.hero?.headline }} />
          <p className="text-foreground/60 text-lg max-w-lg mx-auto mb-10">{h.hero?.subheadline}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={h.hero?.ctaPrimaryHref || "/trabajo"}
              className="bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-semibold no-underline hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20">
              {h.hero?.ctaPrimaryText || "Ver mi trabajo"}
            </Link>
            <a href={h.hero?.ctaSecondaryHref || "#"} target="_blank" rel="noopener noreferrer"
              className="bg-transparent text-foreground px-8 py-3.5 rounded-xl font-semibold no-underline border border-foreground/20 hover:border-accent hover:text-accent transition-all">
              {h.hero?.ctaSecondaryText || "WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      {stats.length > 0 && (
        <section className="py-16 px-4 border-y border-border">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((s: any, i: number) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-black text-accent mb-2">{s.value}</div>
                <div className="text-sm text-foreground/50 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STYLES */}
      {styles.length > 0 && (
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{h.styles?.title}</h2>
          <p className="text-center text-foreground/50 mb-12 max-w-xl mx-auto">Especialidades y estilos que domino</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {styles.map((s: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-6 text-center hover:border-accent/30 transition-all group">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-sm text-foreground/50">{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROCESS */}
      {process.length > 0 && (
        <section className="py-20 px-4 bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">{h.process?.title}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p: any, i: number) => (
                <div key={i} className="text-center relative">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent font-bold text-lg">
                    {p.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-foreground/50">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="py-24 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #111111 0%, #0a0a0a 100%)" }}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{h.finalCta?.title}</h2>
        <p className="text-foreground/60 mb-8 max-w-lg mx-auto">{h.finalCta?.description}</p>
        <a href={h.finalCta?.secondaryLink || "https://wa.me/595971679370"} target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-accent text-accent-foreground px-8 py-4 font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20">
          {h.finalCta?.secondaryText || "WhatsApp"}
        </a>
      </section>

      {/* TrustStrip */}
      <section className="py-12 px-4 border-y border-accent/20 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <TrustStrip items={TRUST_ITEMS_VISUAL} variant="horizontal" theme="dark" size="md" />
        </div>
      </section>

      {/* Gallery */}
      <Gallery
        title="Mi Trabajo"
        subtitle="Una selección de los tatuajes que he realizado. Cada diseño es único y personalizado."
        discoverPrefix="/images/gallery/tattoo/"
        columns={3}
      />


    </div>
  )
}
