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

export default function MenuPreviewSection({
  title,
  description,
  categories,
}: MenuSectionProps) {
  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        <div className="text-left md:text-center mb-10 md:mb-14 max-w-2xl md:mx-auto">
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
            Nuestra Carta
          </span>
          <h2 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3 leading-tight">
            {title}
          </h2>
          <p className="lead max-w-xl md:mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/carta#${cat.id}`}
              className="group p-4 md:p-5 rounded-xl rock-card tap text-left"
            >
              <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)] group-hover:text-gold transition-colors mb-1 tracking-wide">
                {cat.name}
              </h3>
              <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
                {cat.priceRange}
              </p>
            </a>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <a
            href="/carta"
            className="tap inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-gold text-[var(--color-primary-dark)] font-bold rounded-lg hover:bg-[var(--color-accent-light)] active:scale-[0.98] transition-all text-base shadow-md"
          >
            Ver Carta Completa
          </a>
        </div>
      </div>
    </section>
  );
}
