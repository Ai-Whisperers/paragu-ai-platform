import { Beef, Warehouse, Calendar, ShieldCheck } from 'lucide-react'
import content from '@/content/es.json'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Beef,
  Warehouse,
  Calendar,
  ShieldCheck,
}

interface SourcingItem {
  icon: string
  title: string
  description: string
}

const defaultItems: SourcingItem[] = [
  { icon: 'Beef', title: 'Whole-animal', description: 'Animales enteros, cortados y porcionados por nosotros.' },
  { icon: 'Warehouse', title: 'Mayorista Abasto', description: 'Proveedores directos, sin intermediarios.' },
  { icon: 'Calendar', title: 'Estacional', description: 'Respetamos el calendario de Paraguay.' },
  { icon: 'ShieldCheck', title: 'Sin conservantes', description: 'Congelamos al instante después del prep.' },
]

export default function Sourcing() {
  const items: SourcingItem[] = content.home.sourcing?.items ?? defaultItems

  return (
    <section id="sourcing" className="section-padding bg-[var(--color-surface)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {content.home.sourcing.title}
          </h2>
        </div>

        {/* 2x2 grid: 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((item, idx) => {
            const ItemIcon = iconMap[item.icon] || ShieldCheck

            return (
              <div
                key={idx}
                className="bg-[var(--color-surface-alt)] border border-[var(--color-crema-dark)] rounded-2xl p-6 md:p-8 flex items-start gap-5 transition-shadow duration-300 hover:shadow-md"
              >
                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--color-mercado)' }}
                >
                  <ItemIcon className="w-6 h-6 text-white" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-semibold text-[var(--color-text)] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-[var(--font-body)] text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
