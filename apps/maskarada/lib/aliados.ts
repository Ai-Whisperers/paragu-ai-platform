import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AliadoCategory = "lgtbi_org" | "sex_positive" | "kink_org" | "wellness" | "craft" | "media" | "venue" | "other";
export type AliadoScope = "py" | "latam" | "international";
export type AliadoStatus = "pending" | "approved" | "archived";

export interface Aliado {
  id: string;
  slug: string;
  name: string;
  category: AliadoCategory;
  scope: AliadoScope;
  city: string | null;
  country: string | null;
  description: string | null;
  website: string | null;
  instagram: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  relationship: string | null;
  status: AliadoStatus;
  created_at: string;
}

export async function getApprovedAliados(): Promise<Aliado[]> {
  const { data, error } = await supabase
    .from("mk_aliados")
    .select("id, slug, name, category, scope, city, country, description, website, instagram, contact_email, contact_phone, relationship, status, created_at")
    .eq("status", "approved")
    .order("scope", { ascending: true }) // py first
    .order("category", { ascending: true })
    .order("name", { ascending: true });
  if (error) {
    console.error("getApprovedAliados error:", error);
    return [];
  }
  return (data || []) as Aliado[];
}

export async function getAllAliados(): Promise<Aliado[]> {
  // Admin only — fetches all statuses
  const { data, error } = await supabase
    .from("mk_aliados")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("getAllAliados error:", error);
    return [];
  }
  return (data || []) as Aliado[];
}

export async function updateAliadoStatus(id: string, status: AliadoStatus): Promise<boolean> {
  const { error } = await supabase
    .from("mk_aliados")
    .update({ status })
    .eq("id", id);
  return !error;
}

// ─── Colaborar suggestions (the missing things) ─────────────────────────

export type ColaborKind = "ally_missing" | "vendor_missing" | "space_missing" | "role_missing" | "event_idea";
export type ColaborStatus = "open" | "claimed" | "in_progress" | "done" | "declined";

export interface ColaborSuggestion {
  id: string;
  kind: ColaborKind;
  title: string;
  description: string;
  contact_optional: string | null;
  status: ColaborStatus;
  claimed_by: string | null;
  claimed_at: string | null;
  notes: string | null;
  created_at: string;
}

export async function getOpenColabor(): Promise<ColaborSuggestion[]> {
  const { data, error } = await supabase
    .from("mk_colaborar_suggestions")
    .select("*")
    .in("status", ["open", "claimed", "in_progress"])
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) {
    console.error("getOpenColabor error:", error);
    return [];
  }
  return (data || []) as ColaborSuggestion[];
}

export async function getAllColabor(): Promise<ColaborSuggestion[]> {
  const { data, error } = await supabase
    .from("mk_colaborar_suggestions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("getAllColabor error:", error);
    return [];
  }
  return (data || []) as ColaborSuggestion[];
}

export async function updateColaborStatus(
  id: string,
  status: ColaborStatus,
  claimed_by?: string,
  notes?: string
): Promise<boolean> {
  const update: Record<string, unknown> = { status };
  if (status === "claimed" && claimed_by) {
    update.claimed_by = claimed_by;
    update.claimed_at = new Date().toISOString();
  }
  if (notes !== undefined) update.notes = notes;
  const { error } = await supabase
    .from("mk_colaborar_suggestions")
    .update(update)
    .eq("id", id);
  return !error;
}
