interface CtaProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}

export default function CtaBanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: CtaProps) {
  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-8 md:p-16 text-left md:text-center">
          <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl md:mx-auto">
            <h2 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-white mb-3 md:mb-4 leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/85 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tap inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gold text-[var(--color-primary-dark)] font-bold rounded-lg hover:bg-[var(--color-accent-light)] active:scale-[0.98] transition-all text-base shadow-lg"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
