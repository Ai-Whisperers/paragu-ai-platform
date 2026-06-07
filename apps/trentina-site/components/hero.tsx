interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  variant?: "dark" | "light";
  bgImage?: string;
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
  bgImage,
}: HeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden ${
        isDark ? "bg-[var(--color-background)]" : "bg-[var(--color-surface)]"
      }`}
    >
      {/* Real background image */}
      {bgImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})`, opacity: 0.25 }}
        />
      )}

      {/* Animated grain texture SVG overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="w-full h-full"
        >
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            >
              <animate
                attributeName="baseFrequency"
                values="0.65;0.75;0.65"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Floating amber glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--color-accent)]/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-3/4 w-64 h-64 rounded-full bg-[var(--color-accent)]/8 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

      {/* Gradient overlay for readability */}
      <div className="gradient-hero absolute inset-0 z-[2]" />

      <div className="relative z-10 container-page text-center max-w-4xl">
        {eyebrow && (
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold mb-6 animate-fade-in">
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-[var(--font-heading)] font-bold leading-tight mb-6 ${
            isDark ? "text-[var(--color-text)]" : "text-[var(--color-text)]"
          }`}
        >
          {headline}
        </h1>
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
            isDark
              ? "text-[var(--color-text-light)]"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaPrimaryText && ctaPrimaryHref && (
            <a
              href={ctaPrimaryHref}
              className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-accent)] text-[var(--color-background)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20"
            >
              {ctaPrimaryText}
            </a>
          )}
          {ctaSecondaryText && ctaSecondaryHref && (
            <a
              href={ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] font-semibold rounded-lg hover:bg-[var(--color-accent)]/10 transition-all duration-300"
            >
              {ctaSecondaryText}
            </a>
          )}
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent z-[2]" />
    </section>
  );
}
