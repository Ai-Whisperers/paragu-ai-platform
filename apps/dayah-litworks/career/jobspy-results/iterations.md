# JobSpy Iterations Log — Daihana Araujo

> Tracking de runs, estrategias, yields y lecciones aprendidas.
> Mercado objetivo: hispanohablante (España · Colombia · México · Argentina) — SIN inglés.

last_updated: 2026-04-28

---

## Profile Summary (the search target)

| Field | Value |
|-------|-------|
| Target roles | Diseñadora Editorial · Coordinadora Editorial · Content Manager Editorial · Marketing Editorial · Creative Strategist |
| Idioma de búsqueda | Solo español — inglés no disponible |
| Geografía | España (primario) · Colombia · México · Argentina (secundarios) |
| Anchor differentiators | Amazon Prime Reading (invitation-only) · 400+ portadas · bestsellers verificables · autora publicada por editorial tradicional |
| Salary anchor (declarado) | ₲8-10M PYG (~$1.070-1.340 USD) — por debajo del mercado español remoto |
| Status | Empleada actualmente — tiempo para posicionarse |

---

## Shared Filter Vocabulary

### Garbage companies
```python
GARBAGE_COMPANIES = [
    "Huzzle", "Traze", "Talent Harbor", "Talent Scout", "OnHires",
    "Brilliantin", "Tangent", "CyberCoders", "AspenView", "Somewhere",
    "Orange Storm", "Staffing", "staffing", "Outsourcing", "outsourcing",
    "Randstad", "ManpowerGroup", "Adecco", "Temporing", "Gi Group",
    "Michael Page", "PageGroup", "Robert Half", "Spring Professional",
    "Talent Search People", "Selecta",
]
```
**Rationale:** Staffing agencies y re-posters que polutan los job boards. Heredado de Diana/Silvia + extendido con agencias españolas frecuentes.

### Wrong roles (editorial/creative profile)
```python
WRONG_ROLES = [
    "Sales", "Ventas", "Account Manager", "Customer Success", "SDR",
    "Business Development", "Account Executive", "Comercial",
    "HR Manager", "Recursos Humanos", "Talent", "Recruiter",
    "Selección", "Reclutamiento",
    "Frontend", "Backend", "Mobile", "iOS", "Android", "DevOps",
    "Network Engineer", "Security", "QA Engineer", "Tester",
    "Desarrollador", "Programador", "Software Engineer", "Data Engineer",
    "Accountant", "Contador", "Contable", "Bookkeeper", "Finanzas",
    "Real Estate", "Inmobiliaria", "Abogado", "Legal",
    "Médico", "Enfermero", "Fisioterapeuta",
]
```
**Rationale:** Excluye roles claramente fuera del perfil. No excluye: "Editor", "Designer", "Creative", "Coordinator" — términos válidos para su perfil.

---

## Iteration Log

### Run 1 — España + Colombia: diseño editorial core (Indeed)
- **ID:** `run1`
- **Fecha:** 2026-04-28 11:30
- **Estrategia:** Indeed España (primario) + Indeed Colombia (por relación con Editorial Blanco y Negro). Términos específicos de diseño editorial y maquetación.
- **Búsquedas:** 11 variaciones
- **Yield:** 42 raw → 33 dedup → **33 filtrados**
- **Descripción:** 33/33 (100%) ✅
- **Salario:** 0/33 (0%) ❌ — Indeed España suprime rangos
- **Quality:** 4.0
- **Observaciones:**
  - "Marketing editorial" (España) dominó el volumen con 25 resultados — el término más productivo
  - "Diseñadora editorial" solo produjo 4 resultados — el mercado no usa ese título frecuentemente
  - Colombia muy bajo volumen (3 resultados totales) — mercado pequeño en plataformas globales
  - 100% de descripciones disponibles — Indeed España es gold standard para descripciones

### Run 2 — México + Argentina + España: roles creativos amplios (Indeed)
- **ID:** `run2`
- **Fecha:** 2026-04-28 11:31
- **Estrategia:** Ampliar más allá de "editorial" puro — capturar CM, coordinación, dirección creativa. México como mercado secundario con mayor volumen.
- **Búsquedas:** 12 variaciones
- **Yield:** 93 raw → 84 dedup → **81 filtrados**
- **Descripción:** 81/81 (100%) ✅
- **Salario:** 0/81 (0%) ❌
- **Quality:** 3.5
- **Observaciones:**
  - México generó el mayor volumen (68 resultados) — mercado más activo en LATAM para roles creativos
  - Argentina muy bajo (2 resultados) — mercado editorial latinoamericano se mueve más en LinkedIn que Indeed
  - "Coordinadora de contenidos creativo" (México) maxeó en 25 — el término más productivo del run
  - "Brand manager editorial cultural" (España) = 0 resultados — título demasiado específico/largo para Indeed

### Run 3 — LinkedIn España + Colombia + México: volumen de títulos
- **ID:** `run3`
- **Fecha:** 2026-04-28 11:32
- **Estrategia:** LinkedIn para volumen de compañías que contratan. Sin descripciones (limitación de JobSpy con LinkedIn).
- **Búsquedas:** 10 variaciones
- **Yield:** 71 raw → 69 dedup → **64 filtrados**
- **Descripción:** 0/64 (0%) ❌ — LinkedIn no devuelve descripciones en JobSpy
- **Salario:** 0/64 (0%) ❌
- **Quality:** 2.5 — útil solo para ver qué empresas contratan, no para análisis de skills
- **Observaciones:**
  - "Responsable contenidos culturales" España = 25 resultados — buen término en LinkedIn
  - Mucho ruido de inglés aun con términos en español: "Freelance English Writer", "Bilingual AI Content Writer"
  - "Diseño editorial" (España) = 0 resultados — LinkedIn no indexa este término así
  - Colombia y México en LinkedIn casi sin resultado — estos mercados prefieren Indeed
  - **Lección:** LinkedIn en español es útil para ver empresas pero inútil para análisis de descripciones. Siempre combinar con Indeed para el análisis de skills.

### Run 4 — Plataformas de autopublicación + agencias culturales + stretch (Indeed)
- **ID:** `run4`
- **Fecha:** 2026-04-28 11:32
- **Estrategia:** Capturar roles en plataformas literarias y agencias culturales que no usan el término "editorial" en el título.
- **Búsquedas:** 12 variaciones
- **Yield:** 15 raw → 15 dedup → **15 filtrados**
- **Descripción:** 15/15 (100%) ✅
- **Salario:** 0/15 (0%) ❌
- **Quality:** 2.0 — bajo volumen, muchos terms sin resultado
- **Observaciones:**
  - La mayoría de los términos específicos de autopublicación devolvieron 0 en Indeed — este mercado no usa Indeed para contratar; usa comunidades, referidos y portales especializados
  - "Diseñadora editorial plataforma" (México) = 12 resultados — única búsqueda productiva
  - El nicho de "autopublicación" como categoría de empleo formal no existe en Indeed — las plataformas (Dreame, Booknek) contratan de forma directa o por sus propias redes
  - **Lección:** Para roles en plataformas de autopublicación (Dreame, Booknek, Buenovela), el canal correcto es outreach directo a las empresas, no job boards.

---

## Yield Summary Table

| Run | Raw | Dedup | Filtrado | Descripciones | Salario | Quality |
|-----|----:|------:|---------:|:-------------:|:-------:|:-------:|
| run1 | 42 | 33 | **33** | 33 (100%) | 0 | 4.0 |
| run2 | 93 | 84 | **81** | 81 (100%) | 0 | 3.5 |
| run3 | 71 | 69 | **64** | 0 (0%) | 0 | 2.5 |
| run4 | 15 | 15 | **15** | 15 (100%) | 0 | 2.0 |
| **TOTAL** | **221** | **201** | **193** | **129 (67%)** | **0** | — |
| Después de dedup global | — | — | **188** | **124 (66%)** | **0** | — |

---

## Cross-Run Findings

1. **La arquitectura de supresión de salarios en Indeed LATAM/España es total.** 0/188 postings con salary data. Para anclar salario se necesita fuente externa (Glassdoor ES, LinkedIn Salary, Infojobs ES tienen algunos datos).

2. **España Indeed > LinkedIn para análisis de descripción.** LinkedIn da volumen pero sin descripciones = inútil para skill gap analysis. Indeed España da 100% de descripciones. Para la búsqueda real de empleo, LinkedIn es mejor por el alcance — pero para análisis, Indeed España es la fuente.

3. **México es el mercado latinoamericano con mayor volumen en job boards.** Colombia y Argentina son muy delgados en Indeed. Para LATAM, México es donde está la señal de mercado.

4. **El nicho de "autopublicación + editorial hispanohablante" no tiene representación en job boards.** Las empresas del sector (Booknek, Dreame, Buenovela) contratan por outreach directo, referidos o sus propias comunidades. JobSpy no puede capturar eso. → Canal de outreach directo es el correcto para estas empresas.

5. **TikTok es el gap más urgente.** 49 menciones — el doble de Canva (34) y el triple de CapCut (8). El mercado de content/social media giró hacia TikTok como skill core. Dayah usa CapCut (que ES la herramienta de TikTok) pero no tiene presencia ni práctica en la plataforma.

6. **El inglés bloquea el 35% del mercado (44/124 descripciones).** El 65% restante (80 roles) es mercado accesible. Los roles sin inglés son estructuralmente más relevantes para su perfil editorial hispanohablante.

7. **Grupo Planeta apareció múltiples veces** con roles sin requisito de inglés — es la empresa española más relevante del dataset para el perfil de Dayah.

---

## Lecciones para Runs Futuros

- **Run 5 (recomendado):** Indeed Chile — mercado editorial latinoamericano activo que no fue incluido
- **Run 6:** LinkedIn España con `linkedin_fetch_description=True` cuando la librería lo soporte — para obtener descripciones de los 64 roles sin descripción
- **Run 7:** Buscar "editor de contenidos" + "editor digital" específicamente — "editor" apareció 3x como título repetido y merece búsqueda dedicada
- **Ajustar:** Agregar filtro post-hoc para LinkedIn inglés: excluir títulos con "English", "Bilingual", "Dutch", "French" speaker que contaminaron run3
- **Salary:** Para datos de salario, complementar con scrape de Infojobs ES (tiene rangos frecuentemente) — JobSpy no soporta Infojobs pero la data está disponible manualmente
