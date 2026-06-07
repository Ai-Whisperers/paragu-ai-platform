import { Check } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface ServiceItemsListProps {
  title: string
  items: string[]
  icon?: string
}

export default function ServiceItemsList({
  title,
  items,
}: ServiceItemsListProps) {
  return (
    <section className="bg-surface-alt section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="flex items-start gap-3 bg-surface border border-border rounded-lg p-4 transition-all duration-200 hover:border-accent/30 hover:shadow-sm">
                  <Check
                    size={20}
                    className="text-accent flex-shrink-0 mt-0.5"
                  />
                  <span className="text-foreground text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
