import { Metadata } from "next";
import content from "@/content/es.json";
import GalleryClient from "./gallery-client";

const c = content as any;

export const metadata: Metadata = {
  title: c.gallery.seo.title,
  description: c.gallery.seo.description,
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero with gallery image */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/gallery/gallery-1.jpg"
            alt="Galería Cerveza Trentina"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/80 to-[var(--color-background)]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {c.gallery.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {c.gallery.hero.subtitle}
          </p>
        </div>
      </section>

      <GalleryClient images={c.gallery.images} />
    </>
  );
}
