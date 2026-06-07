import Image from "next/image";
import Link from "next/link";

interface MetatronFeatureProps {
  title: string;
  description: string;
  abv: string;
  ibu: string;
  content: string;
  ctaText: string;
  ctaHref: string;
}

export default function MetatronFeature({
  title,
  description,
  abv,
  ibu,
  content,
  ctaText,
  ctaHref,
}: MetatronFeatureProps) {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gold blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-gold/10">
            <Image
              src="/images/beers/metatron.jpg"
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Badges overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gold/90 text-[var(--color-background)]">
                ABV {abv}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                IBU {ibu}
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[60px] bg-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
                Cerveza Especial
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3 font-[var(--font-heading)]">
              {title}
            </h2>

            <p className="text-gold font-semibold mb-4 text-lg">{description}</p>

            <p className="text-[var(--color-text-light)] leading-relaxed mb-6">
              {content}
            </p>

            {/* Stats row */}
            <div className="flex gap-6 mb-8">
              <div className="text-center">
                <span className="block text-2xl font-bold text-gold">{abv}</span>
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                  Alcohol
                </span>
              </div>
              <div className="w-px bg-[var(--color-border)]" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-gold">{ibu}</span>
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                  IBU
                </span>
              </div>
              <div className="w-px bg-[var(--color-border)]" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-gold">500ml</span>
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                  Presentación
                </span>
              </div>
            </div>

            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[var(--color-background)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all"
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
      </div>
    </section>
  );
}
