import Link from "next/link";
import { events, getEventsByKind, getUpcoming, type EventKind } from "@/lib/events-v2";
import { content } from "@/lib/content";

export const metadata = {
  title: "Eventos — Club maškaráda",
  description:
    "Calendario de eventos de maškaráda: ediciones de gran formato, próximos, pasados. Entradas, preventa, dresscode y line-up.",
};

// Compute a "next 30 days" list by simple date arithmetic.
function inWindow(iso: string, days: number): boolean {
  const d = new Date(iso);
  const now = new Date();
  return d.getTime() >= now.getTime() && d.getTime() <= now.getTime() + days * 86400000;
}

function statusBadge(status: string, date: string) {
  if (status === "cancelled") return { label: "Cancelado", cls: "bg-red-500/20 text-red-400 border-red-500/30" };
  if (status === "past") return { label: "Pasado", cls: "bg-white/5 text-gray-500 border-white/10" };
  if (new Date(date).toDateString() === new Date().toDateString())
    return { label: "Hoy", cls: "bg-gold-400/20 text-gold-400 border-gold-400/30" };
  return { label: "Próximo", cls: "bg-blood-500/20 text-blood-500 border-blood-500/30" };
}

export default function Eventos() {
  const upcomingEventos = getEventsByKind("evento").filter((e) => e.status === "upcoming");
  const pastEventos = getEventsByKind("evento").filter((e) => e.status === "past");
  const next30 = upcomingEventos.filter((e) => inWindow(e.date, 30));

  // Calendar grid: the next 6 weeks, events plotted on their day
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday
  const days: { date: Date; events: typeof events }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dayEvents = events.filter((e) => {
      const ed = new Date(e.date);
      return ed.toDateString() === d.toDateString();
    });
    days.push({ date: d, events: dayEvents });
  }

  const monthLabel = start.toLocaleDateString("es-PY", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📅</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">Eventos</h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ediciones de gran formato: la experiencia completa, con dresscode, preventa y
            line-up. Próximos y pasados.
          </p>
        </div>

        {/* Next 30 days summary */}
        {next30.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Próximos 30 días</h2>
            <div className="space-y-4">
              {next30.map((e) => {
                const badge = statusBadge(e.status, e.date);
                return (
                  <Link
                    key={e.id}
                    href={`/eventos/${e.slug}`}
                    className="block border border-white/10 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-white">{e.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          📅 {e.dateLabel} · {e.startTime}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          📍 {e.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs px-3 py-1 border rounded-full ${badge.cls}`}>
                          {badge.label}
                        </span>
                        {e.price && <span className="text-xs text-gold-400">{e.price}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Calendar grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white capitalize">{monthLabel}</h2>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blood-500" /> Evento formal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-gold-400" /> Encuentro
              </span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2 uppercase tracking-wider">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              const isToday = day.date.toDateString() === today.toDateString();
              const inMonth = day.date.getMonth() === start.getMonth();
              return (
                <div
                  key={i}
                  className={`aspect-square border rounded-lg p-1.5 ${
                    isToday
                      ? "border-gold-400/50 bg-gold-400/5"
                      : inMonth
                      ? "border-white/5 bg-white/[0.02]"
                      : "border-white/[0.03] bg-transparent text-gray-600"
                  }`}
                >
                  <div className={`text-xs ${isToday ? "text-gold-400 font-bold" : "text-gray-500"}`}>
                    {day.date.getDate()}
                  </div>
                  <div className="space-y-0.5 mt-0.5">
                    {day.events.slice(0, 2).map((e) => (
                      <Link
                        key={e.id}
                        href={e.kind === "evento" ? `/eventos/${e.slug}` : `/encuentros/${e.slug}`}
                        title={e.title}
                        className={`block text-[10px] truncate px-1 py-0.5 rounded ${
                          e.kind === "evento"
                            ? "bg-blood-500/30 text-blood-500 hover:bg-blood-500/50"
                            : "bg-gold-400/20 text-gold-400 hover:bg-gold-400/40"
                        }`}
                      >
                        {e.title}
                      </Link>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-[9px] text-gray-500">+{day.events.length - 2} más</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming eventos (full) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Próximos eventos</h2>
          {upcomingEventos.length === 0 ? (
            <p className="text-gray-500">No hay eventos próximos publicados. Anotate al WhatsApp para enterarte primero.</p>
          ) : (
            <div className="space-y-3">
              {upcomingEventos.map((e) => {
                const badge = statusBadge(e.status, e.date);
                return (
                  <Link
                    key={e.id}
                    href={`/eventos/${e.slug}`}
                    className="block border border-blood-500/20 rounded-xl p-5 bg-gradient-to-br from-blood-500/5 to-transparent hover:border-blood-500/40 transition-all"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{e.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">📅 {e.dateLabel} · {e.startTime}</p>
                        <p className="text-sm text-gray-500 mt-1">📍 {e.location}</p>
                        {e.description && <p className="text-sm text-gray-400 mt-2 line-clamp-2">{e.description}</p>}
                      </div>
                      <span className={`text-xs px-3 py-1 border rounded-full shrink-0 ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Past eventos → /historia */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Eventos pasados</h2>
          <p className="text-gray-400 mb-4">
            El archivo completo con fotos y recaps está en{" "}
            <Link href="/historia" className="text-gold-400 hover:text-white underline">
              /historia
            </Link>
            .
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {pastEventos.slice(0, 8).map((e) => (
              <Link
                key={e.id}
                href="/historia"
                className="border border-white/5 rounded-lg p-3 text-center text-sm text-gray-400 hover:border-gold-400/30 hover:text-gold-400 transition-all"
              >
                {e.dateLabel}
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-link to /encuentros */}
        <div className="mt-16 p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-2">¿Buscás algo más chico?</p>
          <p className="text-sm text-gray-500 mb-4">
            Munches, rope jams, workshops y otras reuniones regulares viven en /encuentros.
          </p>
          <Link
            href="/encuentros"
            className="inline-block border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Ver encuentros →
          </Link>
        </div>
      </div>
    </div>
  );
}
