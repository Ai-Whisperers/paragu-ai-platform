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
  'scroll-text': <ScrollText size={28} />,
  'file-signature': <FileSignature size={28} />,
  'file-text': <FileText size={28} />,
  stamp: <Stamp size={28} />,
  landmark: <Landmark size={28} />,
  building: <Building2 size={28} />,
}

interface CategoryItem {
  id: string
  icon: string
  title: string
  description: string
  features?: string[]
}

interface ServiceCategoriesProps {
  title: string
  categories: CategoryItem[]
}

export default function ServiceCategories({
  title,
  categories,
}: ServiceCategoriesProps) {
  return (
    <section className="bg-surface-alt section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 80}>
              <Link href={`/servicios/${cat.id}`}>
                <div className="group bg-surface border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30 h-full">
                  <div className="text-accent mb-5 transition-transform duration-300 group-hover:scale-110">
                    {iconMap[cat.icon] || <FileText size={28} />}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  {cat.features && cat.features.length > 0 && (
                    <ul className="space-y-2">
                      {cat.features.map((feat, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-muted text-sm"
                        >
                          <span className="text-accent mt-0.5 flex-shrink-0">
                            &bull;
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-5 inline-flex items-center gap-1 text-accent font-accent font-medium text-sm group-hover:text-accent-light transition-colors">
                    Ver más
                    <span className="text-lg leading-none">&rarr;</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
