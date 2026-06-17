import Link from "next/link";
import { notFound } from "next/navigation";
import { activities, getActivity } from "@/lib/activities";
import { content } from "@/lib/content";
import { heroFor } from "@/lib/hero";

export async function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getActivity(slug);
  if (!a) return {};
  return {
    title: `${a.name} — Club maškaráda`,
    description: a.shortDesc,
  };
}

const RISK_LABEL = { low: "Riesgo bajo", medium: "Riesgo medio", high: "Riesgo alto" };
const RISK_DESC = {
  low: "Bajo potencial de daño físico. Aún así requiere consentimiento y atención.",
  medium:
    "Riesgo físico real (moretones, discomfort físico). Negociación de zonas, intensidad y zonas prohibidas es esencial.",
  high:
    "Riesgo físico o emocional significativo. Solo con persona capacitada, entorno controlado, y equipo de seguridad apropiado.",
};

export default async function ActividadDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getActivity(slug);
  if (!a) notFound();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/actividades" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Todas las actividades
        </Link>

        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{a.emoji}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{a.name}</h1>
            <p className="text-gold-400 text-sm mt-1">{a.tagline}</p>

        <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/5 mb-8 relative">
          <img
            src={heroFor(a.slug)}
            alt={a.name}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none" />
        </div>
          </div>
        </div>

        {a.heroImage && (
          <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/5 mb-6">
            <img
              src={a.heroImage}
              alt={a.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-sm text-gray-400 leading-relaxed mb-6">
          <p className="font-semibold text-gold-400 mb-1">Aviso</p>
          <p>
            Contenido investigado por la comunidad. No es consejo profesional. Las prácticas
            descritas requieren consentimiento explícito, negociación previa y, en muchos casos,
            formación con personas experimentadas. Contactá con el equipo de maškaráda para
            orientación personal.
          </p>
        </div>

        <div className="space-y-3 text-gray-300 leading-relaxed mb-8">
          {a.longDesc.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="border border-white/10 rounded-lg p-3 bg-white/[0.02]">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duración típica</p>
            <p className="text-sm text-white">{a.duration}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-3 bg-white/[0.02]">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Apta para principiantes</p>
            <p className="text-sm text-white">{a.beginnerFriendly ? "Sí" : "No — requiere experiencia previa"}</p>
          </div>
        </div>

        <div className="border border-white/5 rounded-xl p-5 bg-blood-500/5 mb-8">
          <p className="text-xs uppercase tracking-widest text-blood-500 mb-2">
            {RISK_LABEL[a.physicalRisk]}
          </p>
          <p className="text-sm text-gray-300">{RISK_DESC[a.physicalRisk]}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Equipo necesario</h2>
          <ul className="space-y-2">
            {a.equipment.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gold-400 mt-0.5">•</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Notas de seguridad</h2>
          <ul className="space-y-2">
            {a.safetyNotes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-blood-500 mt-0.5">⚠</span>
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Para principiantes</h2>
          <ul className="space-y-2">
            {a.beginnerTips.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gold-400 mt-0.5">✦</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {a.relatedActivities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-3">Actividades relacionadas</h2>
            <div className="flex flex-wrap gap-2">
              {a.relatedActivities.map((slug) => {
                const r = getActivity(slug);
                if (!r) return null;
                return (
                  <Link
                    key={slug}
                    href={`/actividades/${slug}`}
                    className="px-4 py-2 border border-white/10 hover:border-gold-400/40 rounded-full text-sm text-gray-300 hover:text-gold-400 transition-all"
                  >
                    {r.emoji} {r.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 p-6 border border-gold-400/20 rounded-xl bg-gold-400/5 text-center">
          <p className="text-gray-300 mb-4 text-sm">
            ¿Te interesa aprender esta práctica en persona? El equipo puede conectarte con
            instructores o recomendarte workshops.
          </p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20aprender%20m%C3%A1s%20sobre%20${encodeURIComponent(a.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
