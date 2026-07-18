# Facebook Posts Index — Round 2 (Aug 10 → Sep 10, 2026)

**Generated:** 2026-07-17
**Total posts:** 24
**Schedule target:** Push to FB Page Composio scheduler (auto-publishes at 10:00 UTC = 06:00 PYT)
**Theme:** "Conocé a Ometz" (Aug) → "Servicios sin miedo" (Sep)

---

## August 2026 — "Conocé a Ometz" · Faces · Place · Process

| # | Date | Type | Topic | File |
|---|---|---|---|---|
| 25 | 2026-08-10 lun | text | ¿Quién está detrás de Ometz? · Conocé a Gaby | [p25.md](./2026-08-10_p25_text.md) |
| 26 | 2026-08-11 mar | photo | El consultorio: lo que ves y lo que no | [p26.md](./2026-08-11_p26_photo.md) |
| 27 | 2026-08-12 mié | text | Lo que cambió en 20 años de práctica | [p27.md](./2026-08-12_p27_text.md) |
| 28 | 2026-08-13 jue | photo | Cómo se planifica un caso complejo (5 pasos) | [p28.md](./2026-08-13_p28_photo.md) |
| 29 | 2026-08-14 vie | text | Anatomía de una consulta sin miedo | [p29.md](./2026-08-14_p29_text.md) |
| 30 | 2026-08-17 lun | text | 3 preguntas para hacerle a tu dentista | [p30.md](./2026-08-17_p30_text.md) |
| 31 | 2026-08-18 mar | photo | Conocé el equipo · Quién atiende en Ometz | [p31.md](./2026-08-18_p31_photo.md) |
| 32 | 2026-08-19 mié | text | Cómo se ve una segunda opinión EN SERIO | [p32.md](./2026-08-19_p32_text.md) |
| 33 | 2026-08-20 jue | photo | Precios transparentes · Lo que cuesta lo que ofrecemos | [p33.md](./2026-08-20_p33_photo.md) |
| 34 | 2026-08-21 vie | text | Por qué 'אומץ' (Ometz) · El nombre | [p34.md](./2026-08-21_p34_text.md) |
| 35 | 2026-08-24 lun | text | Qué hago cuando NO necesitás tratamiento | [p35.md](./2026-08-24_p35_text.md) |
| 36 | 2026-08-25 mar | photo | Materiales · Lo que usamos (y por qué) | [p36.md](./2026-08-25_p36_photo.md) |
| 37 | 2026-08-26 mié | text | La pregunta que nadie hace · Y deberías hacer | [p37.md](./2026-08-26_p37_text.md) |
| 38 | 2026-08-27 jue | photo | Planificación vs improvisación · Caso real | [p38.md](./2026-08-27_p38_photo.md) |
| 39 | 2026-08-28 vie | text | Anestesia · Por qué no todas son iguales | [p39.md](./2026-08-28_p39_text.md) |
| 40 | 2026-08-31 lun | text | Qué traer a tu primera consulta · Checklist | [p40.md](./2026-08-31_p40_text.md) |
| 41 | 2026-09-01 mar | photo | Tu primera visita · Paso a paso (45-60 min) | [p41.md](./2026-09-01_p41_photo.md) |
| 42 | 2026-09-02 mié | text | Garantía real · Lo que te entrego por escrito | [p42.md](./2026-09-02_p42_text.md) |
| 43 | 2026-09-03 jue | photo | Anxious patient path · Para los que vienen con miedo | [p43.md](./2026-09-03_p43_photo.md) |
| 44 | 2026-09-04 vie | text | Sobre los seguros · Qué hago y qué no | [p44.md](./2026-09-04_p44_text.md) |

---

## September 2026 — "Servicios sin miedo" · Anti-anxiety

| # | Date | Type | Topic | File |
|---|---|---|---|---|
| 45 | 2026-09-07 lun | text | Tengo miedo de ir al dentista · Empezamos por WhatsApp | [p45.md](./2026-09-07_p45_text.md) |
| 46 | 2026-09-08 mar | photo | Testimonio verificado · 2 semanas después | [p46.md](./2026-09-08_p46_photo.md) |
| 47 | 2026-09-09 mié | text | Mitos sobre la endodoncia · Lo que la gente cree vs lo que es | [p47.md](./2026-09-09_p47_text.md) |
| 48 | 2026-09-10 jue | photo | Cuándo SÍ pedir una segunda opinión · 5 señales | [p48.md](./2026-09-10_p48_photo.md) |

---

## How to schedule

Once Composio is reconnected (currently burned key from 2026-07-14 leak), bulk-schedule via:

1. Read `PLAN.json` (date + type + caption) 
2. For each `photo` post: ensure `https://ometzdental.com/og/<image>` resolves (currently 9 of 10 needed)
3. Push via Composio `FACEBOOK_CREATE_POST` with `scheduled_publish_time` = `Date + 10:00 UTC`
4. Cross-post to IG (once IG is reconnected as `@dragabriellagp`, NOT personal)

## Visual assets needed

Photo posts reference these images. Status as of 2026-07-17:

| Image | Used by | Exists on live? |
|---|---|---|
| `og-home.png` | p26 | ✅ confirmed |
| `og-process.png` | p28, p41 | ✅ confirmed |
| `og-pricing.png` | p33 | ✅ confirmed |
| `og-team.png` | p31 | ⚠️ needs creation |
| `og-materials.png` | p36 | ⚠️ needs creation |
| `og-anxiety.png` | p43 | ⚠️ needs creation |
| `og-testimonial.png` | p46 | ⚠️ needs creation |
| `og-second-opinion.png` | p48 | ✅ confirmed |

**Action item:** generate 4 missing OG images via FAL (image_generate). Use existing brand tokens (teal + linen + gold).

## Change log

- 2026-07-17: Round 2 drafted (24 posts, Aug 10 → Sep 10, business days only) by Erebus
