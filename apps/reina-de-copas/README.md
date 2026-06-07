# Reina de Copas Paraguay

Tienda online de copas y discos menstruales. Paraguay.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

```env
NEXT_PUBLIC_WHATSAPP=595982774456
NEXT_PUBLIC_INSTAGRAM=reinadecopaspy
NEXT_PUBLIC_BASE_URL=https://reina-de-copas-paraguay.com
```

## Deployment

Push a `git push` a `main` — GitHub Actions compila y deploya al VPS automáticamente.

### Secrets requeridos en GitHub

| Secret | Valor |
|--------|-------|
| `NEXT_PUBLIC_WHATSAPP` | 595982774456 |
| `NEXT_PUBLIC_INSTAGRAM` | reinadecopaspy |
| `NEXT_PUBLIC_BASE_URL` | https://reina-de-copas-paraguay.com |
| `VPS_HOST` | 72.61.44.159 |
| `VPS_SSH_KEY` | Clave SSH privada del root |

## Productos

| SKU | Nombre | Precio |
|-----|--------|--------|
| COPA-001 | Copa Signature XS | Gs 100.000 |
| COPA-002 | Copa Signature S | Gs 100.000 |
| COPA-003 | Copa Signature L | Gs 100.000 |
| COPA-004 | Copa Signature XL | Gs 100.000 |
| COPA-005 | Reina The Cup (unitalla) | Gs 125.000 |
| DISCO-001 | Combo Disco Menstrual (S+L) | Gs 150.000 |
| VASO-001 | Vaso esterilizador Rosado | Gs 35.000 |
| VASO-002 | Vaso esterilizador Morado | Gs 35.000 |

## Estructura de páginas

```
/ (home)          /quiz (quiz interactivo de talla)
/tienda           /faq
/producto/[sku]   /nosotros
/guia             /carrito
/checkout
```

## Docs de estrategia

| Documento | Descripción |
|-----------|-------------|
| `docs/growth-strategy-12-months.md` | Roadmap 12 meses — producto, comunidad, ads, institucional |
| `docs/partnership-anne-katherine.md` | Estrategia partnership con Anne Katherine (230K) |
| `docs/institutional-sales-ley-6993.md` | Venta institucional vía Ley 6993 |
| `docs/competitive-differentiation-saisha.md` | Diferenciación vs Saisha — comunidad > e-commerce |
| `docs/quiz-strategy.md` | Concepto y lógica del quiz de talla |

Repo strategy docs: https://github.com/Ai-Whisperers/reina-de-copas (rama main)

## Recursos

- Fotos producto RAW: `/root/reina-de-copas-images/` (128 + 9 + logos)
- Google Drive assets: `assets/gdrive/` (62 archivos, 418MB)
- Old site pages: `/root/reina-de-copas-data/pages/`
- Data files: `/root/reina-de-copas-data/products/`

---

*Ai-Whisperers — Erebus | Mayo 2026*