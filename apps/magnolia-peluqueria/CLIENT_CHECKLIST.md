# Magnolia Peluquería — Implementación: Lo que queda por hacer

## Estado general

| Feature | Status | Listo para producción |
|---------|--------|----------------------|
| Booking form + WhatsApp | ✅ Listo | ✅ |
| Gift card system | 🔄 Pendiente (requiere Stripe) | ❌ |
| Blog con posts reales | 🔄 Pendiente (requiere contenido) | ⚠️ |
| Instagram feed real | 🔄 Pendiente (requiere Meta token) | ❌ |
| Loyalty UI (rewards card) | ✅ UI lista, lógica no conectada | ⚠️ |

---

## 1. Booking + WhatsApp — ✅ PRODUCCIÓN LISTO

**Ya funciona end-to-end.** El formulario en `/es/booking` captura datos, los guarda en Supabase (si está configurado), y abre WhatsApp con el mensaje pre-llenado incluyendo el servicio seleccionado.

No necesita nada del cliente. Listo para desplegar.

---

## 2. Gift Cards con Stripe — ❌ BLOQUEADO

**Necesita Stripe.**

### Lo que yo implementé
- `components/gift-card.tsx` — UI de selector de tarjetas y flujo de compra
- `app/api/gift-card/route.ts` — endpoint que crea un PaymentIntent en Stripe
- `app/[lang]/reserva/page.tsx` — página de reserva actualizada con sección de gift cards
- `content/es.json` — datos de las 4 tarjetas con precios

### Lo que falta (setup de Lidia)

**1. Cuenta de Stripe**

- Ir a https://dashboard.stripe.com/register
- Completar verificación del negocio (puede usar su cédula/RUC Paraguayo)
- Stripe acepta negocios paraguayos

**2. Keys de API**

Una vez verificada la cuenta, ir a **Developers → API keys** y compartir:

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

⚠️ **IMPORTANTE**: La SECRET KEY es sensible — compartir por privado (DM de WhatsApp, no por email público).

**3. Webhook para confirmar pago**

Cuando alguien paga una gift card, Stripe envía un evento. Necesitamos configurar un webhook para:
- Escuchar `payment_intent.succeeded`
- Generar el código de la gift card
- Enviarlo por WhatsApp al comprador

Para configurar el webhook en Stripe:
1. **Developers → Webhooks → Add endpoint**
2. URL de producción: `https://magnolia-peluqueria.paragu-ai.com/api/stripe-webhook`
3. Escuchar evento: `payment_intent.succeeded`
4. Compartir el **Webhook signing secret** (`whsec_...`)

### Testing local
Con las keys de test (`sk_test_...` / `pk_test_...`) funciona sin costos reales.

---

## 3. Blog con posts reales — ⚠️ PARCIAL

**El sistema está creado** — blog listing + individual pages + categorías + sidebar con servicios. Solo necesita contenido real.

### Lo que el cliente debe entregar

**Mínimo 3 posts para arrancar** (ideal 6-8 para SEO):

Cada post necesita:
```
- Título (ej: "5 errores que dañan tu cabello después de la keratina")
- Slug (URL friendly, ej: "errores-cabello-keratina")
- Excerpt (2-3 líneas de resumen)
- Imagen principal (URL pública o enviar por WhatsApp y la subo yo)
- Contenido (puede ser en Word/Google Docs — yo lo paso a markdown)
- Categoría: "Cuidado capilar" | "Tendencias" | "Tips" | "Tratamientos"
- Autor: "Lidia González" (o el nombre que prefiera)
- Fecha de publicación
```

### Formato del contenido
Puede enviar por WhatsApp:
- Texto en Word o Google Docs
- O escribirme directamente y lo armo

Yo me encargo de formatear, agregar headings, bullets, CTAs, y subirlo.

---

## 4. Instagram Feed Real — ❌ BLOQUEADO

**El código está listo**, pero necesita acceso a la API de Instagram/Meta.

### Paso a paso (Lidia hace esto, me pasa los tokens)

**Opción recomendada — Instagram Basic Display API:**

1. Tener una **Cuenta de negocio o Creator de Instagram** (no personal)
2. Ir a https://developers.facebook.com
3. Crear una app → tipo "Consumer" → agregar producto "Instagram"
4. En "Instagram Basic Display", agregar el usuario de prueba (ella misma como admin de la app)
5. Generar un **User Access Token** de largo plazo (60 días, renovable)
6. Compartir conmigo:
   - Instagram Account ID (`178414...`)
   - User Access Token

**Alternativa más simple** (sin developers):

Si Lidia tiene acceso al Instagram business/creator, puede compartir las credenciales de la cuenta por privado y uso la API de manera no oficial.

### Lo que recibe a cambio
- Feed real de las últimas 6 fotos/videos
- Si no está configurado, muestra Unsplash de respaldo (ya está funcionando)
- Sin bloqueos visuales

---

## 5. Loyalty Program (Rewards) — ⚠️ UI lista, lógica pendiente

**Lo que está hecho:**
- UI del programa en `components/loyalty.tsx`
- Progreso visible en la confirmación de booking
- Datos en `content/es.json` con los 4 niveles de reward

**Lo que falta para que funcione de verdad:**
- Identificar clientas por WhatsApp para trackear visitas
- Conectar con Supabase para guardar historial de reservas
- Asignar descuentos o recompensas cuando alcanzan un nivel

### Para activar tracking real de clientas

Opción simple: guardar el historial de reservas en Supabase y compararlo con el número de WhatsApp para mostrar los rewards en el próximo booking.

**Lo que necesito del cliente:**
- Acceso al proyecto de Supabase si ya tienen uno creado
- O crear uno nuevo (yo los guío)

---

## Resumen: Lo que Lidia necesita proveerme

| # | Item | Prioridad | Formato |
|---|------|----------|---------|
| 1 | Posts de blog (mínimo 3) | Alta | Word/Docs/mensaje |
| 2 | Stripe API keys + webhook | Media | Privado por WhatsApp |
| 3 | Instagram Account ID + Access Token | Media | Privado por WhatsApp |
| 4 | Accesso a Supabase (si tiene) | Baja | Credenciales |

---

## Próximos pasos que puedo hacer sin esperar al cliente

1. **Desplegar el sitio** con lo que hay (booking funciona)
2. **Escribir los primeros 3 posts del blog** si me dá temas/datos
3. **Configurar el webhook de Stripe** una vez tenga las keys
4. **Mejorar SEO local** — más keywords Paraguay, structured data por servicio
5. **Google Business Profile** — crear o reclamar el perfil de Google Maps
6. **WhatsApp Business** oficial — migrar el número actual a WhatsApp Business para métricas

---

*Documento generado: 2026-05-28*
*Responsable técnico: Erebus / Ai-Whisperers*
*Contacto del cliente: Lidia González — Magnolia Peluquería*