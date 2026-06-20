"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
  title?: string;
}

export default function GalleryClient({
  images,
}: {
  images: GalleryImage[];
}) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        {images.length === 0 ? (
          <p className="text-center text-[var(--color-text-muted)] py-12">
            Pronto subiremos fotos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {images.map((img, i) => (
              <div
                key={i}
                className={
                  i === 0
                    ? "sm:col-span-2 sm:row-span-2"
                    : ""
                }
              >
                <button
                  onClick={() => setSelected(img)}
                  className="group relative w-full overflow-hidden rounded-xl border border-[var(--color-border)] hover:border-gold/40 transition-all rock-card"
                  aria-label={`Ver ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {img.title && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <p className="text-sm font-semibold text-white text-left">
                        {img.title}
                      </p>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 md:p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white z-10 tap"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>
          <div className="relative max-w-4xl w-full">
            <img
              src={selected.src}
              alt={selected.alt}
              className="w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-xl"
            />
            {(selected.title || selected.alt) && (
              <p className="text-center text-sm md:text-base text-white/80 mt-4">
                {selected.title || selected.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
