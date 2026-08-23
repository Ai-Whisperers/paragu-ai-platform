// Lista de casos con filtros client-side
'use client';

import { useState, useMemo } from 'react';
import { casos, getCasosStats } from '@/data/casos';
import type { Caso, TipoNegligencia, EstadoCaso } from '@/data/types';
import CaseCard from '@/components/CaseCard';

interface Props {
  locale: string;
}

const TIPOS: { value: TipoNegligencia; label: string }[] = [
  { value: 'mortalidad-neonatal', label: 'Mortalidad neonatal' },
  { value: 'cirugia-lado-equivocado', label: 'Cirugía lado equivocado' },
  { value: 'muerte-evitable', label: 'Muerte evitable' },
  { value: 'diagnostico-tardio', label: 'Diagnóstico tardío' },
  { value: 'rechazo-urgencias', label: 'Rechazo en urgencias' },
  { value: 'falta-insumos', label: 'Falta de insumos' },
  { value: 'sutura-inadecuada', label: 'Procedimiento mal hecho' },
  { value: 'cirugia-estetica', label: 'Cirugía estética' },
  { value: 'transporte-interno', label: 'Transporte interno' },
  { value: 'historia-clinica-borrada', label: 'Historia borrada' },
  { value: 'error-medicamento', label: 'Error de medicación' },
  { value: 'abandono-paciente', label: 'Abandono / omisión' },
  { value: 'otro', label: 'Otro' },
];

const ESTADOS: { value: EstadoCaso; label: string }[] = [
  { value: 'denunciado', label: 'Reportado' },
  { value: 'investigacion-fiscal', label: 'Investigación' },
  { value: 'juicio', label: 'Juicio' },
  { value: 'sentencia', label: 'Sentencia' },
  { value: 'absuelto', label: 'Absuelto' },
  { value: 'archivado', label: 'Archivado' },
];

export default function CasosExplorer({ locale }: Props) {
  const [search, setSearch] = useState('');
  const [tipoFilter, setTipoFilter] = useState<TipoNegligencia | 'all'>('all');
  const [estadoFilter, setEstadoFilter] = useState<EstadoCaso | 'all'>('all');
  const [gravedadFilter, setGravedadFilter] = useState<number | 'all'>('all');

  const filtered = useMemo(() => {
    return casos.filter((c) => {
      const matchSearch = search === '' ||
        c.titulo.toLowerCase().includes(search.toLowerCase()) ||
        c.resumen.toLowerCase().includes(search.toLowerCase()) ||
        c.hospital.toLowerCase().includes(search.toLowerCase()) ||
        c.victima.toLowerCase().includes(search.toLowerCase()) ||
        c.ciudad.toLowerCase().includes(search.toLowerCase());
      const matchTipo = tipoFilter === 'all' || c.tipoNegligencia === tipoFilter;
      const matchEstado = estadoFilter === 'all' || c.estado === estadoFilter;
      const matchGravedad = gravedadFilter === 'all' || c.gravedad === gravedadFilter;
      return matchSearch && matchTipo && matchEstado && matchGravedad;
    });
  }, [search, tipoFilter, estadoFilter, gravedadFilter]);

  const stats = getCasosStats();

  return (
    <>
      {/* HEADER */}
      <section className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border-light)] py-10">
        <div className="container">
          <h1 className="mb-3">Casos verificados de negligencia médica en Paraguay</h1>
          <p className="text-[var(--color-text-muted)] max-w-3xl">
            {stats.total} casos documentados con fuentes periodísticas verificables. {stats.muertes} muertes, {stats.sentencias} sentencia firme, {stats.neonatales} mortalidad neonatal.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-6 bg-[var(--color-surface)] border-b border-[var(--color-border-light)] sticky top-0 z-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="search"
              placeholder="Buscar por título, hospital, ciudad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:col-span-2 px-3 py-2 border border-[var(--color-border)] rounded-md text-sm bg-[var(--color-bg)]"
              aria-label="Buscar casos"
            />
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value as TipoNegligencia | 'all')}
              className="px-3 py-2 border border-[var(--color-border)] rounded-md text-sm bg-[var(--color-bg)]"
              aria-label="Filtrar por tipo"
            >
              <option value="all">Todos los tipos</option>
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value as EstadoCaso | 'all')}
              className="px-3 py-2 border border-[var(--color-border)] rounded-md text-sm bg-[var(--color-bg)]"
              aria-label="Filtrar por estado"
            >
              <option value="all">Todos los estados</option>
              {ESTADOS.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex items-center gap-3 flex-wrap text-sm">
            <span className="text-[var(--color-text-muted)]">Gravedad:</span>
            <button
              type="button"
              onClick={() => setGravedadFilter('all')}
              className={`px-2 py-1 rounded text-xs ${gravedadFilter === 'all' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-alt)] text-[var(--color-text-muted)]'}`}
            >
              Todas
            </button>
            {[5, 4, 3, 2, 1].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGravedadFilter(g)}
                className={`px-2 py-1 rounded text-xs ${gravedadFilter === g ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-alt)] text-[var(--color-text-muted)]'}`}
              >
                {g === 5 ? 'Muerte' : g === 4 ? 'Muy severo' : g === 3 ? 'Severo' : g === 2 ? 'Moderado' : 'Leve'}
              </button>
            ))}
            <span className="ml-auto text-[var(--color-text-muted)]">{filtered.length} de {stats.total} casos</span>
          </div>
        </div>
      </section>

      {/* CASES GRID */}
      <section className="py-10 bg-[var(--color-bg)]">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-[var(--color-text-muted)]">No hay casos que coincidan con los filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <CaseCard key={c.id} caso={c} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
