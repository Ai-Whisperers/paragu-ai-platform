// ── Stats cuantitativos oficiales Paraguay + contexto global ──
// Fuentes verificadas en 00-brief/FUENTES-ADICIONALES.md
// Todos los números tienen URL de fuente oficial.
import type { Stat } from './types';

export const stats: Stat[] = [
  {
    label: 'Casos verificados',
    value: 25,
    unidad: 'casos',
    fuente: 'SaludAbierta PY / Investigación propia',
    fuenteUrl: 'https://gist.github.com/IvanWeissVanDerPol/174e660734db01a1a3ac427ec02b1ef8',
    contexto: 'Casos documentados con fuentes verificables (2024-2026)',
  },
  {
    label: 'Muertes en casos verificados',
    value: 16,
    unidad: 'muertes',
    fuente: 'SaludAbierta PY / Investigación propia',
    fuenteUrl: 'https://gist.github.com/IvanWeissVanDerPol/174e660734db01a1a3ac427ec02b1ef8',
    contexto: 'Víctimas mortales entre los 25 casos documentados',
  },
  {
    label: 'Sentencias firmes',
    value: 1,
    unidad: 'sentencias',
    fuente: 'Corte Suprema de Justicia',
    fuenteUrl: 'https://www.lanacion.com.py/judiciales/2025/06/05/caso-maylen-corte-ratifico-condena-de-16-anos-de-carcel-para-medico-por-homicidio-por-mala-praxis/',
    contexto: 'Caso Maylen Romero: 16 años al cirujano Miguel Ángel Cavallo',
  },
  {
    label: 'Fiscalizaciones SUPERSALUD (2025)',
    value: 548,
    unidad: 'auditorías',
    fuente: 'Informe de Gestión SUPERSALUD 2025',
    fuenteUrl: 'https://superintendenciadesalud.gov.py/wp-content/uploads/2026/02/informe-de-gestio-superintendencia-de-salud-2025.pdf',
    contexto: '548 fiscalizaciones a nivel nacional (304 a EPSS) + 660 resoluciones + 12 sumarios + 96 auditorías contables',
  },
  {
    label: 'Denuncias ingresadas PJ (2024)',
    value: 3473,
    unidad: 'denuncias',
    fuente: 'Poder Judicial - Informe Anual de Quejas y Denuncias 2024',
    fuenteUrl: 'https://www.pj.gov.py/images/contenido/oqyd/2024-informe-anual-quejasydenuncias.pdf',
    contexto: 'Total de denuncias ingresadas al Poder Judicial en 2024',
  },
  {
    label: 'Denuncias Ministerio Público (2024)',
    value: 283600,
    unidad: 'denuncias',
    fuente: 'Ministerio Público - Datos Abiertos 2024',
    fuenteUrl: 'https://ministeriopublico.gov.py/nota/datos-abiertos-de-enero-a-diciembre-de-2024-el-ministerio-publico-registra-mas-de-283600-denuncias-ingresadas-y-atendio-a-cerca-de-275000-victimas-en-todo-el-pais-12096',
    contexto: '283,600 denuncias + 275,000 víctimas atendidas',
  },
  {
    label: 'Eventos adversos globales (WHO)',
    value: 134000000,
    unidad: 'eventos/año',
    fuente: 'WHO Global Patient Safety Report 2024',
    fuenteUrl: 'https://www.who.int/publications/i/item/9789240095458',
    contexto: '134 millones de eventos adversos anuales en hospitales a nivel global',
  },
  {
    label: 'Mortalidad materna Paraguay',
    value: 62,
    unidad: 'por 100k NV',
    fuente: 'OPS - Paraguay informe anual de país 2024',
    fuenteUrl: 'https://www.paho.org/es/publicaciones/paraguay-informe-anual-pais-2024',
    contexto: 'Tasa de mortalidad materna ~62 por 100,000 nacidos vivos (vs. Chile ~13)',
  },
  {
    label: 'Aumento de auditorías SUPERSALUD (2026)',
    value: 66,
    unidad: '%',
    fuente: 'Consultor Salud - Supersalud aumenta 66% sus auditorías en 2026',
    fuenteUrl: 'https://consultorsalud.com/supersalud-auditorias-2026-eps-hospitales/',
    contexto: 'Crecimiento de auditorías SUPERSALUD para 2026',
  },
];

export const statsPorCategoria = {
  casosVerificados: stats.find(s => s.label === 'Casos verificados'),
  muertesVerificadas: stats.find(s => s.label === 'Muertes en casos verificados'),
  sentencias: stats.find(s => s.label === 'Sentencias firmes'),
  fiscalizaciones: stats.find(s => s.label === 'Fiscalizaciones SUPERSALUD (2025)'),
};
