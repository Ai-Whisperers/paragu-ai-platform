import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function validate(s: Record<string, any>): string | null {
  if (!s.kind || !["ally_missing", "vendor_missing", "space_missing", "role_missing", "event_idea"].includes(s.kind)) {
    return "Tipo inválido";
  }
  if (!s.title || s.title.trim().length < 5) return "Título muy corto (min 5 chars)";
  if (s.title.length > 120) return "Título muy largo (max 120)";
  if (!s.description || s.description.trim().length < 20) return "Descripción muy corta (min 20 chars)";
  if (s.description.length > 1000) return "Descripción muy larga (max 1000)";
  if (s.contact_optional && s.contact_optional.length > 200) return "Contacto muy largo (max 200)";
  return null;
}

export async function POST(req: Request) {
  let body: Record<string, any>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const err = validate(body);
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }

  // Auto-claim if the contact_optional field looks like an email or WhatsApp
  const contact = body.contact_optional?.trim() || null;
  let claimed_by: string | null = null;
  if (contact) {
    claimed_by = contact;
  }

  const { data, error } = await supabase
    .from("mk_colaborar_suggestions")
    .insert({
      kind: body.kind,
      title: body.title.trim(),
      description: body.description.trim(),
      contact_optional: contact,
      status: claimed_by ? "claimed" : "open",
      claimed_by,
      claimed_at: claimed_by ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("mk_colaborar insert error:", error);
    return NextResponse.json({ error: "No pudimos guardar. Intentá de nuevo." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: data.id, claimed: !!claimed_by });
}
