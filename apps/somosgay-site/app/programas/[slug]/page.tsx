import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import content from "@/content/es.json";

const c = content as any;

type Params = { slug: string };

const PROGRAMS: Record<string, { name: string; tagline: string; description: string; longDescription: string[]; highlights: string[] }> = {
  "centro-tekohara": {
    name: "Centro Comunitario Tekoharã",
    tagline: "Espacio seguro de encuentro y formación",
    description:
      "Centro comunitario donde la comunidad LGTBI+ se reúne, forma y acompaña.",
    longDescription: [
      "Tekoharã funciona como punto de encuentro para la comunidad LGTBI+ de Asunción. Es un espacio seguro donde se realizan actividades de formación, organización y acompañamiento entre pares.",
      "En Tekoharã se coordinan reuniones de los distintos programas, actividades culturales, y formación en derechos humanos y salud comunitaria.",
    ],
    highlights: [
      "Sede física de SOMOSGAY en Asunción",
      "Espacio de reunión para comunidad y aliados",
      "Formación y organización comunitaria",
      "Actividades culturales y educativas",
    ],
  },
  "nande-rekora": {
    name: "Ñande Rekorã",
    tagline: "Sistema de cuidado mutuo",
    description:
      "Sistema de cuidado comunitario y acompañamiento para personas LGTBI+ en situación de vulnerabilidad.",
    longDescription: [
      "Ñande Rekorã — 'nuestro modo de ser' en guaraní — es nuestro sistema de cuidado comunitario. Acompaña a personas LGTBI+ en situación de vulnerabilidad con redes de apoyo entre pares, asistencia y derivación a servicios.",
      "El programa articula con la Clínica Kunu'u para atención integral y con centros comunitarios para contención social.",
    ],
    highlights: [
      "Acompañamiento entre pares",
      "Red de apoyo comunitario",
      "Articulación con Clínica Kunu'u",
      "Atención integral",
    ],
  },
  "karu-pora": {
    name: "Karu Porã",
    tagline: "Seguridad alimentaria",
    description:
      "Programa de alimentación para personas LGTBI+ en situación de calle o vulnerabilidad.",
    longDescription: [
      "Karu Porã — 'comida buena' en guaraní — trabaja en seguridad alimentaria para personas LGTBI+ en situación de vulnerabilidad. Brinda acceso regular a alimentación nutritiva en un espacio de cuidado.",
      "Es uno de los programas que refleja el compromiso de SOMOSGAY con una respuesta integral a las necesidades de la comunidad.",
    ],
    highlights: [
      "Acceso a alimentación nutritiva",
      "Espacio de cuidado",
      "Atención a personas en situación de calle",
      "Trabajo en red con otros programas",
    ],
  },
  "programa-kunuu": {
    name: "Programa Kunu'u",
    tagline: "Prevención combinada y campañas PrEP",
    description:
      "Campañas de prevención de VIH y promoción de PrEP.",
    longDescription: [
      "El Programa Kunu'u coordina las campañas de prevención combinada de VIH de SOMOSGAY. Su emblema es 'Yo amo PrEP: Yo amo más seguro', una iniciativa que busca desestigmatizar la profilaxis pre-exposición entre hombres gays y otros hombres que tienen sexo con hombres.",
      "Trabaja en conjunto con PRONASIDA, OPS/OMS y la Clínica Kunu'u para difundir información basada en evidencia sobre prevención.",
    ],
    highlights: [
      "Campaña 'Yo amo PrEP: Yo amo más seguro'",
      "Prevención combinada (PrEP + testeo + TARV)",
      "Materiales en español y guaraní",
      "Trabajo en red con PRONASIDA y OPS/OMS",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PROGRAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS[slug];
  if (!p) return { title: "Programa no encontrado" };
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `${c.site.url}/programas/${slug}` },
  };
}

export default async function ProgramaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = PROGRAMS[slug];
  if (!p) notFound();

  return (
    <div>
      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Programa
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4">{p.name}</h1>
          <p className="text-xl text-[var(--color-primary)] font-medium">{p.tagline}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {p.longDescription.map((para, i) => (
            <p key={i} className="text-lg text-text-light leading-relaxed mb-6">
              {para}
            </p>
          ))}

          <h2 className="font-display text-2xl font-bold mt-12 mb-6">Qué ofrece</h2>
          <ul className="space-y-3">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 items-start bg-warm rounded-lg p-4">
                <span className="text-[var(--color-primary)] mt-1 flex-shrink-0" aria-hidden="true">●</span>
                <span className="text-text-light">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex gap-3">
            <Link
              href="/programas"
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              ← Ver todos los programas
            </Link>
            <span className="text-text-muted">·</span>
            <Link
              href="/donar"
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              Apoyar este programa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}