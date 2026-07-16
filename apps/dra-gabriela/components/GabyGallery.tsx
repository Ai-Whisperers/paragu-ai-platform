"use client"
// Gaby Brand Photo Gallery — uses AI-generated brand photos from /images/batch-02/
// and ambient shots from /images/hero-candid/, /images/services-empathy/, /images/team-atmosphere/
// Non-breaking addition: separate page, no impact on existing routes.

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  src: string
  caption: string
  category: "hero-candid" | "services-empathy" | "team-atmosphere" | "batch-02"
}

const PHOTOS: Photo[] = [
  // batch-02 (4 brand photos)
  { src: "/images/batch-02/D-coat-headshot.webp", caption: "Dra. Gabriella — primary identity portrait", category: "batch-02" },
  { src: "/images/batch-02/A-patient-child.webp", caption: "Atención familiar — paciente pediátrico", category: "batch-02" },
  { src: "/images/batch-02/B-elderly-hand.webp", caption: "Acompañamiento intergeneracional", category: "batch-02" },
  { src: "/images/batch-02/C-triptych.webp", caption: "El consultorio — sala, recepción, entrada", category: "batch-02" },
  // hero-candid
  { src: "/images/hero-candid/dra-gp-laugh.webp", caption: "Momento auténtico en el pasillo", category: "hero-candid" },
  { src: "/images/hero-candid/dra-gp-goodbye.webp", caption: "Hasta la próxima consulta", category: "hero-candid" },
  // services-empathy
  { src: "/images/services-empathy/xray-explain.webp", caption: "Te explico antes de tocar — radiografía", category: "services-empathy" },
  { src: "/images/services-empathy/teaching.webp", caption: "Conversación inicial con modelo dental", category: "services-empathy" },
  { src: "/images/services-empathy/hands-holding.webp", caption: "Empatía clínica", category: "services-empathy" },
  { src: "/images/services-empathy/pediatric.webp", caption: "Atención pediátrica", category: "services-empathy" },
  // team-atmosphere
  { src: "/images/team-atmosphere/waiting-room.webp", caption: "Sala de espera — residencial, no clínica", category: "team-atmosphere" },
  { src: "/images/team-atmosphere/sterilization.webp", caption: "Estación de esterilización", category: "team-atmosphere" },
  { src: "/images/team-atmosphere/bookshelf.webp", caption: "Biblioteca — periodoncia + literatura", category: "team-atmosphere" },
]

const CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "batch-02", label: "Sesión de marca" },
  { id: "hero-candid", label: "Momentos" },
  { id: "services-empathy", label: "Empatía clínica" },
  { id: "team-atmosphere", label: "Ambiente" },
] as const

export function GabyGallery() {
  const [filter, setFilter] = useState<string>("all")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === "all" ? PHOTOS : PHOTOS.filter(p => p.category === filter)
  const currentIdx = lightbox !== null ? lightbox : 0
  const current = filtered[currentIdx]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif text-navy mb-3">
          Galería de la práctica
        </h2>
        <p className="text-base text-navy/70 max-w-2xl mx-auto">
          Imágenes del consultorio, los momentos en el sillón, y la atención que vas a recibir.
          No es un consultorio genérico — es <em className="font-medium">este</em> consultorio.
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === c.id
                ? "bg-navy text-white"
                : "bg-navy/5 text-navy/70 hover:bg-navy/10"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((photo, idx) => (
          <button
            key={photo.src}
            onClick={() => setLightbox(idx)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-navy/5 hover:shadow-lg transition-all"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm text-left">
                {photo.caption}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white/80 hover:text-white p-2"
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length) }}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-4 text-white/80 hover:text-white p-2"
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length) }}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <figure
            className="max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <figcaption className="text-white/90 text-center mt-4 text-sm">
              {current.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}