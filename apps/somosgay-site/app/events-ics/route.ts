import { SITE_URL } from "@/lib/content";

/**
 * iCal feed for SOMOSGAY events.
 *
 * Currently emits the recurrent Mes de las Memorias 108 (Sept 1–30 each year,
 * Asunción, PY) so journalists + funders can subscribe from their calendar
 * client. When real per-event pages land, add them as <VEVENT> blocks.
 */

interface VEvent {
  uid: string;
  summary: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}

function escapeICal(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function dt(d: Date): string {
  // YYYYMMDDTHHMMSSZ
  return (
    d.getUTCFullYear().toString() +
    String(d.getUTCMonth() + 1).padStart(2, "0") +
    String(d.getUTCDate()).padStart(2, "0") +
    "T" +
    String(d.getUTCHours()).padStart(2, "0") +
    String(d.getUTCMinutes()).padStart(2, "0") +
    String(d.getUTCSeconds()).padStart(2, "0") +
    "Z"
  );
}

function buildICal(events: VEvent[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SOMOSGAY//SOMOSGAY Paraguay Events//es",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeICal("SOMOSGAY Paraguay")}`,
    `X-WR-CALDESC:${escapeICal("Eventos de SOMOSGAY Paraguay")}`,
    `X-WR-TIMEZONE:America/Asuncion`,
  ];
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.uid}`,
      `DTSTAMP:${dt(new Date())}`,
      `DTSTART:${dt(e.start)}`,
      `DTEND:${dt(e.end)}`,
      `SUMMARY:${escapeICal(e.summary)}`,
      `DESCRIPTION:${escapeICal(e.description)}`,
      `LOCATION:${escapeICal(e.location)}`,
      `URL:${SITE_URL}/memoria-108#anual`,
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

// Generate Mes de las Memorias 108 events for the next 3 years
function generateMemoria108Events(): VEvent[] {
  const events: VEvent[] = [];
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  for (const year of [currentYear, currentYear + 1, currentYear + 2]) {
    const start = new Date(Date.UTC(year, 8, 1, 13, 0, 0)); // Sept 1
    const end = new Date(Date.UTC(year, 8, 30, 21, 0, 0)); // Sept 30
    events.push({
      uid: `memoria-108-${year}@somosgay.org`,
      summary: "Mes de las Memorias 108",
      description: `Mes de las Memorias 108 (${year}). Co-organizado por SOMOSGAY y AIREANA. Bernardo Aranda Valdez, las razias de septiembre 1959 contra 108 hombres gays en Asunción. Programa de actividades en Asunción y online.`,
      location: "Asunción, Paraguay",
      start,
      end,
    });
  }
  return events;
}

export function GET() {
  const events = generateMemoria108Events();
  return new Response(buildICal(events), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
