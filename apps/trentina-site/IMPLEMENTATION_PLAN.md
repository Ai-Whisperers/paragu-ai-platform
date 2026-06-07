# TRENTINA — PLAN DE IMPLEMENTACIÓN COMPLETO

## Prioridades (worst-first)
1. 🔴 CRÍTICO — Home
2. 🔴 CRÍTICO — Contacto
3. 🟠 ALTO — Cervezas
4. 🟠 ALTO — Tienda
5. 🟠 ALTO — Chopp
6. 🟡 MEDIO — Nosotros
7. 🟡 MEDIO — Galería

---

## 1. HOME (/) — CRÍTICO

### Issues identificados
| # | Issue | Gravedad |
|---|-------|----------|
| 1 | Typo "ingredients" (debería ser "ingredientes") | CRÍTICO |
| 2 | Stats "LITROS/MES" en mayúsculas | ALTO |
| 3 | ProcessSection sin descripciones (las descripciones SÍ están en page.tsx lines 49-68, el componente las recibe — verificar si el componente ProcessSection las renderiza) | MEDIO |
| 4 | Footer "Powered by Ai-Whisperers" prominente | ALTO |
| 5 | Hero sin imagen real — solo CSS grain + glow | ALTO |
| 6 | WeeklySpecial duplicado en /cervezas | MEDIO |

### Cambios necesarios

**A) content/es.json — Fix typo**
```
Línea 68: "subtitle": "Tradición cervecera con ingredients seleccionados..."
                                                                    ^^^^^^^^^
→ "ingredientes"
```

**B) content/es.json — Fix stats label**
```
Línea 102: "label": "Litros/mes"
(mayúsculas → título propio)
```

**C) components/footer.tsx — Reducir prominencia Ai-Whisperers**
- Cambiar el texto "Powered by Ai-Whisperers" a una versión muted
- Cambiar el color del link a `text-[var(--color-text-muted)]` hover `text-[var(--color-text)]`
- Agregar tooltip "Hecho por Ai-Whisperers"
- Reducir font-size de `text-xs` a `text-[10px]`

**D) components/hero.tsx — Agregar imagen real de fondo**
- Currently usa `/images/hero-bg.jpg` (que existe — verificar)
- Si hero-bg.jpg no tiene contenido real, cambiar a beer-pour-craft.jpg o beer-glass-craft.jpg
- Agregar overlay gradient para legibilidad del texto

**E) components/weekly-special.tsx — Remover duplicado en /cervezas**
- En `/root/trentina-site/app/cervezas/page.tsx` no se importa WeeklySpecial (revisar)
- Solo la home debe mostrar el WeeklySpecial, no /cervezas también

**F) Verificar ProcessSection content**
- Leer `components/process-section.tsx` para confirmar que las descripciones se renderizan

---

## 2. CONTACTO (/contacto) — CRÍTICO

### Issues identificados
| # | Issue | Gravedad |
|---|-------|----------|
| 1 | Mapa con filter invert raro | CRÍTICO |
| 2 | Sin formulario real (solo form → wa.me) | MEDIO |
| 3 | Info cards sin iconos (ya los tiene — verificar) | BAJO |

### Cambios necesarios

**A) Fix Google Maps embed**
```
Línea 85: filter: "invert(0.9) hue-rotate(180deg)"
```
→ Eliminar el filter, está aplicando un efecto raro al mapa. El mapa de Google Maps embed ya tiene sus propios colores.

**B) Mejorar embed URL con coordenadas reales de Santa Rita**
- Obtener coordenadas exactas de la dirección: "Alicceo Luiggi Giordani, casi calle Trento, Barrio Alejandrino III, Santa Rita, Alto Paraná"
- Usar iframe embed con coords precisas

**C) Agregar horario de atención con indicador "abierto ahora"**
- En `content/es.json` → site.hours cambiar de "Consultar al WhatsApp" a algo más concreto
- O agregar un badge visual: "Horarios: Consultar al WhatsApp" con ícono de reloj

**D) Optimizar el ContactForm para que funcione offline**
- El form actual hace GET a wa.me — funciona sin backend, pero agregar validación JS antes de enviar

---

## 3. CERVEZAS (/cervezas) — ALTO

### Issues identificados
| # | Issue | Gravedad |
|---|-------|----------|
| 1 | Tabs con nombres completos (ej: "APA — American Pale Ale") en vez de labels cortos | ALTO |
| 2 | "Consultar" como precio para Pilsen y Dunkel — mata conversión | CRÍTICO |
| 3 | IBU sin contexto/explicación | MEDIO |

### Cambios necesarios

**A) Tabs — Usar nombres cortos**
- En `content/es.json` línea 186-188: subcategories[0].name = "Pilsen"
- Subcategories: "Pilsen", "APA", "IPA", "Metatron", "Dunkel" (no los nombres completos)
- En `cervezas-client.tsx` línea 87: `{sub.name}` → ya usa el nombre del JSON, solo verificar que en el JSON no tenga el nombre largo

**B) Precios reales para Pilsen y Dunkel**
```
content/es.json → menu.categories[0].subcategories[0].items[0].price:
"Consultar" → "Gs 130.000/pack 20x330ml" (basado en el Pack 1 de la tienda)

content/es.json → menu.categories[0].subcategories[4].items[0].price:
"Consultar" → "Gs 350.000/pack 12x500ml" (precio estimado para Dunkel)
```

**C) Agregar explicación de ABV/IBU**
- En `cervezas-client.tsx`, agregar un tooltip o badge info al hover de los badges ABV/IBU
- O agregar una línea pequeña: "ABV = Alcohol por volumen | IBU = Unidades de Amargor Internacional"

---

## 4. TIENDA (/tienda) — ALTO

### Issues identificados
| # | Issue | Gravedad |
|---|-------|----------|
| 1 | Pack 3 (APA) y Pack 4 (IPA) usan la misma imagen (`gallery-5.jpg`) | CRÍTICO |
| 2 | Cards sin hover state claro | MEDIO |
| 3 | Sin CTA secundario en hero | MEDIO |

### Cambios necesarios

**A) Fix imágenes duplicadas**
```
Línea 79: pack.id === "pack-4-ipa" ? "/images/gallery/gallery-5.jpg"
→ cambiar a "/images/gallery/gallery-2.jpg" (o gallery-3.jpg)
```

**B) Mejorar hover state de las cards**
```tsx
// En tienda/page.tsx, línea 63-67
// Cambiar hover de:
hover:border-gold/40

// A:
hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5

// Y agregar un efecto de "ver detalles" en la imagen
```

**C) CTA secundario en hero de tienda**
- En `tienda/page.tsx`, sección hero líneas 41-51
- Agregar un `subheadline` debajo del título que invite a la acción

**D) Agregar "stock limitado" o "disponibilidad" a las cards**
- Las cards de packs muestran precio pero no dicen si hay stock
- Agregar un badge tipo "Stock limitado" para el Pack 2 (el popular)

---

## 5. CHOPP (/chopp) — ALTO

### Issues identificados
| # | Issue | Gravedad |
|---|-------|----------|
| 1 | Sin precios para servicios de chopp | CRÍTICO |
| 2 | beer-taps-craft.jpg como hero — imagen genérica de grifos | MEDIO |
| 3 | Servicios sin descripciones reales | ALTO |

### Cambios necesarios

**A) Agregar información de precios para barril/chopp**
- En `content/es.json` → chopp section
- Agregar una sección de "Precios de barril" con:
  - 20L = Gs X (consultar)
  - Incluir: alquiler de equipo, instalación, consumo mínimo

**B) Fix hero image**
- `beer-taps-craft.jpg` como hero a opacity 20% está muy oscuro
- Subir a opacity 35% o 40%
- O cambiar la imagen a una que muestre un evento real con chopp

**C) Mejorar servicios con descripciones concretas**
```
content/es.json → chopp.services:
- "Fiestas": descripción actual "Servicio de chopp para fiestas..."
  → Agregar: "Desde Gs X por evento", "Incluye: equipo, instalación, vasos"
- "Eventos empresariales": descripción vaga
  → Agregar: "Menu de 2-4 estilos", "Servicio de garzón incluido"
- "Eventos particulares": descripción vaga
  → Agregar: "最小 cantidad: X personas"
- "Instalación en locales": descripción vaga
  → Agregar: "Contrato mensual disponible"
```

**D) Cambiar los íconos de servicios por SVGs más representativos**
- Los íconos actuales son genéricos (home, users, etc.)
- Buscar SVGs específicos para cada servicio

---

## 6. NOSOTROS (/nosotros) — MEDIO

### Issues identificados
| # | Issue | Gravedad |
|---|-------|----------|
| 1 | brewery-exterior.jpg a opacity 20% — casi invisible | ALTO |
| 2 | 3 valores sin imágenes | MEDIO |
| 3 | Brewmaster section sin quote | MEDIO |

### Cambios necesarios

**A) Subir opacity del hero image**
```
Línea 25: className="object-cover opacity-20"
→ opacity-35 o opacity-40
```

**B) Agregar imágenes a los valores**
- En `content/es.json` → about.values, agregar un campo `image`
- Valores: "Artesanal", "Pureza", "Pasión"
- Usar imágenes abstractas de cerveza (maltas, lúpulos, tanques) o iconos custom
- O hacer que cada valor tenga un ícono SVG custom en vez de solo texto

**C) Agregar quote del Brewmaster**
- En `content/es.json` → about.brewmaster, agregar un campo `quote`
- Ejemplo: `"Hacé lo que amamos, y que el resultado se note en cada sorbo."`
- En `nosotros/page.tsx`, debajo de la descripción del brewmaster, mostrar el quote en italics

---

## 7. GALERÍA (/galeria) — MEDIO

### Issues identificados
| # | Issue | Gravedad |
|---|-------|----------|
| 1 | `<img>` en vez de `<Next/Image>` — performance/SEO | CRÍTICO |
| 2 | Sin lightbox funcional (el existente tiene estilo básico) | MEDIO |
| 3 | Solo 8 imágenes | MEDIO |
| 4 | Filtros genéricos ("cervezas", "fábrica") | MEDIO |

### Cambios necesarios

**A) Convertir `<img>` a `<Next/Image>`**
```tsx
// En gallery-client.tsx, líneas 60-65
// Reemplazar:
<img
  src={img.src}
  alt={img.alt}
  className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
  loading="lazy"
/>

// Por:
import Image from "next/image";
<Image
  src={img.src}
  alt={img.alt}
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-500"
  sizes="(max-width: 768px) 50vw, 33vw"
/>
```

**B) Mejorar lightbox**
- El lightbox existe (líneas 78-101) pero es básico
- Agregar: flechas de navegación (prev/next), keyboard navigation (Escape, arrow keys)
- Agregar counter "3 / 8" en la esquina
- Mejorar animación de entrada

**C) Conseguir más fotos reales**
- 8 imágenes es muy poco para una galería de cerveza artesanal
- Sugerir a Trentina enviar 15-20 fotos más de:
  - Cerveza servida en vaso
  - Botellas en pack
  - Evento real con chopp
  - interior del local (si hay)
  - Fabrica/tanques

**D) Mejorar filtros**
- Cambiar categorías a algo más específico:
  - "Cervezas" → "Nuestras Cervezas" (fotos de productos)
  - "Fábrica" → "Proceso" (fotos de producción)
  - Mantener "Eventos" y "Chopp"

---

## TAREA TRANSVERSAL — Footer Ai-Whisperers

### components/footer.tsx — Reducir prominencia

```tsx
// Antes:
<a
  href="https://paragu-ai.com"
  className="text-[var(--color-text-muted)] hover:text-gold transition-colors"
>
  Powered by Ai-Whisperers
</a>

// Después:
<span className="text-[10px] text-[var(--color-text-muted)]/50" title="Hecho por Ai-Whisperers">
  ⚙️ Ai-Whisperers
</span>
```

---

## RESUMEN DE ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `content/es.json` | Fix typo, stats label, precios, servicios descriptions |
| `components/footer.tsx` | Muted Ai-Whisperers |
| `components/hero.tsx` | Imagen real de fondo |
| `app/cervezas/cervezas-client.tsx` | Explicación ABV/IBU |
| `app/tienda/page.tsx` | Fix imagen duplicada, hover state |
| `app/chopp/page.tsx` | Precios servicios, descriptions |
| `app/nosotros/page.tsx` | Opacity hero, quote brewmaster |
| `app/galeria/gallery-client.tsx` | Next/Image, lightbox mejorado |

---

## ORDEN DE EJECUCIÓN

1. **Home** — Typo fix + footer muted + hero image
2. **Contacto** — Fix mapa
3. **Tienda** — Fix imagen duplicada
4. **Cervezas** — Precios reales
5. **Galería** — Next/Image migration
6. **Chopp** — Descripciones servicios + opacity
7. **Nosotros** — Quote brewmaster + valores con imágenes

Cada cambio requiere:
1. Modificar archivo
2. Build local (opcional)
3. Commit
4. Deploy
5. Verificar con curl desde el servidor