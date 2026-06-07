"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface HomeGalleryProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  images: GalleryImage[];
}

export default function HomeGallery({
  title,
  subtitle,
  ctaText,
  ctaHref,
  images,
}: HomeGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "Todas" },
    { id: "cervezas", label: "Cervezas" },
    { id: "eventos", label: "Eventos" },
    { id: "chopp", label: "Chopp" },
    { id: "fabrica", label: "Fábrica" },
  ];

  const filteredImages =
    activeFilter === "all"
      ? images.slice(0, 6)
      : images.filter((img) => img.category === activeFilter).slice(0, 6);

  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3 font-[var(--font-heading)]">
            {title}
          </h2>
          <p className="text-[var(--color-text-muted)]">{subtitle}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === cat.id
                  ? "bg-gold text-[var(--color-background)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {filteredImages.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium truncate">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 transition-all"
          >
            {ctaText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
