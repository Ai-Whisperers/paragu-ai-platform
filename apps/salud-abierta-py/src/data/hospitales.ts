// ── 15 hospitales con scorecard (inspirado en Leapfrog Hospital Safety Grade) ──
// Cada hospital tiene: grade A-F + score numérico + breakdown process/outcome + casos
// Datos preliminares. Próxima versión: integrar con auditorías reales SUPERSALUD.
import type { Hospital } from './types';
import { casos } from './casos';

function countCasosByHospital(hospitalId: string) {
  const cs = casos.filter(c => c.hospitalId === hospitalId);
  return {
    total: cs.length,
    muertes: cs.filter(c => c.gravedad === 5).length,
    ultimaIncidente: cs[0]?.fechaIncidente || 'N/A',
  };
}

// Cálculo simplificado del grade basado en casos
function calcGrade(hospitalId: string): { grade: Hospital['grade']; scoreNumerico: number; processScore: number; outcomeScore: number } {
  let score = 100;
  casos.filter(c => c.hospitalId === hospitalId).forEach(c => {
    const penalty = c.gravedad === 5 ? 25 : c.gravedad === 4 ? 15 : c.gravedad === 3 ? 8 : 4;
    score -= penalty;
  });
  score = Math.max(0, score);
  const processScore = Math.max(0, score - 5); // Process = protocolos, time-out, etc
  const outcomeScore = Math.max(0, score + 5); // Outcome = mortalidad, complicaciones
  let grade: Hospital['grade'];
  if (score >= 90) grade = 'A';
  else if (score >= 75) grade = 'B';
  else if (score >= 60) grade = 'C';
  else if (score >= 40) grade = 'D';
  else grade = 'F';
  return { grade, scoreNumerico: score, processScore, outcomeScore };
}

// Mapeo de counts a campos del Hospital interface
function expandCounts(hospitalId: string) {
  const cs = casos.filter(c => c.hospitalId === hospitalId);
  return {
    casosReportados: cs.length,
    casosVerificados: cs.length,
    muertes: cs.filter(c => c.gravedad === 5).length,
    ultimaIncidente: cs[0]?.fechaIncidente || 'N/A',
  };
}

export const hospitales: Hospital[] = [
  {
    id: 'hospital-de-clinicas',
    nombre: 'Hospital de Clínicas (UNA)',
    ciudad: 'San Lorenzo',
    departamento: 'Central',
    tipo: 'universitario',
    ...expandCounts('hospital-de-clinicas'),
    ...calcGrade('hospital-de-clinicas'),
    observaciones: [
      'Hospital universitario dependiente de la UNA. Hospital de referencia nacional.',
      'Múltiples casos de mortalidad neonatal reportados (Nayeli Luján, bebé 9 años, mujer cesárea).',
      'Patrón crónico identificado en prensa (5+ casos en 2 años).',
    ],
  },
  {
    id: 'ips-hospital-central',
    nombre: 'Hospital Central del IPS',
    ciudad: 'Asunción',
    departamento: 'Central',
    tipo: 'ips',
    ...expandCounts('ips-hospital-central'),
    ...calcGrade('ips-hospital-central'),
    observaciones: [
      'Principal hospital del Instituto de Previsión Social. ~1.2M afiliados.',
      'Casos emblemáticos: bebé Máximo Gael (gasa dejada dentro), niña 7 años (odontología), Magdalena Barboza.',
      'Gerencia Salud: Dr. Derlis León. Sumarios administrativos en curso.',
    ],
  },
  {
    id: 'ips-hospital-ingavi',
    nombre: 'Hospital de Especialidades Quirúrgicas Ingavi (IPS)',
    ciudad: 'Asunción',
    departamento: 'Central',
    tipo: 'ips',
    ...expandCounts('ips-hospital-ingavi'),
    ...calcGrade('ips-hospital-ingavi'),
    observaciones: [
      'Dos casos emblemáticos con auditoría oficial: Braulio Vázquez (muerte evitable) y Nanzi Franco (mama equivocada).',
      'Superintendencia confirmó "fallas sistémicas" y borrado de evidencias.',
      'Recomendación a Fiscalía. Equipo de Mastología separado.',
    ],
  },
  {
    id: 'hospital-militar',
    nombre: 'Hospital Militar (Hospital de las Fuerzas Armadas)',
    ciudad: 'Asunción',
    departamento: 'Central',
    tipo: 'militar',
    ...expandCounts('hospital-militar'),
    ...calcGrade('hospital-militar'),
    observaciones: [
      'Dos casos en octubre 2025: bebé José Fabricio (muerte post-cirugía) y niña operada de mano equivocada.',
      'Dr. Darío Fretes como director institucional. Dr. Fernando Sanabria separado del cargo.',
    ],
  },
  {
    id: 'hospital-de-trauma',
    nombre: 'Hospital de Trauma Prof. Dr. Manuel Giani',
    ciudad: 'Asunción',
    departamento: 'Central',
    tipo: 'publico',
    ...expandCounts('hospital-de-trauma'),
    ...calcGrade('hospital-de-trauma'),
    observaciones: [
      'Hospital público especializado en trauma.',
      'Caso viral en diciembre 2025 con denuncia penal a Fiscalía confirmada por Salud Pública.',
    ],
  },
  {
    id: 'hospital-barrio-obrero',
    nombre: 'Hospital General de Barrio Obrero',
    ciudad: 'Asunción',
    departamento: 'Central',
    tipo: 'publico',
    ...expandCounts('hospital-barrio-obrero'),
    ...calcGrade('hospital-barrio-obrero'),
    observaciones: [
      'Hospital público general de Asunción. Saturación documentada.',
      'Caso emblemático: bebé fallecida tras cesárea.',
    ],
  },
  {
    id: 'hospital-materno-infantil-san-pablo',
    nombre: 'Hospital Materno Infantil San Pablo',
    ciudad: 'Asunción',
    departamento: 'Central',
    tipo: 'publico',
    ...expandCounts('hospital-materno-infantil-san-pablo'),
    ...calcGrade('hospital-materno-infantil-san-pablo'),
    observaciones: [
      'Hospital materno-infantil de referencia en Asunción.',
      'Bebé grave en terapia intensiva por presunta negligencia (mayo 2026).',
    ],
  },
  {
    id: 'hospital-distrital-santaní',
    nombre: 'Hospital Distrital San Estanislao (Santaní)',
    ciudad: 'Santaní',
    departamento: 'San Pedro',
    tipo: 'publico',
    ...expandCounts('hospital-distrital-santaní'),
    ...calcGrade('hospital-distrital-santaní'),
    observaciones: [
      'Hospital distrital del interior. Saturación extrema.',
      'CASO EMBLEMÁTICO: Ramón Galli (80 años) suturado con cintillos de plástico.',
      'Bebé fallecida tras parto no atendido. Caso viral nacional.',
      'Auditoría MSPBS activa (julio 2026).',
    ],
  },
  {
    id: 'hospital-general-santa-rosa-aguaray',
    nombre: 'Hospital General de Santa Rosa del Aguaray',
    ciudad: 'Santa Rosa del Aguaray',
    departamento: 'San Pedro',
    tipo: 'publico',
    ...expandCounts('hospital-general-santa-rosa-aguaray'),
    ...calcGrade('hospital-general-santa-rosa-aguaray'),
    observaciones: [
      'Patrón "vuelva mañana": niña de 11 años muerta tras 5 consultas rechazadas.',
      'Diagnóstico erróneo: considerada sinusitis cuando era otra patología.',
    ],
  },
  {
    id: 'hospital-villarrica',
    nombre: 'Hospital de Villarrica',
    ciudad: 'Villarrica',
    departamento: 'Guairá',
    tipo: 'publico',
    ...expandCounts('hospital-villarrica'),
    ...calcGrade('hospital-villarrica'),
    observaciones: [
      'Múltiples casos: mujer ACV cayó de camilla en traslado, recién nacida fallecida.',
      'Patrón crónico identificado en Guairá.',
    ],
  },
  {
    id: 'ips-villarrica',
    nombre: 'IPS Villarrica',
    ciudad: 'Villarrica',
    departamento: 'Guairá',
    tipo: 'ips',
    ...expandCounts('ips-villarrica'),
    ...calcGrade('ips-villarrica'),
    observaciones: [
      'Recién nacida fallecida en febrero 2025. Fiscalía investiga.',
    ],
  },
  {
    id: 'hospital-general-luque',
    nombre: 'Hospital General de Luque',
    ciudad: 'Luque',
    departamento: 'Central',
    tipo: 'publico',
    ...expandCounts('hospital-general-luque'),
    ...calcGrade('hospital-general-luque'),
    observaciones: [
      'Jazmín Navarro (30 años): perforación de colon durante cirugía de embarazo ectópico.',
    ],
  },
  {
    id: 'sanatorio-medicis',
    nombre: 'Sanatorio Medicis',
    ciudad: 'Asunción',
    departamento: 'Central',
    tipo: 'privado',
    ...expandCounts('sanatorio-medicis'),
    ...calcGrade('sanatorio-medicis'),
    observaciones: [
      'CASO FUNDACIONAL: Maylen Romero (22 años) muerta en cirugía de implante mamario.',
      'Único caso con sentencia penal firme en Paraguay: Dr. Miguel Ángel Cavallo condenado a 16 años + 10 de inhabilitación.',
      'Ratificado por Corte Suprema de Justicia el 5 de junio de 2025.',
    ],
  },
  {
    id: 'ips-ingerada-ciudad-del-este',
    nombre: 'IPS Ciudad del Este',
    ciudad: 'Ciudad del Este',
    departamento: 'Alto Paraná',
    tipo: 'ips',
    ...expandCounts('ips-ingerada-ciudad-del-este'),
    ...calcGrade('ips-ingerada-ciudad-del-este'),
    observaciones: [
      'Casos mencionados en prensa regional (Alto Paraná).',
    ],
  },
  {
    id: 'hospital-regional-villarrica',
    nombre: 'Hospital Regional de Villarrica',
    ciudad: 'Villarrica',
    departamento: 'Guairá',
    tipo: 'publico',
    ...expandCounts('hospital-regional-villarrica'),
    ...calcGrade('hospital-regional-villarrica'),
    observaciones: [
      'Mujer embarazada perdió bebé. Investigación fiscal abierta.',
    ],
  },
];

// Helpers
export function getHospitalById(id: string): Hospital | undefined {
  return hospitales.find(h => h.id === id);
}

export function getHospitalesByTipo(tipo: Hospital['tipo']): Hospital[] {
  return hospitales.filter(h => h.tipo === tipo);
}

export function getHospitalesStats() {
  return {
    total: hospitales.length,
    gradeA: hospitales.filter(h => h.grade === 'A').length,
    gradeB: hospitales.filter(h => h.grade === 'B').length,
    gradeC: hospitales.filter(h => h.grade === 'C').length,
    gradeD: hospitales.filter(h => h.grade === 'D').length,
    gradeF: hospitales.filter(h => h.grade === 'F').length,
    conMuertes: hospitales.filter(h => h.muertes > 0).length,
  };
}
