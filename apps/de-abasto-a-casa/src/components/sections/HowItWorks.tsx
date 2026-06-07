import { MessageSquare, ClipboardList, ShoppingBag, Truck } from 'lucide-react'
import content from '@/content/es.json'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  ClipboardList,
  ShoppingBag,
  Truck,
}

interface Step {
  icon: string
  title: string
  description: string
}

export default function HowItWorks() {
  const { howItWorks } = content.home

  return (
    <section id="how-it-works" className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)]">
            {howItWorks.title}
          </h2>
        </div>

        {/* Desktop: horizontal timeline. Mobile: vertical list */}
        <div className="relative">
          {/* Connecting line — visible on desktop (horizontal) and mobile (vertical) */}
          {/* Desktop line */}
          <div
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-[var(--color-mercado)]/20"
            aria-hidden="true"
          />
          {/* Mobile line */}
          <div
            className="md:hidden absolute top-0 bottom-0 left-[23px] w-0.5 bg-[var(--color-mercado)]/20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {howItWorks.steps.map((step: Step, idx: number) => {
              const StepIcon = iconMap[step.icon] || ShoppingBag

              return (
                <div key={idx} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                  {/* Icon circle */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--color-mercado)] flex items-center justify-center text-white shadow-md">
                    <StepIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  {/* Text content */}
                  <div className="md:text-center">
                    <h3 className="font-[var(--font-heading)] text-base md:text-lg font-semibold text-[var(--color-text)] mb-1">
                      {step.title}
                    </h3>
                    <p className="font-[var(--font-body)] text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
