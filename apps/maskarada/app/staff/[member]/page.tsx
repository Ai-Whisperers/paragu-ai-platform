import Link from "next/link";
import { notFound } from "next/navigation";
import { TEAM, getStaffMember } from "@/lib/staff";
import { JsonLd, person, breadcrumb } from "@/lib/jsonld";
import { heroFor } from "@/lib/hero";

export async function generateStaticParams() {
  return TEAM.map((m) => ({ member: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ member: string }> }) {
  const { member } = await params;
  const m = getStaffMember(member);
  if (!m) return {};
  return {
    title: `${m.name} — ${m.role} | Equipo maškaráda`,
    description: m.bio,
  };
}

export default async function StaffDetalle({ params }: { params: Promise<{ member: string }> }) {
  const { member } = await params;
  const m = getStaffMember(member);
  if (!m) notFound();

  return (
    <div className="min-h-screen py-20 px-4">
      <JsonLd
        data={[
          person({
            slug: m.slug,
            name: m.name,
            role: m.role,
            description: m.bio,
            image: m.photo
              ? `https://maskarada.paragu-ai.com${m.photo}`
              : `https://maskarada.paragu-ai.com${heroFor(m.slug)}`,
            path: `/staff/${m.slug}`,
          }),
          breadcrumb([
            { name: "Staff", path: "/staff" },
            { name: m.name, path: `/staff/${m.slug}` },
          ]),
        ]}
      />
      <div className="max-w-3xl mx-auto">
        <Link href="/staff" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Equipo maškaráda
        </Link>

        <div className="flex items-start gap-6 mb-8">
          <div className="text-6xl flex-shrink-0 mt-1">{m.icon}</div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-400 mb-1">{m.role}</div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{m.name}</h1>
          </div>
        </div>

        {m.photo && (
          <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/5 mb-8">
            <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="eager" />
          </div>
        )}

        <p className="text-lg text-gray-300 leading-relaxed mb-10">{m.bio}</p>

        <h2 className="text-2xl font-bold text-white mb-4">Qué hacen en cada edición</h2>
        <ul className="space-y-2 mb-10">
          {m.responsibilities.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed">
              <span className="text-gold-400 mt-0.5">▸</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        {m.contactHref && (
          <div className="p-6 border border-gold-400/20 rounded-xl bg-gold-400/5 text-center">
            <p className="text-gray-300 mb-3">¿Te interesa este equipo o servicio?</p>
            <Link
              href={m.contactHref}
              className="inline-block bg-gold-400 hover:bg-gold-500 text-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-colors"
            >
              Ver más
            </Link>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <Link
            href="/staff"
            className="text-gold-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            ← Volver al equipo
          </Link>
        </div>
      </div>
    </div>
  );
}
