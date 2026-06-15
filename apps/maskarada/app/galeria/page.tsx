"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";

const flyers = [
  ["poster_623787", "Flyer promocional maškaráda"],
  ["poster_685262", "Flyer promocional maškaráda"],
  ["poster_655465", "Flyer promocional maškaráda"],
  ["poster_654656", "Flyer promocional maškaráda"],
  ["poster_654000", "Flyer promocional maškaráda"],
  ["poster_650802", "Flyer promocional maškaráda"],
  ["poster_509622", "Flyer promocional maškaráda"],
  ["poster_504007", "Flyer promocional maškaráda"],
  ["poster_503741", "Flyer promocional maškaráda"],
  ["poster_503648", "Flyer promocional maškaráda"],
  ["poster_503483a", "Flyer promocional maškaráda"],
  ["poster_503483b", "Flyer promocional maškaráda"],
  ["poster_502602", "Flyer promocional maškaráda"],
  ["poster_502473", "Flyer promocional maškaráda"],
  ["poster_548226", "Flyer promocional maškaráda"],
  ["poster_588546", "Flyer promocional maškaráda"],
  ["flyer_475262", "Flyer promocional maškaráda"],
  ["flyer_475431", "Flyer promocional maškaráda"],
  ["mobile_544907", "Flyer promocional maškaráda"],
  ["mobile_547821", "Flyer promocional maškaráda"],
] as const;

const photos = [
  ["event_508619", "Foto del evento maškaráda"],
  ["event_508986", "Foto del evento maškaráda"],
  ["instagram_474917", "Foto del evento maškaráda"],
  ["instagram_474979", "Foto del evento maškaráda"],
  ["instagram_475433", "Foto del evento maškaráda"],
  ["instagram_476627", "Foto del evento maškaráda"],
  ["instagram_503576", "Foto del evento maškaráda"],
] as const;

type Category = "all" | "flyers" | "photos";

export default function Galeria() {
  const [active, setActive] = useState<Category>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered =
    active === "flyers" ? flyers : active === "photos" ? photos : [...flyers, ...photos];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const tabs: { id: Category; label: string }[] = [
    { id: "all", label: "Todas" },
    { id: "flyers", label: "Flyers" },
    { id: "photos", label: "Fotos" },
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Galería</h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-400 mb-8">Las imágenes de nuestras noches.</p>
          <div className="flex items-center justify-center gap-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                  active === t.id
                    ? "bg-blood-500 text-white"
                    : "border border-white/20 text-gray-400 hover:border-white/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map(([file, alt]) => (
            <div
              key={file}
              className="break-inside-avoid overflow-hidden rounded-xl border border-white/5 cursor-pointer group relative hover:border-blood-500/40 transition-all duration-300"
              onClick={() => setSelected(`/images/${active === "photos" ? "photos" : active === "flyers" ? "flyers" : "flyers"}/${file}.jpg`)}
            >
              <picture>
                <source srcSet={`/images/${active === "photos" ? "photos" : "flyers"}/${file}.webp`} type="image/webp" />
                <img
                  src={`/images/${active === "photos" ? "photos" : "flyers"}/${file}.jpg`}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white/0 group-hover:text-white/80 text-2xl transition-all duration-300">
                  🔍
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 opacity-30">🎭</div>
            <p className="text-gray-500">No hay imágenes en esta categoría.</p>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gold-400 transition-colors z-10"
            onClick={() => setSelected(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <img
            src={selected}
            alt="Imagen ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
