# Cuidado Amiga Platform API

## Public API v1

### GET /api/v1/cases

Lista paginada de casos aprobados. Filtrable por país, tipo, estado.

**Query params:**
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `pais` (opcional)
- `tipo` (opcional: `femicidio|abuso|acoso`)
- `estado` (default: `aprobado`)

**Response:**
```json
{
  "data": [
    { "id": "...", "nombre": "...", "fecha": "...", "tipo": "...", "pais": "...", "ciudad": "...", "lat": -25.4, "lng": -57.6, ... }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8
  }
}
```

### POST /api/v1/partners

Registro de solicitud de partnership.

**Body:**
```json
{
  "name": "...",
  "organization": "...",
  "email": "...",
  "website": "...",
  "country": "..."
}
```

**Response:**
```json
{ "ok": true }
```

## Embed Widget

### Via iframe
```html
<iframe
  src="https://cuidadoamiga.com/app/widgets/widget.html?base_url=https://cuidadoamiga.com&lang=es&limit=50"
  width="100%"
  height="400"
  frameborder="0"
></iframe>
```

### Via script (página propia con Leaflet)
```html
<div id="cuidadoamiga-map" style="height: 400px;"></div>
<script
  src="https://cuidadoamiga.com/app/widgets/widget.js?base_url=https://cuidadoamiga.com&lang=es&limit=50"
  defer
></script>
```

**Widget params:**
- `base_url` (requerido): URL base del sitio (ej: `https://cuidadoamiga.com`)
- `lang` (opcional, default: `es`)
- `limit` (opcional, default: `50`)

## Partners Program

Organizaciones que usan el widget o integran la API se consideran partners. El registro envía una solicitud interna para revisión manual. Partners activos pueden tener visibilidad destacada y co-branded widgets.

## Versioning

La API está versionada (`/api/v1/`). Cambios breaking generan `/api/v2/`. Mantenemos compatibilidad hacia atrás por al menos 6 meses tras el release de una nueva versión mayor.