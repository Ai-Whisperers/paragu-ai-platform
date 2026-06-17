import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { content } from "@/lib/content";

export const metadata = {
  title: "Testimonios — Club maškaráda",
  description:
    "Lo que dice la gente que pasó por maškaráda. Testimonios reales de asistentes a eventos, munches, rope jams y talleres.",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qyvokpribmbrosafntqa.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Testimonial = {
  id: string;
  display_mode: "attributed" | "anonymous" | "first_name";
  body: string;
  context: string | null;
  role: string | null;
  submitter_name: string;
  created_at: string;
};

async function getApprovedTestimonials(): Promise<Testimonial[]> {
  // RLS is permissive (anon can read all) so we filter to approved
  // explicitly here. Approved-only is the user-facing contract.
  const { data, error } = await supabase
    .from("mk_testimonials")
    .select("id, display_mode, body, context, role, submitter_name, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("testimonials fetch error:", error);
    return [];
  }
  return (data || []) as Testimonial[];
}

function formatAttribution(t: Testimonial): string {
  if (t.display_mode === "anonymous") return "";
  if (t.display_mode === "first_name") {
    return `— ${t.submitter_name.split(" ")[0]}${t.role ? `, ${t.role}` : ""}`;
  }
  return `— ${t.submitter_name}${t.role ? `, ${t.role}` : ""}`;
}

export default async function Testimonios() {
  const testimonials = await getApprovedTestimonials();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🪶</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Testimonios
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Lo que dice la gente que pasó por acá. Testimonios reales, anónimos o firmados según prefiera cada persona.
          </p>
        </div>

        {/* CTA at top */}
        <div className="mb-12 border border-gold-400/20 rounded-xl p-6 bg-gold-400/5 text-center">
          <p className="text-gray-300 mb-4">
            ¿Asististe a algo de maškaráda y querés compartir cómo fue?
          </p>
          <Link
            href="/testimonios/nuevo"
            className="inline-block bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            Enviar mi testimonio
          </Link>
        </div>

        {testimonials.length === 0 ? (
          <div className="border border-white/5 rounded-xl p-12 bg-white/[0.02] text-center">
            <p className="text-gray-400 text-lg leading-relaxed">
              Aún no hay testimonios publicados.
            </p>
            <p className="text-gray-500 text-sm mt-3">
              Sé la primera persona en compartir tu experiencia — y rompe el hielo para las que vienen.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/20 transition-all"
              >
                <blockquote className="text-gray-200 leading-relaxed mb-4 whitespace-pre-wrap">
                  {t.body}
                </blockquote>
                <footer className="flex flex-wrap items-center gap-2 text-sm">
                  {formatAttribution(t) && (
                    <span className="text-gold-400 font-medium">{formatAttribution(t)}</span>
                  )}
                  {t.context && (
                    <span className="text-gray-500 text-xs">· {t.context}</span>
                  )}
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
