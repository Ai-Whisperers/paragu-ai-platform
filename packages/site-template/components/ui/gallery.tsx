"use client"
import { useState, useEffect } from "react"

/**
 * Gallery — full-bleed tattoo/portfolio gallery.
 * Auto-discovers images from /images/gallery/* in /public/ and renders them
 * as a responsive masonry-ish grid with lightbox preview.
 * 
 * All images get lazy loading. Click opens fullscreen preview with caption.
 * 
 * The images prop can be omitted to use the auto-discovery convention.
 */
export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface GalleryProps {
  title?: string
  subtitle?: string
  images?: GalleryImage[]
  /** Auto-discover images from a path prefix (e.g. "/images/gallery/tattoo/") */
  discoverPrefix?: string
  columns?: 2 | 3 | 4
  className?: string
}

export function Gallery({
  title,
  subtitle,
  images,
  discoverPrefix = "/images/gallery/tattoo/",
  columns = 3,
  className = "",
}: GalleryProps) {
  const [items, setItems] = useState<GalleryImage[]>(images || [])
  const [selected, setSelected] = useState<number | null>(null)
  const [loading, setLoading] = useState(!images)

  useEffect(() => {
    if (images) {
      setItems(images)
      setLoading(false)
      return
    }
    // Auto-discover via a known manifest endpoint
    fetch(discoverPrefix + "manifest.json")
      .then(r => r.ok ? r.json() : { images: [] })
      .then(data => {
        setItems(data.images || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [images, discoverPrefix])

  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  }[columns]

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{title}</h2>
        )}
        {subtitle && (
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">{subtitle}</p>
        )}

        {loading ? (
          <div className="text-center text-foreground/40 py-12">Cargando galería...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-foreground/40 py-12">
            Galería próximamente. <a href="#contact" className="underline">Consultá por WhatsApp</a>
          </div>
        ) : (
          <div className={`grid ${colClass} gap-4`}>
            {items.map((img, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border hover:border-accent/50 transition-all">
                <img
                  src={img.src}
                  alt={img.alt || img.caption || "Galería"}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-sm">{img.caption}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selected !== null && items[selected] && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:scale-110"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
            >×</button>
            {selected > 0 && (
              <button
                className="absolute left-4 text-white text-4xl hover:scale-110"
                onClick={(e) => { e.stopPropagation(); setSelected(selected - 1) }}
                aria-label="Anterior"
              >‹</button>
            )}
            {selected < items.length - 1 && (
              <button
                className="absolute right-4 text-white text-4xl hover:scale-110"
                onClick={(e) => { e.stopPropagation(); setSelected(selected + 1) }}
                aria-label="Siguiente"
              >›</button>
            )}
            <img
              src={items[selected].src}
              alt={items[selected].alt || items[selected].caption || ""}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  )
}
