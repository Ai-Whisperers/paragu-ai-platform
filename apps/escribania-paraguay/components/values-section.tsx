import { ShieldCheck, Gavel, Users, Clock } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

const iconMap: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck size={28} />,
  gavel: <Gavel size={28} />,
  users: <Users size={28} />,
  clock: <Clock size={28} />,
}

interface ValueItem {
  icon: string
  title: string
  description: string
}

interface ValuesSectionProps {
  title: string
  items: ValueItem[]
}

export default function ValuesSection({ title, items }: ValuesSectionProps) {
  return (
    <section className="bg-background section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-surface border border-border rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-5">
                  {iconMap[item.icon] || <ShieldCheck size={28} />}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
