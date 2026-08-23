import { hospitales, getHospitalesStats } from '@/data/hospitales';
import HospitalGrade from '@/components/HospitalGrade';

export default async function HospitalesPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // satisfy type
  const stats = getHospitalesStats();

  return (
    <>
      <section className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border-light)] py-10">
        <div className="container">
          <h1 className="mb-3">Scorecard de hospitales</h1>
          <p className="text-[var(--color-text-muted)] max-w-3xl">
            {hospitales.length} hospitales con casos documentados. {stats.conMuertes} con muertes reportadas.
            Grados A-F basados en casos verificados (inspirado en <a href="https://www.hospitalsafetygrade.org/" target="_blank" rel="noopener noreferrer">Leapfrog Hospital Safety Grade</a>).
          </p>

          <div className="flex flex-wrap gap-2 mt-6 text-xs">
            <span className="px-3 py-1 rounded grade-A font-bold">A · Excelente</span>
            <span className="px-3 py-1 rounded grade-B font-bold">B · Bueno</span>
            <span className="px-3 py-1 rounded grade-C font-bold">C · Aceptable</span>
            <span className="px-3 py-1 rounded grade-D font-bold">D · Bajo</span>
            <span className="px-3 py-1 rounded grade-F font-bold">F · Crítico</span>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitales.map((h) => (
              <HospitalGrade key={h.id} hospital={h} showDetails={true} />
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--color-border-light)]">
            <div className="disclaimer-banner">
              <p className="text-xs">
                <strong>Disclaimer metodológico:</strong> Este scorecard es preliminar y se basa en casos reportados públicamente. Próxima versión integrará auditorías oficiales SUPERSALUD, datos del IPS y estudios de mortalidad ajustada. La metodología es abierta y mejorable.{' '}
                <a href="/metodologia" className="underline">Ver metodología completa</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
