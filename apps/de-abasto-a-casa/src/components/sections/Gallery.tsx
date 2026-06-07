import { Image } from 'lucide-react'
import content from '@/content/es.json'

const galleryCategories = content.home.gallery.categories as string[]

// Build a 9-cell grid repeating categories to fill cells
const gridItems: string[] = []
for (let i = 0; i < 9; i++) {
  gridItems.push(galleryCategories[i % galleryCategories.length])
}

const placeholderGradients = [
  'from-[var(--color-mercado)]/80 to-[var(--color-terracota)]/60',
  'from-[var(--color-terracota)]/80 to-[var(--color-mercado)]/60',
  'from-[var(--color-mercado)]/70 to-[var(--color-mercado-light)]/50',
  'from-[var(--color-mercado-light)]/80 to-[var(--color-terracota)]/50',
  'from-[var(--color-terracota)]/70 to-[var(--color-terracota-light)]/50',
  'from-[var(--color-mercado)]/60 to-[var(--color-crema)]/40',
  'from-[var(--color-terracota)]/60 to-[var(--color-mercado-light)]/40',
  'from-[var(--color-mercado)]/90 to-[var(--color-terracota)]/40',
  'from-[var(--color-terracota-light)]/60 to-[var(--color-mercado)]/50',
]

export default function Gallery() {
  return (
    <section id="galeria" className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {content.home.gallery.title}
          </h2>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {content.home.gallery.subtitle}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {gridItems.map((category, idx) => (
            <div
              key={idx}
              className={`
                relative group rounded-2xl overflow-hidden
                ${idx % 5 === 0 ? 'md:row-span-2 md:min-h-[400px]' : 'md:min-h-[240px]'}
                min-h-[200px]
                bg-gradient-to-br ${placeholderGradients[idx]}
                flex items-center justify-center
                transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg
                cursor-pointer
              `}
            >
              {/* Decorative inner glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 text-center px-4">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <span className="block font-[var(--font-heading)] text-lg md:text-xl font-semibold text-white drop-shadow-md">
                  {category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
