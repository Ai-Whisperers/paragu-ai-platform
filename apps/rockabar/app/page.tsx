import { Metadata } from "next";
import content from "@/content/es.json";
import Hero from "@/components/hero";
import FeaturesSection from "@/components/features-section";
import WeeklySpecial from "@/components/weekly-special";
import MenuPreviewSection from "@/components/menu-preview-section";
import CtaBanner from "@/components/cta-banner";

const c = content as any;

export const metadata: Metadata = {
  title: c.home.seo.title,
  description: c.home.seo.description,
};

export default function HomePage() {
  const h = c.home;

  return (
    <>
      <Hero
        eyebrow={h.hero.eyebrow}
        headline={h.hero.headline}
        subheadline={h.hero.subheadline}
        ctaPrimaryText={h.hero.ctaPrimaryText}
        ctaPrimaryHref={h.hero.ctaPrimaryHref}
        ctaSecondaryText={h.hero.ctaSecondaryText}
        ctaSecondaryHref={h.hero.ctaSecondaryHref}
        variant="dark"
      />

      <FeaturesSection
        title={h.features.title}
        subtitle={h.features.subtitle}
        items={h.features.items}
      />

      <WeeklySpecial
        title={h.weeklySpecial?.title}
        subtitle={h.weeklySpecial?.subtitle}
        badge={h.weeklySpecial?.badge}
        item={h.weeklySpecial?.item}
        ctaText={h.weeklySpecial?.ctaText}
        ctaHref={h.weeklySpecial?.ctaHref}
        validDays={h.weeklySpecial?.validDays}
      />

      <MenuPreviewSection
        title={h.menuSection.title}
        description={h.menuSection.description}
        categories={h.menuSection.categories}
      />

      {/* Hours section */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="text-left md:text-center mb-8 md:mb-10 max-w-2xl md:mx-auto">
            <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
              Horarios
            </span>
            <h2 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] leading-tight">
              {h.hours.title}
            </h2>
            <p className="text-[var(--color-text-muted)] mt-3 text-sm md:text-base">
              {h.hours.subtitle}
            </p>
          </div>
          <div className="max-w-md mx-auto rock-card p-5 md:p-6">
            {h.hours.items.map((s: { day: string; hours: string }) => (
              <div
                key={s.day}
                className="flex justify-between items-center gap-3 sm:gap-8 py-2.5 md:py-3 border-b border-[var(--color-border)] last:border-0"
              >
                <span className="font-semibold text-[var(--color-text)] uppercase tracking-wide text-sm">
                  {s.day}
                </span>
                <span
                  className={
                    s.hours === "Cerrado"
                      ? "text-[var(--color-text-muted)] italic text-sm"
                      : "text-[var(--color-accent)] font-mono text-sm"
                  }
                >
                  {s.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={h.cta.title}
        subtitle={h.cta.subtitle}
        buttonText={h.cta.buttonText}
        buttonHref={h.cta.buttonHref}
      />
    </>
  );
}
