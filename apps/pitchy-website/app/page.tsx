"use client"
import Link from "next/link"
import content from "@/content/es.json"

const c = content as Record<string, any>
const h = c.home || {}
const productos = c.products || []
const features = h.features?.items || []
const testimonials = c.testimonials || []

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="py-20 px-4 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F62FE 0%, #00A3E0 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">{h.hero?.headline}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">{h.hero?.subheadline}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/cotizar" className="bg-white text-[#0F62FE] px-8 py-3.5 rounded-xl font-semibold no-underline hover:bg-white/90 transition-colors">
              {h.hero?.ctaPrimaryText || "Solicitar cotización"}
            </Link>
            <a href={h.hero?.ctaSecondaryHref} target="_blank" rel="noopener noreferrer"
              className="bg-transparent text-white px-8 py-3.5 rounded-xl font-semibold no-underline border-2 border-white/50 hover:border-white transition-colors">
              {h.hero?.ctaSecondaryText || "WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {features.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#1A1A2E]">{h.features?.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f: any, i: number) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-[#0F62FE] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280]">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRODUCTS OVERVIEW */}
      <section className="bg-[#F8F9FA] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#1A1A2E]">Nuestros Productos</h2>
          <p className="text-center text-[#6B7280] mb-10 max-w-2xl mx-auto">Vidrio templado, laminado, DVH, muro cortina, Low-E, Blindex y más.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productos.slice(0, 4).map((p: any) => (
              <a key={p.id} href={`/productos#${p.id}`} className="block rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow no-underline">
                <h3 className="font-semibold text-lg text-[#0F62FE] mb-2">{p.name}</h3>
                <p className="text-sm text-[#6B7280] mb-3">{p.description.slice(0, 100)}...</p>
                <span className="text-sm font-semibold text-[#00A3E0]">Ver más →</span>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/productos" className="inline-block rounded-lg border border-[#0F62FE] text-[#0F62FE] px-6 py-3 font-semibold hover:bg-blue-50 transition-colors">
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#1A1A2E]">Lo que dicen nuestros clientes</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-[#6B7280] text-sm mb-3">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold text-sm text-[#1A1A2E]">{t.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0F62FE 100%)" }}>
        <h2 className="text-3xl font-bold mb-4 text-white">{h.finalCta?.title || "Contactanos"}</h2>
        <p className="mb-6 text-white/80">{h.finalCta?.description || "Consultá por nuestros productos."}</p>
        <a href={h.finalCta?.secondaryLink || "https://wa.me/595981277601"} target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white text-[#0F62FE] px-8 py-4 font-semibold hover:bg-white/90 transition-colors">
          {h.finalCta?.secondaryText || "WhatsApp"}
        </a>
      </section>
    </div>
  )
}
