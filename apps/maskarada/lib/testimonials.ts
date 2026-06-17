import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TestimonialStatus = "pending" | "approved" | "rejected" | "archived";

export interface TestimonialRow {
  id: string;
  submitter_name: string;
  submitter_email: string | null;
  display_mode: "attributed" | "anonymous" | "first_name";
  body: string;
  context: string | null;
  role: string | null;
  event_slug: string | null;
  status: TestimonialStatus;
  reviewed_at: string | null;
  created_at: string;
}

export async function getTestimonials(status?: TestimonialStatus): Promise<TestimonialRow[]> {
  let q = supabase
    .from("mk_testimonials")
    .select("id, submitter_name, submitter_email, display_mode, body, context, role, event_slug, status, reviewed_at, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) {
    console.error("getTestimonials error:", error);
    return [];
  }
  return (data || []) as TestimonialRow[];
}

export async function updateTestimonialStatus(
  id: string,
  status: TestimonialStatus,
  rejection_reason?: string
): Promise<boolean> {
  const update: Record<string, unknown> = {
    status,
    reviewed_at: new Date().toISOString(),
  };
  if (status === "rejected" && rejection_reason) {
    update.rejection_reason = rejection_reason;
  }
  const { error } = await supabase
    .from("mk_testimonials")
    .update(update)
    .eq("id", id);
  return !error;
}
