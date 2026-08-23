// ── Tipos compartidos para toda la data layer ──
export type TipoNegligencia =
  | 'cirugia-lado-equivocado'  // surgery wrong side (e.g., Nanzi Franco mastectomy)
  | 'muerte-evitable'           // muerte evitable (auditoría oficial)
  | 'error-medicamento'         // error de medicación
  | 'cirugia-equivocada'        // cirugía que no debió hacerse
  | 'rechazo-urgencias'         // rechazo en urgencias (vuelva mañana)
  | 'diagnostico-tardio'        // diagnóstico tardío
  | 'mortalidad-neonatal'       // muerte neonatal/parto
  | 'mortalidad-materna'        // muerte materna
  | 'falta-insumos'             // falta de insumos/equipos
  | 'cirugia-estetica'          // cirugía estética (e.g., Maylen)
  | 'historia-clinica-borrada'  // alteración de evidencia
  | 'sutura-inadecuada'         // procedimiento mal hecho (e.g., cintillos)
  | 'abandono-paciente'         // abandono / omisión de auxilio
  | 'transporte-interno'        // caída en traslado
  | 'otro';

export type EstadoCaso =
  | 'denunciado'           // reportado, en investigación
  | 'investigacion-fiscal' // investigación fiscal abierta
  | 'juicio'              // juicio oral en curso
  | 'sentencia'           // sentencia firme
  | 'absuelto'            // médico absuelto (caso Nicora)
  | 'archivado'           // archivado sin resolución
  | 'cerrado-indemnizacion'; // cerrado con indemnización

export interface TimelineEvent {
  fecha: string;         // YYYY-MM-DD o YYYY-MM
  titulo: string;
  descripcion: string;
  fuente?: string;       // URL de la fuente
}

export interface Caso {
  id: string;             // slug para URL
  titulo: string;         // ej: "Bebé muerta tras parto en Santaní"
  victima: string;        // "Recién nacida" o nombre si es público
  victimaEdad?: string;   // "Recién nacida", "22 años", "80 años"
  victimaGenero?: 'F' | 'M' | 'Otro';
  hospital: string;       // nombre del hospital
  hospitalId: string;     // ID para join con hospitales.ts
  ciudad: string;         // "Asunción", "Santaní", etc.
  departamento: string;   // "Central", "San Pedro", etc.
  fechaIncidente: string; // YYYY-MM-DD o YYYY-MM
  fechaPublicacion: string;
  tipoNegligencia: TipoNegligencia;
  estado: EstadoCaso;
  resumen: string;         // 1-2 párrafos
  descripcionDetallada?: string;
  timeline?: TimelineEvent[];
  sentencia?: {
    condena?: string;     // "16 años de prisión"
    indemnizacion?: string;
    observaciones?: string;
  };
  fuentes: Fuente[];
  tags: string[];          // ["#neonatal", "#interior", ...]
  gravedad: 1 | 2 | 3 | 4 | 5; // 5 = muerte, 4 = discapacidad severa, etc.
  verificado: boolean;     // siempre true (filtramos los no verificados)
  // Para evitar trademark ban: NO usamos nombres de redes sociales
  compartirUrl?: string;  // URL del artículo principal
}

export interface Fuente {
  medio: string;          // "ABC Color"
  url: string;
  fecha: string;
  titular: string;
}

export interface Hospital {
  id: string;
  nombre: string;
  ciudad: string;
  departamento: string;
  tipo: 'publico' | 'privado' | 'ips' | 'militar' | 'universitario';
  casosReportados: number;
  casosVerificados: number;
  muertes: number;
  // Score A-F inspirado en Leapfrog
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  scoreNumerico: number; // 0-100
  processScore: number;   // 0-100 (50% del score)
  outcomeScore: number;   // 0-100 (50% del score)
  ultimaIncidente: string;
  observaciones: string[];
}

export interface Stat {
  label: string;
  value: string | number;
  unidad?: string;
  fuente: string;
  fuenteUrl: string;
  contexto?: string;
}
