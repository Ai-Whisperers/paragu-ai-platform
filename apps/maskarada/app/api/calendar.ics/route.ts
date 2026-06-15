import { NextResponse } from "next/server";
import { events } from "@/lib/events-v2";

export const dynamic = "force-dynamic";

// iCal (RFC 5545) feed of upcoming eventos + the next 6 instances of
// each recurring encuentro. Subscribable in Apple Calendar, Google
// Calendar, etc. via webcal://maskarada.paragu-ai.com/api/calendar.ics
// (the user can also just hit https://.../api/calendar.ics and import
// the downloaded file).

function escapeIcs(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  // YYYYMMDDTHHMMSSZ (UTC)
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function rruleFromIcal(rrule: string): string {
  // events-v2 uses a tiny subset: FREQ, BYDAY, BYSETPOS. Re-emit verbatim.
  return rrule;
}

function buildEvent(opts: {
  uid: string;
  start: string;
  end: string;
  summary: string;
  description: string;
  location: string;
  url?: string;
  rrule?: string;
}) {
  const lines: string[] = [
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${fmtDate(new Date().toISOString())}`,
    `DTSTART:${fmtDate(opts.start)}`,
    `DTEND:${fmtDate(opts.end)}`,
    `SUMMARY:${escapeIcs(opts.summary)}`,
    `DESCRIPTION:${escapeIcs(opts.description)}`,
    `LOCATION:${escapeIcs(opts.location)}`,
  ];
  if (opts.url) lines.push(`URL:${opts.url}`);
  if (opts.rrule) lines.push(`RRULE:${rruleFromIcal(opts.rrule)}`);
  lines.push("END:VEVENT");
  return lines.join("\r\n");
}

function nextOccurrences(rrule: string, count: number, fromDate: Date): Date[] {
  // Tiny RRULE expander: only handles FREQ (MONTHLY/BIWEEKLY/WEEKLY),
  // BYDAY, BYSETPOS. For more complex rules, use a real library.
  const parts = Object.fromEntries(
    rrule.split(";").map((kv) => {
      const [k, v] = kv.split("=");
      return [k, v];
    })
  );
  const dayMap: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  const targetDay = parts.BYDAY ? dayMap[parts.BYDAY] : -1;
  const setpos = parts.BYSETPOS ? +parts.BYSETPOS : null;
  const out: Date[] = [];
  const cur = new Date(fromDate);
  for (let i = 0; i < 366 && out.length < count; i++) {
    const d = new Date(cur);
    d.setDate(cur.getDate() + i);
    if (targetDay === -1 || d.getDay() === targetDay) {
      if (setpos !== null) {
        // BYSETPOS: which occurrence of the day-of-week in the month
        const month = d.getMonth();
        const year = d.getFullYear();
        const allOfDay: number[] = [];
        for (let dd = 1; dd <= 31; dd++) {
          const dd2 = new Date(year, month, dd);
          if (dd2.getMonth() !== month) break;
          if (dd2.getDay() === targetDay) allOfDay.push(dd);
        }
        let pos: number;
        if (setpos === -1) pos = allOfDay.length; // last
        else pos = setpos;
        if (allOfDay[pos - 1] === d.getDate()) {
          out.push(d);
        }
      } else {
        out.push(d);
      }
    }
  }
  return out;
}

export async function GET() {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//maskarada.paragu-ai.com//events//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:maškaráda — eventos y encuentros",
    "X-WR-TIMEZONE:America/Asuncion",
  ];

  const now = new Date();
  for (const e of events) {
    if (e.kind === "evento") {
      // One event at its date
      const start = e.date;
      const end = e.endDate || new Date(new Date(start).getTime() + 6 * 3600_000).toISOString();
      lines.push(
        buildEvent({
          uid: `${e.id}@maskarada.paragu-ai.com`,
          start,
          end,
          summary: e.title,
          description:
            (e.description ? e.description + "\n\n" : "") +
            `Anotarse: https://wa.me/595981200255?text=${encodeURIComponent("Anotarme para " + e.title)}`,
          location: e.location,
          url: `https://maskarada.paragu-ai.com/eventos/${e.slug}`,
        })
      );
    } else if (e.rrule) {
      // 6 instances of each recurring encuentro
      const occs = nextOccurrences(e.rrule, 6, now);
      for (let i = 0; i < occs.length; i++) {
        const occ = occs[i];
        const startDate = new Date(occ);
        startDate.setHours(19, 30, 0, 0); // 19:30 local
        const endDate = new Date(startDate.getTime() + 3 * 3600_000);
        lines.push(
          buildEvent({
            uid: `${e.id}-${occ.toISOString().split("T")[0]}@maskarada.paragu-ai.com`,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            summary: e.title,
            description:
              (e.description ? e.description + "\n\n" : "") +
              `Anotarse: ${e.signupUrl || "https://wa.me/595981200255"}`,
            location: e.location,
            url: `https://maskarada.paragu-ai.com/encuentros/${e.slug}`,
          })
        );
      }
    } else {
      // One-off encuentro
      const start = e.date;
      const end = e.endDate || new Date(new Date(start).getTime() + 2 * 3600_000).toISOString();
      lines.push(
        buildEvent({
          uid: `${e.id}@maskarada.paragu-ai.com`,
          start,
          end,
          summary: e.title,
          description: e.description || "",
          location: e.location,
          url: `https://maskarada.paragu-ai.com/encuentros/${e.slug}`,
        })
      );
    }
  }

  lines.push("END:VCALENDAR");
  const body = lines.join("\r\n");
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="maskarada.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
