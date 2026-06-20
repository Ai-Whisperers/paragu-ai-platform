interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  variant?: "dark" | "light";
}

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  ctaPrimaryText,
  ctaPrimaryHref,
  ctaSecondaryText,
  ctaSecondaryHref,
  variant = "dark",
}: HeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative min-h-[100svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-12 md:pb-16 ${
        isDark ? "bg-[var(--color-background)]" : "bg-[var(--color-surface)]"
      }`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/20 via-transparent to-[var(--color-background)] z-0" />

      {/* Decorative circles — hidden on small screens to keep mobile clean */}
      <div className="hidden md:block absolute top-20 right-20 w-72 h-72 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <div className="hidden md:block absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />

      <div className="relative z-10 container-page text-left md:text-center max-w-4xl">
        {eyebrow && (
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4 md:mb-6 font-semibold">
            {eyebrow}
          </span>
        )}
        <h1
          className="text-[var(--text-fluid-h1)] font-[var(--font-heading)] font-bold leading-[1.05] mb-5 md:mb-6 text-[var(--color-text)]"
          style={{ letterSpacing: "0.01em" }}
        >
          {headline}
        </h1>
        <p className="text-[var(--text-fluid-lg)] max-w-2xl md:mx-auto mb-8 md:mb-10 leading-relaxed text-[var(--color-text-light)]">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:justify-center max-w-md sm:max-w-none mx-auto">
          {ctaPrimaryText && ctaPrimaryHref && (
            <a
              href={ctaPrimaryHref}
              className="tap px-7 sm:px-8 py-3.5 bg-gold text-[var(--color-primary-dark)] font-bold tracking-wide rounded-lg hover:bg-[var(--color-accent-light)] active:scale-[0.98] transition-all text-base sm:text-lg shadow-lg shadow-[var(--color-accent)]/20"
            >
              {ctaPrimaryText}
            </a>
          )}
          {ctaSecondaryText && ctaSecondaryHref && (
            <a
              href={ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tap px-7 sm:px-8 py-3.5 border-2 border-gold text-gold font-bold tracking-wide rounded-lg hover:bg-gold/10 active:scale-[0.98] transition-all text-base sm:text-lg"
            >
              {ctaSecondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
