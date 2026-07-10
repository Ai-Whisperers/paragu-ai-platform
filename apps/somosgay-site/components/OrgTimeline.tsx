import { HITOS } from "@/content/hitos";

const KIND_LABELS: Record<string, string> = {
  fundación: "Fundación",
  programa: "Programa",
  memoria: "Memoria",
  incidencia: "Incidencia",
  alianza: "Alianza",
};

const KIND_COLORS: Record<string, string> = {
  fundación: "bg-[var(--color-primary)] text-white",
  programa: "bg-[var(--color-rainbow-3)] text-black",
  memoria: "bg-[var(--color-purple-deep)] text-white",
  incidencia: "bg-[var(--color-rainbow-2)] text-black",
  alianza: "bg-warm text-text",
};

export function OrgTimeline() {
  return (
    <ol className="space-y-6 list-none pl-0">
      {HITOS.map((h, i) => (
        <li
          key={i}
          className="relative pl-12 pb-6 border-l-2 border-[var(--color-warm-deep)]"
        >
          <span
            className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="w-2 h-2 rounded-full bg-white"></span>
          </span>
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="font-display font-bold text-2xl text-[var(--color-primary)]">
              {h.year}
            </span>
            <span
              className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded font-medium ${KIND_COLORS[h.kind] || "bg-warm text-text"}`}
            >
              {KIND_LABELS[h.kind]}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold mb-1">{h.title}</h3>
          <p className="text-sm text-text-light leading-relaxed">{h.detail}</p>
        </li>
      ))}
    </ol>
  );
}
