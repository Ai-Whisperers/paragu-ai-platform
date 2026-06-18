import Link from "next/link";
import { content } from "@/lib/content";
import { cookies } from "next/headers";
import { listGuidesI18n } from "@/lib/guides-i18n";

export const metadata = {
  title: "Aprender — Club maškaráda",
  description:
    "Guías, protocolos de seguridad y aprendizajes para la comunidad kink. Investigaciones, prácticas, palabras de seguridad y más.",
};

const CATEGORY_LABEL: Record<string, string> = {
  foundations: "Fundamentos",
  safety: "Seguridad",
  communication: "Comunicación",
  logistics: "Logística",
  glossary: "Glosario",
};


const CATEGORY_LABEL_EN: Record<string, string> = {
  foundations: "Foundations",
  safety: "Safety",
  communication: "Communication",
  logistics: "Logistics",
  glossary: "Glossary",
};


const CATEGORY_COLOR: Record<string, string> = {
  foundations: "border-gold-400/30 text-gold-400",
  safety: "border-blood-500/30 text-blood-500",
  communication: "border-purple-mid/30 text-purple-300",
  logistics: "border-green-500/30 text-green-400",
  glossary: "border-white/20 text-gray-400",
};

export default async function Aprender() {
  const locale: "es" | "en" = (await cookies()).get("mk_locale")?.value === "en" ? "en" : "es";
  const guides = listGuidesI18n(locale);
  const byCategory = guides.reduce<Record<string, typeof guides>>((acc, g) => {
    (acc[g.category] = acc[g.category] || []).push(g);
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Aprender
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Guías, protocolos y aprendizajes para la comunidad kink. Todo el contenido es
            investigado por el equipo y revisado antes de publicarse.
          </p>
        </div>

        <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02] text-sm text-gray-400 leading-relaxed mb-12">
          <p className="font-semibold text-gold-400 mb-2">Aviso importante</p>
          <p>
            {content.footer.contentDisclaimer} Si tenés dudas sobre tu situación personal,
            consultá con un profesional con experiencia en sexualidad alternativa (kink-aware).
            El equipo de maškaráda puede recomendarte contactos.
          </p>
        </div>

        {Object.entries(byCategory).map(([cat, items]) => (
          <div key={cat} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className={`px-3 py-1 border rounded-full text-xs uppercase tracking-widest ${CATEGORY_COLOR[cat]}`}>
                {CATEGORY_LABEL[cat] || cat}
              </span>
              <span className="text-gray-500 text-sm">({items.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((g) => (
                <Link
                  key={g.slug}
                  href={`/aprender/${g.slug}`}
                  className="group block border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 hover:bg-white/[0.04] transition-all"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors mb-1">
                    {g.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">{g.excerpt}</p>
                  <p className="text-xs text-gray-500">{g.readMinutes} min lectura</p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-400 text-sm mb-3">
            ¿Buscás algo específico que no está acá?
          </p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20sugerir%20un%20tema%20para%20la%20secci%C3%B3n%20de%20Aprender`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-white text-sm uppercase tracking-widest"
          >
            Sugerir un tema →
          </a>
        </div>
      </div>
    </div>
  );
}
