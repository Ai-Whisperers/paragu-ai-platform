"use client"
import Link from "next/link"
import content from "@/content/es.json"
import { ProductCard } from "@/components/product-card"

const c = content as any
const h = c.home || {}
const products = c.products || []
const categories = c.categories || []
const testimonials = c.testimonials || []
const features = h.features?.items || []

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="py-20 px-4 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">{h.hero?.headline || c.tagline}</h1>
          <p className="text-white/80 text-lg max-w-lg mx-auto mb-8">{h.hero?.subheadline}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={h.hero?.ctaPrimaryHref || "/tienda"} className="bg-white text-primary px-8 py-3.5 rounded-xl font-semibold no-underline hover:bg-white/90 transition-colors">
              {h.hero?.ctaPrimaryText || "Ver productos"}
            </Link>
            <a href={h.hero?.ctaSecondaryHref || ""} target="_blank" rel="noopener noreferrer"
              className="bg-transparent text-white px-8 py-3.5 rounded-xl font-semibold no-underline border-2 border-white/50 hover:border-white transition-colors">
              {h.hero?.ctaSecondaryText || "WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      {products.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Nuestros Productos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p: any) => <ProductCard key={p.id} {...p} />)}
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="bg-surface-light py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Categorías</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat: any) => (
                <div key={cat.id} className="rounded-xl border border-border bg-surface p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      {features.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">{h.features?.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-6 text-center">
                <h3 className="font-semibold text-lg text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="bg-surface py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Lo que dicen nuestros clientes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <p className="text-muted-foreground text-sm mb-3">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 text-center bg-primary text-white">
        <h2 className="text-3xl font-bold mb-4">{h.finalCta?.title || "Contactanos"}</h2>
        <p className="mb-6 text-white/80">{h.finalCta?.description || "Consultá por nuestros productos."}</p>
        <a href={h.finalCta?.secondaryLink || "https://wa.me/595974202025"} target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white text-primary px-8 py-4 font-semibold hover:bg-white/90 transition-colors">
          {h.finalCta?.secondaryText || "WhatsApp"}
        </a>
      </section>
    </div>
  )
}
