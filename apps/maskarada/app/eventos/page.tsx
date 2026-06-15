import Link from "next/link";
import { events, getEventsByKind, getUpcoming, type EventKind, type EncuentroFormat, FORMAT_LABEL, FORMAT_EMOJI, FORMAT_COLOR } from "@/lib/events-v2";
import { content } from "@/lib/content";

export const metadata = {
  title: "Eventos — Club maškaráda",
  description:
    "Calendario de eventos de maškaráda: ediciones de gran formato y encuentros regulares (munches, rope jams, workshops). Próximos y pasados.",
};

// Calendar grid: the next 6 weeks
function buildCalendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
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
  return { days, start, today };
}

function statusBadge(status: string, date: string) {
  if (status === "cancelled")
    return { label: "Cancelado", cls: "bg-red-500/20 text-red-400 border-red-500/30" };
  if (status === "past")
    return { label: "Pasado", cls: "bg-white/5 text-gray-500 border-white/10" };
  if (new Date(date).toDateString() === new Date().toDateString())
    return { label: "Hoy", cls: "bg-gold-400/20 text-gold-400 border-gold-400/30" };
  return { label: "Próximo", cls: "bg-blood-500/20 text-blood-500 border-blood-500/30" };
}

function EventCard({ e, kind }: { e: (typeof events)[number]; kind: EventKind }) {
  const badge = statusBadge(e.status, e.date);
  const href = kind === "evento" ? `/eventos/${e.slug}` : `/encuentros/${e.slug}`;
  return (
    <Link
      href={href}
      className={`block border rounded-xl p-5 transition-all ${
        kind === "evento"
          ? "border-blood-500/20 bg-gradient-to-br from-blood-500/5 to-transparent hover:border-blood-500/40"
          : "border-white/10 bg-white/[0.02] hover:border-gold-400/30"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {e.format && <span className="text-xl shrink-0">{FORMAT_EMOJI[e.format]}</span>}
            <h3 className="text-lg font-semibold text-white truncate">{e.title}</h3>
          </div>
          <p className="text-sm text-gold-400">
            {e.rrule ? `${e.weekday} ${e.startTime}` : `${e.dateLabel}${e.startTime ? " · " + e.startTime : ""}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">📍 {e.location}</p>
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
}

export default function Eventos() {
  const upcomingEventos = getEventsByKind("evento").filter((e) => e.status === "upcoming");
  const pastEventos = getEventsByKind("evento").filter((e) => e.status === "past");
  const upcomingEncuentros = getEventsByKind("encuentro").filter((e) => e.status === "upcoming");
  const next30 = getUpcoming().slice(0, 6);
  const { days, start, today } = buildCalendar();
  const monthLabel = start.toLocaleDateString("es-PY", { month: "long", year: "numeric" });

  // Group encuentros by format for the recurring section
  const byFormat: Record<string, typeof events> = {};
  for (const e of upcomingEncuentros) {
    const f = e.format || "social";
    (byFormat[f] = byFormat[f] || []).push(e);
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📅</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">Eventos</h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Calendario completo: ediciones de gran formato y encuentros regulares
            (munches, rope jams, workshops, charlas).
          </p>
        </div>

        {/* Section 1: Próximos 30 días */}
        {next30.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Próximos 30 días</h2>
            <div className="space-y-3">
              {next30.map((e) => (
                <EventCard key={e.id} e={e} kind={e.kind} />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Calendar grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
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

        {/* Section 3: Upcoming formales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="px-3 py-1 border border-blood-500/30 rounded-full text-xs uppercase tracking-widest text-blood-500">
              🎭 Próximos eventos formales
            </span>
          </h2>
          {upcomingEventos.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay eventos formales próximos. Anotate al WhatsApp para enterarte primero.</p>
          ) : (
            <div className="space-y-3">
              {upcomingEventos.map((e) => (
                <EventCard key={e.id} e={e} kind="evento" />
              ))}
            </div>
          )}
        </section>

        {/* Section 4: Encuentros regulares by format */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="px-3 py-1 border border-gold-400/30 rounded-full text-xs uppercase tracking-widest text-gold-400">
              ☕ Encuentros regulares
            </span>
            <span className="text-gray-500 text-sm">({upcomingEncuentros.length} formatos)</span>
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Reuniones regulares de la comunidad. Sin play, sin dresscode, principiantes bienvenidos.{" "}
            <Link href="/encuentros" className="text-gold-400 hover:text-white underline">
              Ver página de encuentros →
            </Link>
          </p>
          <div className="space-y-3">
            {upcomingEncuentros
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((e) => (
                <EventCard key={e.id} e={e} kind="encuentro" />
              ))}
          </div>
        </section>

        {/* Section 5: Past formales → /historia */}
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

        {/* Cross-link to /encuentros + calendar subscribe */}
        <div className="mt-16 p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-2">¿Buscás algo más chico?</p>
          <p className="text-sm text-gray-500 mb-4">
            Los encuentros regulares tienen página propia con más detalle y explicación
            de cada formato.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/encuentros"
              className="inline-block border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Ver página de encuentros →
            </Link>
            <a
              href="/api/calendar.ics"
              className="text-xs text-gray-500 hover:text-gold-400 transition-colors uppercase tracking-widest border-b border-dotted border-gray-600 hover:border-gold-400 pb-0.5"
              title="Suscribite desde tu app de calendario"
            >
              📆 Suscribite al calendario (.ics)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
