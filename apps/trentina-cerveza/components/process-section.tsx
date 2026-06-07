interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
}

export default function ProcessSection({
  title = "Nuestro Proceso",
  subtitle = "Cada paso cuenta para lograr una cerveza de calidad",
  steps,
}: ProcessSectionProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Proceso Artesanal
          </span>
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="relative group">
              {/* Step connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/40 to-transparent" />
              )}

              {/* Step circle */}
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:border-gold/60 transition-all">
                  <span className="text-2xl font-bold font-[var(--font-heading)] text-gold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
