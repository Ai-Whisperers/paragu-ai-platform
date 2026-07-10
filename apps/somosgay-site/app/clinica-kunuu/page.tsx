import type { Metadata } from "next";
import Link from "next/link";
import { content as c } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clínica Kunu'u — Salud comunitaria LGTBI+ en Asunción",
  description:
    "Primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. Testeo gratuito de VIH, PrEP, sífilis y Hepatitis B. Atención psicológica y psiquiátrica confidencial. Sin documento de identidad.",
  alternates: { canonical: `${c.site.url}/clinica-kunuu` },
};

const WA_BOOKING = `https://wa.me/${c.site.whatsappBase}?text=${encodeURIComponent(
  "Hola SOMOSGAY, quiero reservar un turno en Clínica Kunu'u."
)}`;

export default function ClinicaPage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">Programa</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">{c.clinica.title}</h1>
          <p className="text-xl text-text-light max-w-3xl mb-8">{c.clinica.subtitle}</p>
          <p className="text-base text-text-light max-w-3xl mb-8 leading-relaxed">{c.clinica.lead}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={WA_BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
            >
              Reservar por WhatsApp
            </a>
            <a
              href={`tel:+${c.site.whatsappBase}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-warm text-text hover:bg-warm-deep"
            >
              {c.clinica.booking.whatsapp_cta.phone_display}
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-surface rounded-lg p-3 text-center border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold text-[var(--color-primary)]">99%</div>
              <div className="text-xs text-text-muted">eficacia PrEP</div>
            </div>
            <div className="bg-surface rounded-lg p-3 text-center border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold text-[var(--color-primary)]">Gratis</div>
              <div className="text-xs text-text-muted">para pacientes</div>
            </div>
            <div className="bg-surface rounded-lg p-3 text-center border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold text-[var(--color-primary)]">20min</div>
              <div className="text-xs text-text-muted">resultado VIH</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-12">Servicios</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.clinica.services.map((s: any, i: number) => (
              <div
                key={i}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 hover:border-[var(--color-primary)] transition-colors"
              >
                <div className="text-xs uppercase tracking-wider text-[var(--color-primary)] mb-2 font-medium">
                  {s.category === "test" && "Testeo"}
                  {s.category === "prevention" && "Prevención"}
                  {s.category === "treatment" && "Tratamiento"}
                  {s.category === "mental" && "Salud mental"}
                  {s.category === "harm-reduction" && "Reducción de daños"}
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{s.name}</h3>
                <p className="text-sm text-text-light leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{c.clinica.schedule.title}</h2>
          <p className="text-sm text-text-muted mb-6">{c.clinica.schedule.note}</p>
          <div className="bg-surface rounded-xl border border-[var(--color-warm-deep)] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--color-warm-deep)]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium">Día</th>
                  <th className="text-left px-4 py-3 text-sm font-medium">Horario</th>
                  <th className="text-left px-4 py-3 text-sm font-medium hidden sm:table-cell">Servicio</th>
                </tr>
              </thead>
              <tbody>
                {c.clinica.schedule.rows.map((row: any, i: number) => (
                  <tr key={i} className="border-t border-[var(--color-warm-deep)]">
                    <td className="px-4 py-3 text-sm font-medium">{row.day}</td>
                    <td className="px-4 py-3 text-sm text-[var(--color-primary)] font-mono">{row.hours}</td>
                    <td className="px-4 py-3 text-sm text-text-light hidden sm:table-cell">{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* OPSEC / CONFIDENTIALITY */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8">{c.clinica.opsec.title}</h2>
          <div className="bg-warm-deep rounded-xl p-8 border-l-4 border-[var(--color-primary)]">
            <ul className="space-y-3">
              {c.clinica.opsec.items.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-[var(--color-primary)] mt-1 flex-shrink-0" aria-hidden="true">
                    ●
                  </span>
                  <span className="text-text-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="py-20 bg-[var(--color-purple-deep)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{c.clinica.booking.title}</h2>
          <p className="text-white/80 mb-8">{c.clinica.booking.lead}</p>
          <a
            href={WA_BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-[var(--color-purple-deep)] font-medium hover:bg-warm"
          >
            {c.clinica.booking.whatsapp_cta.label}
          </a>
          <p className="text-sm text-white/60 mt-6">{c.clinica.booking.note}</p>
          <p className="text-xs text-white/40 mt-4">
            <Link href="/privacidad" className="hover:text-white underline">
              Política de privacidad
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}