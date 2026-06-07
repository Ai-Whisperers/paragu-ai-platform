# Magnolia Peluquería — Plan de Implementación Completo
**Versión:** 1.0 | Mayo 2026  
**Estado:** Propuesta — requiere aprobación de Ivan  
**Stack actual:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS · Fonts: Montserrat + Playfair Display  

---

## NOTA CRÍTICA SOBRE EL STACK ACTUAL

El sitio usa `output: "export"` en `next.config.ts`. Esto genera HTML estático puro, sin servidor Node.js detrás. Implicaciones:

- **API routes NO funcionan** — no podés crear `/api/booking/route.ts`
- **SSR/ISR NO disponibles** — todo es compile-time
- **Persistencia en servidor NO disponible** — necesitás una base de datos externa

**Para resolver esto** tenés 3 opciones (decisión semana 1, antes de arrancar Fase 2):

| Opción | Pros | Contras | Recomendación |
|---|---|---|---|
| **A) Migrar a托管** (Vercel normal) | API routes + SSR disponibles, código nuevo <100 líneas | Perdes static export simplicity | **推荐para booking + CRM** |
| **B) Plataforma externa** | No tocas el sitio, conectás vía widget externo (Calendly, Anolla) | Experiencia menos integrada, branding menos propio | Solo si no hay tiempo para migrar |
| **C) Supabase + client-side** | Guardás todo en Supabase, toda la lógica corre en el browser | Sin servidor = sin CRON jobs, sin webhooks robustos | Bueno para start/simple |

**Recomendación:** Opción A (migrar a Vercel normal) — el deploy code es <50 líneas, solo cambiás `next.config.ts` y agregás un API route mínimo. El esfuerzo es 1 día.

---

## ARQUITECTURA DESTINO

```
Sitio Magnolia (Next.js, ~15 páginas)
  ├── Home / Servicios / Nosotros / FAQ / Contacto / Privacidad / Términos
  ├── API Routes (después de migrar a Vercel normal)
  │   ├── POST /api/booking          → guardar reserva en Supabase + WhatsApp
  │   ├── POST /api/contact          → guardar mensaje en Supabase + email
  │   ├── GET  /api/availability     → devolver horarios disponibles
  │   └── POST /api/newsletter       → suscribir a lista Mailchimp/Supabase
  │
  └── Supabase (PostgreSQL)
        ├── Tabla: reservas (turnos)
        ├── Tabla: clientas (CRM básico)
        ├── Tabla: fidelizacion (sellos/puntos)
        ├── Tabla: feedback (encuestas post-servicio)
        └── Tabla: productos (catálogo)
```

---

## FASE 0 — Foto Real del Salón (HITO DE LANZAMIENTO)
**Semana: 0 (PARALELO, antes de todo)**  
**Responsable: Ivan / Kiki**  
**Esfuerzo: 2-4 horas de fotos**  
**Costo: $0**

Antes de implementar Código, necesitamos las fotos. Sin fotos reales, cualquier improvement de revenue es fake.

### Tareas:
- [ ] **Sesión fotográfica** (las dueñas / Ivan arman esto, nosotros no podemos):
  - 10+ fotos del local (fachada, sala, áreas de trabajo, área de lavado)
  - 10+ fotos del equipo / estilistas (con permiso)
  - 20+ fotos de trabajos reales (antes/después, con permiso de clientas — blurry si no dan permiso)
  - 3-5 videos de 15-30s del salón funcionando
- [ ] **Dropbox/Carpeta compartida** para que Ivan suba las fotos
- [ ] **Ivan me pasa link a la carpeta**

### Estructura de fotos:
```
/photos
  /local         → 10 fotos del salón
  /equipo        → 5 fotos con nombres + especialidades
  /trabajos      → 20 fotos reales antes/después
  /videos        → 3-5 clips 15-30s
```

**Esta Fase 0 es bloqueante de Fase 1.**
Sin fotos reales no se puede tocar `hero.tsx`, `gallery.tsx`, `testimonials.tsx`, `before-after.tsx`, ni `nosotros/page.tsx`.

---

## FASE 1 — Quick Wins Frontend (Semana 1-2)
**Responsable: Erebus (dev)**  
**Esfuerzo estimado: 8-12 horas**  
**Costo hosting: $0 (ya estádeployado)**

### Ticket F1.1: Badge "Abierto Ahora" (2h)
**Archivo:** `components/header.tsx`

Agregar función que calcula si el salón está abierto en este momento:
```typescript
function isOpenNow(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
  const hours = now.getHours();
  // Abre Martes(2) a Sábado(6), 9:00-19:00
  if (day < 2 || day > 6) return false;
  if (hours < 9 || hours >= 19) return false;
  return true;
}
```

Mostrar badge en header: 🟢 "Abierto ahora" / 🔴 "Cerrado — abre [mañana/hoy HH:mm]"

### Ticket F1.2: Dirección Real + Mapa Correcto (2h)
**Archivo:** `components/location.tsx` + `lib/config.ts`

Necesitamos la dirección real. Agregar a `config.ts`:
```typescript
export const BUSINESS = {
  address: "Calle [REAL] [NÚMERO], Asunción, Paraguay",
  gmap_embed: "https://www.google.com/maps/embed?pb=!1m18...[URL REAL]",
  gmap_link: "https://maps.google.com/?q=[DIRECCIÓN REAL]",
}
```

Actualizar `location.tsx` para mostrar calle + número separados del "Asunción".

### Ticket F1.3: Botón Reservar Visible en Mobile (1h)
**Archivo:** `components/header.tsx`

El botón "Reservar" está oculto en mobile. Necesitamos que el CTA principal fique siempre visible — o en el menú sticky del bottom o como botón en el header.

Opción A: Header fixed con botón siempre visible  
Opción B: Floating bottom bar en mobile con "Reservar ahora"  
(Erebus decide la mejor opción según layout actual — probablemente opción B)

### Ticket F1.4: Corregir Errores Ortográficos (30min)
**Archivos:** `components/CookieConsent.tsx`, todos los `.tsx`

- "politica de cookies" → "política de cookies"
- Revisar todas las páginas por tildes faltantes y mayúsculas inconsistentes

### Ticket F1.5: Link Reviews a Google Business Real (30min)
**Archivo:** `components/testimonials.tsx`

Necesitamos el Google Business Profile URL real de Magnolia. Agregar link directo "Ver todas las reseñas en Google →"

### Ticket F1.6: Packages/Combos de Servicios (4h)
**Archivo:** `components/services.tsx` (nuevo sub-componente)

Agregar sección de paquetes debajo de la lista individual:
```tsx
// Después de la lista de servicios individuales:
<div className="mt-12">
  <h3 className="text-2xl font-display mb-6">Paquetes</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ServicePackage
      name=" packColorYProteccion"
      originalPrice={490000}
      packagePrice={420000}
      services={["Coloración completa", "Corte de cabello", "Tratamiento capilar"]}
      badge="Ahorrás Gs. 70.000"
    />
    <ServicePackage
      name="Pack Novia"
      originalPrice={650000}
      packagePrice={550000}
      services={["Balayage", "Corte", "Peinado", "Tratamiento keratina"]}
      badge="Pack especial"
    />
  </div>
</div>
```

### Ticket F1.7: Desactivar testimonios inventados → Placeholder real (2h)
**Archivo:** `components/testimonials.tsx`

- Eliminar los 4 testimonios inventados hardcodeados
- Reemplazar con sección que dice: "Próximamente: reseñas reales de Google"
- O usar Google Reviews widget embebido (ver F2.4)
- Agregar nota: "Todas las reseñas en Google Maps →"

### Deliverables F1:
```
[ ] header.tsx actualizado con badge abierto/cerrado
[ ] Botón Reservar siempre visible en mobile
[ ] location.tsx con dirección real
[ ] services.tsx con sección de packages/combos
[ ] testimonials.tsx sin reviews inventadas
[ ] Errores ortográficos corregidos en todo el sitio
```

---

## FASE 2 — Sistema de Reservas Online (Semana 3-4)
**Responsable: Erebus (dev) + Ivan (decisiones de UX)**  
**Esfuerzo estimado: 20-30 horas**  
**Costo: $0-15/mes**

### Decisión Previa (Semana 3, día 1):
¿Qué tipo de booking quiere Magnolia?

**Opción A: Widget Externo (más rápido)**  
- Calendly embed con URL de Magnolia
- Widget de Anolla (que ya usa Paraguay)
- Lyxa AI / Superorder integration
- Costo: $0-20/mes
- Tiempo: 4h de integración
- Con: funcional en 1 semana
- Contra: experiencia menos propia, límite de personalización

**Opción B: Booking propio con Supabase (más trabajo, más poder)**  
- Construimos un widget de booking custom en React
- Guardamos reservas en Supabase
- Enviamos confirmación por WhatsApp automático
- Costo: solo Supabase (free tier = 500MB, 2GB transfer, suficiente para empezar)
- Tiempo: 20-30h de desarrollo
- Con: control total, branding propio, datos propios, integración completa
- Contra: más tiempo, necesita migración del sitio a Vercel normal (sin static export)

**Recomendación Erebus: Opción B.** El negocio es pequeño ahora pero tiene potencial de crecer. Invertir 20h ahora = sistema_owned que escala. La migración a Vercel normal es 1 día de trabajo. Los datos quedan en Supabase y se pueden usar para CRM, fidelización, y analytics.

### Ticket F2.1: Migrar a Vercel Normal (8h)
**Archivos:** `next.config.ts`

Cambios necesarios:
```typescript
// next.config.ts ANTES:
const config: NextConfig = {
  output: "export",  // ← REMOVER ESTO

// next.config.ts DESPUÉS:
const config: NextConfig = {
  // output: "export" REMOVIDO
  // Agregar rewrites si necesitamos API custom en edge
  async rewrites() {
    return []
  },
```

 deploy a Vercel cambia de `npm run build && out/` a `npm run build` (sin `out/` folder — Vercel compila y sirve directo).

El static export se movía a `out/` (para Cloudflare Pages). Con Vercel normal el output va a `.next/`.

### Ticket F2.2: Supabase Setup (4h)
**Responsable: Erebus**

Crear proyecto Supabase para Magnolia:
- [ ] Crear proyecto `magnolia-booking` en Supabase
- [ ] Tablas:
  - `reservas`
  - `clientas`
  - `fidelizacion`
  - `servicios`
  - `feedback`
  - `slots` (horarios disponibles)
- [ ] Row Level Security policies
- [ ] API URL + anon key en `.env.local`
- [ ] Service role key en vault (para API routes server-side)

Schema SQL resumido:
```sql
CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  servicio TEXT NOT NULL,
  estilista TEXT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  estado TEXT DEFAULT 'pendiente',
  creado_en TIMESTAMPTZ DEFAULT now(),
  notas TEXT
);

CREATE TABLE clientas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  telefono TEXT UNIQUE NOT NULL,
  visitas INTEGER DEFAULT COUNT('reservas'),
  puntos INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Ticket F2.3: API Routes (8h)
**Archivos nuevos:** `app/api/booking/route.ts`, `app/api/availability/route.ts`

`POST /api/booking`
```typescript
// Validar slot disponible → guardar en Supabase → enviar WhatsApp a Magnolia
// WHATSAPP MESSAGE:
// "Nueva reserva! 👋\nCliente: [nombre]\nServicio: [servicio]\nFecha: [fecha] [hora]\nTel: [telefono]"
```

`GET /api/availability?date=YYYY-MM-DD`
```typescript
// Devuelve slots disponibles ese día desde tabla `slots`
// → 09:00, 10:00, 11:00, 14:00, 15:00, 16:00, 17:00
// (descontando已经是reservas)
```

### Ticket F2.4: Widget de Booking UI (10h)
**Nuevo componente:** `components/booking-embed.tsx`

Flow:
1. **Clienta selecciona servicio** (cards clickeables)
2. **Selecciona fecha** (calendario — Martes a Sábado solamente)
3. **Selecciona horario** (slots disponibles de API)
4. **Ingresa nombre + teléfono**
5. **Confirma** → POST /api/booking → mensaje WhatsApp a Magnolia → mensaje de confirmación a clienta

Diseño: modal overlay que aparece con CTA "Reservar ahora", o página `/reservar`.

### Ticket F2.5: WhatsApp Auto-Confirmación (2h)
**Responsable: Erebus (API + AgentCall)**

Cuando una reserva se confirma:
- Mensaje a Magnolia: nueva reserva (para confirmar o rechazar)
- Mensaje a clienta: "Tu turno está confirmado para [fecha] a las [hora] en Magnolia. Te esperamos!"

Configurar AgentCall con el número de Magnolia.

### Deliverables F2:
```
[ ] Sitio migrado a Vercel normal (output: export removido)
[ ] Supabase project creado con tablas
[ ] API routes funcionando (testeadas con curl)
[ ] Widget de booking en UI (/reservar o modal)
[ ] Confirmación WhatsApp automática configurada
```

---

## FASE 3 — CRM + Fidelización (Semana 5-6)
**Responsable: Erebus (dev)**  
**Esfuerzo estimado: 15-20 horas**  
**Costo: $0 (Supabase free tier covers todo esto)**

### Ticket F3.1: Programa de Sellos Digitales (10h)
**Tabla Supabase:** `fidelizacion`

Sistema:
- Cada vez que una clienta completa un servicio, recibe N puntos
- 5 sellos = 1 servicio gratis (o 500 pts = 1 servicio)
- Tracking automático basado en `reservas.estado = 'completada'`
- Clienta puede ver sus puntos enviando "PUNTOS" por WhatsApp

Widget en página `nosotros` o página `/fidelizacion`:
```tsx
// Mostrar historial de sellos
// "Tienes 3 de 5 sellos → 2 más y es gratis!"
```

Opciones de implementación:
1. **WhatsApp-first:** Todo por WhatsApp, clienta pregunta "cuántos sellos tengo?" y Magnolia responde
2. **QR-based:** Clienta-scanea QR en el salón después del servicio, se registra el sello
3. **Manual simple:** Magnolia ingresa los sellos desde un admin panel mínimo

**Recomendación:** Opción 1 (WhatsApp-first) — cero desarrollo de app, solo entrenamiento del bot de WhatsApp.

### Ticket F3.2: Encuesta Post-Servicio Automática (4h)
**API route:** `app/api/feedback/route.ts`

30 minutos después de la hora del turno:
- Enviar WhatsApp a clienta: "¿Cómo estuvo tu experiencia en Magnolia? 🙏 Responde del 1 al 5"
- Si responde 1-2: flag para seguimiento manual de Magnolia
- Si responde 5 (excelente): "¿Podrías dejarnos una reseña en Google? [link]"
- Si acepta: mensaje con link directo a Google Reviews

Implementación:
- Trigger: cron job cada 30 min que check `reservas` where `fecha + hora + 30min < now() AND estado = 'completada' AND feedback_sent = false`
- Marcar `feedback_sent = true` después de enviar

**NOTA:** Esto necesita servidor con CRON. Opciones:
- Supabase Edge Functions (cron simplificado)
- Hermes cron job en el servidor de Paragu-ai
- Verificar si Paragu-ai tiene cron disponível

### Ticket F3.3: Recordatorios 24h Antes (3h)
**API route:** `app/api/reminders/route.ts`

24h antes de cada reserva:
- WhatsApp: "Hola [nombre]! Te recordado tu turno mañana a las [hora] en Magnolia. ¿Estás confirmade? Responde SÍ para confirmar."
- Si no responde: seguimiento 2h antes

### Ticket F3.4: Admin Panel Básico (10h)
**Page:** `app/admin/reservas/page.tsx`

Dashboard mínimo para Magnolia:
- Lista de reservas próximas (hoy + semana)
- Filtros por fecha, estado, estilista
- Acciones: confirmar / cancelar / reprogramar
- Contador de sellos/fidelización
- Stats: reservas esta semana, porcentaje de no-shows

Prioridad: BAJA en semana 5-6. Empezar después de F3.2.

### Deliverables F3:
```
[ ] Programa de fidelización funcionando
[ ] Encuesta post-servicio automática
[ ] Recordatorios 24h funcionando
[ ] Admin panel básico (si hay tiempo)
```

---

## FASE 4 — Contenido Real + SEO (Semana 7-10)
**Responsable: Erebus (dev) + Kiki (contenido)**  
**Esfuerzo estimado: 20-30 horas**  
**Costo: $0**

### Ticket F4.1: Galería Real con Fotos del Salón (6h)
**Archivo:** `components/gallery.tsx`

Reemplazar imágenes Unsplash con fotos reales del salón.

Necesario para Fase 0: Ivan sube las fotos y me pasa el link a Dropbox.

Estructura:
```tsx
const GALLERY_IMAGES = [
  { src: "/photos/trabajos/balayage-01.jpg", tag: "Balayage", alt: "Balayage con tonos miel" },
  { src: "/photos/trabajos/corte-02.jpg", tag: "Corte", alt: "Corte bob asimétrico" },
  // ... las fotos reales de Ivan
]
```

### Ticket F4.2: Before/After Reales (4h)
**Archivo:** `components/before-after.tsx`

Reemplazar con slider + fotos reales de trabajos del salón.

Slider: mismo diseño actual pero con fotos de Ivan + título del servicio realizado:
- "Balayage — 3 sesiones" o "Corte + keratina — post-tratamiento"
- Con nombre del estilista que lo hizo

### Ticket F4.3: Página Nosotros Real (6h)
**Archivo:** `app/nosotros/page.tsx`

Contenido real:
- Historia del salón (cuándo abrió, por qué Magnolia, filosofía)
- Foto de la dueña / equipo con nombres
- Perfil de cada estilista: nombre, spesialidad, años de experiencia, foto
- Valores/misión: qué creen sobre el cuidado capilar
- Premios o certificaciones (si hay)

### Ticket F4.4: Video Testimonios (4h production + 4h integration)
**Nuevo componente:** `components/video-testimonials.tsx`

Necesario: Kiki graba 4-6 clientas reales en el salón (video vertical 30s, celular).

Elección de	clientas a buscar:
- Clienta de 3+ años (lealtad = credibilidad)
- Clienta de transformación grande (antes/después conocido)
- Clienta que refiere (ha traido amigas)

Integración: hospedar en Cloudflare R2 o directamente como archivos estáticos en el sitio.

### Ticket F4.5: Blog SEO (8h)
**Page nueva:** `app/blog/page.tsx` + posts individuales

Categorías:
- "Guía: Cómo cuidar tu coloración en casa"
- "Tendencias 2026: Los tonos que más pediron"
- "¿Balayage o mechas clásicas? Guía para decidir"
- "Cómo preparar tu cabello antes de un tratamiento keratina"
- " señales de que tu cabello necesita un tratamiento profundo"

Specs:
- Página de listado por categoría
- Posts individuales en `/blog/[slug]`
- SEO: meta description única, Open Graph image por post, JSON-LD Article
- Canonical links
- Internal linking

### Ticket F4.6: Instagram Feed Real (6h)
**Componente:** `components/instagram-feed.tsx`

Opciones:
1. **Instagram Basic Display API** (requiere cuenta Business de Meta, token refresh)
2. **Bejometer / Similar servicio** (widget embed de terceros — $5-20/mes)
3. **Manual simple:** Embed del perfil público como widget estático con última foto actualizada manualmente 1x/semana

**Recomendación:** Opción 3 (manual simple) — 0 costo, 0 mantenimiento técnico, Kiki actualiza cuando quiere. Perfeccionamos cuando ya hay fotos reales del salón.

### Ticket F4.7: Gift Cards (6h)
**Page nueva:** `app/gift-cards/page.tsx`

Flow:
1. Clienta selecciona denomination: Gs. 50.000 / 100.000 / 200.000 / personalizadas
2. Ingresa nombre + teléfono de quien recibe
3. Paga (simulado: link a WhatsApp para coordinar pago)
4. Magnolia recibe la orden y envía gift card por WhatsApp/email

Implementación inicial simple:
- Form → guarda en Supabase → WhatsApp a Magnolia
- Magnolia genera la gift card manually en WhatsApp
- Costo: $0

Expandir a pago real con Nequi/yape cuando el volumen lo justifique.

### Deliverables F4:
```
[ ] Galería con fotos reales del salón
[ ] Before/After con trabajos reales
[ ] Página Nosotros con contenido real + perfiles
[ ] 4-6 video testimonios reales
[ ] 5 posts de blog publicados
[ ] Instagram feed real actualizado
[ ] Página de Gift Cards operativa
```

---

## FASE 5 — Automation + Growth (Mes 3-4)
**Responsable: Erebus (dev) + proceso de Ivan**  
**Esfuerzo estimado: 25-40 horas**  
**Costo: $0-30/mes**

### Ticket F5.1: Chatbot WhatsApp CRM Completo (20h)
**Herramienta:** AgentCall (número existente de Magnolia)

Conversational flow:
```
Clienta: Hola
Bot: Hola! Soy el asistente de Magnolia. Cómo te ayudo?
  → Quiero reservar
  Bot: Qué servicio buscas? (Balayage / Corte / Color / Tratamiento / Completo)
  Clienta: Balayage
  Bot: Tenemos disponible [FECHA]. Qué día te queda bien?
  Clienta: Mañana
  Bot: Tenemos 10:00, 14:00, 16:00. Cuál preferís?
  Clienta: 14:00
  Bot: Perfecto! Tu turno: [FECHA] a las 14:00. Tu nombre y teléfono para confirmar?
  Clienta: María, +595xxx
  Bot: Confirmado! Te esperamos en Magnolia. Te envío recordatorio 24h antes.

→ Quiero saber mis puntos
  Bot: Hola María! Tenés 3 de 5 sellos. 2 más y es gratis el próximo corte!

→ Mi turno es mañana a las 10
  Bot: Confirmado! Nos vemos mañana. Recordá llegar 5 min antes.
```

### Ticket F5.2: Sistema de Referidos (6h)
**Tabla Supabase:** `referidos`

Mecánica:
- Clienta existente comparte link único: `magnolia.py/res/FULANO`
- Amiga reserva un servicio
- Clienta original recibe Gs. 30.000 de crédito para su próximo servicio
- Amiga recibe 15% off en su primer servicio

Implementación:
- Dashboard para referral links
- Tracking de quién registró a quién
- Auto-crédito después de que amiga completa el servicio

### Ticket F5.3: Página "Grupos / Fiestas de Amigas" (4h)
**Page nueva:** `app/grupos/page.tsx`

Landing page para reservados de grupos:
- "Traé 3 amigas = 20% off para todas"
- "Fiesta de cumpleaños en Magnolia"
- Reservación de grupo: fecha + cuántas personas

### Ticket F5.4: Staff Scheduling (Client Side) (10h)
**Page nueva:** `app/admin/staff/page.tsx`

Para que las estilistas vean sus turnos:
- Login mínimo (contraseña compartida, no individual)
- Vista semanal con turnos de cada estilista
- Capacidad de marcar turnos como completados

### Ticket F5.5: Analytics + Dashboard de Negocio (8h)
**Page nueva:** `app/admin/stats/page.tsx`

Métricas:
- Reservas alasan → mes, revenue estimado (Gs.)
- No-shows por mes
- Servicio más popular
- clientas recurrentes vs nuevas
- Reseñas Google (score promedio)
- Tasa de preenchimiento del calendario

Visualización: gráficos simples con Recharts o similar.

### Deliverables F5:
```
[ ] Chatbot WhatsApp completo con booking, puntos, recordatorios
[ ] Sistema de referidos funcionando
[ ] Página Grupos / Fiestas de Amigas
[ ] Staff scheduling basic
[ ] Dashboard de métricas de negocio
```

---

## RESUMEN DE ESFUERZO + TIMELINE

| Fase | Semana | Horas | Entregables |
|---|---|---|---|
| **F0** Foto Real | 0 | 2-4h fotos | Fotos reales del salón |
| **F1** Quick Wins | 1-2 | 8-12h | Badge abierto, mapa real, CTA mobile, packages, testimonios corregidos |
| **F2** Booking Online | 3-4 | 20-30h | Migración Vercel, Supabase, API routes, widget booking, WhatsApp auto |
| **F3** CRM + Fidelización | 5-6 | 15-20h | Programa sellos, encuesta post-servicio, recordatorios, admin básico |
| **F4** Contenido Real | 7-10 | 20-30h | Galería real, before/after, Nosotros real, videos, blog, gift cards |
| **F5** Automation + Growth | Mes 3-4 | 25-40h | Chatbot CRM completo, referidos, grupos, staff, analytics |

**Total estimado: 90-136 horas de desarrollo** (~3-5 sprints de 2 semanas)

---

## COSTOS RECURRENTES

| Servicio | Costo | Fase |
|---|---|---|
| Supabase (free tier) | $0 | F2 |
| Vercel ( hobby tier, ~2 deploys/day) | $0 | F2 |
| AgentCall inbound AI ($0.40/min) | $0-20/mes (uso moderado) | F5 |
| Gift Cards (si agregamos Stripe después) | $0.5% por transacción | F4 |
| Cloudflare Pages (alternativa a Vercel) | $0 | F2 |
| Dominio .com.py | $15-20/año (si migramos fuera de CF Pages) | F5 |

---

## DEPENDENCIAS CRÍTICAS (qué bloquea qué)

```
F0 (Fotos de Ivan)
  ├── F1.1 (Hero con fotos reales)
  ├── F1.3 (Gallery con fotos reales)
  ├── F1.7 (Testimonios reales)
  ├── F2.4 (Before/After real)
  └── F4.3 (Nosotros real)

Decisión F2 (Opción A vs B)
  ├── F2.1 (Migración Vercel)
  └── F2.2 (Supabase setup)

F2.2 (Supabase)
  ├── F2.3 (API routes — dependen de DB)
  ├── F3.1 (Fidelización)
  ├── F3.2 (Encuesta post-servicio)
  ├── F3.3 (Recordatorios)
  └── F5.2 (Sistema referidos)

F5.1 (AgentCall)
  └── F5.2 (Gift Cards con mensaje auto)
```

---

## PRIORIDADES DE IVAN (para que él decida)

**Necesito que Ivan me diga esta semana:**

1. **Fotos del salón** — ¿Cuándo pueden hacer la sesión? Esto bloquea F1, F4. Sin fotos reales, puedo trabajar en todo el engine (F2, F3) pero no puedo tocar front-end visual.

2. **Decisión booking** — ¿Quieren booking embed externo (Calendly/Anolla, 4h, funciona en 1 semana) o booking propio (Supabase, 20-30h, más control)?

3. **Dirección real** — ¿Cuál es la dirección exacta del salón para el mapa?

4. **Google Business Profile URL** — ¿Cuál es el link directo a las reseñas de Google de Magnolia?

5. **Presupuesto de branding** — ¿Quieren que diseñe una gift card física/digital con branding profesional (~$50-150) o lo dejamos simple para empezar?

---

*Documento vivo — actualizar con cada sprint.*  
*Próxima revisión: cuando Ivan apruebe Fase 1 y me pase las fotos.*