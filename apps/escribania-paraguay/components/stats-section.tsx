import ScrollReveal from '@/components/animations/scroll-reveal'

interface StatItem {
  number: string
  label: string
}

interface StatsSectionProps {
  items: StatItem[]
}

export default function StatsSection({ items }: StatsSectionProps) {
  return (
    <section className="bg-accent section-padding">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="text-center">
                <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {item.number}
                </div>
                <p className="text-primary/70 font-accent text-sm md:text-base font-medium">
                  {item.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
