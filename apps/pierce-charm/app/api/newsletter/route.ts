import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export const runtime = "nodejs";

interface NewsletterBody {
  email?: string;
  name?: string;
  source?: string; // page they signed up from
  consent?: boolean;
}

interface Subscriber {
  email: string;
  name?: string;
  source?: string;
  createdAt: string;
  ip?: string;
}

const STORE_FILE = "/tmp/pierce_charm_subscribers.jsonl";
const MAX_AGE_DAYS = 365;

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

async function appendSubscriber(s: Subscriber): Promise<void> {
  try {
    await fs.appendFile(STORE_FILE, JSON.stringify(s) + "\n", "utf8");
  } catch (err) {
    console.error("[newsletter] failed to persist:", err);
  }
}

async function hasRecentDuplicate(email: string): Promise<boolean> {
  try {
    const buf = await fs.readFile(STORE_FILE, "utf8");
    const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    const lines = buf.split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const sub: Subscriber = JSON.parse(line);
        if (sub.email === email && new Date(sub.createdAt).getTime() > cutoff) {
          return true;
        }
      } catch {
        // skip malformed
      }
    }
  } catch {
    // file doesn't exist yet
  }
  return false;
}

async function sendToBrevo(subscriber: { email: string; name?: string; source?: string }): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey) {
    return { ok: false, error: "BREVO_API_KEY not set" };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: subscriber.email,
        attributes: {
          NOMBRE: subscriber.name || "",
          SOURCE: subscriber.source || "site",
        },
        listIds: listId ? [Number(listId)] : [],
        updateEnabled: false,
      }),
    });

    if (res.ok || res.status === 204) {
      return { ok: true };
    }

    // 400 with "duplicate" is fine — they already exist
    if (res.status === 400) {
      const body = await res.json().catch(() => ({}));
      if (body?.code === "duplicate_parameter" || body?.message?.includes("already")) {
        return { ok: true };
      }
      return { ok: false, error: `Brevo ${res.status}: ${JSON.stringify(body)}` };
    }
    return { ok: false, error: `Brevo ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

export async function POST(req: NextRequest) {
  const debug: Record<string, unknown> = { step: "init", ts: new Date().toISOString() };
  try {
    const body = (await req.json()) as NewsletterBody;
    debug.requestBody = { email: body.email, name: body.name, source: body.source };
    debug.step = "parsed";

    const email = (body.email || "").trim().toLowerCase();
    const name = (body.name || "").trim();
    const source = (body.source || "site").trim();

    if (!email || !isValidEmail(email)) {
      debug.step = "invalid-email";
      return NextResponse.json(
        { error: "Email inválido", debug },
        { status: 400 }
      );
    }
    if (body.consent === false) {
      debug.step = "no-consent";
      return NextResponse.json(
        { error: "Consentimiento requerido", debug },
        { status: 400 }
      );
    }

    debug.step = "checking-duplicate";
    const isDuplicate = await hasRecentDuplicate(email);
    debug.isDuplicate = isDuplicate;

    if (!isDuplicate) {
      const subscriber: Subscriber = {
        email,
        name: name || undefined,
        source,
        createdAt: new Date().toISOString(),
        ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
      };

      debug.step = "persisting-local";
      await appendSubscriber(subscriber);

      debug.step = "sending-brevo";
      const brevo = await sendToBrevo({ email, name, source });
      debug.brevoResult = brevo;
    }

    debug.step = "done";
    return NextResponse.json({
      ok: true,
      message: isDuplicate ? "Ya estabas suscripta" : "¡Suscripta!",
      duplicate: isDuplicate,
      debug,
    });
  } catch (err) {
    debug.step = "uncaught-exception";
    debug.errorName = err instanceof Error ? err.name : "unknown";
    debug.errorMessage = err instanceof Error ? err.message : String(err);
    debug.errorStack = err instanceof Error ? err.stack : undefined;
    console.error("[newsletter] uncaught:", err);
    return NextResponse.json(
      { error: "Error interno", debug },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple health check
  return NextResponse.json({
    ok: true,
    provider: process.env.BREVO_API_KEY ? "brevo" : "local-only",
    store: STORE_FILE,
  });
}