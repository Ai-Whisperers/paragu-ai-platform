import { Quote } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface TestimonialItem {
  name: string
  role: string
  text: string
}

interface TestimonialsSectionProps {
  title: string
  items: TestimonialItem[]
}

export default function TestimonialsSection({
  title,
  items,
}: TestimonialsSectionProps) {
  return (
    <section className="bg-surface-alt section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-surface border border-border rounded-xl p-6 md:p-8 relative">
                <Quote
                  size={32}
                  className="text-accent/20 absolute top-4 right-4"
                />
                <p className="text-muted leading-relaxed mb-6 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-accent text-sm font-accent font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
