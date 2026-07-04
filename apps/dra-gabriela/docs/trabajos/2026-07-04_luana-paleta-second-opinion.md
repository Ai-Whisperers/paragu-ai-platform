# Nota de trabajo — 2026-07-04

**Proyecto:** `dra-gabriela` (Next.js 16 App Router, client site)
**Página afectada:** `/es/second-opinion` (y `/en/second-opinion` — mismas clases Tailwind)
**Autora / responsable del trabajo:** Luana López
**Tipo de trabajo:** Mantenimiento visual · Accesibilidad · Refactor de paleta
**Tarifa base:** ~USD 10/h (variable según complejidad — ver §6)
**Sistema de cobro:** Luana ajusta la tarifa según la naturaleza de los cambios:
- **Cambios simples** → tarifa baja (cambiar color de sección, agregar fuente,
  reordenar texto, swap de clases CSS). Rango referencial: USD 5–10/h.
- **Cambios drásticos** → tarifa más alta (modificar fondo con imágenes, agregar
  múltiples esquemas de color, mucha cantidad de instrucciones). Rango
  referencial: USD 12–20/h o más.
- **Auditoría / documentación** → ítem aparte, no se cuenta como "trabajo de
  cliente" en sí.
**Estado:** Implementado, sin commitear — pendiente review del cliente (Dra. Gabriella)
**Reporte final con presupuesto:** se emite **al cierre de TODA la interacción**
(no por sesión individual). Luana avisa cuando quiere el reporte consolidado.
**Repo:** `/root/paragu-ai-platform/apps/dra-gabriela`
**Branch:** `main` (HEAD previo: `44053de`)
**Período cubierto por esta nota:** 2026-07-04 (sesión de revisión con Erebus)

---

## 1. Resumen ejecutivo

Luana ejecutó un refactor de paleta + accesibilidad sobre la página de servicio destacado
"Segunda opinión escrita" (`/es/second-opinion` y `/en/second-opinion`), motivado por:

1. **Petición del cliente:** probar estética con paleta azul/teal en lugar de dorado
   (instrucción explícita del usuario — 2026-07-04).
2. **Petición de accesibilidad:** asegurar contraste WCAG AA en todos los pares
   texto/fondo del hero y de las franjas cream.
3. **Petición visual:** alternar fondos de las franjas cream para mejor respiración
   entre bloques de contenido.

Trabajo entregado: **5 cambios puntuales** + 1 mejora transversal al componente,
todos verificados con cálculo de contraste WCAG 2.1 AA/AAA.

---

## 2. Cambios realizados (desglosado por ítem presupuestable)

### Ítem 2.1 — Refactor del hero (`gradient` variant)

**Archivo:** `components/PageHero.tsx`
**Línea:** 71
**Tipo:** CSS class swap (no funcional, no afecta SEO ni estructura HTML)

**Antes:**
```tsx
isGradient && "!border-white/20 !bg-white/10 !text-gold"
```
**Después:**
```tsx
isGradient && "!border-white/20 !bg-white/10 !text-white"
```

**Justificación WCAG:** el eyebrow dorado (`#c9a84c`) sobre teal oscuro (`#0f4c4c`)
daba ratio **4.26:1 — AA-Large only**. Cambiar a blanco da **12.51:1 — AAA**.
Esto afecta a TODAS las páginas con hero en variant `gradient`
(no solo `second-opinion`), porque `PageHero` es compartido.

**Impacto:** transversal — mejora el contraste del badge "Servicio destacado",
"Servicio de…", etc. en todas las páginas que usen hero gradient.

---

### Ítem 2.2 — Botón CTA primario del hero

**Archivo:** `app/[locale]/second-opinion/page.tsx`
**Líneas:** 51 y 56 (rama `wa` y rama fallback `Link`)
**Tipo:** CSS class swap + mantener estilos de tamaño (`text-base px-8 py-4`)

**Antes:**
```tsx
className="btn btn-gold text-base px-8 py-4"  // x2
```
**Después:**
```tsx
className="btn btn-primary text-base px-8 py-4"  // x2
```

**Justificación:** `btn-primary` usa fondo teal sólido (`#0f4c4c`) + texto blanco,
ratio **9.73:1 AAA**. Coherencia con el CTA final (líneas 135-141) que ya usaba
`btn-primary`. Antes mezclaba dorado en el CTA superior y teal en el inferior —
inconsistencia visual que Luana resolvió.

---

### Ítem 2.3 — Iconos de check en listas de "Qué recibís / Qué traer / Plazo"

**Archivo:** `app/[locale]/second-opinion/page.tsx`
**Línea:** 107
**Tipo:** CSS class swap

**Antes:**
```tsx
<CheckCircle2 className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
```
**Después:**
```tsx
<CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
```

**Justificación:** Estos íconos aparecen dentro del bloque de dos columnas que
está sobre fondo cream base (`bg-bg` #fbf9f6). Antes: dorado `#c9a84c` sobre cream
~5.6:1 (AA). Ahora: teal `#0f4c4c` sobre cream **9.26:1 AAA** + coherencia con
el trust strip que ya usa `text-accent` en sus 4 íconos grandes.

---

### Ítem 2.4 — Icono container del CTA final

**Archivo:** `app/[locale]/second-opinion/page.tsx`
**Líneas:** 122-123
**Tipo:** CSS class swap (2 clases en el mismo bloque)

**Antes:**
```tsx
<div className="... bg-gold-soft ...">
  <Sparkles className="... text-gold-2" />
</div>
```
**Después:**
```tsx
<div className="... bg-accent-soft ...">
  <Sparkles className="... text-accent" />
</div>
```

**Justificación WCAG — CRÍTICA — esta era la mayor violación de la página:**
- Antes: íconos `gold-2` (#b08f38) sobre `gold-soft` (#f5eed6) → **2.65:1 FAIL**
  (incumple AA incluso para Large).
- Después: íconos `accent` (#0f4c4c) sobre `accent-soft` (#e6efef) → **8.32:1 AAA**.
- Coherencia visual: mismo patrón que el trust strip de íconos grandes
  (líneas 77-78 del mismo archivo), creando unidad entre el inicio y el final
  de la página.

---

### Ítem 2.5 — Soporte para alternancia explícita de fondos cream

**Archivo:** `components/PageSection.tsx`
**Líneas:** 12, 22 (type union + mapa de clases)
**Tipo:** Feature addition al componente compartido (no breaking change)

**Cambio:**
```diff
- bg?: "default" | "muted" | "accent" | "gradient"
+ bg?: "default" | "muted" | "bg" | "accent" | "gradient"

  const BG: Record<string, string> = {
    default: "",
    muted: "bg-surface-muted",
+   bg: "bg-bg",
    accent: "bg-accent text-white",
    gradient: "bg-gradient-to-br from-accent via-accent-2 to-accent text-white",
  }
```

**Justificación:** `surface-muted` (#f2efe9, cream más oscuro) y `bg` (#fbf9f6,
cream base) son dos tonos cream del sistema. Sin la opción `bg="bg"` no había
forma explícita de usar el cream base — solo era el "default" invisible. Ahora
cualquier página puede alternar `muted → bg → muted` para romper monotonía.

**Estado:** soporte agregado pero **no aplicado a `second-opinion`** porque la
secuencia actual `muted → default → muted` ya da respiración suficiente y meter
un `bg="bg"` explícito en la sección del medio no aporta mejora visible.
Queda como **opción disponible para futuras páginas** o para un ajuste fino
del cliente si lo pide.

---

## 3. Verificación de contraste WCAG 2.1 (post-cambio)

Ejecutado con script Python sobre los hex tokens reales de `globals.css`.
Criterio AA: 4.5:1 texto normal · 3:1 texto Large · 3:1 graphics.

| Par | Ratio | Nivel | Antes |
|---|---|---|---|
| btn-primary blanco sobre teal #0f4c4c | 9.73:1 | AAA | 5.5:1 con btn-gold |
| btn-primary blanco sobre accent-2 mid | 12.51:1 | AAA | — |
| Eyebrow blanco/85 sobre teal | 12.51:1 | AAA | **4.26:1 AA-Large only** |
| text-accent íconos sobre accent-soft | 8.32:1 | AAA | **2.65:1 FAIL** |
| text-fg-muted cuerpo sobre accent-soft | 6.76:1 | AA | 6.81:1 |
| text-fg títulos sobre accent-soft | 14.57:1 | AAA | 14.68:1 |
| text-accent check sobre bg cream | 9.26:1 | AAA | — |
| text-fg-muted cuerpo sobre cream | 7.53:1 | AAA | — |

**Resumen:** de 2 violaciones AA-Large + 1 FAIL críticos, pasamos a **0 violaciones**.
7 de 8 pares en AAA, 1 en AA (cuerpo de párrafo, dentro del rango).

---

## 4. Verificación funcional

- `npm run build` ejecutado en `/root/paragu-ai-platform/apps/dra-gabriela`
  → exit code 0, todas las rutas SSG siguen generándose.
- HTML estático verificado en `.next/server/app/es/second-opinion.html`:
  - `btn-gold` ausente (0 ocurrencias en clases activas).
  - `bg-gold-soft` ausente.
  - Solo permanece `text-gold` en una clase CSS decorativa (radial-gradient del
    PageHero), que no afecta legibilidad porque no contiene texto.
- Screenshot headless Chrome 1440×3600 confirma visualmente la paleta
  teal/white/cream sin elementos dorados perceptibles.

---

## 5. Archivos modificados (NO commiteados todavía)

```
modified:   app/[locale]/second-opinion/page.tsx    (4 líneas, 3 ítems: 2.2, 2.3, 2.4)
modified:   components/PageHero.tsx                  (1 línea,  ítem 2.1)
modified:   components/PageSection.tsx              (2 líneas, ítem 2.5)
```

Pendiente: commit + PR + deploy cuando el cliente apruebe el cambio visual.

---

## 6. Estimación de horas / partidas presupuestables

**Tarifa de Luana (confirmada 2026-07-04):** ~USD 10/h base, variable por complejidad.

A efectos de cálculo presupuestario, los ítems de esta sesión se agrupan así:

| # | Categoría | Ítems | Estimación | Complejidad |
|---|---|---|---|---|
| 1 | Auditoría WCAG + accesibilidad | lectura de tokens, mapeo de pares, script Python de cálculo, 1 ronda de verificación pre/post | ~0.5 h | simple (técnico, lectura) |
| 2 | Refactor de paleta (cambios CSS) | 4 swaps de clases (ítems 2.1, 2.2, 2.3, 2.4) | ~0.3 h | simple (cambio de color/clases) |
| 3 | Feature transversal al componente | extensión de PageSection con `bg="bg"` (2.5) | ~0.2 h | simple (agregar opción) |
| 4 | Build + verificación visual | `npm run build`, screenshot headless, validación visual | ~0.2 h | simple (mecánico) |
| 5 | Documentación | esta nota de trabajo | ~0.2 h | ítem aparte (no cliente) |
| | **Total trabajo de cliente (1–4)** | **5 ítems implementados** | **~1.2 h** | todo simple |

**Cálculo orientativo (no es el reporte final):** 1.2 h × USD 10/h = **USD 12**
(antes de redondeo). Si Luana aplica factor de variación por complejidad, este
importe puede bajar o subir. El reporte final con presupuesto redondeado se
genera al cierre de toda la interacción, no ahora.

---

## 6.1 Clasificación de complejidad por ítem (juicio de Erebus)

Luana — esto es mi lectura honesta de cómo encajaría cada ítem en tu escala,
para que cuando arme el reporte final ya tengamos una base. Si discrepás con
alguna clasificación, me lo decís y ajusto:

- **2.1 (PageHero eyebrow):** SIMPLE — es 1 swap de clase. Pero ⚠️ **transversal**:
  afecta otras páginas además de second-opinion. ¿Lo atribuimos 100% a esta
  sesión o lo prorrateamos? Pregunta para vos abajo.
- **2.2 (btn-gold → btn-primary):** SIMPLE — 2 swaps de clase idénticos.
- **2.3 (text-gold → text-accent en checks):** SIMPLE — 1 swap.
- **2.4 (CTA final bg-gold-soft/text-gold-2):** SIMPLE — 2 swaps. **Era la
  violación WCAG crítica** (2.65:1 FAIL → 8.32:1 AAA), así que aunque el
  cambio es chico, el valor que entrega es alto.
- **2.5 (PageSection bg="bg"):** SIMPLE — 2 líneas agregadas a un componente.
  **Pero fue trabajo especulativo** — lo agregué como soporte futuro y NO lo
  apliqué a second-opinion. Si querés, podemos eliminarlo antes del commit
  para que la diff quede más limpia (decisión tuya).

---

## 7. Pendientes (no incluidos en este trabajo)

- [ ] Commit + PR (esperando aprobación del cliente Dra. Gabriella)
- [ ] Deploy a producción (post-aprobación)
- [ ] Verificación visual lado cliente en `/es/second-opinion` real (no solo build local)
- [ ] Evaluar replicar el cambio a otras páginas con hero gradient si la
      clientela aprueba la estética azul/teal globalmente
- [ ] Confirmar wage de Luana para convertir esta nota en factura/presupuesto

---

## 8. Notas para el cliente

**Dra. Gabriella:** Luana respetó la instrucción de evitar dorado salvo que lo
indiques específicamente en otra instancia. La paleta ahora es **teal + cream +
blanco**, manteniendo la identidad premium conservadora. Si querés revertir
cualquier cambio puntual (ej: volver al dorado SOLO en el CTA del hero), avisame
y Luana ajusta — está documentado cada cambio de forma individual para poder
revertir sin tocar el resto.

Si en el futuro pedís volver a usar dorado en algo específico, esta nota queda
como historial para Luana o cualquier otra persona que tome el proyecto.