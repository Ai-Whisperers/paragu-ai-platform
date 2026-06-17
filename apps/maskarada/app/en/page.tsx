import Link from "next/link";
import { activities } from "@/lib/activities";
import { events } from "@/lib/events-v2";
import { events as historyEvents } from "@/lib/events";
import { getContent, localizedWhatsappLink } from "@/lib/content";
import UpcomingEventsWidget from "@/components/UpcomingEventsWidget";

const STATS = [
  { value: "4", label: "editions", note: "Since June 2025" },
  { value: "475+", label: "attendees", note: "lifetime" },
  { value: "6", label: "activities", note: "in the catalog" },
  { value: "6", label: "guides", note: "for the community" },
];

const featuredActivitySlugs = ["shibari-rope", "impact-play", "sensory-deprivation", "role-play-scene"];
const featuredActivities = activities.filter((a) => featuredActivitySlugs.includes(a.slug));

const simondice = historyEvents.find((e) => e.slug === "2026-06-11-simondice");

export default function EnHome() {
  const c = getContent("en");
  const hasUpcomingEventos = events.some(
    (e) => e.kind === "evento" && new Date(e.date) >= new Date()
  );

  return (
    <>
      {/* 1. HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/event-2026-06-11/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a] z-10" />

        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <div className="text-5xl mb-4 animate-pulse">🎭</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-gray-100 via-gold-400 to-gray-100 bg-clip-text text-transparent">
              {c.hero.title}
            </span>
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
            {c.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {c.site.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/en/eventos"
              className="bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 glow-red"
            >
              See upcoming events
            </Link>
            <a
              href={localizedWhatsappLink("en")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING */}
      <UpcomingEventsWidgetEn />

      {/* 3. WHAT IS MAŠKARÁDA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What is maškaráda?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A community of people who explore kink and BDSM consensually in Asunción, Paraguay. Four flagship editions, a monthly gathering, and an open archive of guides and lessons learned.
              </p>
              <p className="text-gray-400 leading-relaxed">
                If this is your first time, the kindest entry is a meetup (a monthly munch, no play, public) before a formal event. If you already have experience, you know where the calendar is.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
                  <p className="text-3xl font-bold text-gold-400">{s.value}</p>
                  <p className="text-sm text-white mt-1">{s.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
            {[
              { emoji: "📅", label: "Events", href: "/en/eventos", desc: "Upcoming, past" },
              { emoji: "☕", label: "Meetups", href: "/en/encuentros", desc: "Munches, jams" },
              { emoji: "📚", label: "Learn", href: "/en/aprender", desc: "Guides, glossary" },
              { emoji: "🏪", label: "Shop", href: "/en/tienda", desc: "Community products" },
            ].map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="block border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:border-gold-400/30 transition-all text-center"
              >
                <div className="text-3xl mb-2">{entry.emoji}</div>
                <p className="text-sm text-white font-medium">{entry.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{entry.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED ACTIVITIES */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Activities</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              The practices the community teaches, hosts and supports. Each with safety protocols and a detailed description.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {featuredActivities.map((a) => (
              <Link
                key={a.slug}
                href={`/en/actividades/${a.slug}`}
                className="group block border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:border-gold-400/30 transition-all text-center"
              >
                <div className="text-3xl mb-2">{a.emoji}</div>
                <p className="text-sm text-white font-medium group-hover:text-gold-400 transition-colors">
                  {a.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{a.tagline}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/en/actividades"
              className="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              See all 6 activities →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED HISTORY */}
      {simondice && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[5/4] overflow-hidden rounded-xl border border-white/5">
                <img
                  src="/images/event-2026-06-11/hero.jpg"
                  alt={simondice.editionName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-400 mb-2">
                  ★ Featured edition
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {simondice.editionName}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {simondice.dateLabel} · 📍 {simondice.location}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6 line-clamp-4">
                  {simondice.body?.split("\n\n")[0] || simondice.theme}
                </p>
                <Link
                  href={`/en/historia/${simondice.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-white uppercase tracking-widest"
                >
                  See full gallery →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. CLOSING CTA */}
      {hasUpcomingEventos && (
        <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-4 opacity-60">🎭</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to join?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              There's an event coming up. RSVP via WhatsApp or pick a meetup to start at a gentler pace.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/en/entradas"
                className="bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 glow-red"
              >
                Buy tickets
              </Link>
              <Link
                href="/en/encuentros"
                className="border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
              >
                See meetups
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. EN translation notice */}
      <section className="py-8 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-gray-500">
            This is the English version of maškaráda. Some sections are still being translated.
            {" "}
            <Link href="/" className="text-gold-400 hover:text-gold-300 underline">
              Ver en español
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

/**
 * English version of the upcoming events widget. Reads the same data
 * (events-v2.ts) but renders day/month names in English. We keep this
 * as a separate component to avoid coupling the Spanish one to i18n.
 */
function UpcomingEventsWidgetEn() {
  const now = new Date();
  const next5 = events
    .filter((e) => new Date(e.date) >= now || e.rrule)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
  if (next5.length === 0) return null;

  const dayNames: Record<string, string> = { SU: "Sun", MO: "Mon", TU: "Tue", WE: "Wed", TH: "Thu", FR: "Fri", SA: "Sat" };
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="text-5xl mb-4">📅</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Upcoming events</h2>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            What's next at maškaráda. Subscribe so you don't miss it.
          </p>
        </div>
        <div className="space-y-3 mb-8">
          {next5.map((e) => {
            let when = e.dateLabel;
            if (e.rrule) {
              const freq = e.rrule.split(";")[0].split("=")[1];
              const byday = e.rrule.match(/BYDAY=([A-Z]{2})/)?.[1] || "";
              const setpos = e.rrule.match(/BYSETPOS=(-?\d+)/)?.[1];
              let pattern = "";
              if (setpos === "-1") pattern = `Last ${dayNames[byday] || byday} of the month`;
              else if (setpos) pattern = `${["First","Second","Third","Fourth"][+setpos - 1] || ""} ${dayNames[byday] || byday} of the month`;
              else pattern = `${dayNames[byday] || byday}s`;
              when = `${pattern}${e.startTime ? ` · ${e.startTime}` : ""}`;
            } else if (e.startTime) {
              const d = new Date(e.date);
              when = `${monthNames[d.getMonth()]} ${d.getDate()} · ${e.startTime}`;
            }
            const href = e.kind === "evento" ? `/en/eventos/${e.slug}` : `/en/encuentros/${e.slug}`;
            return (
              <a key={e.id} href={href} className="block border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl shrink-0">{e.kind === "evento" ? "🎭" : "☕"}</span>
                      <h3 className="text-lg font-semibold text-white truncate">{e.title}</h3>
                    </div>
                    <p className="text-sm text-gold-400">{when}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">📍 {e.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-full border-gold-400/30 text-gold-400">
                      {e.kind === "evento" ? "Event" : "Meetup"}
                    </span>
                    {e.price && <span className="text-[11px] text-gray-500">{e.price}</span>}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/en/eventos"
            className="bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            See full calendar
          </Link>
          <Link
            href="/en/encuentros"
            className="border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            See meetups
          </Link>
          <a
            href="/api/calendar.ics"
            className="text-xs text-gray-500 hover:text-gold-400 transition-colors uppercase tracking-widest border-b border-dotted border-gray-600 hover:border-gold-400 pb-0.5"
            title="Subscribe at webcal://maskarada.paragu-ai.com/api/calendar.ics in your calendar app"
          >
            📆 Subscribe to calendar
          </a>
        </div>
      </div>
    </section>
  );
}
