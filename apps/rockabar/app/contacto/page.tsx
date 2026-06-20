import { Metadata } from "next";
import content from "@/content/es.json";
import { MapPin, Phone, Clock } from "lucide-react";

const c = content as any;

export const metadata: Metadata = {
  title: c.contact.seo.title,
  description: c.contact.seo.description,
};

export default function ContactPage() {
  const ct = c.contact;
  return (
    <>
      <section className="pt-28 md:pt-36 pb-10 md:pb-12 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-left md:text-center max-w-2xl md:mx-auto">
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-3 md:mb-4 font-semibold">
            {ct.hero.eyebrow}
          </span>
          <h1 className="text-[var(--text-fluid-h2)] font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4 leading-tight">
            {ct.hero.title}
          </h1>
          <p className="lead max-w-lg md:mx-auto">
            {ct.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-12">
            {/* Address */}
            <div className="rock-card p-6">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <MapPin size={22} />
              </div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Dirección
              </h3>
              <p className="text-[var(--color-text)]">{ct.info.address}</p>
              <a
                href={ct.info.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-gold hover:underline"
              >
                Ver en Google Maps →
              </a>
            </div>

            {/* WhatsApp */}
            <div className="rock-card p-6">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Phone size={22} />
              </div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                WhatsApp
              </h3>
              <a
                href={`https://wa.me/${ct.info.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-[var(--color-text)] hover:text-gold transition-colors"
              >
                {ct.info.phone}
              </a>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Respondemos rápido — de martes a sábado
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="max-w-2xl mx-auto rock-card p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                Horarios
              </h3>
            </div>
            <div className="space-y-2">
              {ct.info.hours.map((h: { day: string; hours: string }) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center py-2 border-b border-[var(--color-border)] last:border-0"
                >
                  <span className="font-medium text-[var(--color-text)] uppercase text-sm tracking-wide">
                    {h.day}
                  </span>
                  <span
                    className={
                      h.hours === "Cerrado"
                        ? "text-[var(--color-text-muted)] italic text-sm"
                        : "text-[var(--color-accent)] font-mono text-sm"
                    }
                  >
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
              {ct.cta.title}
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              {ct.cta.subtitle}
            </p>
            <a
              href={ct.cta.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tap inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-light)] active:scale-[0.98] transition-all text-base shadow-lg shadow-[var(--color-primary)]/30"
            >
              {ct.cta.buttonText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
