import ScrollReveal from '@/components/animations/scroll-reveal'

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface ProcessSectionProps {
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export default function ProcessSection({
  title,
  subtitle,
  steps,
}: ProcessSectionProps) {
  return (
    <section className="bg-surface section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative flex flex-col items-center text-center lg:pt-0">
                  {/* Number circle */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent text-primary font-heading text-lg md:text-xl font-bold mb-5">
                    {step.number}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
