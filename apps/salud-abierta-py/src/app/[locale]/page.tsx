// Home page — hero + stats + recent cases + CTA reportar
import Link from 'next/link';
import { casos, getCasosStats } from '@/data/casos';
import { stats } from '@/data/stats';
import { hospitales } from '@/data/hospitales';
import CaseCard from '@/components/CaseCard';
import StatCard from '@/components/StatCard';
import HospitalGrade from '@/components/HospitalGrade';
import { Shield, AlertTriangle, Scale, Heart, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return [];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const statsCasos = getCasosStats();
  const recentCasos = casos.slice(0, 6);
  const featuredHospitals = hospitales.filter(h => h.casosReportados > 0).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-[var(--color-primary)] text-white py-16 md:py-20">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-accent-light)] border border-[var(--color-accent)] rounded-full text-xs font-semibold text-[var(--color-accent-dark)] mb-6">
            <Shield className="w-4 h-4" />
            Primer observatorio ciudadano de Paraguay
          </div>

          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Tu voz cuenta.<br />El sistema tiene que cambiar.
          </h1>

          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Paraguay no cuenta con registro nacional de incidentes médicos ni ley de derechos del paciente. Esto es lo que estamos construyendo para cambiarlo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/casos`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-90 no-underline"
            >
              Ver {statsCasos.total} casos verificados
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/reportar`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 no-underline"
            >
              Reportar un incidente
            </Link>
          </div>
        </div>
      </section>

      {/* KEY STATS */}
      <section className="py-12 bg-[var(--color-bg)]">
        <div className="container">
          <h2 className="text-center mb-8">El problema, en números</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard stat={stats[0]} />
            <StatCard stat={stats[1]} />
            <StatCard stat={stats[3]} />
            <StatCard stat={stats[6]} />
          </div>
          <p className="text-xs text-[var(--color-text-muted)] text-center mt-6 max-w-3xl mx-auto">
            Estos números provienen de fuentes oficiales verificadas.{' '}
            <Link href={`/${locale}/metodologia`} className="underline">Ver metodología completa</Link>.
          </p>
        </div>
      </section>

      {/* THE GAP */}
      <section className="py-12 bg-[var(--color-bg-alt)]">
        <div className="container max-w-4xl">
          <h2 className="text-center mb-8">Lo que Paraguay no tiene</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base mb-1">Sin registro nacional de incidentes</h3>
                <p className="text-sm text-[var(--color-text-muted)]">No existe un sistema obligatorio para reportar errores médicos. SUPERSALUD audita pero no publica datos.</p>
              </div>
            </div>
            <div className="card flex items-start gap-3">
              <Scale className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base mb-1">Sin ley de derechos del paciente</h3>
                <p className="text-sm text-[var(--color-text-muted)]">30 años detrás de Argentina (Ley Nicolás 2025). Una sentencia penal máxima: 5 años (Art. 107 CP).</p>
              </div>
            </div>
            <div className="card flex items-start gap-3">
              <Heart className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base mb-1">Sin arbitraje médico especializado</h3>
                <p className="text-sm text-[var(--color-text-muted)]">México tiene CONAMED (30 años). Paraguay solo tribunales ordinarios (caro, lento).</p>
              </div>
            </div>
            <div className="card flex items-start gap-3">
              <Shield className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base mb-1">Sin accountability pública</h3>
                <p className="text-sm text-[var(--color-text-muted)]">EE.UU. tiene Leapfrog con 3,000 hospitales rankeados. Paraguay no publica scores de prestadores.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT CASES */}
      <section className="py-12 bg-[var(--color-bg)]">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <h2>Casos recientes</h2>
            <Link href={`/${locale}/casos`} className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] no-underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCasos.map((c) => (
              <CaseCard key={c.id} caso={c} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED HOSPITALS */}
      <section className="py-12 bg-[var(--color-bg-alt)]">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <h2>Hospitales con casos documentados</h2>
            <Link href={`/${locale}/hospitales`} className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] no-underline">
              Ver scorecard completo →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHospitals.map((h) => (
              <HospitalGrade key={h.id} hospital={h} showDetails={false} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-white">¿Te pasó algo? No estás solo/a.</h2>
          <p className="text-white/85 mt-4 mb-8 text-lg">
            Si sufriste negligencia médica o acompañás a alguien que la sufrió, podés documentar el caso en 3 minutos. Tu reporte es anónimo, queda en tu control, y puede ayudar a otras víctimas.
          </p>
          <Link
            href={`/${locale}/reportar`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-90 no-underline"
          >
            Reportar un incidente
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
