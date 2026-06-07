import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

const iconMap: Record<string, React.ReactNode> = {
  'map-pin': <MapPin size={28} />,
  phone: <Phone size={28} />,
  mail: <Mail size={28} />,
  clock: <Clock size={28} />,
}

interface ContactItem {
  icon: string
  label: string
  value: string
}

interface ContactInfoProps {
  title: string
  items: ContactItem[]
}

export default function ContactInfo({ title, items }: ContactInfoProps) {
  return (
    <section className="bg-surface section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-surface-alt border border-border rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-5">
                  {iconMap[item.icon] || <MapPin size={28} />}
                </div>
                <p className="text-muted text-sm font-accent font-medium uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                <p className="font-heading font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
