"use client"
import { useState } from "react"
import content from "@/content/es.json"

const c = content as Record<string, any>
const t = c.trabajo || {}
const cats = t.categories || []

// Generate image list from the gallery directory
const totalJpg = 20
const totalWebp = 6
const images = [
  ...Array.from({ length: totalJpg }, (_, i) => ({
    src: `/images/gallery/tattoo/tattoo-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `Tatuaje ${i + 1} - Jota Ink`,
    category: i < 5 ? "Realismo" : i < 10 ? "Black & Grey" : i < 14 ? "Orgánico" : i < 17 ? "Letras" : "Personalizados"
  })),
  ...Array.from({ length: totalWebp }, (_, i) => ({
    src: `/images/gallery/tattoo/tattoo-${String(i + 1 + totalJpg).padStart(2, "0")}.webp`,
    alt: `Tatuaje ${i + 1 + totalJpg} - Jota Ink`,
    category: "Black & Grey"
  }))
]

export default function Trabajo() {
  const [filter, setFilter] = useState<string | null>(null)
  const filtered = filter ? images.filter(img => img.category === filter) : images

  return (
    <div>
      <section className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)" }}>
        <h1 className="text-4xl sm:text-5xl font-black mb-4"
          dangerouslySetInnerHTML={{ __html: t.hero?.headline }} />
        <p className="text-foreground/60 max-w-xl mx-auto">{t.hero?.subheadline}</p>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full border text-sm transition-all cursor-pointer ${
              filter === null
                ? "bg-accent text-accent-foreground border-accent"
                : "border-border text-foreground/70 hover:border-accent/50 hover:text-accent"
            }`}>
            Todos
          </button>
          {cats.map((cat: string, i: number) => (
            <button key={i}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border text-sm transition-all cursor-pointer ${
                filter === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-foreground/70 hover:border-accent/50 hover:text-accent"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((img, i) => (
              <a key={i} href={img.src} target="_blank" rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface hover:border-accent/40 transition-all">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                    Ver ampliado
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-foreground/50">
            No hay imágenes en esta categoría.
          </div>
        )}

        {/* Gallery stats */}
        <div className="mt-10 text-center text-sm text-foreground/40">
          {filtered.length} de {images.length} tatuajes
        </div>

        {/* Instagram fallback CTA */}
        <div className="mt-16 text-center">
          <p className="text-foreground/50 mb-4">Seguime en Instagram para ver más trabajos</p>
          <a href="https://www.instagram.com/jottaink_/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 font-semibold hover:opacity-90 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            @jottaink_
          </a>
        </div>
      </section>
    </div>
  )
}
