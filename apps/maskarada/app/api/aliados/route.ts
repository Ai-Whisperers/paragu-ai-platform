import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function validate(s: Record<string, any>): string | null {
  if (!s.name || s.name.trim().length < 2) return "Nombre muy corto";
  if (s.name.length > 120) return "Nombre muy largo (max 120)";
  if (!["lgtbi_org", "sex_positive", "kink_org", "wellness", "craft", "media", "venue", "other"].includes(s.category)) {
    return "Categoría inválida";
  }
  if (!["py", "latam", "international"].includes(s.scope)) return "Alcance inválido";
  if (!s.description || s.description.trim().length < 20) return "Descripción muy corta (min 20 chars)";
  if (s.description.length > 500) return "Descripción muy larga (max 500)";
  if (s.website && !/^https?:\/\//i.test(s.website)) return "Website debe empezar con http(s)://";
  if (s.instagram && /\s/.test(s.instagram)) return "Instagram no debe tener espacios";
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

  const slug = (slugify(body.name) || `aliado-${Date.now()}`).slice(0, 80);
  const notes = [
    body.relationship ? `Relación: ${body.relationship.trim()}` : "",
    body.submitter_name ? `Sugerido por: ${body.submitter_name.trim()}` : "",
    body.submitter_contact ? `Contacto del sugerente: ${body.submitter_contact.trim()}` : "",
  ].filter(Boolean).join(" | ");

  const { data, error } = await supabase
    .from("mk_aliados")
    .insert({
      slug,
      name: body.name.trim(),
      category: body.category,
      scope: body.scope,
      city: body.city?.trim() || null,
      country: body.country?.trim().toUpperCase().slice(0, 2) || null,
      description: body.description.trim(),
      website: body.website?.trim() || null,
      instagram: body.instagram?.trim()?.replace(/^@/, "") || null,
      relationship: body.relationship?.trim() || null,
      notes: notes || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("mk_aliados insert error:", error);
    return NextResponse.json({ error: "No pudimos guardar. Intentá de nuevo." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: data.id });
}
