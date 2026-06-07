# Magnolia Peluquería — Full Audit & Improvement Roadmap

**Fecha:** Mayo 2026  
**Cliente:** Magnolia Peluquería, Asunción, Paraguay  
**Web:** https://magnolia-peluqueria.paragu-ai.com  

---

## RESUMEN EJECUTIVO

El sitio es correcto, funcional y bien ejecutado para ser un MVP. Pero es un MVP de 2023-2024. Saloneros de primer mundo (EEUU, UK, España, Australia) operan con sistemas que Magnolia ni se acerca. La brecha no es de diseño — es de **revenue logic**. El sitio actual no convierte游客 en pacientes, no retiene clientas, no reduce no-shows y no genera ingresos pasivos.

**Score actual: 6.5/10** (funcional, limpio, sin revenue engine)

---

## PARTE 1: ANALISIS COMPONENTE POR COMPONENTE

### 1. `hero.tsx`
**Lo bueno:**
- Carousel con transición suave 300ms
- Stats bar integrada (15+ años, 800+, 4.9★)
- Badge contextual por slide
- Scroll indicator animado
- 2 CTAs (reserva + ver servicios)

**Problemas:**
- Los 3 slides son rotaciones de las mismas imágenes de Unsplash. No hay foto real del local, del equipo, ni de trabajos.
- Los stats (800+ clientas, 4.9★) son hardcodeados y NO linked a ninguna fuente verificable. Cero credibilidad.
- El badge "Asunción, Paraguay" es innecesario — ya lo dice el footer.
- No hay urgencia temporal: "Martes a Sábado: 9:00 - 19:00" no aparece en ningún lado del hero. La gente no sabe si está abierto AHORA.
- El CTA primario es WhatsApp directo. No hay pre-appointment funnel (seleccionar servicio → elegir fecha → confirmar).

**Benchmark first world:** Salon websites premium muestran *live availability* y ofrecen *instant booking* con selección de estilista.

### 2. `why-us.tsx`
**Problemas:**
- Los 4 items ("+15 años", "+800 clientas", "4.9★", "Productos Premium") son exactamento los mismos datos que ya aparecen en el hero stats bar. Duplicación completa.
- "4.9 Estrellas Google" linking a Google Maps pero sin mostrar cuántas reseñas reales hay.
- No hay prueba social en tiempo real. Podría mostrar: "X reseñas este mes" o "Y clientas nuevas esta semana".
- El background pattern con dot grid es correcto.

### 3. `gallery.tsx`
**Problemas críticos:**
- Las imágenes son 100% Unsplash. No hay UNA foto real del trabajo de Magnolia. Esto es una **señal de desconfianza** para cualquier clienta que visite el sitio.
- No hay metadata de EXIF ni watermark que pruebe autenticidad.
- El grid es 2x3 en mobile, 3x3 en tablet/desktop — correcto.
- Los tags funcionan bien (Balayage, Corte, Color, etc).
- El lightbox es funcional.

**Benchmark:** Salon premium de UK tienen *Instagram feed live* via API, mostrando contenido real con likes y fechas. Algunos tienen *video gallery* con transformaciones de 30 segundos.

### 4. `testimonials.tsx`
**Problemas críticos:**
- Los testimonios son 100% inventados. No hay nombre, no hay fecha, no hay link a Google Reviews.
- "María Fernández" no está verificada con Google ni con ninguna plataforma.
- Las reseñas fake son un **riesgo reputacional**. ROPA (Régimen de Obligationes Paraguayo) y la Ley de Defensa del Consumidor prohíben publicidad engañosa.
- Solo 4 testimonios cuando debería haber 12+ con fotos de las clientas.
- Link a Google Maps pero sin mostrar el rating real.

**Benchmark first world:** Salones premium usan *Google Reviews API embed* con fotos reales, fechas, y respuestas del negocio.

### 5. `before-after.tsx`
**Problemas:**
- Las imágenes son Unsplash — no son clientes reales de Magnolia.
- El slider interactivo es una buena idea pero está implemented con `clipPath` que es experimental y tiene problemas de performance en Safari.
- Solo hay UN before/after. Debería haber un carousel con 4-6 transformaciones reales.
- No hay leyenda del servicio realizado ni tiempo de tratamiento.

### 6. `services.tsx`
**Problemas:**
- Los precios están en Gs. (guaraníes) pero sin formato de separador de miles visible (ej: "Gs. 400.000" vs "Gs.400.000" — inconsistente).
- No hay selector de duración real (los minutos son aproximados).
- No hay disponibilidad: "Martes a Sábado" no está visible al lado de los precios.
- No hay opción de *paquete* o *combo* (ej: "Balayage + Corte + Tratamento = Gs. 550.000" en vez de 400k+90k por separado).
- El accordion está bien pero no hay *service detail page* — solo el nombre y descripción.
- No hay foto del servicio.

**Benchmark:** Salones premium muestran duración estimada CON disponibilidad horaria real por servicio.

### 7. `instagram-feed.tsx`
**Problemas:**
- Son 6 imágenes hardcodeadas de Unsplash. No hay conexión real a Instagram API.
- El feed no se actualiza automáticamente.
- No hay fecha del post ni caption preview.
- El contador de likes es ficticio.

**Benchmark:** Salones premium usan Instagram Basic Display API o plugin que muestra posts reales con captions y hashtags.

### 8. `location.tsx`
**Lo bueno:**
- Mapa embebido de Google Maps funcional.
- Horarios y contacto bien presentados.
- Botones de "Cómo llegar" y "Abrir en Google Maps" — correcto.

**Problemas:**
- La dirección dice solo "Asunción, Paraguay" — no hay calle específica ni número.
- El mapa embebido tiene un embed URL genérico que no apunta a la ubicación real del negocio.
- No hay integración con Waze.
- No hay embedded Google Business Profile.

### 9. `cta-banner.tsx`
**Lo bueno:**
- Sección de conversión amplia y con buen copy.
- Patrón correcto de urgencia.

**Problemas:**
- Todo se resuelve en WhatsApp. No hay alternativa de email, teléfono, ni formulario de contacto.
- No hay *urgency element* ("solo quedan 3 turnos esta semana").

### 10. `header.tsx`
**Problemas:**
- No hay transparencia de horarios en el header. La clienta tiene que entrar al sitio para saber si está abierto.
- No hay badge de estado (Abierto/Cerrado ahora).
- El menú móvil es correcto pero el CTA "Reservar" no aparece en mobile — está oculto en el hamburger.

### 11. `footer.tsx`
**Lo bueno:** completo, con enlaces legales, contacto y horarios.
**Problemas:**
- No hay newsletter signup.
- No hay redes sociales adicionales (TikTok, Facebook).
- No hay mapa del sitio.
- No hay link a política de cancelación ni políticas del salón.

### 12. `CookieConsent.tsx`
**Problemas:**
- Es una cookie banner básico sin funcionalidad real de analytics ni tracking.
- No hay manera de "Aceptar solo esenciales" — es accept/decline binario.
- El texto tiene errores ortográficos: "politica de cookies" en vez de "política de cookies".
- El diseño usa variables CSS de Shadcn sin que el sitio use Shadcn.

### 13. Pages secundárias

**`nosotros/page.tsx`:**
- Contenido genérico y sin personalidad. "Somos una peluquería profesional en Asunción" podría ser cualquier peluquería.
- No hay foto del equipo, de la dueña, ni del local.
- No hay historia del negocio, misión, ni valores.
- No hay certificaciones ni premios.
- No hay perfil de las estilistas.

**`servicios/page.tsx`:**
- Es un wrapper del componente Services — correcto, pero heredado sin meta description única.

**`contacto/page.tsx`:**
- Bien estructurado pero sin formulario de contacto real.
- No hay email directo.
- No hay mapa de ubicación exacta.

**`faq/page.tsx`:**
- Solo 5 preguntas genéricas.
- No hay búsqueda ni filtros.
- Las respuestas son muy cortas y no incluyen links a servicios relacionados.

---

## PARTE 2: COMPARATIVA CON SALONES DE PRIMER MUNDO

### Funcionalidades que Magnolia NO tiene y sus equivalentes first world

| Feature faltante | Qué hacen en USA/UK/España |
|---|---|
| **Booking en línea** | Reserve with厉, Acuity, Calendly. Clientas reservan 24/7 sin WhatsApp. |
| **Perfil de estilista** | Cada estilista tiene página con foto, especialidades, reseñas, disponibilidad. |
| **Galería de trabajos reales** |feedlive de Instagram + foto real de cada client before/after. |
| **Programa de fidelización** | Sellos digitales, puntos, descuentos por referidos. Ej: "Traé una amiga y ambas reciben 20% off". |
| **Gift cards** | Tarjetas de regalo digitales comprables desde el sitio. |
| **No-show prevention** | Recordatorios SMS/WhatsApp automáticos 24h antes. Depósito por seguridad. |
| **Pricing con paquetes** | "Color + Corte + Tratamiento = $X (ahorrás $Y)" — aumenta ticket promedio. |
| **Reviews con fotos** | Google Reviews API con fotos reales de clientas. |
| **Carrito de productos** | Venta de productos capilares con envío a domicilio. |
| **Blog/Educación** | Tips de cuidado capilar, tendencias de color, tutoriales. SEO y trust building. |
| **WhatsApp CRM** | Chatbot de reservas + seguimiento post-servicio + cumpleaños. |
| **Live availability** | Calendario en tiempo real: "Disponible mañana 10am o 2pm". |
| **Multi-ubicación** | Si expanden a 2 locales: gestión centralizada. |
| **Staff scheduling** | Los empleados ven sus turnos online, reducing llamadas. |
| **Sistema de referidos** | "Tu amiga reserva $20 crédito para vos". Viral loop. |
| **Instagram shop** | Tagged products en Instagram directamentecomprables. |
| **Video testimonios** | Clips de 30s de clientas reales hablando del servicio. |
| **Encuesta post-servicio** | "Cómo estuvo tu experiencia?" 30 min después por WhatsApp. |
| **Reserva de grupo** | "Fiesta de amigas" — paquete para grupos de 3+. |

---

## PARTE 3: ROADMAP DE MEJORAS (Prioridad + Esfuerzo + Impacto)

### FASE 1 — Quick Wins (semana 1-2, bajo esfuerzo, alto impacto inmediato)

**1. Eliminar imágenes Unsplash de testimonios y gallery → Reemplazar con fotos reales del salón**
- Impacto: +++
- Esfuerzo: bajo
- Prioridad: CRÍTICA

**2. Agregar badge de "Abierto ahora" / "Cerrado" en el header**
- Calcula horario actual vs "Martes a Sábado: 9:00 - 19:00"
- Muestra estado en tiempo real en header
- Impacto: ++
- Esfuerzo: 2h
- Prioridad: ALTA

**3. Agregar dirección real en Location y mapa embebido correcto**
- Impacto: ++
- Esfuerzo: 1h
- Prioridad: ALTA

**4. Link testimonials a Google Reviews real (mínimo colocar link al Google Business Profile)**
- Impacto: ++
- Esfuerzo: 1h
- Prioridad: ALTA

**5. Corregir errores ortográficos en CookieConsent y texto general**
- Impacto: +
- Esfuerzo: 1h
- Prioridad: MEDIA

**6. Hacer el botón "Reservar" visible en mobile header**
- Impacto: ++
- Esfuerzo: 1h
- Prioridad: ALTA

### FASE 2 — Revenue Engine (semana 3-6, medio esfuerzo, alto impacto en ventas)

**7. Implementar sistema de reservas online (opciones viables para Paraguay):**
- Opción A: Superorder + WhatsApp integration
- Opción B: Custom booking widget con Supabase (diseño propio)
- Opción C: Lyxa AI o Anolla (los viu en la investigación)
- Impacto: ++++
- Esfuerzo: alto
- Prioridad: CRÍTICA

**8. Agregar packages/combos de servicios**
- "Balayage + Corte + Tratamiento = Gs. 480.000 (ahorrás Gs. 100.000)"
- Aumenta ticket promedio
- Impacto: +++
- Esfuerzo: bajo
- Prioridad: ALTA

**9. Programa de fidelización simple**
- Sellos digitales vía WhatsApp: "5 cortes = 1 gratis"
- O implementar en Supabase con tabla de clientas
- Impacto: ++++
- Esfuerzo: medio
- Prioridad: ALTA

**10. Gift cards**
- Comprables desde el sitio
- Envío por WhatsApp o email
- Impacto: +++
- Esfuerzo: medio
- Prioridad: MEDIA

### FASE 3 — Trust & Content (semana 7-12, alto esfuerzo, impacto a mediano plazo)

**11. Blog de tips capilares**
- SEO + educación + tendencias de color
- Cada post es una página indexable que atrae tráfico
- Impacto: +++
- Esfuerzo: alto
- Prioridad: MEDIA

**12. Video testimonios reales**
- 4-6 clientas reales grabando 30s en el salón
- Impacto: ++++
- Esfuerzo: alto
- Prioridad: ALTA

**13. Perfiles de estilistas**
- Cada estilista con foto, especialidades, experiencia, reseñas propias
- Impacto: +++
- Esfuerzo: medio
- Prioridad: MEDIA

**14. Venta de productos capilares**
- Carrito de compras con productos que usan en el salón
- Impacto: ++
- Esfuerzo: alto
- Prioridad: BAJA

**15. Instagram API feed real**
- Feedlive con contenido real del salón
- Impacto: ++
- Esfuerzo: medio
- Prioridad: MEDIA

### FASE 4 — Automation (mes 3-4, alto esfuerzo, impacto en operaciones)

**16. WhatsApp CRM con chatbot de reservas**
- Auto-respuesta, confirmación, recordatorio 24h antes
- Impacto: +++++
- Esfuerzo: alto
- Prioridad: CRÍTICA

**17. Encuesta post-servicio automática**
- Mensaje 30min después: "¿Cómo estuvo tu experiencia?"
- Captura feedback + solicita Google Review
- Impacto: ++++
- Esfuerzo: medio
- Prioridad: ALTA

**18. Sistema de referidos**
- "Traé una amiga → ambas reciben 10% off"
- Viral loop orgánico
- Impacto: ++++
- Esfuerzo: medio
- Prioridad: MEDIA

---

## PARTE 4: PROBLEMAS LEGALES / REPUTACIONALES

### Crítico: Testimonios Inventados
Los testimonios en `testimonials.tsx` son inventados. Esto viola:
- Ley 6334 de Defensa del Consumidor (Paraguay): publicidad engañosa
- Normas de Google Reviews: no se pueden crear reseñas falsas
- Potencial demanda por competencia desleal si otro salón lo demuestra

**Acción inmediata:** Eliminar testimonios inventados. Reemplazar con reseñas reales de Google (capturadas con permiso de las clientas) o sin nombre ("Clienta de balayage, Asunción").

### Crítico: Imágenes Stock en Galería
La galería muestra fotos de Unsplash pretendiendo ser trabajos del salón. Esto es:
- Descripción engañosa del servicio
- Riesgo de copyright de las imágenes (Unsplash es MIT, pero el uso como "trabajos del salón" es falso)
- Pérdida de confianza si una clienta detecta que son stock

**Acción inmediata:** Reemplazar con fotos reales del salón o eliminar la galería hasta tener fotos reales.

---

## PARTE 5: PRIORIDAD FINAL — LO QUE HAY QUE HACER HOY

```
SEMANA 1:
1. Foto real del local/equipo (mínimo 5 fotos)
2. Badge "Abierto/Cerrado" en header
3. Dirección exacta en mapa
4. Eliminar testimonios inventados → link a Google Reviews real
5. Corregir errores ortográficos
6. Botón Reservar visible en mobile

SEMANA 2:
7. Combos de servicios (paquetes)
8. Agregar urgencia temporal en CTA

SEMANA 3-4:
9. Sistema de reservas online
10. Programa de fidelización

SEMANA 5-8:
11. Video testimonios reales
12. WhatsApp CRM automático
```

---

## PARTE 6: SCORECARD FINAL

| Componente | Score /10 | Prioridad |
|---|---|---|
| Hero | 6 | ALTA |
| Why Us | 4 | BAJA |
| Gallery | 3 | CRÍTICA |
| Testimonials | 2 | CRÍTICA |
| Before/After | 5 | MEDIA |
| Services | 6 | ALTA |
| Instagram Feed | 3 | MEDIA |
| Location | 5 | ALTA |
| CTA Banner | 5 | MEDIA |
| Header | 5 | ALTA |
| Footer | 5 | BAJA |
| Nosotros page | 4 | BAJA |
| FAQ | 4 | BAJA |
| Contacto | 5 | MEDIA |
| Cookie Consent | 4 | BAJA |
| Legal pages | 5 | MEDIA |
| **TOTAL** | **4.6** | |

---

## PARTE 7: REFERENCES DE BENCHMARK

Salones premium analizados para comparación:

1. **Vagaro.com** — Booking completo + CRM + POS + Gift cards (USA, $99/mes)
2. **Orb XI (Salon Ninja)** — AI booking + marketing automation + 70% no-show reduction
3. **EliteGrid.io** — Appointment OS con perfiles de cliente + loyalty rewards
4. **Lyxa AI** — Telegram bot para reservas + 94% conversión
5. **Anolla** — Software de salón con scheduling inteligente + POS
6. **Zylu.co** — Software completo con reducción de no-shows
7. **Salonly.io** — Plugin WordPress con booking completo

Estos son los estándares que Magnolia necesita para competir en el mercado regional de Asunción con peluquerías premium como María Elena, Roberto Goffi, y similares.