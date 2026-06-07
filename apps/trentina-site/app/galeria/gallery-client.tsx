"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function GalleryClient({
  images,
}: {
  images: GalleryImage[];
}) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [activeCat, setActiveCat] = useState("all");

  const categories = [
    { id: "all", name: "Todas" },
    { id: "cervezas", name: "Cervezas" },
    { id: "chopp", name: "Chopp" },
    { id: "eventos", name: "Eventos" },
    { id: "fábrica", name: "Fábrica" },
  ];

  const filtered =
    activeCat === "all"
      ? images
      : images.filter((img) => img.category === activeCat);

  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCat === cat.id
                  ? "bg-gold text-[var(--color-background)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="columns-2 md:columns-3 gap-4 max-w-5xl mx-auto">
          {filtered.map((img, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <button
                onClick={() => setSelected(img)}
                className="group w-full overflow-hidden rounded-xl border border-[var(--color-border)] hover:border-gold/40 transition-all"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </button>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-12">
            Pronto subiremos fotos de nuestras cervezas y el local.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-10"
            aria-label="Cerrar"
          >
            ✕
          </button>
          <div className="relative max-w-3xl w-full">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center text-sm text-[var(--color-text-muted)] mt-3">
              {selected.alt}
            </p>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = filtered.findIndex((img) => img.src === selected.src);
                  if (idx > 0) setSelected(filtered[idx - 1]);
                }}
                className="w-10 h-10 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Anterior"
              >
                ←
              </button>
              <span className="text-white/70 text-sm font-mono">
                {filtered.findIndex((img) => img.src === selected.src) + 1} / {filtered.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = filtered.findIndex((img) => img.src === selected.src);
                  if (idx < filtered.length - 1) setSelected(filtered[idx + 1]);
                }}
                className="w-10 h-10 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Siguiente"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
