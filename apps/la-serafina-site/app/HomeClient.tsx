import Link from "next/link";
import { getContent, type Locale } from "@/lib/content";

export default function HomeClient({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const h = c.home;

  return (
    <div>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-4 font-medium">
              {h.hero.eyebrow}
            </p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-text mb-4">
              {h.hero.title}
            </h1>
            <p
              className="text-2xl lg:text-3xl font-display font-bold mb-6"
              style={{ color: "var(--color-accentDeep)" }}
            >
              {h.hero.subtitle}
            </p>
            <p className="text-lg lg:text-xl text-text-light leading-relaxed mb-8 max-w-2xl">
              {h.hero.lead}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {h.hero.ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={locale === "gn" ? (cta.href === "/" ? "/gn" : `/gn${cta.href}`) : cta.href}
                  className={[
                    "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium text-base transition-colors",
                    cta.style === "primary"
                      ? "text-white hover:opacity-90"
                      : "border border-[var(--color-warm-deep)] text-text hover:bg-warm",
                  ].join(" ")}
                  style={
                    cta.style === "primary"
                      ? { background: "var(--color-primary)" }
                      : undefined
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
            <div className="text-sm text-text-muted space-y-1">
              <div>{h.hero.founded}</div>
              <div>{h.hero.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-xs uppercase tracking-[0.22em] font-medium mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            {h.mission.eyebrow}
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-8">
            {h.mission.title}
          </h2>
          {h.mission.paragraphs.map((p: string, i: number) => (
            <p key={i} className="text-lg text-text-light leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-3">
              {h.programs.title}
            </h2>
            <p className="text-text-light">{h.programs.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {h.programs.items.map((p) => {
              const internal = p.href.startsWith("/");
              if (!internal) {
                return (
                  <a
                    key={p.id}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-primary)] transition-all group"
                  >
                    <div
                      className="w-10 h-1 rounded-full mb-4"
                      aria-hidden="true"
                      style={{ background: "var(--color-primary)" }}
                    />
                    <h3 className="font-display text-xl font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {p.name}
                    </h3>
                    <p
                      className="text-sm font-medium mb-3"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {p.tagline}
                    </p>
                    <p className="text-sm text-text-light leading-relaxed">
                      {p.description}
                    </p>
                  </a>
                );
              }
              return (
                <Link
                  key={p.id}
                  href={locale === "gn" ? `/gn${p.href}` : p.href}
                  className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-primary)] transition-all group"
                >
                  <div
                    className="w-10 h-1 rounded-full mb-4"
                    aria-hidden="true"
                    style={{ background: "var(--color-primary)" }}
                  />
                  <h3 className="font-display text-xl font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                    {p.name}
                  </h3>
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {p.tagline}
                  </p>
                  <p className="text-sm text-text-light leading-relaxed">
                    {p.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* VISIT / LO QUE ENCONTRÁS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-[0.22em] font-medium mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              {h.visit.eyebrow}
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-4">
              {h.visit.title}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">{h.visit.lead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.visit.items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-6 text-center"
                style={{ background: "var(--color-warm)" }}
              >
                <div
                  className="text-xs uppercase tracking-wider font-semibold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.label}
                </div>
                <div className="font-display text-xl font-bold mb-2 text-text">
                  {item.value}
                </div>
                <div className="text-xs text-text-muted">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section
        className="py-20"
        style={{ background: "var(--color-warm)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-[0.22em] font-medium mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              {h.history.eyebrow}
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">
              {h.history.title}
            </h2>
          </div>
          <ol className="relative border-l-2 border-[var(--color-warm-deep)] ml-4 space-y-8">
            {h.history.items.map((it, i) => (
              <li key={i} className="pl-8 relative">
                <span
                  className="absolute -left-[11px] flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs text-white"
                  style={{ background: "var(--color-primary)" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div
                  className="font-display text-2xl font-bold"
                  style={{ color: "var(--color-accentDeep)" }}
                >
                  {it.year}
                </div>
                <div className="text-text-light mt-1">{it.text}</div>
              </li>
            ))}
          </ol>
          <div className="text-center mt-12">
            <Link
              href={locale === "gn" ? "/gn/historia" : "/historia"}
              className="inline-flex items-center font-medium underline underline-offset-4"
              style={{ color: "var(--color-primary)" }}
            >
              {h.history.cta.label} →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA DONATE */}
      <section
        className="py-20 lg:py-24 text-white relative overflow-hidden"
        style={{ background: "var(--color-accentDeep)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">
            {h.cta.title}
          </h2>
          <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-2xl mx-auto">
            {h.cta.lead}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={
                locale === "gn"
                  ? `/gn${h.cta.primary_cta.href}`
                  : h.cta.primary_cta.href
              }
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[var(--color-accentDeep)] font-medium hover:opacity-90"
            >
              {h.cta.primary_cta.label}
            </Link>
            <Link
              href={
                locale === "gn"
                  ? `/gn${h.cta.secondary_cta.href}`
                  : h.cta.secondary_cta.href
              }
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10"
            >
              {h.cta.secondary_cta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
