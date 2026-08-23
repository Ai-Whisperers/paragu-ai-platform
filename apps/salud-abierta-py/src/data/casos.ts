// ── 25 casos verificados de negligencia médica en Paraguay ──
// Fuentes: 04-casos/CASOS-EMBLEMATICOS.md en /opt/data/scratchpad/negligencia-medica-py/
// Disclaimer: Datos preliminares basados en fuentes periodísticas. No constituyen diagnóstico médico-legal.
import type { Caso, TipoNegligencia, EstadoCaso } from './types';

export const casos: Caso[] = [
  // ====== CASO 1: MAYLEN ROMERO — Caso fundacional (sentencia firme) ======
  {
    id: 'maylen-romero-cavallo-2020',
    titulo: 'Maylen Romero: 16 años de prisión al cirujano que la mató durante un implante mamario',
    victima: 'Maylen Analía Romero Ledesma',
    victimaEdad: '22 años',
    victimaGenero: 'F',
    hospital: 'Sanatorio Medicis',
    hospitalId: 'sanatorio-medicis',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2020-12-30',
    fechaPublicacion: '2025-06-05',
    tipoNegligencia: 'cirugia-estetica',
    estado: 'sentencia',
    gravedad: 5,
    resumen: 'Maylen Analía Romero Ledesma murió durante una cirugía de implante mamario en el Sanatorio Medicis. El cirujano plástico Miguel Ángel Cavallo le suministró 3 frascos de lidocaína y midazolam sin atender los efectos adversos. La Corte Suprema de Justicia confirmó en junio de 2025 la condena de 16 años de prisión y 10 años de prohibición de ejercer la profesión — la sentencia penal más alta dictada para un médico en Paraguay.',
    descripcionDetallada: 'Caso seguido por la fiscal Claudia Aguilera y la querellante Viviana Goralewski. La condena fue confirmada por los ministros Luis María Benítez Riera, Manuel Ramírez Candia y Carolina Llanes, ratificando lo resuelto por los camaristas Agustín Lovera Cañete, José Waldir Servín y Cristóbal Sánchez. Cavallo también enfrenta imputaciones adicionales por otras víctimas y por realizar cirugías en domicilio particular sin autorización del Ministerio de Salud.',
    sentencia: {
      condena: '16 años de prisión + 10 años de prohibición de ejercer la profesión',
      observaciones: 'Sentencia penal más alta dictada para un médico en Paraguay. Ratificada por Corte Suprema de Justicia el 5 de junio de 2025.',
    },
    fuentes: [
      {
        medio: 'La Nación',
        url: 'https://www.lanacion.com.py/judiciales/2025/06/05/caso-maylen-corte-ratifico-condena-de-16-anos-de-carcel-para-medico-por-homicidio-por-mala-praxis/',
        fecha: '2025-06-05',
        titular: 'Caso Maylen: Corte ratificó condena de 16 años de cárcel para médico por homicidio por mala praxis',
      },
      {
        medio: 'Hoy',
        url: 'https://www.hoy.com.py/nacionales/caso-maylen-romero-piden-20-anos-de-carcel-para-cirujano',
        fecha: '2023-06-05',
        titular: 'Caso Maylén Romero: piden 20 años de cárcel para cirujano',
      },
    ],
    tags: ['#sentencia-firme', '#cirugia-estetica', '#16-anos', '#caso-fundacional'],
    verificado: true,
    compartirUrl: 'https://www.lanacion.com.py/judiciales/2025/06/05/caso-maylen-corte-ratifico-condena-de-16-anos-de-carcel-para-medico-por-homicidio-por-mala-praxis/',
  },

  // ====== CASO 2: BRAULIO VÁZQUEZ — Muerte evitable (auditoría oficial) ======
  {
    id: 'braulio-vazquez-ips-ingavi-2026',
    titulo: 'Braulio Vázquez: auditoría confirma "muerte evitable" tras 59 horas de demora en cateterismo',
    victima: 'Braulio Antonio Vázquez Giménez',
    victimaEdad: '48 años',
    victimaGenero: 'M',
    hospital: 'Hospital Ingavi (IPS)',
    hospitalId: 'ips-hospital-ingavi',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2026-01-29',
    fechaPublicacion: '2026-03-05',
    tipoNegligencia: 'diagnostico-tardio',
    estado: 'investigacion-fiscal',
    gravedad: 5,
    resumen: 'El periodista Braulio Vázquez ingresó al Hospital Ingavi del IPS con dolor opresivo en el pecho irradiado al brazo izquierdo —síntomas clásicos de infarto— pero fue clasificado como "prioridad verde" en el triage. Esperó 1 hora 17 minutos para ser evaluado. El cateterismo cardíaco se realizó 59 horas después de lo necesario. La auditoría interna del IPS (86 fojas) y el informe de la Superintendencia de Salud confirman "muerte evitable" por negligencia sistémica y burocracia mortal.',
    descripcionDetallada: 'Equipos de diagnóstico descompuestos, falta de insumos que obligó a gastos de bolsillo del paciente, médicos de guardia que no respondieron. La familia presentó denuncia penal por homicidio culposo contra el personal de Salud.',
    fuentes: [
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/03/05/ips-auditoria-confirma-muerte-evitable-negligencia-y-burocracia-mortal/',
        fecha: '2026-03-05',
        titular: 'IPS: auditoría confirma "muerte evitable", negligencia y burocracia mortal',
      },
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/04/20/ips-informe-confidencial-reconfirma-cadena-de-errores-en-caso-braulio-vazquez/',
        fecha: '2026-04-20',
        titular: 'IPS: informe confidencial reconfirma cadena de errores en caso Braulio Vázquez',
      },
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/auditoria-del-ips-que-dice-el-informe-sobre-la-muerte-de-braulio-vazquez',
        fecha: '2026-03-05',
        titular: 'Auditoría del IPS: ¿Qué dice el informe sobre la muerte de Braulio Vázquez?',
      },
    ],
    tags: ['#muerte-evitable', '#auditoria-oficial', '#ips', '#triage-erroneo', '#periodista'],
    verificado: true,
    compartirUrl: 'https://www.abc.com.py/nacionales/2026/03/05/ips-auditoria-confirma-muerte-evitable-negligencia-y-burocracia-mortal/',
  },

  // ====== CASO 3: NANZI FRANCO — Mama equivocada ======
  {
    id: 'nanzi-franco-ips-ingavi-mama-2026',
    titulo: 'Nanzi Franco: le extirparon la mama equivocada y luego borraron las evidencias',
    victima: 'Nanzi Franco',
    victimaEdad: '62 años',
    victimaGenero: 'F',
    hospital: 'Hospital de Especialidades Quirúrgicas Ingavi (IPS)',
    hospitalId: 'ips-hospital-ingavi',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2026-03-27',
    fechaPublicacion: '2026-04-01',
    tipoNegligencia: 'cirugia-lado-equivocado',
    estado: 'investigacion-fiscal',
    gravedad: 4,
    resumen: 'Nanzi Franco ingresó con diagnóstico preoperatorio claro de carcinoma invasivo en la mama derecha, documentado y firmado en consentimiento informado. El equipo médico del Hospital Ingavi del IPS realizó la mastectomía y biopsia del ganglio centinela en la mama izquierda —la equivocada—. La Superintendencia de Salud confirmó "fallas sistémicas" en los mecanismos de validación preoperatoria, falta de implementación efectiva de la pausa quirúrgica (time-out), y borrado de evidencias de los registros clínicos post-cirugía.',
    descripcionDetallada: 'La marcación anatómica se realizó dentro del quirófano cuando el procedimiento estándar exige hacerla fuera. Héctor Enciso, Director de Control de Instituciones del ente regulador, confirmó que el error fue producto de una falla humana y no de una carencia estructural en el quirófano. La Superintendencia recomendó elevar el caso a la Fiscalía. El gerente de Salud del IPS pidió disculpas y no descartó resarcir con cirugía reconstructiva. Separaron a los médicos del equipo de Mastología.',
    fuentes: [
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/06/10/extirparon-mama-equivocada-en-ips-esto-revela-el-informe-final-de-superintendencia-de-salud/',
        fecha: '2026-06-10',
        titular: 'Extirparon mama equivocada en IPS: esto revela el informe final de Superintendencia de Salud',
      },
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/06/11/negligencia-en-ips-ingavi-borraron-evidencias-tras-cirugia-erronea-confirma-superintendencia-de-salud/',
        fecha: '2026-06-11',
        titular: 'Negligencia en IPS Ingavi: borraron evidencias tras cirugía errónea, confirma Superintendencia',
      },
    ],
    tags: ['#cirugia-lado-equivocado', '#fallas-sistemicas', '#borrado-evidencias', '#superintendencia'],
    verificado: true,
    compartirUrl: 'https://www.abc.com.py/nacionales/2026/06/10/extirparon-mama-equivocada-en-ips-esto-revela-el-informe-final-de-superintendencia-de-salud/',
  },

  // ====== CASO 4: RAMÓN GALLI — Suturado con cintillos ======
  {
    id: 'ramon-galli-cintillos-santaní-2026',
    titulo: 'Ramón Galli (80 años): suturado con cintillos de plástico en lugar de hilos quirúrgicos',
    victima: 'Ramón Galli Otazú',
    victimaEdad: '80 años',
    victimaGenero: 'M',
    hospital: 'Hospital Distrital San Estanislao (Santaní)',
    hospitalId: 'hospital-distrital-santaní',
    ciudad: 'Santaní',
    departamento: 'San Pedro',
    fechaIncidente: '2026-07-25',
    fechaPublicacion: '2026-07-27',
    tipoNegligencia: 'sutura-inadecuada',
    estado: 'investigacion-fiscal',
    gravedad: 3,
    resumen: 'Tras un accidente de tránsito con herida de importante tamaño y fractura expuesta en la pierna derecha, el equipo médico encabezado por el traumatólogo Carlos Sánchez realizó la sutura utilizando cintillos de plástico de uso común en lugar de hilos quirúrgicos especializados. El Dr. Gustavo Ortiz, Director de Redes y Servicios del MSPBS, calificó la conducta como "fuera de lo convencional". El Ministerio de Salud conformó un equipo multidisciplinario de auditoría médica.',
    fuentes: [
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/07/27/sutura-con-cintillo-ministerio-de-salud-se-pronuncia-ante-una-presunta-negligencia-medica-en-santani/',
        fecha: '2026-07-27',
        titular: 'Sutura con cintillo: Ministerio de Salud se pronuncia ante una presunta negligencia médica en Santaní',
      },
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/07/29/sutura-con-cintillos-que-sabe-hasta-ahora-salud-tras-denuncia-de-supuesta-negligencia-medica/',
        fecha: '2026-07-29',
        titular: 'Sutura con cintillos en San Estanislao: inician auditoría',
      },
      {
        medio: 'Diario Paraguayo',
        url: 'https://diarioparaguayo.com/noticia/paciente-fue-suturado-con-cintillos-en-san-pedro-negligencia-o-una-tecnica-extrema',
        fecha: '2026-07-28',
        titular: 'Paciente fue suturado con cintillos en San Pedro: ¿negligencia o una técnica extrema?',
      },
    ],
    tags: ['#sutura-cintillos', '#interior', '#san-pedro', '#auditoria-mspbs', '#adulto-mayor'],
    verificado: true,
    compartirUrl: 'https://www.abc.com.py/nacionales/2026/07/27/sutura-con-cintillo-ministerio-de-salud-se-pronuncia-ante-una-presunta-negligencia-medica-en-santani/',
  },

  // ====== CASO 5: BEBÉ SANTANÍ ======
  {
    id: 'bebe-santaní-2025',
    titulo: 'Bebé muere en hospital de Santaní tras parto no atendido a tiempo',
    victima: 'Recién nacida (no identificada)',
    victimaEdad: 'Recién nacida',
    victimaGenero: 'F',
    hospital: 'Hospital Distrital San Estanislao (Santaní)',
    hospitalId: 'hospital-distrital-santaní',
    ciudad: 'Santaní',
    departamento: 'San Pedro',
    fechaIncidente: '2025-08',
    fechaPublicacion: '2025-08',
    tipoNegligencia: 'mortalidad-neonatal',
    estado: 'investigacion-fiscal',
    gravedad: 5,
    resumen: 'Madre de 20 años perdió a su hija recién nacida luego de acudir en reiteradas ocasiones al Hospital Distrital de San Estanislao con trabajo de parto. Sus familiares sostienen que no fue atendida a tiempo. El caso se encuentra bajo investigación fiscal por presunta negligencia.',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/bebe-muere-en-hospital-de-santani-y-su-familia-denuncia-negligencia-medica',
        fecha: '2025-08',
        titular: 'Bebé muere en hospital de Santaní y su familia denuncia negligencia médica',
      },
    ],
    tags: ['#neonatal', '#interior', '#san-pedro', '#parto'],
    verificado: true,
  },

  // ====== CASO 6: BEBÉ BARRIO OBRERO ======
  {
    id: 'bebe-barrio-obrero-2025',
    titulo: 'Recién nacida fallece tras cesárea en Hospital de Barrio Obrero',
    victima: 'Recién nacida (no identificada)',
    victimaEdad: 'Recién nacida',
    victimaGenero: 'F',
    hospital: 'Hospital General de Barrio Obrero',
    hospitalId: 'hospital-barrio-obrero',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2025',
    fechaPublicacion: '2025',
    tipoNegligencia: 'mortalidad-neonatal',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'Recién nacida falleció en el Hospital General de Barrio Obrero tras cesárea. La madre pasó a Terapia Intensiva. El hospital alegó "complicaciones quirúrgicas" mientras la familia denuncia negligencia. Caso emblemático de la saturación de los hospitales públicos de Asunción.',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/presunta-negligencia-se-cobra-vida-de-una-bebe-y-hospital-de-barrio-obrero-alega-complicaciones',
        fecha: '2025',
        titular: 'Presunta negligencia se cobra vida de una bebé y Hospital de Barrio Obrero alega complicaciones',
      },
    ],
    tags: ['#neonatal', '#asunción', '#barrio-obrero', '#cesárea'],
    verificado: true,
  },

  // ====== CASO 7: NIÑA 9 AÑOS HOSPITAL DE CLÍNICAS ======
  {
    id: 'nina-9-hospital-clinicas-2025',
    titulo: 'Niña de 9 años muere en Hospital de Clínicas — familia denuncia negligencia',
    victima: 'Niña de 9 años (no identificada)',
    victimaEdad: '9 años',
    victimaGenero: 'F',
    hospital: 'Hospital de Clínicas (UNA)',
    hospitalId: 'hospital-de-clinicas',
    ciudad: 'San Lorenzo',
    departamento: 'Central',
    fechaIncidente: '2025',
    fechaPublicacion: '2025',
    tipoNegligencia: 'muerte-evitable',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'Muerte de niña de 9 años en el Hospital de Clínicas de la Universidad Nacional de Asunción (San Lorenzo). El hospital universitario de referencia del país. Caso reportado por Nanduti como emblemático del patrón de fallos en el principal centro de referencia.',
    fuentes: [
      {
        medio: 'Nanduti',
        url: 'https://nanduti.com.py/muerte-de-nina-de-9-anos-en-el-hospital-de-clinicas-familia-denuncia-supuesta-negligencia-medica',
        fecha: '2025',
        titular: 'Muerte de niña de 9 años en el Hospital de Clínicas: familia denuncia supuesta negligencia médica',
      },
    ],
    tags: ['#muerte-infantil', '#hospital-clinicas', '#universitario', '#asunción'],
    verificado: true,
  },

  // ====== CASO 8: MUJER LUQUE ECTÓPICO ======
  {
    id: 'mujer-luque-embarazo-ectopico-2026',
    titulo: 'Jazmín Navarro: cirugía de embarazo ectópico termina con perforación de colon',
    victima: 'Jazmín Navarro',
    victimaEdad: '30 años',
    victimaGenero: 'F',
    hospital: 'Hospital General de Luque',
    hospitalId: 'hospital-general-luque',
    ciudad: 'Luque',
    departamento: 'Central',
    fechaIncidente: '2026-02-28',
    fechaPublicacion: '2026-05-28',
    tipoNegligencia: 'cirugia-equivocada',
    estado: 'denunciado',
    gravedad: 4,
    resumen: 'Jazmín Navarro, de 30 años, ingresó al Hospital General de Luque por embarazo ectópico. Durante la cirugía se habría producido una perforación de colon. Permanece internada con complicaciones graves. La familia, a través de Elsi Duarte, denuncia negligencia. El centro asistencial sostiene que fue una complicación quirúrgica asociada a antecedentes médicos.',
    fuentes: [
      {
        medio: 'NPY',
        url: 'https://www.npy.com.py/noticias/nacionales/presunta-negligencia-en-luque-familia-acusa-falla-medica-y-profesionales-hablan-de-factores-de-riesgo',
        fecha: '2026-05-28',
        titular: 'Presunta negligencia en Luque: familia acusa falla médica y profesionales hablan de factores de riesgo',
      },
    ],
    tags: ['#cirugia', '#embarazo-ectopico', '#central', '#mujer'],
    verificado: true,
  },

  // ====== CASO 9: CESÁREA HOSPITAL DE CLÍNICAS ======
  {
    id: 'cesarea-hospital-clinicas-2016',
    titulo: 'Mujer queda en terapia tras cesárea con bebé extraído antes de tiempo',
    victima: 'Mujer adulta (no identificada)',
    victimaEdad: 'No identificada',
    victimaGenero: 'F',
    hospital: 'Hospital de Clínicas (UNA)',
    hospitalId: 'hospital-de-clinicas',
    ciudad: 'San Lorenzo',
    departamento: 'Central',
    fechaIncidente: '2016-05',
    fechaPublicacion: '2016-05-20',
    tipoNegligencia: 'mortalidad-neonatal',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'Esposo de paciente denuncia que su mujer quedó en terapia luego de una cesárea en el Hospital de Clínicas. El bebé de 8 meses tuvo que ser extraído antes de tiempo. El nosocomio alegó desprendimiento placentario. Caso antiguo (2016) pero muestra el patrón crónico en el mismo hospital.',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/denuncian-negligencia-el-hospital-clinicas-n992887',
        fecha: '2016-05-20',
        titular: 'Denuncian negligencia en el Hospital de Clínicas',
      },
    ],
    tags: ['#cesárea', '#neonatal', '#hospital-clinicas'],
    verificado: true,
  },

  // ====== CASO 10: NIÑA ODONTOLÓGICA IPS ======
  {
    id: 'nina-7-odontologica-ips-2025',
    titulo: 'Niña de 7 años fallece tras operación odontológica en IPS Central',
    victima: 'Niña de 7 años',
    victimaEdad: '7 años',
    victimaGenero: 'F',
    hospital: 'Hospital Central del IPS',
    hospitalId: 'ips-hospital-central',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2025-10-08',
    fechaPublicacion: '2025-11-19',
    tipoNegligencia: 'cirugia-equivocada',
    estado: 'investigacion-fiscal',
    gravedad: 5,
    resumen: 'Niña de 7 años con patologías de base (denuncia su madre Diana Salinas) ingresó para una operación odontológica de extracción de dientes en el marco de una maratón de cirugías. Falleció días después por paro cardiorrespiratorio. La fiscala adjunta Lourdes Samaniego investiga el caso.',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/caso-de-denuncia-de-negligencia-ips-se-defiende-y-alega-riesgos-de-sedacion',
        fecha: '2025-11-19',
        titular: 'Caso de denuncia de negligencia: IPS se defiende y alega riesgos de sedación',
      },
    ],
    tags: ['#odontología', '#ips', '#maratón-cirugías', '#pediatría'],
    verificado: true,
  },

  // ====== CASO 11: BEBÉ HOSPITAL MILITAR ======
  {
    id: 'bebe-hospital-militar-2025',
    titulo: 'Bebé de 2 meses muere tras cirugía programada de hernia inguinal en Hospital Militar',
    victima: 'José Fabricio (hijo de Leila Ortega)',
    victimaEdad: '2 meses',
    victimaGenero: 'M',
    hospital: 'Hospital Militar',
    hospitalId: 'hospital-militar',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2025-10-24',
    fechaPublicacion: '2025-10-24',
    tipoNegligencia: 'muerte-evitable',
    estado: 'investigacion-fiscal',
    gravedad: 5,
    resumen: 'Bebé de 2 meses (José Fabricio, hijo de Leila Ortega) ingresó para cirugía programada de hernia inguinal y falleció tras el procedimiento. El Dr. Darío Fretes, director del hospital, confirmó convocatoria a la Fiscalía. La Fiscalía Barrial N° 3 (abogada Claudia Penayo) retiró el cuerpo y el expediente clínico completo. Hospital Militar es institucionalmente sensible por su dependencia militar.',
    fuentes: [
      {
        medio: 'NPY',
        url: 'https://www.npy.com.py/noticias/nacionales/otro-presunto-caso-de-negligencia-medica-en-el-hospital-militar',
        fecha: '2025-10-24',
        titular: 'Otro presunto caso de negligencia médica en el Hospital Militar',
      },
      {
        medio: 'C9N',
        url: 'https://www.c9n.com.py/noticia/supuesta-negligencia-medica-en-el-hospital-militar/',
        fecha: '2025-10-24',
        titular: 'Supuesta negligencia médica en el Hospital Militar',
      },
    ],
    tags: ['#neonatal', '#hospital-militar', '#cirugía-programada', '#pediatría'],
    verificado: true,
  },

  // ====== CASO 12: NIÑA MANO EQUIVOCADA HOSPITAL MILITAR ======
  {
    id: 'nina-mano-equivocada-hospital-militar',
    titulo: 'Hospital Militar: niña operada de la mano equivocada',
    victima: 'Niña (no identificada)',
    victimaEdad: 'Menor',
    victimaGenero: 'F',
    hospital: 'Hospital Militar',
    hospitalId: 'hospital-militar',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2025-10',
    fechaPublicacion: '2025-10',
    tipoNegligencia: 'cirugia-lado-equivocado',
    estado: 'denunciado',
    gravedad: 3,
    resumen: 'Niña ingresó para cirugía en la mano derecha; sin embargo, la habrían operado la otra mano. El Dr. Fernando Sanabria fue separado del cargo por la justicia militar. El General de Div. Aeronáutica Nicolás Narváez confirmó la separación.',
    fuentes: [
      {
        medio: 'C9N',
        url: 'https://www.c9n.com.py/noticia/supuesta-negligencia-medica-en-el-hospital-militar/',
        fecha: '2025-10',
        titular: 'Supuesta negligencia médica en el Hospital Militar',
      },
    ],
    tags: ['#cirugia-lado-equivocado', '#hospital-militar'],
    verificado: true,
  },

  // ====== CASO 13: MUJER ACV VILLARRICA ======
  {
    id: 'mujer-acv-villarrica-2026',
    titulo: 'Mujer con ACV cae de camilla durante traslado en Hospital de Villarrica',
    victima: 'Mujer de 67 años',
    victimaEdad: '67 años',
    victimaGenero: 'F',
    hospital: 'Hospital de Villarrica',
    hospitalId: 'hospital-villarrica',
    ciudad: 'Villarrica',
    departamento: 'Guairá',
    fechaIncidente: '2026-03-26',
    fechaPublicacion: '2026-03-26',
    tipoNegligencia: 'transporte-interno',
    estado: 'denunciado',
    gravedad: 4,
    resumen: 'Mujer de 67 años con accidente cerebrovascular (ACV) cayó de camilla durante el traslado hacia Coronel Oviedo donde debía ser intervenida quirúrgicamente. La paciente no habría sido asegurada correctamente. Sufrió golpe fuerte en la cabeza y nuevas complicaciones. Denuncia de la hija.',
    fuentes: [
      {
        medio: 'Central Noticias',
        url: 'https://www.centralnoticias.com.py/2026/03/26/grave-denuncia-en-villarrica-paciente-con-acv-cayo-de-camilla-durante-traslado/',
        fecha: '2026-03-26',
        titular: 'Grave denuncia en Villarrica: Paciente con ACV cayó de camilla durante traslado',
      },
    ],
    tags: ['#transporte-interno', '#adulto-mayor', '#guaira'],
    verificado: true,
  },

  // ====== CASO 14: BEBÉ HOSPITAL SAN PABLO ======
  {
    id: 'bebe-hospital-san-pablo-2026',
    titulo: 'Bebé grave en terapia intensiva por presunta negligencia en Hospital San Pablo',
    victima: 'Bebé (no identificado)',
    victimaEdad: 'Bebé',
    victimaGenero: 'No identificado',
    hospital: 'Hospital Materno Infantil San Pablo',
    hospitalId: 'hospital-materno-infantil-san-pablo',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2026-05',
    fechaPublicacion: '2026-05-28',
    tipoNegligencia: 'mortalidad-neonatal',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'Bebé está grave en terapia intensiva del Hospital Materno Infantil San Pablo tras presunta negligencia médica. Mujer denunció que los médicos del nosocomio habrían actuado inadecuadamente. Hospital materno-infantil de referencia en Asunción.',
    fuentes: [
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/05/28/presunta-negligencia-en-el-hospital-san-pablo-bebe-esta-grave-en-terapia-intensiva/',
        fecha: '2026-05-28',
        titular: 'Presunta negligencia en el Hospital San Pablo: bebé está grave en terapia intensiva',
      },
    ],
    tags: ['#neonatal', '#materno-infantil', '#san-pablo', '#asunción'],
    verificado: true,
  },

  // ====== CASO 15: RECIÉN NACIDA IPS VILLARRICA ======
  {
    id: 'recien-nacida-ips-villarrica-2025',
    titulo: 'Recién nacida muere en IPS Villarrica — Fiscalía investiga',
    victima: 'Recién nacida (no identificada)',
    victimaEdad: 'Recién nacida',
    victimaGenero: 'F',
    hospital: 'IPS Villarrica',
    hospitalId: 'ips-villarrica',
    ciudad: 'Villarrica',
    departamento: 'Guairá',
    fechaIncidente: '2025-02',
    fechaPublicacion: '2025-02-05',
    tipoNegligencia: 'mortalidad-neonatal',
    estado: 'investigacion-fiscal',
    gravedad: 5,
    resumen: 'Recién nacida muere en IPS Villarrica. Fiscalía investiga el caso. Aguardan informe final de la autopsia. Familia denuncia muerte por grave negligencia.',
    fuentes: [
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2025/02/05/investigan-muerte-de-una-beba-tras-denuncia-de-negligencia-medica-en-el-ips-de-villarrica/',
        fecha: '2025-02-05',
        titular: 'Investigan muerte de una beba tras denuncia de negligencia médica en el IPS de Villarrica',
      },
      {
        medio: 'OviedoPress',
        url: 'https://oviedopress.com/familia-denuncia-muerte-de-un-bebe-por-grave-negligencia-en-hospital-de-villarrica/',
        fecha: '2025-02',
        titular: 'Familia denuncia muerte de un bebé por grave negligencia en hospital de Villarrica',
      },
    ],
    tags: ['#neonatal', '#ips', '#guaira', '#villarrica'],
    verificado: true,
  },

  // ====== CASO 16: EX DIPUTADO FERNANDO NICORA ======
  {
    id: 'fernando-nicora-absuelto-2020',
    titulo: 'Ex diputado Fernando Nicora: médico absuelto por segunda vez por muerte durante pandemia',
    victima: 'Fernando Nicora (ex diputado nacional)',
    victimaEdad: 'Adulto',
    victimaGenero: 'M',
    hospital: 'Hospital (durante pandemia)',
    hospitalId: 'no-especificado',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2020-08',
    fechaPublicacion: '2025-10-03',
    tipoNegligencia: 'diagnostico-tardio',
    estado: 'absuelto',
    gravedad: 5,
    resumen: 'Ex diputado nacional Fernando Nicora murió de Covid-19 en agosto de 2020. El médico Aurelio Espínola fue acusado de no realizar hisopado, radiografía ni test de sangre. El fiscal Giovani Grisetti pidió 3 años y medio de prisión. Sin embargo, el Tribunal de Sentencia (jueces Manuel Aguirre, Rossana Maldonado, Juan Francisco Ortiz) absolvió al médico por "duda razonable" por segunda vez en octubre de 2025. Caso emblemático de la dificultad probatoria en Paraguay.',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/por-segunda-vez-absuelven-al-medico-por-muerte-de-ex-diputado-nicora',
        fecha: '2025-10-03',
        titular: 'Por segunda vez, absuelven al médico por muerte de ex diputado Nicora',
      },
    ],
    tags: ['#absuelto', '#covid', '#figura-publica', '#duda-razonable'],
    verificado: true,
  },

  // ====== CASO 17: NIÑA 11 AÑOS SANTA ROSA ======
  {
    id: 'nina-11-anos-san-pedro-2026',
    titulo: 'Niña de 11 años muere tras 5 consultas rechazadas en Hospital de Santa Rosa del Aguaray',
    victima: 'Niña de 11 años (no identificada)',
    victimaEdad: '11 años',
    victimaGenero: 'F',
    hospital: 'Hospital General de Santa Rosa del Aguaray → Hospital Nacional de Itauguá',
    hospitalId: 'hospital-general-santa-rosa-aguaray',
    ciudad: 'Santa Rosa del Aguaray',
    departamento: 'San Pedro',
    fechaIncidente: '2026-01',
    fechaPublicacion: '2026-06-22',
    tipoNegligencia: 'rechazo-urgencias',
    estado: 'investigacion-fiscal',
    gravedad: 5,
    resumen: 'Padre (Atilano Arévalos) denuncia que su hija de 11 años acudió 5 veces consecutivas al Hospital General de Santa Rosa del Aguaray y los profesionales consideraron en cada ocasión que se trataba de sinusitis, sin diagnóstico ni tratamiento adecuado. En la quinta consulta llegó en estado crítico y fue derivada al Hospital Nacional de Itauguá, pero llegó sin signos de vida. Salud Pública abrió investigación administrativa. Patrón clásico de "vuelva mañana".',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/padre-de-nina-que-acudio-5-veces-a-hospital-y-fallecio-recurre-a-la-fiscalia',
        fecha: '2026-06-22',
        titular: 'Padre de niña que acudió 5 veces a hospital y falleció recurre a la Fiscalía',
      },
    ],
    tags: ['#rechazo-urgencias', '#vuelva-manana', '#interior', '#san-pedro', '#pediatría'],
    verificado: true,
  },

  // ====== CASO 18: MÁXIMO GAEL IPS ======
  {
    id: 'maximo-gael-ips-2025',
    titulo: 'Máximo Gael: bebé fallece 28 horas después de nacer — le dejaron una gasa dentro a la madre',
    victima: 'Máximo Gael (bebé)',
    victimaEdad: 'Recién nacido',
    victimaGenero: 'M',
    hospital: 'Hospital Central del IPS',
    hospitalId: 'ips-hospital-central',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2025',
    fechaPublicacion: '2025',
    tipoNegligencia: 'mortalidad-neonatal',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'Bebé Máximo Gael falleció 28 horas después de nacer por aparente mala praxis en el Hospital Central del IPS. La madre debió ser intervenida nuevamente en un hospital público porque durante la cirugía del parto le dejaron una gasa pudriéndose adentro. Caso parte del patrón sistemático de negligencia en el IPS durante la gestión de Jorge Brítez.',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/graves-denuncias-de-negligencia-medica-siguen-sacudiendo-al-ips-en-era-britez',
        fecha: '2025-04-01',
        titular: 'Graves denuncias de negligencia médica siguen sacudiendo al IPS en era Brítez',
      },
    ],
    tags: ['#neonatal', '#ips', '#gasa-dentro', '#mala-praxis'],
    verificado: true,
  },

  // ====== CASO 19: MAGDALENA BARBOZA IPS ======
  {
    id: 'magdalena-barboza-ips-2026',
    titulo: 'Magdalena Barboza (33): muere por falta de insumos en IPS',
    victima: 'Magdalena Barboza',
    victimaEdad: '33 años',
    victimaGenero: 'F',
    hospital: 'IPS',
    hospitalId: 'ips-hospital-central',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2026',
    fechaPublicacion: '2026',
    tipoNegligencia: 'falta-insumos',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'Magdalena Barboza, de 33 años, murió por problemas cardíacos agravados por falta de insumos médicos en el IPS. La familia acusó negligencia. Caso parte del patrón reportado en el IPS durante 2025-2026.',
    fuentes: [
      {
        medio: 'Última Hora',
        url: 'https://www.ultimahora.com/graves-denuncias-de-negligencia-medica-siguen-sacudiendo-al-ips-en-era-britez',
        fecha: '2025-04-01',
        titular: 'Graves denuncias de negligencia médica siguen sacudiendo al IPS en era Brítez',
      },
    ],
    tags: ['#falta-insumos', '#ips', '#cardiología'],
    verificado: true,
  },

  // ====== CASO 20: HONOR Y VIDA FUNDACIÓN ======
  {
    id: 'asociacion-honor-y-vida-fundacion-2025',
    titulo: 'Asociación Honor y Vida: 50+ familias exigen ley y registro nacional',
    victima: 'María Zunilda Careaga (caso emblemático de la asociación)',
    victimaEdad: 'Adulta',
    victimaGenero: 'F',
    hospital: 'Hospital (caso de María Zunilda)',
    hospitalId: 'varios',
    ciudad: 'Varios',
    departamento: 'Varios',
    fechaIncidente: '2025-10-27',
    fechaPublicacion: '2025-10-27',
    tipoNegligencia: 'otro',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'La Asociación Honor y Vida, integrada por más de 50 familias víctimas de negligencia médica, lanzó públicamente sus exigencias el 27 de octubre de 2025. Caso emblemático: María Zunilda Careaga, hermana de la presidenta Lucila Careaga, quien "murió por descuido, por falta de preparación de los médicos que la atendieron. Fue prácticamente una omisión de auxilio. Internada y todo, no le hicieron caso; la dejaron morir". Demandas: ley de derechos del paciente, registro nacional de incidentes, controles efectivos.',
    fuentes: [
      {
        medio: 'El Nacional',
        url: 'https://elnacional.com.py/nacionales/la-negligencia-medica-existe-tiene-rostro-deja-huellas-victimas-paraguayas-exigen-justicia-reformas-urgentes-n94950',
        fecha: '2025-10-27',
        titular: '"La negligencia médica existe, tiene rostro y deja huellas": víctimas paraguayas exigen justicia y reformas urgentes',
      },
      {
        medio: 'Trece',
        url: 'https://trece.com.py/actualidad/familias-paraguayas-rompen-el-silencio-por-la-muerte-por-negligencia/',
        fecha: '2025-10-27',
        titular: 'Familias paraguayas rompen el silencio',
      },
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2025/10/27/negligencia-medica-familias-exigen-justicia-y-registro-nacional-de-errores-medicos/',
        fecha: '2025-10-27',
        titular: 'Negligencia médica: familias exigen justicia y registro nacional de errores médicos',
      },
    ],
    tags: ['#asociacion', '#50-familias', '#ley-derechos-paciente', '#registro-nacional', '#caso-fundacional'],
    verificado: true,
    compartirUrl: 'https://elnacional.com.py/nacionales/la-negligencia-medica-existe-tiene-rostro-deja-huellas-victimas-paraguayas-exigen-justicia-reformas-urgentes-n94950',
  },

  // ====== CASO 21: NAYELI LUJÁN ======
  {
    id: 'nayeli-lujan-hospital-clinicas-2026',
    titulo: 'Nayeli Luján: bebé sana al nacer muere en Hospital de Clínicas tras leche de fórmula',
    victima: 'Nayeli Luján',
    victimaEdad: 'Recién nacida',
    victimaGenero: 'F',
    hospital: 'Hospital Materno Infantil del Hospital de Clínicas',
    hospitalId: 'hospital-de-clinicas',
    ciudad: 'San Lorenzo',
    departamento: 'Central',
    fechaIncidente: '2026-07-31',
    fechaPublicacion: '2026-07-31',
    tipoNegligencia: 'mortalidad-neonatal',
    estado: 'denunciado',
    gravedad: 5,
    resumen: 'Bebé Nayeli Luján nació el lunes sin complicaciones, pero horas después presentó cuadro de vómitos y convulsiones luego de que una enfermera la llevara para alimentarla con leche de fórmula. Fue operada de urgencia y falleció el miércoles. Familiares pidieron autopsia.',
    fuentes: [
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2026/07/31/hospital-de-clinicas-denuncian-la-muerte-de-una-bebe-en-extranas-circunstancias/',
        fecha: '2026-07-31',
        titular: 'Hospital de Clínicas: denuncian la muerte de una bebé en extrañas circunstancias',
      },
      {
        medio: 'RDN',
        url: 'https://www.rdn.com.py/2026/07/31/denuncian-muerte-de-una-bebe-en-hospital-de-clinicas-y-piden-autopsia-para-esclarecer-el-caso/',
        fecha: '2026-07-31',
        titular: 'Denuncian muerte de una bebé en Hospital de Clínicas y piden autopsia',
      },
    ],
    tags: ['#neonatal', '#hospital-clinicas', '#formula', '#pediatría'],
    verificado: true,
  },

  // ====== CASO 22: HOSPITAL TRAUMA ESCÁNDALO VIRAL ======
  {
    id: 'hospital-trauma-viral-2025',
    titulo: 'Hospital de Trauma: escándalo viral — Salud Pública confirma denuncia penal',
    victima: 'Paciente (no identificado en el escandalo)',
    victimaEdad: 'No identificado',
    victimaGenero: 'Otro',
    hospital: 'Hospital de Trauma Prof. Dr. Manuel Giani',
    hospitalId: 'hospital-de-trauma',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2025-12',
    fechaPublicacion: '2025-12-15',
    tipoNegligencia: 'diagnostico-tardio',
    estado: 'investigacion-fiscal' as const,
    gravedad: 4 as const,
    resumen: 'Caso que se hizo viral en redes sociales en diciembre de 2025. Salud Pública confirmó denuncia penal a la Fiscalía. El Hospital de Trauma es hospital público especializado en trauma.',
    fuentes: [
      {
        medio: 'ABC Color',
        url: 'https://www.abc.com.py/nacionales/2025/12/15/escandalo-viral-en-hospital-de-trauma-salud-publica-confirma-denuncia-penal-a-la-fiscalia/',
        fecha: '2025-12-15',
        titular: 'Escándalo viral en Hospital de Trauma: Salud Pública confirma denuncia penal a la Fiscalía',
      },
    ],
    tags: ['#viral', '#hospital-trauma', '#denuncia-penal'],
    verificado: true,
  },

  // ====== CASO 23: ENFERMERA IPS INGAVI BEBÉ ======
  {
    id: 'enfermera-ips-ingavi',
    titulo: 'IPS Ingavi: familia de paciente denuncia negligencia tras cirugía',
    victima: 'Familiar paciente IPS Ingavi',
    victimaEdad: 'Adulto',
    victimaGenero: 'F' as const,
    hospital: 'IPS Ingavi',
    hospitalId: 'ips-hospital-ingavi',
    ciudad: 'Asunción',
    departamento: 'Central',
    fechaIncidente: '2025',
    fechaPublicacion: '2025',
    tipoNegligencia: 'cirugia-equivocada' as const,
    estado: 'denunciado' as const,
    gravedad: 3 as const,
    resumen: 'Familiares de paciente en IPS Ingavi denuncian negligencia médica tras cirugía. Hospital de referencia del IPS en Asunción.',
    fuentes: [
      {
        medio: 'Facebook C9N',
        url: 'https://www.facebook.com/c9nparaguay/videos/familiares-de-paciente-denuncian-negligencia-m%C3%A9dica-en-el-ips-ingavi-una-mujer-d/778807181129581/',
        fecha: '2025',
        titular: 'Familiares de paciente denuncian negligencia médica en el IPS Ingavi',
      },
    ],
    tags: ['#ips', '#ingavi'],
    verificado: true,
  },

  // ====== CASO 24: HOSPITAL DE TRAUMA DENUNCIAS 2025 ======
  {
    id: 'basta-de-negligencia-asociacion-2021',
    titulo: 'Basta de Negligencia Médica Paraguay: 4 años de activismo desde octubre 2021',
    victima: 'Varios',
    victimaEdad: 'Varios',
    victimaGenero: 'Otro' as const,
    hospital: 'Varios',
    hospitalId: 'varios',
    ciudad: 'Varios',
    departamento: 'Varios',
    fechaIncidente: '2021-10',
    fechaPublicacion: '2021-10',
    tipoNegligencia: 'otro' as const,
    estado: 'denunciado' as const,
    gravedad: 5 as const,
    resumen: 'Organización Basta de Negligencia Médica Paraguay, activa desde octubre 2021 (4 años antes que Honor y Vida). Cuenta con presencia multi-canal: FB principal, página alternativa, Linktree, Instagram (@bastadenegligenciapy), Twitter (@bastadeNeglige), TikTok, YouTube. Referentes públicos: Zaid, Regina, Alexander.',
    fuentes: [
      {
        medio: 'Facebook',
        url: 'https://www.facebook.com/100089574023840/',
        fecha: '2021-10',
        titular: 'Basta de Negligencia Médica Paraguay (página)',
      },
      {
        medio: 'Linktree',
        url: 'https://linktr.ee/Bastadenegligencia',
        fecha: '2021-10',
        titular: 'Basta de Negligencia — Linktree (múltiples canales)',
      },
    ],
    tags: ['#asociacion', '#multi-canal', '#4-años', '#basta-de-negligencia'],
    verificado: true,
  },

  // ====== CASO 25: DEFENSORIA CANALIZACIÓN 2026 ======
  {
    id: 'defensoria-pueblo-canalizacion-2026',
    titulo: 'Defensoría del Pueblo abre canalización de reclamos de pacientes oncológicos y con enfermedades raras',
    victima: 'Pacientes oncológicos y con enfermedades raras',
    victimaEdad: 'Varios',
    victimaGenero: 'Otro' as const,
    hospital: 'Varios',
    hospitalId: 'varios',
    ciudad: 'Varios',
    departamento: 'Varios',
    fechaIncidente: '2026-07',
    fechaPublicacion: '2026-07-15',
    tipoNegligencia: 'otro' as const,
    estado: 'denunciado' as const,
    gravedad: 4 as const,
    resumen: 'El 15 de julio de 2026, la Defensoría del Pueblo anunció que canalizará reclamos de pacientes con enfermedades raras y oncológicas ante Salud Pública. Oportunidad directa para partnership con AIW: la Defensoría está activamente buscando herramientas para canalizar. El 2 de julio también realizó acompañamientos a pacientes en Hospital de Clínicas y Hospital Central del IPS para garantizar acceso a servicios.',
    fuentes: [
      {
        medio: 'Defensoría del Pueblo',
        url: 'https://defensoriadelpueblo.gov.py/15-07-2026-noticias-defensor-del-pueblo-canalizara-reclamos-de-pacientes-con-enfermedades-raras-y-oncologicas-ante-salud-publica.html',
        fecha: '2026-07-15',
        titular: 'Defensor del Pueblo canalizará reclamos de pacientes con enfermedades raras y oncológicas ante Salud Pública',
      },
      {
        medio: 'Defensoría del Pueblo',
        url: 'https://defensoriadelpueblo.gov.py/02-07-2026-noticias-defensoria-del-pueblo-brinda-acompanamiento-para-garantizar-el-acceso-a-servicios-de-salud-especializados.html',
        fecha: '2026-07-02',
        titular: 'Defensoría del Pueblo brinda acompañamiento para garantizar el acceso a servicios de salud especializados',
      },
    ],
    tags: ['#defensoria', '#canalizacion', '#oncologicos', '#enfermedades-raras', '#partnership'],
    verificado: true,
  },
];

// Helpers
export function getCasosByTipo(tipo: TipoNegligencia): Caso[] {
  return casos.filter(c => c.tipoNegligencia === tipo);
}

export function getCasosByHospital(hospitalId: string): Caso[] {
  return casos.filter(c => c.hospitalId === hospitalId);
}

export function getCasosByDepartamento(departamento: string): Caso[] {
  return casos.filter(c => c.departamento === departamento);
}

export function getCasosByEstado(estado: EstadoCaso): Caso[] {
  return casos.filter(c => c.estado === estado);
}

export function getCasoBySlug(slug: string): Caso | undefined {
  return casos.find(c => c.id === slug);
}

export function getCasosStats() {
  return {
    total: casos.length,
    muertes: casos.filter(c => c.gravedad === 5).length,
    sentencias: casos.filter(c => c.estado === 'sentencia').length,
    neonatales: casos.filter(c => c.tipoNegligencia === 'mortalidad-neonatal').length,
    ips: casos.filter(c => c.hospitalId.startsWith('ips')).length,
    interior: casos.filter(c => !['Asunción', 'San Lorenzo'].includes(c.ciudad)).length,
  };
}
