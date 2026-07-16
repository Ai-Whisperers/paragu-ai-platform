# 🔥 PIERCE CHARM WEB — ROAST + IMPL PLAN · 2026-07-07

**Sitio auditado:** `https://piercecharm.paragu-ai.com/`  
**Score antes del fix:** 62/100  
**Objetivo después del P0:** 78/100  
**Objetivo después del P1:** 88/100

## Diagnóstico por tier

### TIER S (crítico — 10/10)
1. **WhatsApp Float invisible** — `style="opacity:0;pointer-events:none"` en `components/WhatsAppFloat.tsx`. La gente mobile hace click ahí.
2. **No hay booking real** — solo `wa.me/595981324569`. 30-50% de leads perdidos.
3. **Meta description DUPLICADA en 8 páginas** — duplicate-content penalty Google.
4. **No canonical URL** — sí o sí antes de SEO.

### TIER A (8/10)
5. **No JSON-LD LocalBusiness/HealthAndBeautyBusiness** — Google no entiende que es un negocio local.
6. **`/piercings` con `BAILOUT_TO_CLIENT_SIDE_RENDERING`** — Google ve "Cargando catálogo".
7. **No h1 en home / ni en /piercings** — SEO penalty.
8. **Hero cluttered** — banner ticker + cadenas + murciélagos + spider + ear anatomy + 3 badges + script hint. Compiten.

### TIER B (5-7/10)
9. **`/galeria` "Foto pendiente"** — text de admisión.
10. **`/eventos` placeholder** — no hay 1 evento tentativo.
11. **Precios mezclados** — perforaciones + joyería en misma card visual.
12. **FAQ sin video / ni Qs críticas** — el cliente pidió videos, e-commerce lite.
13. **Mobile BottomNav 5 items + Float colisiona** — safe-area-bottom check.

### TIER C (≤5/10)
14. **Colores vibrantes no vibrantes** — gold es mid-tone. Cliente pidió más saturación.
15. **Falta carrito invisible MVP2** — E15 sin construir.
16. **No testimonios post-cita** — hook después de cada cita.

---

## Orden de implementación

### Round 4A — P0 crítico (HOY, 4-6h)
| # | Cambio | Severity | Effort | File |
|---|---|---|---|---|
| 1 | WhatsApp Float visible siempre | S | 5 min | components/WhatsAppFloat.tsx |
| 2 | Meta descriptions per-page + OG unique | S | 1h | app/*/page.tsx (templates) |
| 3 | Canonical URLs en layout | S | 15 min | app/layout.tsx |
| 4 | LocalBusiness JSON-LD en layout | A | 30 min | app/layout.tsx |
| 5 | h1 en home + limpieza visual hero | A | 45 min | app/page.tsx, content/es.json |
| 6 | SSR /piercings + quitar BAILOUT | A | 1.5h | app/piercings/page.tsx, components/EarAnatomy.tsx |

### Round 4B — P1 medium (ESTA SEMANA, 6-8h)
| # | Cambio | Severity | Effort | File |
|---|---|---|---|---|
| 7 | Eventos tentativos sembrados | A | 30 min | content/es.json, /eventos |
| 8 | /galeria honesto (sin "Foto pendiente") | A | 30 min | app/galeria/page.tsx + comp |
| 9 | Precios perforación/joyería distintos | A | 30 min | content/es.json (data shape) |
| 10 | FAQ con 5 Q críticas nuevas | B | 1h | content/es.json, app/faq |
| 11 | Hero clean: 1 decoración anima + nada más | A | 45 min | app/page.tsx |

### Round 4C — P2 nice-to-have (MES 1)
| # | Cambio | Severity | Effort | File |
|---|---|---|---|---|
| 12 | Carrito E15 v1 (sessionStorage) | A | 1 sem | new components |
| 13 | Newsletter formulario real | B | 1 sem | backend (Mailchimp/Brevo) |
| 14 | Paleta vibrant accent (hover) | B | 1h | app/globals.css |
| 15 | Blog 4 posts SEO | B | 2 días | app/blog/* |

### Round 4D — backlog (NO HOY)
| # | Cambio |
|---|---|
| 16 | Testimonios post-cita |
| 17 | PWA manifest completo |
| 18 | Multi-locale (en/pt) |

---

## Datos esperados del cliente (blockers, no del sitio)
- WhatsApp real del estudio
- Email real
- Instagram @pierce.charm
- Dirección física
- RUC / marca registrada
- Foto Luana (esta semana)
- Logo formal
- Stock inicial (50-100 piezas)

Estos **NO** entran a este round porque cambian copy. Después hay que volver a editar.
