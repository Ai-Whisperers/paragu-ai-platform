# ROAST PROFESIONAL — Sitio base para barbería Laguna Grande

**Fecha:** 2026-07-13  
**Base auditada:** Arno's Barber Shop + comparación con Portas Barber, Nde Barba y Magnolia Peluquería  
**Live actual:** https://arnos.paragu-ai.com/  
**Estado:** demo comercial; no representa todavía al nuevo barbershop de Laguna Grande.

## 1. Veredicto

La versión anterior era un lead template, no un producto terminado. Tenía infraestructura útil — Next.js, WhatsApp, sitemap, robots y analytics — pero visualmente parecía un clon genérico y publicaba datos sin suficiente trazabilidad. La profesionalización debe conservar el motor y reemplazar por completo la experiencia, el contenido y la capa de confianza.

| Eje | Antes | Objetivo |
|---|---:|---:|
| Identidad y diferenciación | 28/100 | 85/100 |
| Confianza y evidencia | 24/100 | 90/100 |
| Conversión móvil | 52/100 | 90/100 |
| SEO local | 46/100 | 88/100 |
| Contenido verificable | 22/100 | 95/100 |
| Arquitectura de producto | 38/100 | 92/100 |
| **Score global** | **35/100** | **90/100** |

## 2. Roast — problemas prioritarios

### Tier S — destruyen confianza

1. **Era un clon de Portas/Nde Barba.** Misma estructura, mismos componentes, misma paleta base, mismos bloques. Cambiar nombre y color no crea una marca.
2. **Cero prueba visual real.** La galería recibía strings, el componente esperaba objetos y terminaba usando Picsum. Un negocio visual no puede vender precisión con fotos aleatorias.
3. **Residuos de otro negocio.** Había fallbacks de Estudio Medieval, iconografía de espada y textos de tatuajes en clones hermanos.
4. **Datos estructurados incorrectos.** Canonical y OG alternaban entre tres hostnames; teléfono, ciudad, coordenadas e Instagram no estaban sustentados por el contenido verificado.
5. **Claims inventados o no trazables.** Servicios, precios, marcas de producto, reseñas y horarios aparecían como hechos. Para una demo comercial deben marcarse como pendientes o eliminarse.

### Tier A — reducen reservas

6. **Hero sin fotografía ni composición editorial.** Un fondo azul plano y texto centrado no comunica oficio, técnica ni atmósfera.
7. **Propuesta de valor vacía.** “Atención profesional” es un mínimo esperado, no una razón para elegir el local.
8. **WhatsApp sin precalificación.** Todos los CTA enviaban un mensaje genérico; el sitio no ayudaba a elegir servicio ni a reducir ida y vuelta.
9. **Navegación móvil comprimida.** La versión inline del header podía mostrar links apretados; el componente alternativo contenía un `setState` durante render.
10. **No existía proceso de reserva.** El visitante no sabía qué información enviar, cómo se confirma, cuánto tarda ni qué pasa después.
11. **Sin ubicación útil.** “Fernando de la Mora” era demasiado amplio y el JSON-LD apuntaba a Asunción.

### Tier B — limita crecimiento

12. **Una sola ruta.** Sin páginas de servicio, equipo, políticas, galería o ubicación con profundidad SEO.
13. **Sin barbero seleccionable.** Los referentes fuertes permiten ver perfiles y reservar con un profesional específico.
14. **Sin booking real.** WhatsApp sirve para lanzamiento; el siguiente nivel es agenda 24/7, disponibilidad, recordatorios y seña.
15. **Sin retención.** No hay membresía, paquetes, referidos, gift cards, productos ni recordatorio de próximo corte.
16. **Sin medición de embudo completa.** Solo click de WhatsApp; faltan evento de servicio, Maps, galería, scroll, inicio de reserva y confirmación.
17. **Sin políticas.** Cancelación, tardanza, walk-ins, niños, acompañantes y medios de pago deben estar claros.

## 3. Comparación competitiva

| Patrón | Arno's anterior | Magnolia | Club Varsovia | Barberos de López | Recomendación |
|---|---|---|---|---|---|
| Hero visual | No | Sí | Marca/ritual | Marca/expansión | Composición editorial + fotos reales |
| Servicios y precios | Parcial, inventado | Completo | Rituales | Membresía | Catálogo verificable por duración/precio |
| Equipo/barberos | No | Sí | Maestros por sede | Sí, implícito | Perfil + especialidad + agenda |
| Reserva | WhatsApp genérico | Booking | Reserva directa | Turno/membresía | WhatsApp ahora, agenda 24/7 después |
| Galería real | No | Sí | Limitada | Limitada | Prioridad P0 con fotos autorizadas |
| Locales/Maps | Inconsistente | Sí | Dos sedes | Multi-sede | Ubicación exacta + cómo llegar |
| Retención | No | Gift/rewards | Gift card/newsletter | Membresía ilimitada | Pack mensual luego de validar demanda |
| SEO local | Básico | Amplio | Marca | Muy agresivo | Páginas útiles, no keyword stuffing |

## 4. Arquitectura objetivo

### Fase 0 — Demo profesional segura

- Home editorial, mobile-first.
- Catálogo base con **Consultar**, nunca precio inventado.
- Mensaje WhatsApp por servicio.
- Proceso de reserva en cuatro pasos.
- Galería vacía honesta con llamada para enviar fotos.
- Ubicación por zona + Maps search, sin coordenadas falsas.
- FAQ de objeciones.
- BarberShop JSON-LD sin ratings, geo, Instagram o priceRange inventados.
- Sitemap, canonical, OG, seguridad y analytics.

### Fase 1 — Datos del nuevo barbershop Laguna Grande

Reemplazar Arno's solo cuando tengamos:

1. Nombre comercial exacto y logo.
2. Propietario y equipo.
3. WhatsApp, teléfono, Instagram y correo.
4. Dirección exacta, Maps y estacionamiento.
5. Horarios y política de walk-ins.
6. Servicios, precios y duración.
7. Medios de pago y política de cancelación.
8. 12–20 fotos reales: exterior, interior, barber, herramientas y resultados.
9. Autorización para reseñas y fotos de clientes.
10. Dominio elegido.

### Fase 2 — Conversión

- `/servicios` con páginas por intención: corte, fade, barba, combo.
- `/barberos` con perfil y especialidad.
- `/galeria` filtrable por corte/estilo.
- Reserva con servicio → barbero → fecha/hora → datos → confirmación.
- Google Calendar o ReservaSimple/Booksy/Setmore según costo.
- Recordatorio 24h y 2h.
- Seña para horarios de alta demanda.
- Estado de “abierto ahora” desde horarios reales.

### Fase 3 — Retención y operación

- Historial básico del cliente y preferencia de corte.
- Recordatorio de mantenimiento en 2–4 semanas.
- Programa de referidos.
- Packs o membresía solo con análisis de capacidad y margen.
- Gift cards.
- Catálogo de productos si realmente venden.
- Dashboard: reservas, no-shows, ticket promedio, recurrencia, fuente del lead.

### Fase 4 — Escala

- Multi-sede y disponibilidad por sucursal.
- Plan corporativo.
- Academia/cursos si existe capacidad real.
- WhatsApp AI para preguntas y reprogramaciones, con handoff humano.
- SEO por zona y servicio con contenido útil.
- Campañas con audiencias de reservas confirmadas, respetando consentimiento.

## 5. Backlog de features

| Prioridad | Feature | Impacto | Dependencia |
|---|---|---|---|
| P0 | Identidad y datos reales | Confianza | Propietario |
| P0 | Fotos reales optimizadas | Conversión | Sesión fotográfica |
| P0 | Servicios/precios/duración | Decisión | Propietario |
| P0 | Dirección + Maps + horarios | Visita física | Propietario |
| P0 | WhatsApp por servicio | Reservas | Datos básicos |
| P1 | Agenda online 24/7 | Menos fricción | Disponibilidad |
| P1 | Perfiles de barberos | Elección/confianza | Equipo |
| P1 | Recordatorios | Menos no-show | Agenda |
| P1 | Seña | Protege horario | Pago + política |
| P1 | Galería por estilo | Prueba visual | Fotos |
| P1 | Review acquisition | Reputación | Google Business |
| P2 | Membresía/packs | Recurrencia | Capacidad/margen |
| P2 | Referidos | Adquisición | CRM básico |
| P2 | Gift cards | Ingreso anticipado | Pago |
| P2 | Productos | Ticket promedio | Inventario |
| P3 | Multi-sede | Escala | Nueva sede |
| P3 | Corporate | B2B | Operación madura |
| P3 | Academia | Nueva línea | Instructores/certificación |

## 6. Definition of done

- Build y tests en verde.
- Ningún texto de Estudio Medieval, Portas o Nde Barba.
- Ningún precio, rating, review, producto o profesional inventado.
- Canonical, OG y JSON-LD usan un solo dominio.
- Todos los CTA WhatsApp tienen mensaje específico.
- Todos los targets táctiles ≥44 px.
- Screenshots verificados a 375×812, 768×1024 y 1280×800.
- Sin overflow horizontal, imágenes rotas ni errores de consola.
- Después de datos reales: dominio, Maps, fotos, políticas y agenda verificados en producción.
