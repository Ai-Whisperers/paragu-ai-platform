import Link from "next/link";
import { activities } from "@/lib/activities";
import { content } from "@/lib/content";

export const metadata = {
  title: "Actividades — Club maškaráda",
  description:
    "El catálogo de prácticas que la comunidad maškaráda enseña, hospeda y acompaña: shibari, impact play, deprivación sensorial, role play, psychological play, service play.",
};

const RISK_LABEL = { low: "Riesgo bajo", medium: "Riesgo medio", high: "Riesgo alto" };
const RISK_COLOR = {
  low: "border-green-500/30 text-green-400",
  medium: "border-yellow-500/30 text-yellow-400",
  high: "border-red-500/30 text-red-400",
};
const CONSENT_LABEL = { low: "Consentimiento simple", medium: "Moderado", high: "Avanzado" };

export default function Actividades() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🪢</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Actividades
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Las prácticas que la comunidad maškaráda enseña, hospeda y acompaña. Cada actividad
            tiene su propia guía de seguridad, equipo recomendado y enlaces para aprender más.
          </p>
        </div>

        <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02] text-sm text-gray-400 leading-relaxed mb-12">
          <p className="font-semibold text-gold-400 mb-2">Aviso importante</p>
          <p>
            El contenido de esta sección es investigado por la comunidad. No constituye consejo
            profesional. Las prácticas descritas requieren consentimiento explícito, negociación
            previa y, en muchos casos, formación en persona con personas experimentadas. Para
            orientación personal sobre cualquier práctica, contactá con el equipo de{" "}
            <a href="/contacto" className="text-gold-400 hover:text-white underline">
              maškaráda
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((a) => (
            <Link
              key={a.slug}
              href={`/actividades/${a.slug}`}
              className="group block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="text-4xl shrink-0">{a.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    {a.name}
                  </h2>
                  <p className="text-xs text-gold-400 mt-0.5">{a.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{a.shortDesc}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span
                  className={`px-3 py-1 border rounded-full ${
                    RISK_COLOR[a.physicalRisk]
                  }`}
                >
                  {RISK_LABEL[a.physicalRisk]}
                </span>
                <span className="px-3 py-1 border border-white/10 rounded-full text-gray-400">
                  {CONSENT_LABEL[a.consentComplexity]}
                </span>
                {a.beginnerFriendly && (
                  <span className="px-3 py-1 border border-gold-400/30 rounded-full text-gold-400">
                    Principiantes bienvenidos
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 border border-gold-400/20 rounded-xl bg-gold-400/5 text-center">
          <p className="text-gray-300 mb-4">
            ¿Querés aprender una de estas prácticas en persona? La comunidad organiza workshops
            periódicos.
          </p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20info%20sobre%20los%20workshops%20de%20ma%C5%A1kar%C3%A1da`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            Preguntar por workshops
          </a>
        </div>
      </div>
    </div>
  );
}
