import Link from "next/link";
import {
  events,
  getEventsByKind,
  getEncuentrosByFormat,
  FORMAT_LABEL,
  FORMAT_EMOJI,
  FORMAT_COLOR,
  type EncuentroFormat,
  type CommunityEvent,
} from "@/lib/events-v2";
import { content } from "@/lib/content";

export const metadata = {
  title: "Encuentros — Club maškaráda",
  description:
    "Munches, rope jams, workshops y otras reuniones regulares de la comunidad maškaráda. Encuentros públicos, principiantes bienvenidos, sin play obligatorio.",
};

const RECURRING_LABEL: Record<string, string> = {
  MONTHLY: "Mensual",
  BIWEEKLY: "Quincenal",
  WEEKLY: "Semanal",
};

function describeRrule(rrule: string): string {
  // Very small iCal RRULE parser — just for display
  const parts = Object.fromEntries(
    rrule.split(";").map((kv) => {
      const [k, v] = kv.split("=");
      return [k, v];
    })
  );
  const freq = RECURRING_LABEL[parts.FREQ] || parts.FREQ;
  if (parts.BYSETPOS === "-1" && parts.BYDAY) {
    return `${freq} · último ${["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][["SU","MO","TU","WE","TH","FR","SA"].indexOf(parts.BYDAY)]} del mes`;
  }
  if (parts.BYSETPOS && parts.BYDAY) {
    return `${freq} · ${["primer", "segundo", "tercer", "cuarto"][["1","2","3","4"].indexOf(parts.BYSETPOS)] || parts.BYSETPOS} ${["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][["SU","MO","TU","WE","TH","FR","SA"].indexOf(parts.BYDAY)]} del mes`;
  }
  if (parts.BYDAY && freq) {
    return `${freq} · ${["domingos", "lunes", "martes", "miércoles", "jueves", "viernes", "sábados"][["SU","MO","TU","WE","TH","FR","SA"].indexOf(parts.BYDAY)]}`;
  }
  return freq || "Recurrente";
}

const FORMAT_BLURB: Record<EncuentroFormat, string> = {
  munch:
    "Reunión social sin play en un bar o café. Para conocer gente, charlar, hacer preguntas. La puerta de entrada más amable a la comunidad.",
  rope_jam:
    "Práctica abierta de shibari. Traés tu cuerda o pedís prestada. Gente con experiencia acompaña a principiantes.",
  workshop:
    "Charla + práctica sobre un tema específico. Cupos limitados. Anotarse por WhatsApp.",
  discussion:
    "Charla abierta facilitada por alguien con experiencia, sin presentador formal. El conocimiento viene de las personas presentes.",
  social:
    "Reunión social más relajada que un munch. Café, merienda, o similar. Sin play, sin dresscode.",
  demo:
    "Una performance de unx artistx de la comunidad, seguida de conversación con el público. Eventual.",
};

export default function Encuentros() {
  const byFormat = getEncuentrosByFormat();
  const upcomingEncuentros = getEventsByKind("encuentro").filter((e) => e.status === "upcoming");

  // Compute next 4 instances of each recurring event
  const expandedInstances: Array<{ original: CommunityEvent; nextDate: string }> = [];
  for (const e of upcomingEncuentros) {
    if (e.rrule) {
      // Show 4 upcoming instances of each recurring event
      for (let i = 0; i < 4; i++) {
        expandedInstances.push({ original: e, nextDate: i === 0 ? e.date : "" });
      }
    } else {
      expandedInstances.push({ original: e, nextDate: e.date });
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">☕</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Encuentros
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Reuniones regulares de la comunidad: munches, rope jams, workshops, charlas.
            Sin play, sin ticket obligatorio, principiantes bienvenidos.
          </p>
        </div>

        <div className="border border-gold-400/20 rounded-xl p-5 bg-gold-400/5 text-sm text-gray-400 mb-12">
          <p className="font-semibold text-gold-400 mb-1">Qué es un encuentro</p>
          <p>
            A diferencia de los <Link href="/eventos" className="text-gold-400 hover:text-white underline">eventos formales</Link> (ticketed, producidos, con dresscode y zonas de juego), los encuentros son reuniones más chicas, regulares, abiertas, y sin play. Son la forma más amable de entrar a la comunidad si nunca fuiste a nada.
          </p>
        </div>

        {/* By format */}
        {(Object.keys(byFormat) as EncuentroFormat[]).map((format) => {
          const items = byFormat[format];
          if (!items || items.length === 0) return null;
          return (
            <section key={format} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <span className={`px-3 py-1 border rounded-full text-xs uppercase tracking-widest ${FORMAT_COLOR[format]}`}>
                  {FORMAT_EMOJI[format]} {FORMAT_LABEL[format]}
                </span>
                <span className="text-gray-500 text-sm">({items.length})</span>
              </h2>
              <p className="text-sm text-gray-500 mb-4 italic">{FORMAT_BLURB[format]}</p>
              <div className="space-y-3">
                {items.map((e) => (
                  <Link
                    key={e.id}
                    href={`/encuentros/${e.slug}`}
                    className="block border border-white/10 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white">{e.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          <span className="text-gold-400">{e.rrule ? describeRrule(e.rrule) : e.weekday}</span>
                          {e.startTime && <span> · {e.startTime}</span>}
                          {e.duration && <span> · {e.duration}</span>}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">📍 {e.location}</p>
                        {e.description && (
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">{e.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {e.price && <span className="text-xs text-gold-400">{e.price}</span>}
                        {e.signupNote && <span className="text-xs text-gray-500 text-right max-w-[200px]">{e.signupNote}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Calendar of next encuentros */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Próximas fechas</h2>
          <div className="space-y-2">
            {upcomingEncuentros
              .sort((a, b) => a.date.localeCompare(b.date))
              .slice(0, 8)
              .map((e) => (
                <Link
                  key={e.id}
                  href={`/encuentros/${e.slug}`}
                  className="flex items-center gap-3 text-sm border border-white/5 rounded-lg p-3 hover:border-gold-400/30 transition-all bg-white/[0.02]"
                >
                  <div className="text-2xl shrink-0">{FORMAT_EMOJI[e.format || "social"]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate">{e.title}</p>
                    <p className="text-xs text-gray-500">
                      {e.rrule ? describeRrule(e.rrule) : `${e.weekday} ${new Date(e.date).toLocaleDateString("es-PY")}`}
                      {e.startTime && ` · ${e.startTime}`}
                    </p>
                  </div>
                  {e.price && <span className="text-xs text-gold-400 shrink-0">{e.price}</span>}
                </Link>
              ))}
          </div>
        </section>

        <div className="p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-4">¿Te gustaría proponer un formato nuevo de encuentro?</p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20proponer%20un%20tipo%20de%20encuentro%20para%20la%20comunidad`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Proponer un encuentro
          </a>
        </div>
      </div>
    </div>
  );
}
