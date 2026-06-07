import { ShoppingBag, ChefHat, Utensils, Plus, Coffee, CakeSlice, Wine } from 'lucide-react'
import content from '@/content/es.json'

const labelIcons: Record<string, typeof ShoppingBag> = {
  'Raw': ShoppingBag,
  'Más elegido ★': ChefHat,
  'Próximamente': Utensils,
}

const addonIcons: Record<string, typeof Coffee> = {
  'Desayunos': Coffee,
  'Postres': CakeSlice,
  'Bebidas / snacks': Wine,
}

const labelColors: Record<string, string> = {
  'Raw': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Más elegido ★': 'bg-amber-100 text-amber-800 border-amber-300',
  'Próximamente': 'bg-gray-100 text-gray-600 border-gray-200',
}

interface Plan {
  name: string
  price: string
  desc: string
  duration?: string
}

interface Level {
  name: string
  label: string
  description: string
  plans: Plan[]
}

interface AddonItem {
  name: string
  price: string
}

export default function Services() {
  const { services } = content.home

  return (
    <section id="servicios" className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {services.title}
          </h2>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {services.subtitle}
          </p>
        </div>

        {/* Service levels grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {services.levels.map((level: Level, idx: number) => {
            const LevelIcon = labelIcons[level.label] || ShoppingBag

            return (
              <div
                key={idx}
                className="bg-[var(--color-surface)] border border-[var(--color-crema-dark)] rounded-2xl p-6 md:p-8 flex flex-col transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Level header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-alt)] flex items-center justify-center text-[var(--color-mercado)] shrink-0">
                      <LevelIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-semibold text-[var(--color-text)] leading-tight">
                      {level.name}
                    </h3>
                  </div>
                </div>

                {/* Label badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      labelColors[level.label] || 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {level.label}
                  </span>
                </div>

                {/* Description */}
                <p className="font-[var(--font-body)] text-sm md:text-base text-[var(--color-text-muted)] mb-6 leading-relaxed">
                  {level.description}
                </p>

                {/* Plans */}
                <div className="space-y-4 mt-auto">
                  {level.plans.map((plan: Plan, pIdx: number) => (
                    <div
                      key={pIdx}
                      className="border border-[var(--color-crema-dark)] rounded-xl p-4 bg-[var(--color-surface-alt)]/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-[var(--font-heading)] text-sm font-semibold text-[var(--color-text)]">
                          {plan.name}
                        </span>
                        <span className="font-[var(--font-body)] text-sm font-bold text-[var(--color-mercado)]">
                          {plan.price}
                        </span>
                      </div>
                      <p className="font-[var(--font-body)] text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {plan.desc}
                      </p>
                      {plan.duration && (
                        <span className="inline-block mt-2 font-[var(--font-body)] text-xs text-[var(--color-text-muted)]/70">
                          ⌛ {plan.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Add-ons section */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-crema-dark)] rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-alt)] flex items-center justify-center text-[var(--color-terracota)]">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text)]">
              {services.addons.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-4">
            {services.addons.items.map((item: AddonItem, idx: number) => {
              const AddonIcon = addonIcons[item.name] || Plus

              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-[var(--color-surface-alt)] border border-[var(--color-crema-dark)] rounded-xl px-4 py-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-[var(--color-crema-dark)] flex items-center justify-center text-[var(--color-mercado)] shrink-0">
                    <AddonIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-[var(--font-body)] text-sm font-semibold text-[var(--color-text)]">
                      {item.name}
                    </span>
                    <span className="font-[var(--font-body)] text-sm font-bold text-[var(--color-mercado)] ml-2">
                      {item.price}
                    </span>
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
