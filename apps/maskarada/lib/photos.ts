import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PhotoStatus = "pending" | "downloading" | "curating" | "published" | "rejected" | "archived";

export interface PhotoSubmission {
  id: string;
  event_slug: string;
  submitter_name: string;
  submitter_email: string | null;
  submitter_whatsapp: string | null;
  source_url: string;
  source_type: string | null;
  photo_count_estimate: number | null;
  context: string | null;
  status: PhotoStatus;
  reviewed_at: string | null;
  internal_notes: string | null;
  rejection_reason: string | null;
  created_at: string;
}

export async function getPhotoSubmissions(status?: PhotoStatus): Promise<PhotoSubmission[]> {
  let q = supabase
    .from("mk_photo_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) {
    console.error("getPhotoSubmissions error:", error);
    return [];
  }
  return (data || []) as PhotoSubmission[];
}

export async function updatePhotoStatus(
  id: string,
  status: PhotoStatus,
  internal_notes?: string,
  rejection_reason?: string
): Promise<boolean> {
  const update: Record<string, unknown> = {
    status,
    reviewed_at: new Date().toISOString(),
  };
  if (internal_notes !== undefined) update.internal_notes = internal_notes;
  if (status === "rejected" && rejection_reason) update.rejection_reason = rejection_reason;
  const { error } = await supabase
    .from("mk_photo_submissions")
    .update(update)
    .eq("id", id);
  return !error;
}
