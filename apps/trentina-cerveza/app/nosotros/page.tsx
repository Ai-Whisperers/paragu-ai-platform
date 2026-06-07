import Image from "next/image";
import { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const metadata: Metadata = {
  title: c.about.seo.title,
  description: c.about.seo.description,
};

const site = c.site;

export default function AboutPage() {
  const a = c.about;
  return (
    <>
      {/* Hero with brewery exterior */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brewery-exterior.jpg"
            alt="Cerveza Trentina — Santa Rita, Alto Paraná"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/80 to-[var(--color-background)]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {a.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto">
            {a.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-3xl">
          <div className="space-y-6 text-[var(--color-text-light)] leading-relaxed">
            {a.story.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Brewmaster Highlight */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-3xl">
          <div className="rounded-xl bg-[var(--color-surface-alt)] border border-gold/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="p-8 md:p-10 text-center">
              {/* Brewmaster Photo */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold/40 relative">
                <Image
                  src="/images/team/team-1.jpg"
                  alt={a.brewmaster.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-1">
                {a.brewmaster.name}
              </h2>
              <p className="text-sm text-gold font-medium uppercase tracking-wider mb-4">
                {a.brewmaster.title}
              </p>
              <p className="text-[var(--color-text-light)] leading-relaxed max-w-xl mx-auto">
                {a.brewmaster.description}
              </p>
              {a.brewmaster.quote && (
                <blockquote className="mt-4 italic text-[var(--color-text-muted)] text-base border-l-2 border-gold/40 pl-4 max-w-xl mx-auto text-center">
                  "{a.brewmaster.quote}"
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-center text-[var(--color-text)] mb-12">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {a.values.map((v: { title: string; description: string }) => (
              <div
                key={v.title}
                className="p-6 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-center hover:border-gold/40 transition-all group"
              >
                <div className="w-12 h-1 bg-gold mx-auto mb-4 rounded-full group-hover:w-16 transition-all" />
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
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
