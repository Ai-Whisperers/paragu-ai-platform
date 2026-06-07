import content from '@/content/es.json'

interface TestimonialItem {
  quote: string
  author: string
  role: string
}

const defaultItems: TestimonialItem[] = [
  { quote: 'Recuperé 20+ horas al mes.', author: 'Remoto Global', role: 'cliente ilustrativo' },
  { quote: 'La proteína sellada al vacío cambia todo.', author: 'Profesional Médico', role: 'cliente ilustrativo' },
  { quote: 'Números honestos.', author: 'Pareja Commuter', role: 'clientes ilustrativos' },
]

export default function Testimonials() {
  const items: TestimonialItem[] = content.home.testimonials?.items ?? defaultItems
  const note: string = content.home.testimonials?.note ?? ''

  return (
    <section id="testimonials" className="section-padding bg-[var(--color-surface)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {content.home.testimonials.title}
          </h2>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-surface-alt)] border border-[var(--color-crema-dark)] rounded-2xl p-6 md:p-8 relative transition-shadow duration-300 hover:shadow-md"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 left-4 text-5xl leading-none font-serif text-[var(--color-mercado)]/15 select-none pointer-events-none">
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 font-[var(--font-body)] text-base md:text-lg text-[var(--color-text)] leading-relaxed mb-6 pt-4">
                {item.quote}
              </blockquote>

              {/* Author + role */}
              <div className="border-t border-[var(--color-crema-dark)] pt-4">
                <p className="font-[var(--font-heading)] text-sm font-semibold text-[var(--color-text)]">
                  — {item.author}
                </p>
                <p className="font-[var(--font-body)] text-xs text-[var(--color-text-muted)] mt-0.5 italic">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Illustrative note */}
        {note && (
          <p className="mt-8 text-center font-[var(--font-body)] text-xs text-[var(--color-text-muted)] italic">
            {note}
          </p>
        )}
      </div>
    </section>
  )
}
