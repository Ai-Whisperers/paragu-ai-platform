import Image from "next/image";

interface Category {
  id: string;
  name: string;
  priceRange: string;
}

interface MenuSectionProps {
  title: string;
  description: string;
  categories: Category[];
}

const beerImages: Record<string, string> = {
  lagers: "/images/beers/pilsen.jpg",
  ipas: "/images/beers/ipa.jpg",
  ales: "/images/beers/apa.jpg",
  especiales: "/images/beers/metatron.jpg",
  stouts: "/images/beers/dunkel.jpg",
};

export default function MenuPreviewSection({
  title,
  description,
  categories,
}: MenuSectionProps) {
  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Nuestras Cervezas
          </span>
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {title}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/cervezas#${cat.id}`}
              className="group rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:border-gold/40 transition-all overflow-hidden"
            >
              {/* Beer Image */}
              {beerImages[cat.id] && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={beerImages[cat.id]}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-alt)] via-[var(--color-surface-alt)]/30 to-transparent" />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-gold transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {cat.priceRange}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/cervezas"
            className="inline-flex items-center justify-center px-8 py-3 bg-gold text-[var(--color-background)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all"
          >
            Ver Cervezas
          </a>
        </div>
      </div>
    </section>
  );
}
