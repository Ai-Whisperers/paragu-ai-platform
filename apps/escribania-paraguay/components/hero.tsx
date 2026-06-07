import Link from 'next/link'

interface HeroProps {
  headline: string
  subheadline: string
  ctaPrimaryText?: string
  ctaPrimaryHref?: string
  ctaSecondaryText?: string
  ctaSecondaryHref?: string
  variant?: 'dark' | 'light'
}

export default function Hero({
  headline,
  subheadline,
  ctaPrimaryText,
  ctaPrimaryHref,
  ctaSecondaryText,
  ctaSecondaryHref,
  variant = 'dark',
}: HeroProps) {
  const isDark = variant === 'dark'

  return (
    <section
      className={`relative min-h-[85vh] flex items-center ${
        isDark
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
      }`}
    >
      {/* Subtle overlay pattern */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}
      <div className="container-page relative z-10 w-full text-center md:text-left">
        <div className="max-w-3xl mx-auto md:mx-0 py-20 md:py-32">
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
          <p
            className={`text-lg md:text-xl leading-relaxed mb-10 max-w-2xl ${
              isDark ? 'text-white/70' : 'text-muted'
            }`}
          >
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {ctaPrimaryText && ctaPrimaryHref && (
              <Link
                href={ctaPrimaryHref}
                className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-[var(--color-primary)] font-accent font-semibold px-8 py-3.5 rounded-lg transition-all text-base"
              >
                {ctaPrimaryText}
              </Link>
            )}
            {ctaSecondaryText && ctaSecondaryHref && (
              <Link
                href={ctaSecondaryHref}
                className={`inline-flex items-center justify-center font-accent font-medium px-8 py-3.5 rounded-lg border-2 transition-all text-base ${
                  isDark
                    ? 'border-white/30 text-white hover:border-white/60 hover:bg-white/5'
                    : 'border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5'
                }`}
              >
                {ctaSecondaryText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
