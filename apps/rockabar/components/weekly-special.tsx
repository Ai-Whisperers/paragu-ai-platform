import { Sparkles } from "lucide-react";

interface WeeklySpecialProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  item?: {
    name: string;
    description: string;
    price: string;
    originalPrice?: string;
    category?: string;
  };
  ctaText?: string;
  ctaHref?: string;
  validDays?: string;
}

export default function WeeklySpecial({
  title = "Especial de la Semana",
  subtitle = "Plato limitado — renovamos cada semana",
  badge = "Nuevo",
  item,
  ctaText = "Pedir este Plato",
  ctaHref = "https://wa.me/595976309917",
  validDays,
}: WeeklySpecialProps) {
  if (!item) return null;

  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-left md:text-center mb-8 md:mb-10 max-w-2xl md:mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
            <Sparkles size={14} />
            {title}
          </span>
          <h2 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3 leading-tight">
            {subtitle}
          </h2>
          {validDays && (
            <p className="text-sm text-[var(--color-text-muted)]">
              Disponible: {validDays}
            </p>
          )}
        </div>

        {/* Special card */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-surface-alt)] via-[var(--color-surface)] to-[var(--color-background)] border border-gold/30 shadow-lg shadow-gold/10">
          {/* Gold accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
              <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-gold text-[var(--color-background)] text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {badge}
              </span>
            </div>
          )}

          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Left: info */}
              <div className="flex-1 text-left">
                {item.category && (
                  <span className="text-xs uppercase tracking-[0.2em] text-gold mb-2 block font-semibold">
                    {item.category}
                  </span>
                )}
                <h3 className="text-xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3 md:mb-4 tracking-wide leading-tight">
                  {item.name}
                </h3>
                <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed mb-5 md:mb-6">
                  {item.description}
                </p>

                {/* Prices */}
                <div className="flex items-baseline gap-3 mb-5 md:mb-6 flex-wrap">
                  <span className="text-2xl md:text-3xl font-bold text-gold">
                    {item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-base md:text-lg text-[var(--color-text-muted)] line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3.5 bg-gold text-[var(--color-primary-dark)] font-bold rounded-lg hover:bg-[var(--color-accent-light)] active:scale-[0.98] transition-all text-base shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  </svg>
                  {ctaText}
                </a>
              </div>

              {/* Right: decorative */}
              <div className="hidden md:flex w-48 items-center justify-center shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-[var(--color-primary)]/20 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-gold/60" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 border-gold/30" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gold/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
