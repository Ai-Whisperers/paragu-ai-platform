// DisclaimerBanner.tsx — disclaimer legal permanente
export default function DisclaimerBanner() {
  return (
    <div className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border-light)]">
      <div className="container py-2">
        <p className="text-xs text-[var(--color-text-muted)] text-center leading-relaxed">
          <strong>Datos preliminares.</strong> Casos documentados con fuentes periodísticas verificables. No constituyen diagnóstico médico-legal.{' '}
          <a href="/metodologia" className="underline">Ver metodología completa</a>.
        </p>
      </div>
    </div>
  );
}
