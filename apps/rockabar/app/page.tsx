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
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
              Horarios
            </span>
            <h2 className="text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)]">
              {h.hours.title}
            </h2>
            <p className="text-[var(--color-text-muted)] mt-3">{h.hours.subtitle}</p>
          </div>
          <div className="max-w-md mx-auto rock-card p-6">
            {h.hours.items.map((s: { day: string; hours: string }) => (
              <div
                key={s.day}
                className="flex justify-between items-center gap-8 py-3 border-b border-[var(--color-border)] last:border-0"
              >
                <span className="font-semibold text-[var(--color-text)] uppercase tracking-wide">
                  {s.day}
                </span>
                <span
                  className={
                    s.hours === "Cerrado"
                      ? "text-[var(--color-text-muted)] italic"
                      : "text-[var(--color-accent)] font-mono"
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
