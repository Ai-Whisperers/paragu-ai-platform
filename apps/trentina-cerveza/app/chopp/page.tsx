import Image from "next/image";
import { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const metadata: Metadata = {
  title: c.chopp.seo.title,
  description: c.chopp.seo.description,
};

const site = c.site;

function BeerTapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-gold"
    >
      <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2" />
      <path d="M5 17H3a2 2 0 01-2-2v-4a2 2 0 012-2h2" />
      <path d="M17 17v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1" />
      <path d="M5 17v1a2 2 0 002 2h.5" />
      <path d="M7 7h10" />
      <path d="M7 3h10" />
      <path d="M9 7V3" />
      <path d="M15 7V3" />
    </svg>
  );
}

const serviceIcons: Record<string, React.ReactNode> = {
  Fiestas: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  ),
  "Eventos empresariales": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "Eventos particulares": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "Instalación en locales": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export default function ChoppPage() {
  const ch = c.chopp;
  return (
    <>
      {/* Hero with beer taps image */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/beer-taps-craft.jpg"
            alt="Chopp Trentina — Servicio profesional de chopp"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/80 to-[var(--color-background)]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {ch.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)]">{ch.hero.subtitle}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {ch.intro.title}
          </h2>
          <p className="text-[var(--color-text-light)] leading-relaxed">
            {ch.intro.description}
          </p>
        </div>
      </section>

      {/* Beers on Tap */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-center text-[var(--color-text)] mb-12">
            Cervezas en Chopp
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ch.beersOnTap.map((beer: any) => (
              <div
                key={beer.name}
                className="p-6 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-center hover:border-gold/30 transition-all group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <BeerTapIcon />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  {beer.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
                  {beer.description}
                </p>
                <div className="flex justify-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                    ABV {beer.ABV}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                    IBU {beer.IBU}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-center text-[var(--color-text)] mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {ch.services.map((service: any) => (
              <div
                key={service.type}
                className="p-6 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-gold/40 transition-all group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  {serviceIcons[service.type] || <BeerTapIcon />}
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2 text-center">
                  {service.type}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] text-center leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page">
          <div className="max-w-xl mx-auto text-center bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
              {ch.cta.title}
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              {ch.cta.subtitle}
            </p>
            <a
              href={ch.cta.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {ch.cta.buttonText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
