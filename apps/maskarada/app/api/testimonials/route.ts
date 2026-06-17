import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/**
 * Public submission endpoint. Anyone (anon, no auth) can POST a
 * testimonial. Server-side validation:
 *  - name: 2-80 chars
 *  - body: 20-2000 chars
 *  - display_mode: attributed | anonymous | first_name
 *  - context, role, event_slug: optional, max 200 chars
 *
 * Writes to `mk_testimonials` with status='pending'. Admin reviews in /admin
 * and flips to 'approved' to publish.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Submission {
  submitter_name: string;
  submitter_email?: string;
  submitter_phone?: string;
  display_mode: "attributed" | "anonymous" | "first_name";
  body: string;
  context?: string;
  role?: string;
  event_slug?: string;
  consent_text: string;
  consent_scope: "public_website" | "social_media" | "internal_only";
}

function validate(s: Partial<Submission>): string | null {
  if (!s.submitter_name || s.submitter_name.trim().length < 2) return "Nombre muy corto";
  if (s.submitter_name.trim().length > 80) return "Nombre muy largo (max 80)";
  if (!s.body || s.body.trim().length < 20) return "El testimonio debe tener al menos 20 caracteres";
  if (s.body.trim().length > 2000) return "El testimonio no puede pasar de 2000 caracteres";
  if (!["attributed", "anonymous", "first_name"].includes(s.display_mode ?? "")) {
    return "Modo de atribución inválido";
  }
  if (s.context && s.context.length > 200) return "Contexto demasiado largo (max 200)";
  if (s.role && s.role.length > 200) return "Rol demasiado largo (max 200)";
  if (!s.consent_text || s.consent_text.length < 10) return "Consentimiento requerido";
  if (!["public_website", "social_media", "internal_only"].includes(s.consent_scope ?? "")) {
    return "Alcance del consentimiento inválido";
  }
  return null;
}

export async function POST(req: Request) {
  let body: Partial<Submission>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const err = validate(body);
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";

  // Insert the testimonial
  const insert = {
    submitter_name: body.submitter_name!.trim(),
    submitter_email: body.submitter_email?.trim() || null,
    submitter_phone: body.submitter_phone?.trim() || null,
    display_mode: body.display_mode!,
    body: body.body!.trim(),
    context: body.context?.trim() || null,
    role: body.role?.trim() || null,
    event_slug: body.event_slug?.trim() || null,
    status: "pending",
    ip_address: ip.slice(0, 64),
    user_agent: ua.slice(0, 500),
  };
  const { data: t, error: tErr } = await supabase
    .from("mk_testimonials")
    .insert(insert)
    .select("id")
    .single();

  if (tErr || !t) {
    console.error("mk_testimonials insert error:", tErr);
    return NextResponse.json(
      { error: "No pudimos guardar el testimonio. Intentá de nuevo o escribinos por WhatsApp." },
      { status: 500 }
    );
  }

  // Insert the consent record
  const { error: cErr } = await supabase.from("mk_testimonial_consents").insert({
    testimonial_id: t.id,
    scope: body.consent_scope!,
    consent_text: body.consent_text!.trim(),
    ip_address: ip.slice(0, 64),
  });
  if (cErr) {
    console.error("mk_testimonial_consents insert error:", cErr);
    // not fatal — testimonial is saved, just no consent trail.
  }

  return NextResponse.json({ ok: true, id: t.id });
}
