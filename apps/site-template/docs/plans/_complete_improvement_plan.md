# Site Template — Complete Improvement Plan

## Direction Confirmed

**Core principle:** The template is a TEACHING TOOL. Every visible text is simultaneously (1) showing what the section looks like and (2) teaching the client WHAT TO PUT THERE and WHY IT MATTERS.

- No fictional names ("Carlos Mendoza"). No fake testimonials. No "example business" pretending to be real.
- Every section has: TEMPLATE PROMPT version (what client fills) + COMPLETED EXAMPLE version (ParaguAI as example)
- Each prompt page has a partner "good example" page showing ParaguAI's own content
- Annotations stay in JSON/TS for developers only — not visible to clients
- Readable Spanish without braces for placeholders

---

## Phase 1: Content Architecture — Rename/Reframe Core Identity

### 1.1 Rename features to service-business-friendly names

| Current | New | Rationale |
|---------|-----|-----------|
| Gift Cards | Credito Prepago | Load credit onto account, use for any service (lawyer retainer, consultant hours, professional services) |
| Loyalty Program | Programa de Lealtad / Beneficios por Fidelidad | Shows "the longer you stay, the more you get" — works for any B2B or B2C service |
| Products | Productos / Herramientas | Less e-commerce, more digital products/sessions |
| Referrals | "Trae un Cliente" | Simple, direct — the referral action |
| Booking | Reservas / Turnos | Appointment-based service |
| Cart | Carrito | Keep for e-commerce flag |

All feature flags in `content/es/site.json` under `features` get renamed labels.

### 1.2 Hero section rewrite

**Template prompt page** (the default view):
- Headline: "ASI PUEDE VERSE TU NEGOCIO"
- Subheadline: "Este es un ejemplo de como se ve tu pagina web cuando la configuras con ParaguAI"
- CTA: "EMPIEZA TU PANTALLA"
- Badge: "TU_NEGOCIO en internet"

**Partner "good example" page** ( ParaguAI demo):
- Headline: "Tu negocio merece estar en internet"
- Subheadline: "Paginas web profesionales para cualquier tipo de negocio en Paraguay"
- Slide structure: Shows 3 slides explaining why a website matters

**Navigation:** Add a toggle/tab or subdomain to switch between "Modo Plantilla" (template prompts) and "Modo Ejemplo" (ParaguAI example).

### 1.3 Site identity — remove "ParaguAI Builder" references

Strip all references to "ParaguAI Builder" as the business name in template content.
- `site.json`: `"name": "Tu Negocio"` instead of `"name": "ParaguAI Builder"`
- Hero, About, Team: no brand name — it's the CLIENT's template
- The site is now "TU_NEGOCIO" as the placeholder identity

---

## Phase 2: Content Sections — Dual Pages (Template + Example)

Create for each major section:
- `page.tsx` = Template version (client prompt mode)
- `page.example.tsx` = ParaguAI filled-in example

### 2.1 Team Section

**Template page** (`TeamSection` reads from `content/_template/team.json`):
```json
[
  {
    "name": "TU_NOMBRE_COMPLETO",
    "role": "Tu profesion / servicio que ofreces",
    "bio": "Tu historia en 2-3 oraciones. Quien eres, por que haces lo que haces, que te diferencia. Los clientes confian en personas, no en logos.",
    "image": "URL de tu foto real o placeholder",
    "note": "Esta seccion muestra quien esta detras del negocio. Una foto real con nombre real aumenta la confianza y las reservas."
  }
]
```

**Why this matters visible text:** "Los clientes que trabajan con personas que conocen tienen 3x mas probabilidades de reservar. Tu foto y nombre aqui = confianza instantanea."

**Example page** shows ParaguAI team:
```json
[
  {
    "name": "Tu equipo ParaguAI",
    "role": "Especialistas en presencia digital",
    "bio": "Somos un equipo de desarrolladores y disenadores que entienden el mercado paraguayo. Te ayudamos a poner tu negocio en internet sin complicaciones."
  }
]
```

### 2.2 Testimonials Section

**Template page:**
```json
[
  {
    "name": "NOMBRE_DE_TU_CLIENTE",
    "role": "Servicio que le prestaste",
    "text": "Lo que tu cliente real dijo sobre trabajar contigo. Los testimonios genuinos son el activo mas poderoso — pidelos por WhatsApp al terminar el servicio.",
    "rating": 5,
    "note": "Usa testimonios reales de tus clientes. Si no tienes todavia, pregunta a tus ultimos 5 clientes. La mayoria responde si les decis que los ayuda a ellos tambieen."
  }
]
```

**Why this matters:** "Un visitante que ve 3-4 testimonios reales de personas como el/ella tiene 4x mas probabilidades de contactarte.pidelos."

**Example page:** Show 3 example testimonials with realistic names (not obviously fake) explaining what a good testimonial looks like.

### 2.3 FAQ Section

**Template page** — 5-6 questions that ARE template prompts:
```json
[
  {
    "id": "1",
    "question": "PREGUNTA: Algo que tus clientes preguntan todo el tiempo?",
    "answer": "Tu respuesta en 1-2 oraciones. Un buen FAQ reduce tus mensajes de WhatsApp en 40%.",
    "why": "Cada pregunta respondida en el FAQ es un mensaje de WhatsApp que NO recibes."
  }
]
```

**Example page:** Show real FAQs about websites/online presence (the meta FAQ):
- "¿Cuanto cuesta una pagina web?"
- "¿Cuanto tiempo tarda?"
- "¿Necesito saber de tecnologia?"
- "¿Que pasa si ya tengo Facebook?"

### 2.4 About Page

**Template page:** Rewrite as teaching tool
```
SECTION: Tu Historia
"TU HISTORIA VA AQUI

Te contamos por que creemos que todo negocio en Paraguay merece una presencia digital.

COMO ESCRIBIR TU HISTORIA:
1. Por que empezaste? (Tu motivacion)
2. A quien le ajudas? (Tu cliente ideal)
3. Que problema resuelves? (Tu propuesta de valor)

En 3 parrafos cuenta tu historia. Los clientes conectan con personas, no con empresas."

WHY THIS MATTERS: "Un About Us con historia real aumenta la confianza en 60%. Los clientes preguntan 'quien me ayuda?' antes de contactar."
```

**Example page:** Show ParaguAI's story as the filled-in version — gives a real-feeling example of each of the 3 paragraphs.

### 2.5 Services Page

**Template page:** 3 example service categories that ARE template prompts:
```json
[
  {
    "name": "Tu servicio principal",
    "description": "Descripcion de lo que ofreces en 1-2 oraciones. Que problema resuelves? Para quien es?",
    "price": "Gs. XXXX",
    "duration": "30-60 min",
    "note": "Cada servicio = una tarjeta. Los precios claros reducen la friccion: el cliente no tiene que preguntar para saber si puede pagar."
  }
]
```

**Example page:** Show ParaguAI services (asesorias, cursos, productos digitales) with real descriptions.

### 2.6 Booking / Reservas

**Template page:**
```
RESERVAS / TURNOS

Como funciona:
1. El cliente elige el servicio
2. Completa sus datos (nombre, telefono, fecha)
3. Te llega por WhatsApp — respondes y confirmas

TU CAMPUS DE RESERVAS:
- Nombre del cliente: Tu campo
- Telefono: Tu WhatsApp
- Servicio: El que ofrecen
- Fecha/Hora: La que el cliente prefiere

WHY THIS: "Cada reserva que llega por tu pagina es un cliente que encontro tu negocio en Google. Sin WhatsApp saturado, sin perdidos."
```

**Example page:** Show the booking form filled in with ParaguAI's context.

### 2.7 Credito Prepago (Gift Cards renamed)

**Template page:**
```
CREDITO PREPAGO

Como funciona: Tus clientes cargan credito a su cuenta. Lo usan para cualquier servicio que ofrezcas.

MONTO QUE OFRECES:
- Gs. 100.000 — Para consultas o sesiones pequenas
- Gs. 300.000 — Para paquetes de servicios
- Gs. 500.000 — Para paquetes completos
- Personalizado — El cliente elige el monto

WHY THIS: "El credito prepago funciona para cualquier negocio: abogados que cargan horas, clinicas que cargan sesiones, consultoras que cargan paquetes. Es flexibilidad para el cliente, ingresos anticipados para ti."
```

### 2.8 Programa de Lealtad (Loyalty renamed)

**Template page:**
```
PROGRAMA DE LEALTAD

Como funciona: Mientras mas tiempo trabajas con tus clientes, mas beneficios les das.

EJEMPLO:
- Cliente nuevo: Sin beneficios
- 6 meses: Descuento 5%
- 12 meses: Descuento 10% + servicio adicional gratis
- 24 meses: Cliente VIP — acceso prioritario + beneficios exclusivos

WHY THIS: "Un programa de lealtad aumenta la retencion de clientes en 25%. Un cliente que vuelve tiene 5x menos costo de servicio que uno nuevo."
```

### 2.9 Pricing / Plans

**Template page:**
```
PLANES DE SERVICIO

PLAN PRUEBA — Gs. XXXX/mes
Lo basico para empezar. Incluye: pagina basica, WhatsApp, horarios.
Para quien: Negocios que estan empezando.

PLAN PRESENCIA — Gs. XXXX/mes
Tu negocio tiene su espacio. Incluye: todo lo de Prueba + servicios, galeria, testimonios.
Para quien: Negocios que ya tienen clientes pero want mas visibilidad.

PLAN CRECIMIENTO — Gs. XXXX/mes
Tu negocio trabaja solor. Incluye: reservas online, credito prepago, programa de lealtad.
Para quien: Negocios que quieren sistematizar.

PLAN PROFESIONAL — Gs. XXXX/mes
Todo incluido + multi-idioma + dominio propio.
Para quien: Negocios que ya escalan.

WHY THIS: "Los planes dan opciones a diferentes presupuestos. Un cliente que no puede pagar Gs. 600k al mes puede empezar con Prueba a Gs. 150k. Y cuando crezca, sube de plan."
```

### 2.10 Blog

**Template page:**
```
BLOG — Tu contenido de marketing

Como funciona: Cada post es una oportunidad para que Google te encuentre.

IDEAS DE POSTS PARA TU NEGOCIO:
1. "3 formas en que un negocio como el tuyo puede usar internet para conseguir clientes"
2. "Quanto cuesta tener presencia digital en Paraguay"
3. "Por que tu negocio necesita una pagina web (no solo Facebook)"

PORQUE ESTO IMPORTA: "Un post bien optimizado para SEO trae 200-800 busquedas mensuales sin que hagas nada. Es tu vendedor digital trabajando 24 horas."

EJEMPLO: Post de ParaguAI: "3 formas en que un negocio como el tuyo puede usar una pagina web para conseguir clientes"
```

**Example page:** Show 3 real blog posts: the meta one, the pricing one, the SEO one.

---

## Phase 3: Code Fixes — Critical Runtime Bugs

### 3.1 Stat animation fix — "9-19h" bug

**File:** `components/sections/marketing/AnimatedStatsSection.tsx`
**Bug:** `parseInt("9-19h".replace(/\D/g, ""))` produces `919`, animates as "919+"

**Fix:**
```typescript
// Before line 67 (parseInt line):
const rawVal = s.value.replace(/\D/g, "")
if (!rawVal || rawVal === "0") {
  // Non-numeric value — display as-is without animation
  displayNum = 0
  showPlus = false
}
// Handle NaN
if (isNaN(displayNum)) { displayNum = 0 }
```

**Also fix `content/es/stats.json`:** Change `"value": "9-19h"` to `"value": "16"` (representing hours/day, animatable).

### 3.2 TeamSection empty src fix

**File:** `components/sections/team/TeamSection.tsx:55`
**Bug:** `src={member.image || ""}` — empty string crashes next/image

**Fix:**
```typescript
src={member.image && member.image.length > 0 ? member.image : "/images/placeholder-avatar.svg"}
```

### 3.3 Testimonials Carousel — fix non-functional controls

**File:** `components/sections/testimonials/TestimonialsSection.tsx`
**Bug:** Prev/next buttons update `active` state but don't scroll the `overflow-x-auto` container.

**Fix:** Add `useRef` and scroll-sync:
```typescript
const trackRef = useRef<HTMLDivElement>(null)
const scrollToCard = (index: number) => {
  if (trackRef.current) {
    const cardWidth = trackRef.current.children[0]?.clientWidth || 300
    trackRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }
}
// In prev/next handlers: scrollToCard(active - 1) / scrollToCard(active + 1)
```

### 3.4 Header dropdown — add accessibility

**File:** `components/layout/Header.tsx`
**Fix:** Add `aria-haspopup="true"`, `aria-expanded={isMoreOpen}`, `role="menu"` on dropdown, `aria-label` on subnav.

### 3.5 Gift card form — modal accessibility

**File:** `components/admin/gift-card-form.tsx`
**Fix:** Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, Escape key handler to close.

### 3.6 FAQ accordion — fix hidden class blocking transitions

**File:** `components/shared/FaqAccordion.tsx:79`
**Bug:** `hidden` class sets `display: none` which blocks CSS transitions from ever working.

**Fix:** Replace `hidden` with `max-height: 0; overflow: hidden` + `max-height: 500px` transition.

---

## Phase 4: Type Safety — Replace AnyRecord

### 4.1 Remove `as AnyRecord` from config.ts

**File:** `lib/config/config.ts`

Current problem: `heroSlides = (esHero as AnyRecord).slides || []` — casts to `any[]`

**Fix approach:** Use proper types from `lib/content-types.ts`

Create typed getters in config.ts:
```typescript
import type { HeroSlide, SiteConfig, Testimonial, Service, TeamMember, Stat } from '@/lib/content-types'

export function getHeroSlides(lang: "es" | "en"): HeroSlide[] {
  const data = lang === "es" ? esHero : enHero
  if (!data?.slides || !Array.isArray(data.slides)) return []
  return data.slides.filter(isValidHeroSlide)
}

function isValidHeroSlide(s: unknown): s is HeroSlide {
  return typeof s === 'object' && s !== null && 'title' in s && 'subtitle' in s
}
```

Apply same pattern to: `team`, `testimonials`, `stats`, `services`, `gallery`, `faqs`

**Do NOT refactor everything at once.** Priority order:
1. `TeamSection.tsx` — crashes on empty image (CRITICAL)
2. `HeroSection.tsx` — crashes if slides undefined (CRITICAL)
3. `AnimatedStatsSection.tsx` — NaN display (MAJOR)
4. `TestimonialsSection.tsx` — type safety for color map (MAJOR)
5. Everything else — follow as needed

---

## Phase 5: Contact / Location — Remove Hardcoded Asunción

### 5.1 Contact page metadata

**File:** `app/[lang]/contacto/page.tsx:36`
**Bug:** `"visitanos en Asunción"` hardcoded

**Fix:** Pull from `site.business.address`:
```typescript
const address = site.business?.address || "Tu direccion"
return { title: `Contactanos en ${address}`, description: `Contactanos en ${address} por WhatsApp o visitanos.` }
```

### 5.2 Contact section component

**File:** `components/sections/contact/ContactSection.tsx`
**Fix:** Use `site.business.address`, `site.business.phone`, `site.business.whatsapp` instead of hardcoded values.

---

## Phase 6: WhyUs Section — Move to Content JSON

### 6.1 WhyUsSection hardcoded salon content

**File:** `components/sections/WhyUsSection.tsx`
**Bug:** TypeScript hardcodes `"corte y coloracion"`, `"800 Clientas"`, `"Mujeres que confian"`

**Fix:** Move to `content/es/reasons.json`:
```json
[
  {
    "title": "MAS_DE_X_ANOS",
    "desc": "EXPERIENCIA_DESCRIPCION — Reemplaza esto con tu propio numero y descripcion.",
    "icon": "Clock"
  },
  {
    "title": "+X_CLIENTES",
    "desc": "DESCRIPCION_DE_CLIENTES — Describe quienes son tus clientes y por que confian.",
    "icon": "Users"
  }
]
```

Component reads from JSON instead of hardcoded array.

### 6.2 Remove hardcoded Spanish from TypeScript

In `WhyUsSection.tsx`, replace:
```typescript
const reasons = [
  { icon: Clock, title: "Mas de 15 Anos", desc: "Experiencia que se nota en..." }
]
```
With:
```typescript
const reasons = siteReasons || []
```

---

## Phase 7: Annotations — Developer-only Layer

### 7.1 JSON `_annotation` blocks — keep for devs only

Current: `_annotation` blocks are in production JSON files (`content/es/*.json`).
These are helpful for developers but pollute the data and are invisible to the client-facing template anyway.

**Decision:** Keep `_annotation` in JSON files — they're useful for ParaguAI developers editing content. But they should NOT appear in the template mode pages.

**Action:** No change to JSON structure. The `_annotation` blocks stay — they don't affect the rendered template since template pages use specific field reads (name, role, bio) and ignore `_annotation`.

### 7.2 Component `/** ANNOTATION: */` blocks — keep for devs only

These explain to developers what each page does. They stay in the code.

---

## Phase 8: Portuguese Fixes — About page

### 8.1 Fix Portuguese errors in About page

**File:** `app/[lang]/nosotros/page.tsx`

Fix the 4 errors:
1. `"ajudar"` → `"ayudar"` (Portuguese)
2. `"hoje"` → `"hoy"` (Portuguese)
3. `"comenzo"` → `"comenzó"` (missing accent)
4. `"Mas"` → `"Más"` (missing accent)

Also fix all tildes in `content/es/ui.json` that have missing accents.

---

## Phase 9: Gallery — Content JSON driven alt text

### 9.1 Gallery alt text

**Decision:** Gallery images should use the alt text from `gallery.json`. No hardcoded industry-specific alt text.

**Action:** Check that `GallerySection.tsx` reads `alt` from JSON and doesn't hardcode any alt text. If alt text is missing in JSON, generate a generic one from the image category.

---

## Phase 10: Build + Test Verification

After all changes:
1. Run `npm run build` — verify clean
2. Run `npx vitest run tests/unit/ tests/integration/` — verify 230+ tests pass
3. Run `npm run lint` — verify 0 errors (warnings only)
4. Manual check: open homepage, navigate to About, FAQ, Services, Contact, Booking — verify no crash on any page

---

## Execution Order

```
Phase 1 (Content identity)       → Affects: site.json, hero.json, nav labels
Phase 2 (Content sections)          → Affects: all content JSON, all pages
Phase 8 (Portuguese fixes)         → Affects: About page, ui.json
Phase 3 (Code fixes)               → Affects: 6 component files
Phase 5 (Contact/location)          → Affects: ContactSection, contact page
Phase 6 (WhyUs to JSON)            → Affects: WhyUsSection, reasons.json
Phase 4 (Type safety)              → Affects: config.ts + 5 components
Phase 9 (Gallery alt)              → Affects: GallerySection, gallery.json
Phase 7 (Annotations)             → No code change, just documentation
Phase 10 (Build verification)       → Final gate
```

Estimated: ~15-20 hours of work across all phases.