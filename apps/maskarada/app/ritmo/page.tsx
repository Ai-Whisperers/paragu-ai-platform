import Link from "next/link";
import { events, getEventsByKind } from "@/lib/events-v2";
import { content } from "@/lib/content";

export const metadata = {
  title: "Ritmo — Club maškaráda",
  description:
    "Cómo funciona el calendario de maškaráda: 1 alté por mes, 1 maskarada cada 4-6 meses. El ritmo de la comunidad.",
};

const MONTH_NAMES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const MONTH_NAMES_LONG = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type CadenceEvent = { id: string; kind: "evento" | "encuentro"; title: string; date: string; status: string };

function buildYearGrid(year: number): { month: number; events: CadenceEvent[] }[] {
  const months: { month: number; events: CadenceEvent[] }[] = [];
  for (let m = 0; m < 12; m++) {
    const inMonth = events.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === m;
    });
    months.push({ month: m, events: inMonth });
  }
  return months;
}

function formatDay(iso: string): string {
  return new Date(iso).getDate().toString();
}

export default function Ritmo() {
  const year = new Date().getFullYear();
  const grid = buildYearGrid(year);
  const nextYear = buildYearGrid(year + 1);
  const totalEventos = events.filter((e) => e.kind === "evento").length;
  const totalEncuentros = events.filter((e) => e.kind === "encuentro").length;
  const upcomingEventos = getEventsByKind("evento").filter((e) => new Date(e.date) >= new Date());

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🗓️</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            El ritmo
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Cómo se mueve maškaráda. Calendario público para que sepas cuándo volver, qué esperar, y cómo sumarte.
          </p>
        </div>

        {/* Cadence summary */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gold-400/20 rounded-xl p-6 bg-gold-400/5">
              <div className="text-3xl mb-2">🪩</div>
              <h2 className="text-lg font-bold text-white mb-1">1 alté por mes</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Cada mes hay al menos un encuentro público (munch, rope jam, workshop, charla). Sin play, sin dresscode, vanilla. La puerta de entrada más amable.
              </p>
            </div>
            <div className="border border-blood-500/20 rounded-xl p-6 bg-blood-500/5">
              <div className="text-3xl mb-2">🎭</div>
              <h2 className="text-lg font-bold text-white mb-1">1 maskarada cada 4-6 meses</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                La edición grande. Ticketed, con dresscode, con zona de cuerdas, performances, y un tema. Próxima: septiembre 2026.
              </p>
            </div>
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
              <div className="text-3xl mb-2">📲</div>
              <h2 className="text-lg font-bold text-white mb-1">1 grupo de Telegram</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                120 personas en Asunción. Ahí se anuncian los encuentros, se confirman lugares, y se coordinan viajes. Pedí el link por WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* Year calendar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{year} — vista por mes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {grid.map(({ month, events: monthEvents }) => (
              <div
                key={month}
                className={`border rounded-xl p-4 ${
                  monthEvents.length > 0
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-white/5 bg-white/[0.01] opacity-60"
                }`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-sm uppercase tracking-widest text-gray-400">
                    {MONTH_NAMES[month]}
                  </h3>
                  {monthEvents.length > 0 && (
                    <span className="text-xs text-gold-400">
                      {monthEvents.length} {monthEvents.length === 1 ? "evento" : "eventos"}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {monthEvents.map((e) => (
                    <div
                      key={e.id}
                      className={`text-xs px-2 py-1 rounded border ${
                        e.kind === "evento"
                          ? "border-blood-500/30 text-blood-500 bg-blood-500/5"
                          : "border-gold-400/30 text-gold-400 bg-gold-400/5"
                      }`}
                    >
                      <span className="font-mono mr-1">{formatDay(e.date)}</span>
                      <span className="truncate">{e.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next year preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{year + 1} — preview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {nextYear.map(({ month, events: monthEvents }) => (
              <div
                key={month}
                className={`border rounded-xl p-4 ${
                  monthEvents.length > 0
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-white/5 bg-white/[0.01] opacity-60"
                }`}
              >
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
                  {MONTH_NAMES[month]}
                </h3>
                <div className="space-y-1">
                  {monthEvents.map((e) => (
                    <div
                      key={e.id}
                      className={`text-xs px-2 py-1 rounded border ${
                        e.kind === "evento"
                          ? "border-blood-500/30 text-blood-500 bg-blood-500/5"
                          : "border-gold-400/30 text-gold-400 bg-gold-400/5"
                      }`}
                    >
                      <span className="font-mono mr-1">{formatDay(e.date)}</span>
                      <span className="truncate">{e.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Legend */}
        <section className="mb-12 border-t border-white/5 pt-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border border-blood-500/30 bg-blood-500/5" />
              <span>Edición (maskarada) — ticketed, dresscode, play</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border border-gold-400/30 bg-gold-400/5" />
              <span>Encuentro (munch/rope jam/workshop/charla) — gratis, vanilla, sin play</span>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Sumarte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/eventos"
              className="block border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all"
            >
              <div className="text-3xl mb-2">📅</div>
              <h3 className="text-lg font-semibold text-white mb-1">Calendario completo</h3>
              <p className="text-sm text-gray-400">Ver todos los eventos próximos, próximos 6 semanas, formato calendario.</p>
            </Link>
            <a
              href="https://wa.me/595981200255?text=Hola!%20Quiero%20sumarme%20al%20grupo%20de%20Telegram%20de%20ma%C5%A1kar%C3%A1da"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gold-400/30 rounded-xl p-6 bg-gold-400/5 hover:border-gold-400 transition-all"
            >
              <div className="text-3xl mb-2">📲</div>
              <h3 className="text-lg font-semibold text-white mb-1">Grupo de Telegram</h3>
              <p className="text-sm text-gray-400">120 personas en Asunción. Escribinos por WhatsApp y te mandamos el link de invitación.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
