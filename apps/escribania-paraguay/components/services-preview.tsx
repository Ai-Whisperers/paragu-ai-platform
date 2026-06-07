import Link from 'next/link'
import {
  ScrollText,
  FileSignature,
  FileText,
  Stamp,
  Landmark,
  Building2,
} from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

const iconMap: Record<string, React.ReactNode> = {
  'scroll-text': <ScrollText size={32} />,
  'file-signature': <FileSignature size={32} />,
  'file-text': <FileText size={32} />,
  stamp: <Stamp size={32} />,
  landmark: <Landmark size={32} />,
  building: <Building2 size={32} />,
}

interface ServiceItem {
  id: string
  icon: string
  title: string
  description: string
  link: string
}

interface ServicesPreviewProps {
  title: string
  subtitle: string
  items: ServiceItem[]
}

export default function ServicesPreview({
  title,
  subtitle,
  items,
}: ServicesPreviewProps) {
  return (
    <section className="bg-surface section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 80}>
              <div className="group bg-surface-alt border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30">
                <div className="text-accent mb-5 transition-transform duration-300 group-hover:scale-110">
                  {iconMap[item.icon] || <FileText size={32} />}
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-5">
                  {item.description}
                </p>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1 text-accent font-accent font-medium text-sm hover:text-accent-light transition-colors"
                >
                  Ver más
                  <span className="text-lg leading-none">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
