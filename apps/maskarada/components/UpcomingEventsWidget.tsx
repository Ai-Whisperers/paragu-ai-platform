// Server component — async, reads the events module, renders an inline
// "Próximos eventos" block on the home page. Shows the next 5 events
// (formal + gatherings) regardless of kind, with a kind badge so the
// user knows what they're signing up for.

import Link from "next/link";
import { events, FORMAT_EMOJI } from "@/lib/events-v2";
import { content } from "@/lib/content";

function getNext5() {
  const now = new Date();
  return events
    .filter((e) => new Date(e.date) >= now || e.rrule)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
}

function formatEventLine(e: typeof events[number]) {
  if (e.rrule) {
    // recurring — show the recurrence pattern
    const freq = e.rrule.split(";")[0].split("=")[1]; // MONTHLY etc
    const byday = e.rrule.match(/BYDAY=([A-Z]{2})/)?.[1] || "";
    const dayNames: Record<string, string> = { SU: "dom", MO: "lun", TU: "mar", WE: "mié", TH: "jue", FR: "vie", SA: "sáb" };
    const setpos = e.rrule.match(/BYSETPOS=(-?\d+)/)?.[1];
    let pattern = "";
    if (setpos === "-1") pattern = `Último ${dayNames[byday]} del mes`;
    else if (setpos) pattern = `${["Primer", "Segundo", "Tercer", "Cuarto"][+setpos - 1] || ""} ${dayNames[byday]} del mes`;
    else pattern = `${dayNames[byday]}s`;
    return `${pattern}${e.startTime ? ` · ${e.startTime}` : ""}`;
  }
  return `${e.dateLabel}${e.startTime ? ` · ${e.startTime}` : ""}`;
}

export default function UpcomingEventsWidget() {
  const next5 = getNext5();
  if (next5.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="text-5xl mb-4">📅</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Próximos eventos</h2>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Lo que viene en maškaráda. Anotate para no perderte nada.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {next5.map((e) => (
            <Link
              key={e.id}
              href={e.kind === "evento" ? `/eventos/${e.slug}` : `/encuentros/${e.slug}`}
              className="block border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl shrink-0">{FORMAT_EMOJI[e.format || "social"]}</span>
                    <h3 className="text-lg font-semibold text-white truncate">{e.title}</h3>
                  </div>
                  <p className="text-sm text-gold-400">{formatEventLine(e)}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">📍 {e.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-full ${
                      e.kind === "evento"
                        ? "border-blood-500/30 text-blood-500"
                        : "border-gold-400/30 text-gold-400"
                    }`}
                  >
                    {e.kind === "evento" ? "Formal" : "Encuentro"}
                  </span>
                  {e.price && <span className="text-[11px] text-gray-500">{e.price}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/eventos"
            className="bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            Ver calendario completo
          </Link>
          <Link
            href="/encuentros"
            className="border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Ver encuentros
          </Link>
          <a
            href="/api/calendar.ics"
            className="text-xs text-gray-500 hover:text-gold-400 transition-colors uppercase tracking-widest border-b border-dotted border-gray-600 hover:border-gold-400 pb-0.5"
            title="Suscribite a webcal://maskarada.paragu-ai.com/api/calendar.ics en tu app de calendario"
          >
            📆 Suscribite al calendario
          </a>
        </div>
      </div>
    </section>
  );
}
