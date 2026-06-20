import { Metadata } from "next";
import content from "@/content/es.json";
import WeeklySpecial from "@/components/weekly-special";
import MenuPageClient from "./menu-client";

const c = content as any;

export const metadata: Metadata = {
  title: c.menu.seo.title,
  description: c.menu.seo.description,
};

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-10 md:pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-left md:text-center max-w-2xl md:mx-auto">
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
            Sabores que enamoran
          </span>
          <h1 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3 md:mb-4 leading-tight">
            {c.menu.intro.title}
          </h1>
          <p className="lead max-w-lg md:mx-auto">
            {c.menu.intro.subtitle}
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
