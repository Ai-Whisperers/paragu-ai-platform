import { Flame, Pizza, Beer, Martini, Music, Users, Heart } from "lucide-react";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  align?: "left" | "center";
}

const iconMap: Record<string, React.ReactNode> = {
  flame: <Flame size={26} />,
  pizza: <Pizza size={26} />,
  beer: <Beer size={26} />,
  martini: <Martini size={26} />,
  music: <Music size={26} />,
  users: <Users size={26} />,
  heart: <Heart size={26} />,
};

export default function FeaturesSection({
  title,
  subtitle,
  items,
  align = "left",
}: FeaturesProps) {
  const headingAlign = align === "center" ? "text-center" : "text-left md:text-left";
  const headerWrap = align === "center" ? "mx-auto text-center" : "max-w-2xl";

  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page">
        <div className={headerWrap + " mb-10 md:mb-14"}>
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
            Por qué elegirnos
          </span>
          <h2 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3 leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="lead max-w-xl">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="rock-card p-5 md:p-6 text-left"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                {iconMap[item.icon] || <Heart size={26} />}
              </div>
              <h3 className="text-base md:text-lg font-bold text-[var(--color-text)] mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
