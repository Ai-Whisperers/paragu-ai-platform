"use client"
import content from "@/content/es.json"

const c = content as Record<string, any>
const s = c.servicios || {}
const list = s.list || []
const info = s.info?.items || []

export default function Servicios() {
  return (
    <div>
      <section className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)" }}>
        <h1 className="text-4xl sm:text-5xl font-black mb-4"
          dangerouslySetInnerHTML={{ __html: s.hero?.headline }} />
        <p className="text-foreground/60 max-w-xl mx-auto">{s.hero?.subheadline}</p>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid gap-6">
          {list.map((item: any, i: number) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-6 hover:border-accent/30 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/50">{item.description}</p>
                </div>
                <div className="shrink-0 text-accent font-bold">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {info.length > 0 && (
        <section className="py-16 px-4 bg-surface border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">{s.info?.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {info.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">✦</span>
                  <span className="text-sm text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{s.finalCta?.title}</h2>
        <p className="text-foreground/60 mb-8 max-w-lg mx-auto">{s.finalCta?.description}</p>
        <a href={s.finalCta?.buttonLink || "https://wa.me/595971679370"} target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-accent text-accent-foreground px-8 py-4 font-semibold hover:bg-accent/90 transition-all">
          {s.finalCta?.buttonText || "Consultar"}
        </a>
      </section>
    </div>
  )
}
