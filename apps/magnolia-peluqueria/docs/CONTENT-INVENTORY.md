# Magnolia Peluquería — Content Inventory & SEO Strategy

**Version:** 1.0 | Mayo 2026  
**Purpose:** Define all content types, SEO targets, and content gaps

---

## 1. Content Audit

### 1.1 Current Content Status

| Section | Content Type | Completeness | Quality | Priority |
|----------|-------------|--------------|---------|----------|
| Hero | 3 slides (Unsplash) | ✅ Complete | ⭐⭐⭐ Placeholder | Alta |
| Services | 9 items, 3 categories | ✅ Complete | ⭐⭐⭐⭐ Real prices | Alta |
| Gallery | 12 Unsplash photos | ⚠️ Placeholder | ⭐⭐ No real photos | Alta |
| Testimonials | 4 reviews | ⚠️ Fake names | ⭐⭐⭐ Generic | Alta |
| Team | 3 profiles | ⚠️ Placeholder | ⭐ No real people | Alta |
| Promotions | 2 active offers | ✅ Complete | ⭐⭐⭐⭐ Real | Alta |
| Loyalty | 1 section | ⚠️ No program defined | ⭐⭐ Concept only | Media |
| Gift Cards | 1 section | ⚠️ Inquiry only | ⭐⭐ Concept | Media |
| FAQ | 5 questions | ✅ Complete | ⭐⭐⭐⭐ Real | Media |
| Why Us | 4 trust items | ✅ Complete | ⭐⭐⭐⭐ Real | Baja |
| Instagram | Link only | ⚠️ Not linked | ⭐⭐⭐ Needs feed | Baja |
| Google Maps | Embed | ❌ Broken | N/A | Alta |

### 1.2 Content Gaps

| Gap | Impact | Effort | Priority |
|-----|--------|--------|----------|
| Real photos (gallery + team) | Trust | 2h (client provides) | 🔴 CRITICAL |
| Real testimonials (with names) | Trust + SEO | 30 min (client provides) | 🔴 CRITICAL |
| Google Maps embed | Directions | 15 min | 🔴 CRITICAL |
| Open/closed hours (live) | Credibility | 10 min | 🔴 CRITICAL |
| Booking system | Revenue | 1 week | 🔴 CRITICAL |
| Blog content | SEO | 1 week | 🟡 Media |
| i18n (English) | Market reach | 1 week | 🟡 Media |
| Promo codes (real) | Revenue | 2h | 🟢 Baja |

---

## 2. SEO Strategy

### 2.1 Target Keywords (Paraguay, Spanish)

| Keyword | Difficulty | Intent | Priority |
|---------|-----------|--------|----------|
| peluquería Asunción | Medium | Informational | 🔴 Alta |
| salón de belleza Asunción | Medium | Informational | 🔴 Alta |
| corte de pelo Asunción | Low | Transactional | 🔴 Alta |
| balayage Asunción | Low | Transactional | 🔴 Alta |
| keratina Asunción | Low | Transactional | 🔴 Alta |
| peluquería centro Asunción | Low | Local | 🔴 Alta |
| mejores peluquerías Asunción | Medium | Informational | 🟡 Media |
| tintura pelo Asunción | Low | Transactional | 🟡 Media |
| tratamiento capilar Asunción | Low | Transactional | 🟡 Media |
| regalo peluquería | Low | Transactional | 🟢 Baja |

### 2.2 Local SEO (Google Business)

- ** NAP:** Name, Address, Phone — consistent across all listings
- ** Hours:** Tuesday–Saturday 9:00–19:00
- ** Category:** Peluquería, Salón de belleza
- ** Attributes:** Women-owned, Appointment required
- ** Photos:** 10+ real photos (Phase 4)

### 2.3 Schema Markup Plan

```json
// Current: HairSalon + OpeningHoursSpecification
// Add Phase 3:
// - aggregateRating (real reviews)
// - LocalBusiness with priceRange "$$"
// - FAQPage for /faq
// - Service for each service type
// - Menu for services listing
```

### 2.4 Meta Tags Per Page

| Route | Title | Meta Description |
|-------|-------|-----------------|
| `/` | Magnolia Peluquería — Tu Mejor Look en Asunción | Expertos en cortes, coloración y tratamientos capilares en Asunción. Reserva tu turno por WhatsApp. Martes a sábado. |
| `/servicios` | Servicios — Magnolia Peluquería | Cortes desde Gs. 50.000, coloración, keratina y más. Precios claros, atención personalizada en Asunción. |
| `/nosotros` | Sobre Nosotros — Magnolia Peluquería | Conocé a Magnolia: peluquería profesional en el centro de Asunción con +5 años de experiencia. |
| `/faq` | Preguntas Frecuentes — Magnolia Peluquería | Respondemos las dudas más comunes sobre turnos, precios, técnicas y cuidado del cabello. |
| `/contacto` | Contacto — Magnolia Peluquería | Reservá tu turno, preguntanos cualquier cosa. WhatsApp, teléfono, mapa y formulario. |
| `/booking` | Reservar Turno — Magnolia Peluquería | Elegí servicio, fecha y horario. Te confirmamos por WhatsApp en minutos. |

---

## 3. Content by Funnel Stage

### TOFU (Awareness) — Blog + Instagram
- "5 señales de que tu cabello necesita keratina"
- "Corte rectangular vs. capas: cuál te queda mejor"
- "Cómo cuidar tu color entre visitas al salón"
- Target: hair care tips, Asunción beauty scene

### MOFU (Consideration) — Site pages + Testimonials
- Team credibility (real photos + bios)
- Before/after gallery
- Real testimonials with names
- Service pages with detailed descriptions

### BOFU (Decision) — Booking + Promotions
- Prominent WhatsApp booking CTA
- Active promotions → urgency
- Loyalty program → repeat visits
- Gift cards → gift giving occasions

---

## 4. Photo Requirements

### Gallery (12 photos needed)
| Photo | Type | Tags | Source |
|-------|------|------|--------|
| 1 | Salon interior | ambiente | Client |
| 2 | Salon exterior/entry | ambiente | Client |
| 3 | Cutting station | ambiente | Client |
| 4 | Woman getting haircut | cortes | Client |
| 5 | Man getting haircut | cortes | Client |
| 6 | Child haircut | cortes | Client |
| 7 | Color process | coloracion | Client |
| 8 | Balayage result | coloracion | Client |
| 9 | Keratina treatment | tratamientos | Client |
| 10 | Close-up hair styling | tratamientos | Client |
| 11 | Team photo | equipo | Client |
| 12 | Happy client | testimonios | Client |

### Team (3 profiles needed)
| Member | Data Needed |
|--------|------------|
| Owner/Senior stylist | Name, photo, specialty, years experience, languages |
| Colorist | Name, photo, specialty, years experience |
| Junior stylist | Name, photo, specialty |

---

## 5. Content Calendar (Blog)

| Week | Topic | Keywords | Type |
|------|-------|----------|------|
| 1 | 5 señales de que necesitas keratina | keratina Asunción | Educational |
| 2 | Corte rectangular vs. layers: guía completa | corte dama Asunción | Educational |
| 3 | Cómo mantener tu balayage perfecto | balayage Asunción | Educational |
| 4 | Qué regalo para alguien que ama su pelo | regalo peluquería | Gift guide |

---

*Document owner: Erebus — Ai-Whisperers*
*Last updated: Mayo 2026*