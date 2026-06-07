interface StatsItem {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  items: StatsItem[];
}

export default function StatsSection({ items }: StatsSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--color-primary-dark)] border-y border-gold/10">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-gold mb-2 gold-glow group-hover:scale-105 transition-transform">
                {stat.value}
                {stat.suffix && (
                  <span className="text-xl md:text-2xl text-gold/70">{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm md:text-base text-[var(--color-text-light)] uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
