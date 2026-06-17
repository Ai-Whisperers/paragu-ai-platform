import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function inferSourceType(url: string): string {
  const u = url.toLowerCase();
  if (u.includes("drive.google.com") || u.includes("docs.google.com")) return "google_drive";
  if (u.includes("dropbox.com") || u.includes("dropboxusercontent")) return "dropbox";
  if (u.includes("onedrive.com") || u.includes("1drv.com") || u.includes("sharepoint.com")) return "onedrive";
  if (u.includes("instagram.com") || u.includes("instagr.am")) return "instagram";
  return "other";
}

function validate(s: Record<string, any>): string | null {
  if (!s.event_slug || s.event_slug.trim().length < 2) return "Elegí un evento";
  if (!s.submitter_name || s.submitter_name.trim().length < 2) return "Tu nombre es requerido";
  if (!s.source_url || s.source_url.trim().length < 5) return "El link a la carpeta es requerido";
  if (!/^https?:\/\//i.test(s.source_url)) return "El link debe empezar con http(s)://";
  if (s.submitter_email && !s.submitter_email.includes("@")) return "Email inválido";
  if (s.photo_count_estimate !== undefined && (typeof s.photo_count_estimate !== "number" || s.photo_count_estimate < 0)) {
    return "Cantidad de fotos inválida";
  }
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

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

  const insert = {
    event_slug: body.event_slug.trim(),
    submitter_name: body.submitter_name.trim(),
    submitter_email: body.submitter_email?.trim() || null,
    submitter_whatsapp: body.submitter_whatsapp?.trim() || null,
    source_url: body.source_url.trim(),
    source_type: body.source_url ? inferSourceType(body.source_url) : "other",
    photo_count_estimate: body.photo_count_estimate ?? null,
    context: body.context?.trim() || null,
    status: "pending",
  };

  const { data, error } = await supabase
    .from("mk_photo_submissions")
    .insert(insert)
    .select("id")
    .single();

  if (error || !data) {
    console.error("mk_photo_submissions insert error:", error);
    return NextResponse.json(
      { error: "No pudimos guardar. Intentá de nuevo o escribinos por WhatsApp." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, id: data.id });
}
