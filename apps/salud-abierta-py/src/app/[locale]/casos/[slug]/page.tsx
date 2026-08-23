// Caso individual con timeline + fuentes + hospital relacionado
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { casos, getCasoBySlug } from '@/data/casos';
import { getHospitalById } from '@/data/hospitales';
import CaseTimeline from '@/components/CaseTimeline';
import HospitalGrade from '@/components/HospitalGrade';
import { ExternalLink, ArrowLeft, Building2 } from 'lucide-react';

export async function generateStaticParams() {
  return casos.map((c) => ({ slug: c.id }));
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const caso = getCasoBySlug(slug);
  if (!caso) notFound();

  const hospital = getHospitalById(caso.hospitalId);
  const casoRelacionados = casos
    .filter((c) => c.id !== caso.id && (c.hospitalId === caso.hospitalId || c.tipoNegligencia === caso.tipoNegligencia))
    .slice(0, 3);

  return (
    <>
      {/* HEADER */}
      <section className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border-light)] py-10">
        <div className="container max-w-4xl">
          <Link href={`/${locale}/casos`} className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] no-underline mb-4">
            <ArrowLeft className="w-4 h-4" /> Volver a casos
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded font-medium bg-[var(--color-bg)]" style={{ color: 'var(--color-error)' }}>
              Gravedad {caso.gravedad}/5 · {caso.gravedad === 5 ? 'Muerte' : 'Muy severo'}
            </span>
            <span className="text-xs px-2 py-1 rounded font-medium bg-[var(--color-bg)] text-[var(--color-text-muted)]">
              {caso.estado}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{caso.fechaIncidente}</span>
          </div>

          <h1>{caso.titulo}</h1>

          <div className="mt-4 text-sm text-[var(--color-text-muted)] space-y-1">
            <p><strong>Víctima:</strong> {caso.victima}{caso.victimaEdad ? ` · ${caso.victimaEdad}` : ''}</p>
            <p><strong>Lugar:</strong> {caso.hospital} · {caso.ciudad}, {caso.departamento}</p>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-10">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-[var(--color-text)]">{caso.resumen}</p>
            {caso.descripcionDetallada && (
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">{caso.descripcionDetallada}</p>
            )}
          </div>

          {caso.sentencia && (
            <div className="card mt-6 border-l-4 border-l-[var(--color-error)]">
              <h3 className="text-lg font-bold mb-2">Sentencia / Resolución</h3>
              {caso.sentencia.condena && (
                <p className="text-sm mb-2"><strong>Condena:</strong> {caso.sentencia.condena}</p>
              )}
              {caso.sentencia.indemnizacion && (
                <p className="text-sm mb-2"><strong>Indemnización:</strong> {caso.sentencia.indemnizacion}</p>
              )}
              {caso.sentencia.observaciones && (
                <p className="text-sm text-[var(--color-text-muted)] italic">{caso.sentencia.observaciones}</p>
              )}
            </div>
          )}

          {caso.timeline && caso.timeline.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4">Línea de tiempo</h2>
              <CaseTimeline events={caso.timeline} />
            </div>
          )}

          {/* HOSPITAL RELACIONADO */}
          {hospital && (
            <div className="mt-8 pt-8 border-t border-[var(--color-border-light)]">
              <h2 className="mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[var(--color-accent)]" />
                Hospital donde ocurrió
              </h2>
              <HospitalGrade hospital={hospital} showDetails={false} />
              <div className="mt-3">
                <Link href={`/${locale}/hospitales`} className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] no-underline">
                  Ver scorecard completo de hospitales →
                </Link>
              </div>
            </div>
          )}

          {/* FUENTES */}
          <div className="mt-8 pt-8 border-t border-[var(--color-border-light)]">
            <h2 className="mb-4">Fuentes verificadas ({caso.fuentes.length})</h2>
            <ul className="space-y-3">
              {caso.fuentes.map((f, i) => (
                <li key={i} className="card">
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-[var(--color-primary)]">{f.medio} · {f.fecha}</p>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">{f.titular}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--color-text-light)] flex-shrink-0 mt-1" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CASOS RELACIONADOS */}
          {casoRelacionados.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[var(--color-border-light)]">
              <h2 className="mb-4">Casos relacionados</h2>
              <ul className="space-y-2">
                {casoRelacionados.map((c) => (
                  <li key={c.id}>
                    <Link href={`/${locale}/casos/${c.id}`} className="block p-3 card hover:border-[var(--color-accent)] no-underline">
                      <p className="font-semibold text-[var(--color-primary)] text-sm">{c.titulo}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">{c.hospital} · {c.fechaIncidente}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
