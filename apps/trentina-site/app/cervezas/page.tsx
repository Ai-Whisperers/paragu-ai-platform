import Image from "next/image";
import { Metadata } from "next";
import content from "@/content/es.json";
import WeeklySpecial from "@/components/weekly-special";
import MenuPageClient from "./cervezas-client";

const c = content as any;

export const metadata: Metadata = {
  title: "Cervezas — Trentina Cerveza Artesanal",
  description:
    "Explorá nuestras cervezas artesanales: IPA, Lager, Stout, Porter y más. Cerveza de calidad en San Lorenzo.",
};

export default function CervezasPage() {
  return (
    <>
      {/* Hero with beer glass image */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/beer-glass-craft.jpg"
            alt="Cerveza Trentina — Cerveza artesanal"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/80 to-[var(--color-background)]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Cerveza artesanal
          </span>
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            Nuestras Cervezas
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto">
            Descubrí nuestra variedad de estilos, elaborados con ingredientes
            seleccionados para cada paladar.
          </p>
        </div>
      </section>

      <WeeklySpecial
        title={c.home.weeklySpecial?.title}
        subtitle={c.home.weeklySpecial?.subtitle}
        badge={c.home.weeklySpecial?.badge}
        item={c.home.weeklySpecial?.item}
        ctaText={c.home.weeklySpecial?.ctaText}
        ctaHref={c.home.weeklySpecial?.ctaHref}
        validDays={c.home.weeklySpecial?.validDays}
      />

      <MenuPageClient categories={c.menu.categories} whatsapp={c.site.whatsapp} />
    </>
  );
}
