import type { Metadata } from "next";
import Link from "next/link";
import { content as c } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programas",
  description: "5 programas activos + red regional: Clínica Kunu'u, Tekoharã, Ñande Rekorã, Karu Porã, Programa Kunu'u.",
};

const PROGRAMS = [
  {
    id: "clinica-kunuu",
    name: "Clínica Kunu'u",
    tagline: "Salud comunitaria LGTBI+",
    description:
      "La primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. Testeo gratuito de VIH, PrEP, sífilis y Hepatitis B. Atención psicológica y psiquiátrica. Reducción de daños.",
    href: "/clinica-kunuu",
    color: "purple" as const,
    flagship: true,
  },
  {
    id: "centro-tekohara",
    name: "Centro Comunitario Tekoharã",
    tagline: "Espacio seguro",
    description:
      "Centro comunitario donde la comunidad LGTBI+ se reúne, forma y acompaña. Punto de encuentro, formación y organización.",
    href: "/programas/centro-tekohara",
    color: "teal" as const,
    flagship: false,
  },
  {
    id: "nande-rekora",
    name: "Ñande Rekorã",
    tagline: "Cuidado mutuo",
    description:
      "Sistema de cuidado comunitario y acompañamiento para personas LGTBI+ en situación de vulnerabilidad.",
    href: "/programas/nande-rekora",
    color: "rainbow3" as const,
    flagship: false,
  },
  {
    id: "karu-pora",
    name: "Karu Porã",
    tagline: "Seguridad alimentaria",
    description:
      "Programa de alimentación para personas LGTBI+ en situación de calle o vulnerabilidad.",
    href: "/programas/karu-pora",
    color: "rainbow2" as const,
    flagship: false,
  },
  {
    id: "programa-kunuu",
    name: "Programa Kunu'u",
    tagline: "Prevención combinada",
    description:
      "Campañas de prevención de VIH y promoción de PrEP. Campaña emblemática: 'Yo amo PrEP: Yo amo más seguro'.",
    href: "/programas/programa-kunuu",
    color: "rainbow4" as const,
    flagship: false,
  },
];

const colorToVar: Record<string, string> = {
  purple: "var(--color-purple)",
  teal: "var(--color-teal)",
  rainbow2: "var(--color-rainbow-2)",
  rainbow3: "var(--color-rainbow-3)",
  rainbow4: "var(--color-rainbow-4)",
};

export default function ProgramasPage() {
  return (
    <div>
      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            {c.programas.subtitle}
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
            {c.programas.title}
          </h1>
          <p className="text-lg text-text-light max-w-3xl">{c.programas.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {PROGRAMS.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className={[
                "block bg-surface border rounded-xl p-8 hover:shadow-lg transition-all group",
                p.flagship ? "border-[var(--color-primary)] border-2" : "border-[var(--color-warm-deep)]",
              ].join(" ")}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-2 h-16 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorToVar[p.color] }}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="font-display text-2xl font-bold group-hover:text-[var(--color-primary)] transition-colors">
                      {p.name}
                    </h2>
                    {p.flagship && (
                      <span className="text-xs uppercase tracking-wider bg-[var(--color-primary)] text-white px-2 py-1 rounded">
                        Emblemático
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-primary)] font-medium mb-3">{p.tagline}</p>
                  <p className="text-text-light leading-relaxed">{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}