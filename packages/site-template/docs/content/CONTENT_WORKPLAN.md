# CONTENT WORKPLAN
## Site Template — Feature Showcase & Content Enhancement

**Generated:** 2026-06-02
**Purpose:** Expand on the content ideas analysis with detailed concepts, messaging frameworks, and implementation plans for showcasing features so users understand they can copy-paste and restyle the site to their needs.

---

## PART I: FEATURE SHOWCASE CONTENT

### The "Copy-Paste-Restyle" Value Proposition

The template's core message to visitors must be:

> **"This website you're looking at — we customize it for YOUR business. Same features, different look, your branding."**

To communicate this effectively, we need to SHOW not TELL. Every section should demonstrate the feature in action while also signaling "you can have this."

---

## SECTION 1: PRICING SECTION

### Why This Is Critical

Currently the site does NOT show pricing. A business owner visiting will ask "¿Cuánto cuesta?" and if they can't find it, they leave. Pricing transparency also signals professionalism — "we're confident in our value."

### Content Concept: "Planes Simple"

```
┌─────────────────────────────────────────────────────────┐
│  PLANES PARA TU PÁGINA WEB                             │
│  Elegí el plan que se adapte a tu negocio               │
├─────────────┬─────────────┬────────────────────────────┤
│   BÁSICO    │   PRO       │   PREMIUM                   │
│   G. 150k/mes│   G. 250k/mes│   G. 400k/mes              │
├─────────────┼─────────────┼────────────────────────────┤
│ ✓ Página web│ ✓ Todo Básico│ ✓ Todo Pro                  │
│ ✓ 5 páginas │ ✓ 15 páginas│ ✓ Paginas ilimitadas        │
│ ✓ WhatsApp  │ ✓ Reservas   │ ✓ Todo Pro                  │
│ ✓ Google SEO│ ✓ Programa  │ ✓ E-commerce completo        │
│             │   de lealtad│ ✓ Gift cards                 │
│             │ ✓ Pagos     │ ✓ Portal cliente            │
│             │   digitales │ ✓ Priority support           │
│             │             │                             │
│ [Empezar]   │ [Empezar]   │ [Contactar]                 │
└─────────────┴─────────────┴────────────────────────────┘
```

### Pricing Page Content Files

**`content/es/pricing.json`** (new file):
```json
{
  "title": "Planes para tu página web",
  "subtitle": "Elegí el plan que se adapte a tu negocio",
  "plans": [
    {
      "id": "basico",
      "name": "Básico",
      "price": 150000,
      "priceLabel": "G. 150.000/mes",
      "description": "Para negocios que están empezando",
      "features": [
        { "text": "Página web profesional", "included": true },
        { "text": "5 páginas", "included": true },
        { "text": "Botón WhatsApp", "included": true },
        { "text": "Google SEO básico", "included": true },
        { "text": "Reservas online", "included": false },
        { "text": "Programa de lealtad", "included": false },
        { "text": "Gift cards", "included": false },
        { "text": "E-commerce", "included": false }
      ],
      "cta": "Empezar con Básico",
      "popular": false
    },
    {
      "id": "pro",
      "name": "Pro",
      "price": 250000,
      "priceLabel": "G. 250.000/mes",
      "description": "El más popular para negocios en crecimiento",
      "features": [
        { "text": "Página web profesional", "included": true },
        { "text": "15 páginas", "included": true },
        { "text": "Botón WhatsApp", "included": true },
        { "text": "Google SEO básico", "included": true },
        { "text": "Reservas online", "included": true },
        { "text": "Programa de lealtad", "included": true },
        { "text": "Gift cards", "included": true },
        { "text": "E-commerce", "included": false }
      ],
      "cta": "Empezar con Pro",
      "popular": true
    },
    {
      "id": "premium",
      "name": "Premium",
      "price": 400000,
      "priceLabel": "G. 400.000/mes",
      "description": "Para negocios que quieren todo",
      "features": [
        { "text": "Página web profesional", "included": true },
        { "text": "Páginas ilimitadas", "included": true },
        { "text": "Botón WhatsApp", "included": true },
        { "text": "Google SEO básico", "included": true },
        { "text": "Reservas online", "included": true },
        { "text": "Programa de lealtad", "included": true },
        { "text": "Gift cards", "included": true },
        { "text": "E-commerce completo", "included": true },
        { "text": "Portal cliente completo", "included": true },
        { "text": "Priority support", "included": true }
      ],
      "cta": "Contactar",
      "popular": false
    }
  ],
  "faqTitle": "Preguntas frecuentes sobre precios",
  "faqs": [
    { "question": "¿Hay costo de setup?", "answer": "No hay costo de setup. Pagás desde el primer mes." },
    { "question": "¿Puedo cambiar de plan?", "answer": "Sí, podés subir o bajar de plan en cualquier momento." },
    { "question": "¿Qué incluye el Google SEO?", "answer": "Optimización demeta tags, sitemap.xml, y Schema.org para que Google indexe tu sitio." },
    { "question": "¿Qué métodos de pago aceptan?", "answer": "Transferencia bancaria, Tigo Money, y Mercado Pago." }
  ],
  "guarantee": "Garantía de satisfacción — si no estás contento en los primeros 30 días, te devolvemos el dinero."
}
```

---

## SECTION 2: COMPARISON — "US VS DIY"

### Why This Is Critical

Every business owner considering this template will also consider:
- Building it themselves (Wix, WordPress, Squarespace)
- Hiring a developer
- Using a free builder (Google Sites, Facebook Page)

We need to address these objections with a clear comparison.

### Content Concept: "Por qué no hacer tu página solo"

**`content/es/comparison.json`** (new file):
```json
{
  "title": "¿Por qué no hacer tu página solo?",
  "subtitle": "Comparamos las opciones para que tomes la mejor decisión",
  "options": [
    {
      "name": "Wix / Squarespace / WordPress",
      "icon": "code",
      "pros": [
        "Gratis para empezar",
        "Vos lo manejás todo"
      ],
      "cons": [
        "Vos tenés que hacer TODO — diseño, contenido, SEO",
        "No tiene reservas, ni lealtad, ni gift cards",
        "Tenés que pagar plugins para funcionalidades básicas",
        "No está optimizado para Paraguay (ni Guaraníes, ni Mercado Pago)",
        "Cuando se rompe, vos lo arreglás"
      ],
      "cost": "G. 80-200k/mes en plugins + tu tiempo",
      "verdict": "Parece barato pero escondé costos"
    },
    {
      "name": "Contratar un desarrollador",
      "icon": "userCog",
      "pros": [
        "100% personalizado",
        "Hacé lo que querés"
      ],
      "cons": [
        "Cuesta G. 2-10 millones upfront",
        "Tarda meses en ficar listo",
        "Cuando necesitás cambios, pagás de nuevo",
        "Si el dev desaparece, tu página muere",
        "No tiene mantenimiento incluido"
      ],
      "cost": "G. 2-10 millones + G. 50-100k/mes mantenimiento",
      "verdict": "Muy caro, muy lento"
    },
    {
      "name": "ParaguAI Builder",
      "icon": "sparkles",
      "pros": [
        "Listo en minutos, no meses",
        "Todo incluido — reservas, lealtad, pagos",
        "Optimizado para Paraguay",
        "Mantenimiento incluido",
        "Cambios y actualizaciones sin costo extra",
        "WhatsApp integrado desde el día uno"
      ],
      "cons": [
        "No es 100% personalizado como un developer",
        "Pero hacés cambios vos mismo si querés"
      ],
      "cost": "Desde G. 150k/mes",
      "verdict": "Mejor relación precio/beneficio"
    }
  ],
  "summary": "Con ParaguAI Builder pagás menos, tenés más, y está listo hoy."
}
```

### Comparison Table Display

| Factor | DIY (Wix/WordPress) | Developer | ParaguAI Builder |
|--------|---------------------|-----------|------------------|
| Tiempo de setup | 2-4 semanas | 2-6 meses | Minutos |
| Costo mensual | G. 80-200k en plugins | G. 50-100k mantenimiento | Desde G. 150k |
| Costo inicial | G. 0 | G. 2-10 millones | G. 0 |
| Reservas online | Requiere plugins | Custom build | Incluido |
| Programa de lealtad | No | Custom build | Incluido |
| Gift cards | No | Custom build | Incluido |
| Pagos en Guaraníes | Requiere configuración | Requiere custom | Incluido |
| WhatsApp integrado | Requiere plugins | Custom build | Incluido |
| Mantenimiento | Vos lo hacés | Pagás al dev | Incluido |
| Actualizaciones | Vos lo hacés | Pagás al dev | Incluido |
| Soporte | Documentación | Depende del dev | Priority incluido |

---

## SECTION 3: ROI CALCULATOR

### Why This Is Critical

Business owners think in terms of ROI. Show them how much they're losing by NOT having a website, and the price of our template becomes trivial.

### Content Concept: "Calculadora de Pérdidas"

**`content/es/calculator.json`** (new file):
```json
{
  "title": "¿Cuánto dinero perdés por no tener página web?",
  "subtitle": "Hacé los números — te vas a sorprender",
  "form": {
    "question1": "¿Cuántos turnos/servicios vendés por semana?",
    "placeholder1": "Ej: 20 turnos",
    "question2": "¿Cuánto cobrás en promedio por servicio? (en Guaraníes)",
    "placeholder2": "Ej: 50000",
    "question3": "¿Cuántos mensajes de WhatsApp recibís por día preguntando precios?",
    "placeholder3": "Ej: 15 mensajes",
    "question4": "¿Cuántas horas por semana gastás respondiendo WhatsApp?",
    "placeholder4": "Ej: 5 horas",
    "question5": "¿Qué porcentaje de consultas no se convierten en ventas porque no respondés a tiempo?",
    "placeholder5": "Ej: 30"
  },
  "results": {
    "lostPerMonth": "G. 450.000",
    "hoursWasted": "20 horas",
    "conversionsLost": "15 perdidos/mes",
    "explanation": "Si tuvieras una página web con reservas online, cada uno de esos mensajes se convertiría en una reserva automática — sin que vos tengas que responder."
  },
  "cta": "Dejá de perder — empezá hoy",
  "ctaSecondary": "Ver cómo funciona"
}
```

### Calculator Display Formula

```
 Pérdida mensual = (mensajes_día × días_semana × 4) × (precio_promedio × %_no_conversion)
 
 Ejemplo:
 - 15 mensajes/día × 28 días = 420 mensajes/mes
 - G. 50,000 precio promedio × 30% no convierte = G. 15,000 perdido por mensaje
 - 420 × 15,000 = G. 6,300,000 perdidos/mes
 
 Con nuestra página (G. 150k/mes):
 - Reservas automáticas capturan el 60% que se perdían
 - G. 6,300,000 × 60% = G. 3,780,000 salvados/mes
 - ROI: 3,780,000 - 150,000 = G. 3,630,000 netos/mes
```

---

## PART II: FEATURE SHOWCASE SECTIONS

### SECTION 4: FEATURE DEEP-DIVE CARDS

Each feature needs a card that shows:
1. What it is
2. What problem it solves
3. What the user gains

**`content/es/features/deep-dive.json`** (new file):
```json
{
  "features": [
    {
      "id": "booking",
      "title": "Reservas Online",
      "tagline": "Tu agenda siempre llena, sin que vos hagas nada",
      "problem": "Te escriben a las 11pm para reservar. Respondés a la mañana. Ya perdieron interés.",
      "solution": "Tus clientes reservan cuando quieren — 24/7. Tu agenda se llena sola.",
      "how": "Elegí fecha y horario. El cliente confirma. Recibís notificación. Listo.",
      "benefits": [
        "Reservas desde cualquier lugar",
        "Confirmación automática",
        "Recordatorios por WhatsApp",
        "Historial de clientes"
      ],
      "proof": "Negocios con reservas online captan 40% más clientes que los que usan solo WhatsApp.",
      "image": "/images-demo/features/booking-demo.png"
    },
    {
      "id": "loyalty",
      "title": "Programa de Lealtad",
      "tagline": "Tus clientes vuelven porque les conviene",
      "problem": "La clienta viene una vez. Nunca más vuelve. No tenés forma de retenerla.",
      "solution": "Puntos por cada compra. Canjean por descuentos. Vuelven solos.",
      "how": "Cada compra suma puntos. 100 puntos = G. 10,000 de descuento. Simple.",
      "benefits": [
        "Tiers: Bronce, Plata, Oro",
        "Puntos que no caducan",
        "Descuentos exclusivos por tier",
        "Notificaciones de puntos ganados"
      ],
      "proof": "Un programa de lealtad aumenta la frecuencia de visita en 35%.",
      "image": "/images-demo/features/loyalty-demo.png"
    },
    {
      "id": "gift-cards",
      "title": "Gift Cards",
      "tagline": "Un nuevo canal de ingresos que funciona 24/7",
      "problem": "¿Qué regalás cuando alguien tiene de todo? Gift card — siempre falla.",
      "solution": "Vendés tarjetas de regalo. El regalo perfecto para cualquier ocasión.",
      "how": "Elegís el monto. Pagás con Mercado Pago. Recibís código. Regálás. Simple.",
      "benefits": [
        "Gs. 100k, 250k, 500k — elegí el monto",
        "Pago vía Stripe/Mercado Pago",
        "Código único por email/WhatsApp",
        "El regalo que siempre funciona"
      ],
      "proof": "Gift cards generan 15-25% de clientes nuevos — el regalo trae a quien lo recibe.",
      "image": "/images-demo/features/giftcard-demo.png"
    },
    {
      "id": "seo",
      "title": "Aparecé en Google",
      "tagline": "Cuando alguien busca tu servicio, aparecés primero",
      "problem": "Búsqué 'peluquería Asunción' en Google. Tu competencia aparece. Vos no.",
      "solution": "Tu negocio optimizado para SEO — Schema.org, sitemap, meta tags.",
      "how": "Google indexa tu sitio. Cuando alguien busca tu servicio, aparecés en los primeros resultados.",
      "benefits": [
        "Schema.org LocalBusiness",
        "Sitemap.xml automático",
        "Meta tags optimizados",
        "Google My Business integración"
      ],
      "proof": "75% de paraguayos buscan negocios locales en Google antes de comprar.",
      "image": "/images-demo/features/seo-demo.png"
    },
    {
      "id": "whatsapp",
      "title": "WhatsApp Integrado",
      "tagline": "Tus clientes ya usan WhatsApp — nosotros lo conectamos",
      "problem": "Tenés 500 mensajes sin leer. No sabés quién es quién. Perdés clientes.",
      "solution": "Botón WhatsApp siempre visible. Un tap y te contactan. Todo organizado.",
      "how": "Botón flotante en todas las páginas. Click → WhatsApp con mensaje prellenado.",
      "benefits": [
        "Botón flotante siempre visible",
        "Mensaje prellenado con tu negocio",
        "Solo 1 click para contactar",
        "Funciona en móvil y desktop"
      ],
      "proof": "80% de paraguayos prefieren WhatsApp para contacted negocios.",
      "image": "/images-demo/features/whatsapp-demo.png"
    },
    {
      "id": "payments",
      "title": "Pagos Digitales",
      "tagline": "Aceptá Mercado Pago, Tigo Money, transferencia — sin cash",
      "problem": "Efectivo solo. Clientes que se van porque no tienen cambio.报告会",
      "solution": "Integración con todos los métodos de pago paraguayos.",
      "how": "El cliente paga con el método que prefiera. Vos recibís directo a tu cuenta.",
      "benefits": [
        "Mercado Pago",
        "Tigo Money",
        "Transferencia bancaria",
        "Tarjeta de crédito/débito"
      ],
      "proof": "Negocios que aceptan pagos digitales venden 30% más.",
      "image": "/images-demo/features/payments-demo.png"
    }
  ]
}
```

---

## PART III: MESSAGING FRAMEWORKS

### SECTION 5: HERO MESSAGING UPGRADE

Current hero is good but could be BETTER. The 3-slide structure works but we need to make it MORE specific to the "copy-paste-restyle" promise.

**`content/es/hero-upgrade.json`** (new file):
```json
{
  "title": "Tu negocio merece estar en internet",
  "subtitle": "Páginas web profesionales para cualquier tipo de negocio en Paraguay",
  "slides": [
    {
      "id": "1",
      "title": "7 de cada 10 negocios en Paraguay NO tienen página web",
      "subtitle": "Mientras vos leés esto, tu competencia está captando clientes que podrían ser tuyos.",
      "image": "/images-demo/hero/hero-stats-70-percent.png",
      "cta": "Ver cómo funcionamos",
      "badge": "La oportunidad está ahora"
    },
    {
      "id": "2",
      "title": "Tu página, tu marca, en minutos",
      "subtitle": "Tomá esta web que estás viendo, cambiamos los colores, tu logo, tus servicios — y tenés la tuya. Sin código.",
      "image": "/images-demo/hero/hero-restyle-demo.png",
      "cta": "Ver ejemplos",
      "badge": "Copy-paste-restyle"
    },
    {
      "id": "3",
      "title": "De chaos a control",
      "subtitle": "Reservas automáticas, puntos de lealtad, gift cards, SEO en Google — todo incluido, todo funcionando.",
      "image": "/images-demo/hero/hero-transformation.png",
      "cta": "Empezar Hoy",
      "badge": "Todo incluido"
    }
  ]
}
```

### Slide-by-Slide Messaging Analysis

| Slide | Headline | What It Does | Target Audience |
|-------|----------|--------------|-----------------|
| 1 | "7 de cada 10 negocios..." | Urgency + fear of loss | "I should probably look into this" |
| 2 | "Tu página, tu marca..." | Promise of customization | "Can I really make it mine?" |
| 3 | "De chaos a control" | Transformation proof | "This solves my specific problems" |

---

### SECTION 6: OBJECTION-HANDLING MESSAGING

**`content/es/objections.json`** (new file):
```json
{
  "title": "¿Todavía tenés dudas?",
  "subtitle": "Respondemos las preguntas más comunes",
  "objections": [
    {
      "objection": "¿Y si no sé usar tecnología?",
      "response": "No necesitás saber nada de código. Vos nos das tus textos, fotos, colores — y nosotros armamos todo. Si necesitás cambiar algo después, lo hacés desde un panel simple.",
      "icon": "monitor"
    },
    {
      "objection": "¿Cuánto tiempo tarda en estar lista?",
      "response": "Si ya tenés tus contenidos (fotos, textos, precios), en 24-48 horas tenés tu página funcionando. No meses — días.",
      "icon": "clock"
    },
    {
      "objection": "¿Puedo cambiar los colores y el logo después?",
      "response": "Sí, total. Los cambios los hacés desde el panel de administración. No necesitás un desarrollador para cambiar un color.",
      "icon": "palette"
    },
    {
      "objection": "¿Qué pasa si necesito algo que no está incluido?",
      "response": "Hablamos. Si necesitás algo específico, lo armamos. No estás atado a funcionalidades predefinidas.",
      "icon": "messageCircle"
    },
    {
      "objection": "¿Por qué no hago mi página en Wix que es gratis?",
      "response": "Wix es gratis si no necesitás nada. Apenas querés reservas,loyalty, gift cards — pagás plugins caros y seguís sin integración con WhatsApp ni pagos en Guaraníes. Al final sale más caro y funciona peor.",
      "icon": "trendingUp"
    },
    {
      "objection": "¿Qué pasa si ya tengo una página en Facebook?",
      "response": "Tu Facebook está bien para mostrar tu negocio, pero no reemplaza una web. En Facebook dependés del algoritmo — si no pagás promoción, casi nadie ve tu contenido. Con tu propia web, sos vos quien controla todo.",
      "icon": "facebook"
    },
    {
      "objection": "¿Realmente la gente busca negocios en Google en Paraguay?",
      "response": "Sí. 75% de los paraguayos que buscan un servicio usan Google primero. Si no aparecés, tu competencia que SÍ tiene web captura esos clientes.",
      "icon": "search"
    }
  ]
}
```

---

## PART IV: SOCIAL PROOF CONTENT

### SECTION 7: EXPANDED TESTIMONIALS

**`content/es/testimonials-expanded.json`** (new file):
```json
{
  "title": "Negocios como el tuyo ya están creciendo online",
  "subtitle": "No lo decimos nosotros — lo dicen ellos",
  "testimonials": [
    {
      "id": "1",
      "name": "María González",
      "role": "Dueña de Peluquería",
      "business": "Belleza Studio, Asunción",
      "photo": "/images-demo/testimonials/maria.jpg",
      "quote": "Pensaba que con WhatsApp alcanzaba. Cuando me hice la página y puse booking, de repente tenía clientas nuevas que me encontraban en Google. No sabía que existía.",
      "result": "30% más clientas en 3 meses",
      "rating": 5,
      "since": "Cliente desde 2025"
    },
    {
      "id": "2",
      "name": "Carlos Martínez",
      "role": "Dueño de Restaurante",
      "business": "El Fogón, Encarnación",
      "photo": "/images-demo/testimonials/carlos.jpg",
      "quote": "Mi restaurante tiene 15 años funcionando con teléfono nomás. Cuando puse el menú online y las reservas, empecé a recibir reservas de gente que NO conocía. Hoy el 30% viene de internet.",
      "result": "30% de reservas desde Google",
      "rating": 5,
      "since": "Cliente desde 2024"
    },
    {
      "id": "3",
      "name": "Ana Rodríguez",
      "role": "Entrenadora Personal",
      "business": "Fit con Ana, San Lorenzo",
      "photo": "/images-demo/testimonials/ana.jpg",
      "quote": "Antes me escribían a las 10pm y yo tenía que responder. Ahora con el booking tengo mis horarios y mis clientas reservan solitas. Recuperé mis noches.",
      "result": "20 horas/mes recuperadas",
      "rating": 5,
      "since": "Cliente desde 2025"
    },
    {
      "id": "4",
      "name": "Roberto Caballero",
      "role": "Dueño de Bar",
      "business": "Rock en el Centro, Asunción",
      "photo": "/images-demo/testimonials/roberto.jpg",
      "quote": "Pensaba que para qué página si tengo Instagram. Cuando puse los eventos online y vendí entradas por la web, ¡la primera función llenamos sin hacer nada!",
      "result": "100% de capacidad desde web",
      "rating": 5,
      "since": "Cliente desde 2025"
    },
    {
      "id": "5",
      "name": "Laura Fernández",
      "role": "Dueña de Spa",
      "business": "Spa Wellness, Asunción",
      "photo": "/images-demo/testimonials/laura.jpg",
      "quote": "El programa de lealtad fue lo mejor. Mis clientas vuelven para acumular puntos. Antes venía una vez, ahora viene 4-5 veces por mes.",
      "result": "5x más visitas mensuales",
      "rating": 5,
      "since": "Cliente desde 2024"
    }
  ],
  "trustIndicators": [
    { "number": "50+", "label": "Negocios en Paraguay" },
    { "number": "4.9/5", "label": "Calificación promedio" },
    { "number": "98%", "label": "Satisfacción de clientes" }
  ]
}
```

---

## PART V: PROCESS & TRUST CONTENT

### SECTION 8: TRUST BADGES SECTION

**`content/es/trust-badges.json`** (new file):
```json
{
  "title": "Tecnología que ya confiás",
  "subtitle": "Usamos las mismas herramientas que las empresas más grandes del mundo",
  "badges": [
    {
      "name": "Stripe",
      "description": "Pagos seguros con la misma tecnología que usa Netflix y Amazon",
      "logo": "/images-demo/badges/stripe-logo.png",
      "proof": "PCI Compliant — tus datos de pago están seguros"
    },
    {
      "name": "Supabase",
      "description": "Base de datos de nivel empresarial — tu información está protegida",
      "logo": "/images-demo/badges/supabase-logo.png",
      "proof": "Backups automáticos, encriptación de grado militar"
    },
    {
      "name": "WhatsApp Business",
      "description": "Integración oficial con WhatsApp Cloud API",
      "logo": "/images-demo/badges/whatsapp-logo.png",
      "proof": "Mensajes verificados, 99% de entrega"
    },
    {
      "name": "Google Cloud",
      "description": "Alojamiento en la infraestructura de Google",
      "logo": "/images-demo/badges/google-cloud-logo.png",
      "proof": "99.9% uptime garantizado"
    }
  ],
  "securityNote": "SSL incluido en todos los planes. Tu página y la de tus clientes están siempre encriptadas."
}
```

---

### SECTION 9: INTEGRATIONS LIST

**`content/es/integrations.json`** (new file):
```json
{
  "title": "Todo conectado, sin que vos hagas nada",
  "subtitle": "Las integraciones que necesitás, funcionando desde el primer día",
  "categories": [
    {
      "name": "Pagos",
      "icon": "creditCard",
      "integrations": [
        { "name": "Mercado Pago", "description": "Aceptá pagos desde cualquier lugar" },
        { "name": "Tigo Money", "description": "Pagos vía billetera móvil" },
        { "name": "Stripe", "description": "Tarjetas de crédito y débito" },
        { "name": "Transferencia bancaria", "description": "Pagos directos a tu cuenta" }
      ]
    },
    {
      "name": "Comunicaciones",
      "icon": "messageCircle",
      "integrations": [
        { "name": "WhatsApp Cloud API", "description": "OTP login + mensajes automáticos" },
        { "name": "Email (SendGrid)", "description": "Confirmaciones y newsletters" }
      ]
    },
    {
      "name": "Marketing",
      "icon": "megaphone",
      "integrations": [
        { "name": "Google Analytics 4", "description": "Sabé quién visita tu sitio" },
        { "name": "Google Search Console", "description": "Ver cómo te encuentra Google" },
        { "name": "Facebook Pixel", "description": "Remarketing en Facebook" }
      ]
    },
    {
      "name": "Datos",
      "icon": "database",
      "integrations": [
        { "name": "Supabase", "description": "Base de datos para tu negocio" },
        { "name": "Exportar CSV", "description": "Descargá tus datos cuando quieras" }
      ]
    }
  ]
}
```

---

## PART VI: TEMPLATE CUSTOMIZATION SHOWCASE

### SECTION 10: "THIS SITE, YOUR BUSINESS" SECTION

**`content/es/customization-demo.json`** (new file):
```json
{
  "title": "Esta página que estás viendo — puede ser la tuya",
  "subtitle": "Mismo sistema, diferentes colores, tu marca",
  "examples": [
    {
      "businessType": "Peluquería",
      "primaryColor": "#e11d48",
      "secondaryColor": "#fda4af",
      "name": "Belleza Studio",
      "screenshot": "/images-demo/templates/peluqueria-preview.png",
      "features": ["booking", "loyalty", "giftCards"]
    },
    {
      "businessType": "Restaurante",
      "primaryColor": "#059669",
      "secondaryColor": "#a7f3d0",
      "name": "El Fogón",
      "screenshot": "/images-demo/templates/restaurante-preview.png",
      "features": ["booking", "menu", "gallery"]
    },
    {
      "businessType": "Gimnasio",
      "primaryColor": "#2563eb",
      "secondaryColor": "#93c5fd",
      "name": "FitPro Asunción",
      "screenshot": "/images-demo/templates/gimnasio-preview.png",
      "features": ["booking", "membership", "loyalty"]
    },
    {
      "businessType": "Bar",
      "primaryColor": "#7c3aed",
      "secondaryColor": "#c4b5fd",
      "name": "Rock en el Centro",
      "screenshot": "/images-demo/templates/bar-preview.png",
      "features": ["events", "booking", "gallery"]
    }
  ],
  "cta": "Ver más plantillas",
  "ctaSecondary": "Contactar para personalizada"
}
```

### Restyle Demo Content

**`content/es/restyle-demo.json`** (new file):
```json
{
  "title": "De esto... a esto... en minutos",
  "subtitle": "Cambiá colores, logos, imágenes — sin tocar código",
  "steps": [
    {
      "step": 1,
      "title": "Elegí tu negocio",
      "image": "/images-demo/restyle/step-1-choose.png",
      "description": "Seleccioná tu rubro —我们有模板 para cada uno"
    },
    {
      "step": 2,
      "title": "Subí tu logo y colores",
      "image": "/images-demo/restyle/step-2-upload.png",
      "description": "Tu marca — nosotros la aplicamos a todo el sitio"
    },
    {
      "step": 3,
      "title": "Personalizá textos y fotos",
      "image": "/images-demo/restyle/step-3-edit.png",
      "description": "Panel simple para cambiar cualquier texto o imagen"
    },
    {
      "step": 4,
      "title": "¡Listo! Tu página está live",
      "image": "/images-demo/restyle/step-4-live.png",
      "description": "Publicá y empezá a captar clientes"
    }
  ],
  "videoDemo": "/videos/restyle-demo.mp4",
  "videoDuration": "45 segundos"
}
```

---

## PART VII: BLOG CONTENT IDEAS

### SECTION 11: BLOG POST IDEAS

**`content/es/blog-content-ideas.json`** (new file):
```json
{
  "title": "Contenido que posiciona tu negocio",
  "subtitle": "Ideas para tu blog — generamos el contenido por vos",
  "posts": [
    {
      "id": "1",
      "title": "¿Cuánto dinero perdés por no tener página web?",
      "slug": "cuanto-dinero-pierdes-sin-pagina-web",
      "category": "Ventas",
      "excerpt": "Hacé los números — te vas a sorprender cuánto deja de entrar por no estar online.",
      "purpose": "Genera leads con calculadora de pérdidas",
      "targetKeyword": "negocio sin pagina web Paraguay"
    },
    {
      "id": "2",
      "title": "5 negocios que ya deberían tener sitio web en Paraguay",
      "slug": "5-negocios-deberian-tener-sitio-web",
      "category": "Educación",
      "excerpt": "Peluquerías, restaurantes, bares, spas, consultorios — todos necesitan una web.",
      "purpose": "Educa sobre la necesidad, posiciona como experto",
      "targetKeyword": "negocios Paraguay necesitan web"
    },
    {
      "id": "3",
      "title": "Cómo elegir el tipo de página web para tu negocio",
      "slug": "como-elegir-tipo-pagina-web",
      "category": "Guía",
      "excerpt": "One page, multi page, e-commerce — cuál es la correcta para vos.",
      "purpose": "Guía de decisión, reduce fricción",
      "targetKeyword": "tipo de pagina web negocios"
    },
    {
      "id": "4",
      "title": "Google Mi Negocio no es suficiente — necesitás una web",
      "slug": "google-mi-negocio-no-es-suficiente",
      "category": "Diferenciación",
      "excerpt": "Google Mi Negocio está bien, pero no reemplaza tu propia web.",
      "purpose": "Diferenciarse de competencia gratuita",
      "targetKeyword": "google mi negocio vs pagina web"
    },
    {
      "id": "5",
      "title": "Por qué WhatsApp no es suficiente para tu negocio",
      "slug": "whatsapp-no-es-suficiente-negocio",
      "category": "Objection handling",
      "excerpt": "WhatsApp está saturado. Tus clientes no esperan, van a otro lado.",
      "purpose": "Rompe objeción de 'con WhatsApp alcance'",
      "targetKeyword": "whatsapp negocio saturado"
    },
    {
      "id": "6",
      "title": "Programa de lealtad: cómo hacer que tus clientes vuelen",
      "slug": "programa-lealtad-como-hacer",
      "category": "Ventas",
      "excerpt": "Puntos, tiers, descuentos — el sistema que hace volver a los clientes.",
      "purpose": "Vender el feature loyalty",
      "targetKeyword": "programa lealtad negocios Paraguay"
    }
  ]
}
```

---

## PART VIII: FAQ EXPANSION

### SECTION 12: EXPANDED FAQ

**`content/es/faq-expanded.json`** (new file):
```json
{
  "title": "Preguntas frecuentes",
  "subtitle": "Todo lo que necesitás saber antes de empezar",
  "categories": [
    {
      "name": "General",
      "faqs": [
        {
          "q": "¿Qué incluye el servicio?",
          "a": "Todo: hosting, dominio, SSL, reservas online, programa de lealtad, gift cards, интеграция WhatsApp, SEO en Google, y mantenimiento. No pagás nada extra por funcionalidades."
        },
        {
          "q": "¿Necesito saber programación?",
          "a": "No. El panel de administración está diseñado para que cualquier persona pueda hacer cambios — textos, imágenes, precios, colores. No necesitás conocimientos técnicos."
        },
        {
          "q": "¿Cuánto tiempo tarda en estar lista?",
          "a": "Si nos das todo el contenido (fotos, textos, precios), en 24-48 horas tenés tu página funcionando. Si aún no tenés contenido, te ayudamos a crearlo."
        }
      ]
    },
    {
      "name": "Personalización",
      "faqs": [
        {
          "q": "¿Puedo cambiar los colores y el logo?",
          "a": "Sí, total. Subís tu logo, elegís tus colores — nosotros aplicamos todo. Si después querés cambiar algo, lo hacés desde el panel sin costo extra."
        },
        {
          "q": "¿Puedo agregar funcionalidades después?",
          "a": "Sí. Empezás con lo básico y agregás más-features cuando quieras. No hay lock-in —tu página es tuya."
        },
        {
          "q": "¿Funciona en celular?",
          "a": "Sí. Está diseñada mobile-first — se ve perfecto en celulares y tablets."
        }
      ]
    },
    {
      "name": "Pagos y precios",
      "faqs": [
        {
          "q": "¿Cuánto cuesta por mes?",
          "a": "Desde G. 150.000/mes el plan básico hasta G. 400.000/mes el premium. No hay costo de setup, no hay contratos a largo plazo — pagás mes a mes."
        },
        {
          "q": "¿Qué pasa si quiero cancelar?",
          "a": "Podés cancelar en cualquier momento. No hay multa, no hay permanencia mínima. Si cancelás, tu página deja de estar online pero te llevás todos tus datos en CSV."
        },
        {
          "q": "¿Qué métodos de pago aceptan?",
          "a": "Transferencia bancaria, Tigo Money, Mercado Pago. Para planes premium también aceptamos tarjeta de crédito."
        }
      ]
    },
    {
      "name": "Técnico",
      "faqs": [
        {
          "q": "¿Qué pasa si se rompe algo?",
          "a": "Nos contactás y lo arreglamos. Prioridad según tu plan. En la mayoría de los casos resolvemos en menos de 24 horas."
        },
        {
          "q": "¿Puedo usar mi propio dominio?",
          "a": "Sí. Podés usar cualquier dominio que tengas. Te ayudamos a configurarlo."
        },
        {
          "q": "¿Los datos de mis clientes están seguros?",
          "a": "Sí. Usamos encriptación de grado militar, backups automáticos, y cumplimiento PCI para pagos. Tus datos y los de tus clientes están protegidos."
        }
      ]
    }
  ]
}
```

---

## PART IX: BEFORE/AFTER EXPANSION

### SECTION 13: BEFORE/AFTER — BUSINESS TYPE VERSIONS

**`content/es/before-after-by-business.json`** (new file):
```json
{
  "sections": [
    {
      "businessType": "Peluquería / Salones de belleza",
      "before": [
        { "item": "WhatsApp saturado de mensajes", "impact": "Perdés el 40% de consultas" },
        { "item": "Turnos mal anotados en papel", "impact": "Confliciones y clientas enojadas" },
        { "item": "No sabés quién es tu clienta frecuente", "impact": "No podés ofrecer lealtad" },
        { "item": "Dependés del pasa-palabra", "impact": "No atraés clientes nuevos" }
      ],
      "after": [
        { "item": "Reservas online 24/7", "impact": "Clientas reservan solitas" },
        { "item": "Agenda digital organizada", "impact": "Sin errores, sin conflictos" },
        { "item": "Programa de lealtad activo", "impact": "Clientas vuelven por puntos" },
        { "item": "SEO en Google", "impact": "Clientas nuevas te encuentran" }
      ]
    },
    {
      "businessType": "Restaurante",
      "before": [
        { "item": "Llamados para reservas", "impact": "5+ horas/semana contestando teléfono" },
        { "item": "Menú en papel que nadie ve", "impact": "No vendés platos nuevos" },
        { "item": "Clientes que no vuelven", "impact": "No hay forma de recuperar" }
      ],
      "after": [
        { "item": "Reservas online + menú digital", "impact": "0 llamadas, más ventas" },
        { "item": "Menú con fotos optimizado", "impact": "20% más ticket promedio" },
        { "item": "Gift cards para fechas especiales", "impact": "Nuevos clientes que reciben regalo" }
      ]
    },
    {
      "businessType": "Bar / Club",
      "before": [
        { "item": "Eventos solo por WhatsApp", "impact": "Solo reach de tus seguidores" },
        { "item": "Entrada en puerta, caos", "impact": "Líneas, errores, cliente enojados" },
        { "item": "No sabés quién viene", "impact": "Marketing sin target"
      ],
      "after": [
        { "item": "Eventos con venta anticipada online", "impact": "Sabés cuánta gente viene antes" },
        { "item": "Tickets digitales, sin fila", "impact": "Experiencia premium" },
        { "item": "Base de datos de asistentes", "impact": "Marketing directo a quienes les gusta"
      ]
    },
    {
      "businessType": "Consultorio / Profesionales",
      "before": [
        { "item": "Turnos por WhatsApp", "impact": "Mensajes mezclados con lo personal" },
        { "item": "No-shows y cancelaciones", "impact": "Tiempo perdido" },
        { "item": "Sin forma de seguir paciente", "impact": "No hay continuidad"
      ],
      "after": [
        { "item": "Booking con recordatorios", "impact": "80% menos no-shows" },
        { "item": "Recordatorios automáticos por WhatsApp", "impact": "Clienta nunca olvida su turno" },
        { "item": "Historial de paciente", "impact": "Mejor atención, más valor"
      ]
    }
  ]
}
```

---

## PART X: FINAL CTA FRAMEWORK

### SECTION 14: CTA COPY BY STAGE

**`content/es/cta-copy.json`** (new file):
```json
{
  "stages": [
    {
      "stage": "hero",
      "title": "Empezar Ahora",
      "subtitle": "Sin compromiso, sin costo inicial",
      "trigger": "When visitor lands — first impression CTA"
    },
    {
      "stage": "after-reasons",
      "title": "¿Cuánto perdés por día sin web?",
      "subtitle": "Calculá tu pérdida mensual",
      "trigger": "After pain recognition — urgency CTA"
    },
    {
      "stage": "after-features",
      "title": "Probalo — es más fácil de lo que pensás",
      "subtitle": "Primer mes te devolvemos si no estás contento",
      "trigger": "After solution showcase — confidence CTA"
    },
    {
      "stage": "after-testimonials",
      "title": "Tu turno",
      "subtitle": "Negocios como el tuyo ya están creciendo",
      "trigger": "After social proof — conversion CTA"
    },
    {
      "stage": "after-comparison",
      "title": "La matemática no miente",
      "subtitle": "Empezá hoy, pagás menos de lo que perdés",
      "trigger": "After comparison — logic CTA"
    },
    {
      "stage": "exit-intent",
      "title": "Antes de irte — tomá este número",
      "subtitle": "G. 150.000/mes — menos que lo que perdés en un día",
      "trigger": "When visitor shows exit intent — last chance CTA"
    },
    {
      "stage": "footer",
      "title": "Hoy es el día",
      "subtitle": "Tu negocio merece estar online",
      "trigger": "Last page section — final reminder CTA"
    }
  ]
}
```

---

## PART XI: CONTENT PRIORITY IMPLEMENTATION

### HIGH PRIORITY (Implement First)

| # | Content | File to Create | Why |
|---|---------|----------------|-----|
| 1 | Pricing section | `content/es/pricing.json` | Missing conversion — visitors leave when they can't find price |
| 2 | FAQ expanded | `content/es/faq-expanded.json` | Objections not addressed |
| 3 | Comparison "Us vs DIY" | `content/es/comparison.json` | Most visitors consider DIY options |
| 4 | ROI Calculator concept | `content/es/calculator.json` | Powerful lead generation tool |
| 5 | CTA copy by stage | `content/es/cta-copy.json` | CTAs currently generic, need stage-specific |

### MEDIUM PRIORITY (Implement Second)

| # | Content | File to Create | Why |
|---|---------|----------------|-----|
| 6 | Testimonials expanded | `content/es/testimonials-expanded.json` | Social proof is key — current testimonials thin |
| 7 | Feature deep-dive cards | `content/es/features/deep-dive.json` | Visitors want to understand features in detail |
| 8 | Trust badges | `content/es/trust-badges.json` | Builds credibility |
| 9 | Integrations list | `content/es/integrations.json` | Shows completeness |
| 10 | Objection handling | `content/es/objections.json` | Pre-empts common blockers |

### LOW PRIORITY (Implement Third)

| # | Content | File to Create | Why |
|---|---------|----------------|-----|
| 11 | Customization demo | `content/es/customization-demo.json` | Key copy-paste-restyle message |
| 12 | Restyle demo | `content/es/restyle-demo.json` | Shows how easy customization is |
| 13 | Hero upgrade | `content/es/hero-upgrade.json` | More specific messaging |
| 14 | Before/after by business | `content/es/before-after-by-business.json` | Vertical-specific transformation |
| 15 | Blog content ideas | `content/es/blog-content-ideas.json` | SEO and authority content |

---

*Document version: 1.0 — Content Workplan*
*Purpose: Detailed content ideas for feature showcase and user comprehension*
*Last updated: June 2, 2026*