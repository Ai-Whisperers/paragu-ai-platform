import { Metadata } from "next";
import content from "@/content/es.json";
import { Flame, Users, Heart, Music } from "lucide-react";

const c = content as any;

export const metadata: Metadata = {
  title: c.about.seo.title,
  description: c.about.seo.description,
};

const iconMap: Record<string, React.ReactNode> = {
  flame: <Flame size={22} />,
  users: <Users size={22} />,
  heart: <Heart size={22} />,
  music: <Music size={22} />,
};

export default function AboutPage() {
  const a = c.about;
  const storyParagraphs = a.story.split("\n\n");
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-10 md:pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-left md:text-center max-w-2xl md:mx-auto">
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
            {a.hero.eyebrow}
          </span>
          <h1 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3 md:mb-4 leading-tight">
            {a.hero.title}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-3xl">
          <div className="space-y-5 md:space-y-6 text-[var(--color-text-light)] leading-relaxed text-base md:text-lg text-left">
            {storyParagraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page">
          <div className="text-left md:text-center mb-10 md:mb-12 max-w-2xl md:mx-auto">
            <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
              Cultura Rocka
            </span>
            <h2 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] leading-tight">
              {a.values.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {a.values.items.map((v: { icon: string; title: string; description: string }) => (
              <div
                key={v.title}
                className="rock-card p-5 md:p-6 text-left"
              >
                <div className="w-12 h-12 mx-auto md:mx-0 mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  {iconMap[v.icon] || <Heart size={22} />}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)] mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
