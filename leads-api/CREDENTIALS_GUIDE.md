# 🔐 Setup Guide — Configurar Credenciales ParaguAI

Este guía te lleva paso a paso para configurar las 6 credenciales que
leads-api necesita. Cada una desbloquea una feature.

**Tiempo total: ~30-45 minutos** (sin esperar aprobaciones de Meta/Facebook)

---

## 📋 Resumen — qué necesitás

| # | Servicio | Cuándo | Tiempo | Costo |
|---|----------|--------|--------|-------|
| 1 | Google Analytics 4 | Primero | 5 min | $0 |
| 2 | Google Search Console | Primero | 5 min | $0 |
| 3 | Stripe (test mode) | Cuando quieras probar | 10 min | $0 |
| 4 | CallMeBot | Cuando quieras notificaciones | 5 min | $0 |
| 5 | Kiki admin key | Ya | 1 min | $0 |
| 6 | WhatsApp Business API | Después de FB aprobación | 1-7 días | $0 |

---

## 1️⃣ Google Analytics 4 (5 min)

**Para qué:** Tracking de visitas en los 19 sites. Sin esto, no podés medir nada.

### Pasos

1. Andá a https://analytics.google.com
2. Si no tenés cuenta, "Start measuring" (es gratis)
3. **Admin** (⚙️ abajo izquierda) → **Create property**
   - Property name: `ParaguAI Lead Sites`
   - Country: Paraguay
   - Currency: PYG
4. **Web** stream → Website URL: `https://paragu-ai.com`
   - Stream name: `ParaguAI Lead Sites`
5. Te muestra el **Measurement ID**: `G-XXXXXXXXXX` (ej: `G-ABC123DEF4`)
6. Copialo

### Verificar

Andá a https://analytics.google.com → Reports → Realtime
y abrí uno de los sites (ej: `https://xxgym.paragu-ai.com`)
deberías ver tu visita en tiempo real.

### Pegar en .env

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Lo pongo en CADA site (19 sites). Necesito un loop que las copie.

---

## 2️⃣ Google Search Console (5 min)

**Para qué:** Indexar los 19 sites en Google Search. Sin esto, no aparecés en Google.

### Pasos

1. Andá a https://search.google.com/search-console
2. Click **Add property** → **URL prefix**
3. Pegá: `https://xxgym.paragu-ai.com` (repetí por cada site)
4. **Verify** → **HTML tag**
5. Te muestra un código como:
   ```html
   <meta name="google-site-verification" content="abc123xyz789" />
   ```
6. Copiá solo el valor: `abc123xyz789`

### Verificar

1. Andá a Sitemaps → pegá `https://xxgym.paragu-ai.com/sitemap.xml`
2. Click **Submit**
3. Vuelve en 24h para ver status

### Pegar en .env

```
NEXT_PUBLIC_GSC_TOKEN=abc123xyz789
```

---

## 3️⃣ Stripe (10 min — test mode)

**Para qué:** Recibir pagos reales de Pro/Empresarial. Sin esto, no hay revenue.

### Pasos

1. Andá a https://dashboard.stripe.com/register
2. Email + password + país Paraguay
3. **Skip** verificación al inicio (podés hacerlo después)
4. Anda a **Developers** → **API keys**
5. Copia:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...` (click "Reveal")
6. Anda a **Products** → **Add product**
   - Name: `ParaguAI Lite`
   - Price: `Gs. 200.000` (sí, en guaraníes)
   - Billing: `Monthly`
   - Currency: `PYG` (guaraní)
   - Click **Save product**
   - En la lista, click el producto → copia el **Price ID** (`price_...`)
7. Repetí para:
   - **ParaguAI Pro**: Gs. 500.000/mes
   - **ParaguAI Empresarial**: Gs. 1.200.000/mes
8. Anda a **Developers** → **Webhooks** → **Add endpoint**
   - URL: `https://leads.paragu-ai.com/api/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created/updated/deleted`, `invoice.paid`, `invoice.payment_failed`
   - Click **Add endpoint**
   - Copia **Signing secret** (`whsec_...`)

### Verificar

Una vez configurado, en `/api/plans` los 3 planes dirán `"available": true`.

### Pegar en .env

```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_LITE=price_xxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_PRO=price_xxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_PRICE_EMPRESA=price_xxxxxxxxxxxxxxxxxxxxxxxx
```

### ⚠️ Go live

Cuando estés listo para cobros reales:
1. Stripe → Activate account
2. Cargá info de tu empresa (RUC, banco, etc.)
3. Cambia `pk_test` → `pk_live`, `sk_test` → `sk_live`
4. Re-creá los products en modo live
5. Re-configurá el webhook con el ID live

---

## 4️⃣ CallMeBot (5 min)

**Para qué:** Kiki recibe un WhatsApp cada vez que hay un lead nuevo.

### Pasos

1. Desde **el WhatsApp donde Kiki quiere recibir notificaciones**, mandale un mensaje a **+34 644 71 81 99** (número de CallMeBot):
   ```
   I allow callmebot to send me messages
   ```
2. Te responde con tu API key (aprox 30 segundos)
3. La key es un número (ej: `1234567`)

### Verificar

Test manual:
```bash
curl "https://api.callmebot.com/whatsapp.php?phone=+595981000000&text=Test&apikey=YOUR_KEY"
```

### Pegar en .env

```
CALLMEBOT_APIKEY=1234567
```

---

## 5️⃣ Kiki Admin Key (1 min)

**Para qué:** Autenticar endpoints de admin (ver todos los leads, tenants, etc).

### Pasos

1. Generá un string random:

   ```bash
   # Mac/Linux
   openssl rand -hex 32

   # O inventá uno largo (32+ chars)
   # Ej: kiki-2026-leads-admin-secure-token-xyzabc123456
   ```

2. Listo.

### Pegar en .env

```
KIKI_API_KEY=tu_string_random_de_32+o_caracteres
```

### Uso

Visitá:
```
https://paragu-ai.com/dashboard
```
Pegás la key → ves leads, tenants, etc.

---

## 6️⃣ WhatsApp Business API (1-7 días — requiere aprobación)

**Para qué:** Que los clientes manden WhatsApp a un número real y reciban auto-reply.

⚠️ **Requiere aprobación de Meta** (1-7 días). Empezá ya.

### Pasos

1. **Cuenta Meta Business**
   - Andá a https://business.facebook.com/overview
   - Crear cuenta → país Paraguay
   - Verificá email

2. **App de WhatsApp**
   - https://developers.facebook.com/apps → Create app
   - Type: **Business**
   - Add products: **WhatsApp**

3. **Setup inicial**
   - Andate a WhatsApp → API Setup
   - Te dan un **número temporal** (solo test)
   - En la sección "From" ves tu **Phone Number ID** (un número, no el teléfono)
   - En "Temporary access token" ves el **Access Token** (24h, no sirve)

4. **Permanent access token**
   - Business Settings → Users → System Users
   - Add → Admin → Assets: tu app → Full control
   - Generate Token → copiar el **Access Token** (60 días, renovable)

5. **Producción (número real)**
   - WhatsApp → API Setup → Add phone number
   - Verificás el número por SMS/llamada
   - Te cobran ~$0.004 por mensaje (~$50 al mes con tráfico bajo)

6. **Webhook**
   - WhatsApp → Configuration → Webhook
   - **Callback URL**: `https://leads.paragu-ai.com/api/whatsapp-webhook`
   - **Verify Token**: `paragu-ai-verify-2026` (o inventá uno)
   - **Webhook fields**: `messages`, `message_deliveries`
   - Verify

### Verificar

Mandá un WhatsApp al número. Te tiene que llegar un auto-reply.

### Pegar en .env

```
WABA_PHONE_NUMBER_ID=123456789012345
WABA_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WABA_VERIFY_TOKEN=paragu-ai-verify-2026
```

---

## 📦 Una vez que tengas todas las llaves

### Paso final: configurar el leads-api

```bash
# 1. Andá al repo
cd /root/paragu-ai-platform  # (o donde lo tengas)

# 2. Editá el .env
nano leads-api/.env

# 3. Pegá TODO tu archivo de env vars (con tus keys reales)

# 4. Redeploy
docker stack deploy -c leads-api/docker-compose.yml paragu-ai-leads-api

# 5. Verificá los logs
docker service logs paragu-ai-leads-api_web --tail 50
```

### Para los 19 sites (GA4 + GSC)

Después de configurar, dame las keys de GA4 + GSC y yo me ocupo de:
- Copiar `NEXT_PUBLIC_GA_ID` y `NEXT_PUBLIC_GSC_TOKEN` en las 19 apps
- Rebuild + redeploy las 19

---

## ✅ Checklist

```
[ ] Google Analytics 4 — Measurement ID copiado
[ ] Google Search Console — Token copiado
[ ] Stripe test mode — sk_test + 3 price IDs + webhook secret
[ ] CallMeBot — API key copiada
[ ] Kiki admin key — string random generado
[ ] WhatsApp Business API — pendiente aprobación Facebook
```

Cuando esté listo, pasame las keys en cualquier formato:
- Texto plano, archivo, screenshot, lo que tengas
- Yo me ocupo de configurar todo + restart + verificar

---

## 🆘 Si te trabás

- **Stripe no acepta Paraguay**: usá dirección de la empresa; el dueño puede ser de cualquier país
- **WABA rechaza la app**: normalmente falta verificar identidad. Tarda más pero sale
- **Google Analytics no aparece**: refrescá después de 5 min, a veces tarda
- **CallMeBot no manda**: el WhatsApp debe tener activados los mensajes de empresas

---

## 📞 Próximo paso

Cuando tengas al menos las 4 primeras (GA4, GSC, Stripe test, CallMeBot, Kiki key),
contame y configuramos todo. El WABA lo dejamos cuando Meta apruebe.
