# First Facebook Ad Campaign — DRAFT

**Status:** Awaiting Meta Business Verification (paso 5 of client handbook) + Ad Account linking  
**Target launch:** Day 60 post-opening (~Sep 13, 2026)  
**Budget:** $5/day ($150/month) — escalate to $10/day if CPL < $5  
**Objective:** Drive WhatsApp conversations (not page likes, not website visits — actual bookings)

---

## Why this specific structure

- **Dental FB ads have 1.8% CTR** (vs 1.5% national avg for local services) — proven channel
- **Best ad format:** Video > Carousel > Single image
- **Best hook:** Address a fear or pain point, not a feature
- **Best CTA:** WhatsApp click (we can track + respond)

---

## Creative 1: "Anti-miedo" (top of funnel — reach + awareness)

**Objective:** Reach Asunción 25-65 interested in dentistry

**Headline:** ¿Te da miedo ir al dentista?

**Primary text:**
```
No tenés que decidir nada hoy. Solo contame qué te preocupa.

Soy Dra. Gabriella González Pane — 20+ años de práctica conservadora en Asunción. Bilingüe.

No hay apuro. No hay juicio. Planificamos antes de tocar.

📲 Escribime por WhatsApp: +595 981 146 759
🌐 https://ometzdental.com
```

**Image/Video:** Opening banner or C-triptych (already uploaded)

**CTA button:** Send WhatsApp Message → `https://wa.me/595981146759?text=Hola%20Dra.%20Gaby`

---

## Creative 2: "Segunda opinión" (middle of funnel — qualified leads)

**Objective:** Reach people who already googled dental prices or got a recent quote

**Headline:** ¿Te presupuestaron más de Gs 5.000.000 en odontología?

**Primary text:**
```
Confirmá tu diagnóstico con una segunda opinión escrita.

• Traé tu radiografía + presupuesto
• 45 minutos de consulta
• Te explico qué veo, qué opciones tenés y qué haría yo
• Con números y por escrito

Gs 300.000 (se acredita al tratamiento si decidís avanzar)

📲 +595 981 146 759 (WhatsApp)
```

**Image:** `og-second-opinion.png` (already exists at https://ometzdental.com/og/og-second-opinion.png)

**CTA button:** Send WhatsApp Message

---

## Creative 3: "Apertura" (bottom of funnel — conversion during launch window)

**Objective:** Reach Asunción residents during Jul 26-Aug 15

**Headline:** 🎉 ABRIMOS ESTA SEMANA — Ometz Dental

**Primary text:**
```
Ometz Dental · Dra. Gabriella González Pane
📍 Auditores de la Guerra del Chaco 617, Mburucuyá
🕐 Lun a Vie, 14:30 a 19:00
📲 +595 981 146 759

אומץ · Valentía para planificar antes de tocar.

Para tu primera consulta, escribinos por WhatsApp.
```

**Image:** Opening banner (already deployed at https://ometzdental.com/og/opening-banner.png)

**CTA button:** Send WhatsApp Message

---

## Targeting (3 layers)

### Layer 1 — Broad reach
- **Location:** Asunción, Paraguay (25km radius around Mburucuyá)
- **Age:** 25-65
- **Gender:** All
- **Languages:** Spanish, English
- **Interests:** Dentistry, Dental implants, Teeth whitening, Oral surgery, Second opinion

### Layer 2 — Lookalike (after we have 100 followers)
- Lookalike of page fans
- Lookalike of Instagram followers (after IG connected)
- Lookalike of email list (after first 50 collected)

### Layer 3 — Retargeting
- Website visitors (Meta Pixel required — pending paso 5)
- Video viewers (50%+ of any FB video)
- Engaged with our page or posts
- WhatsApp clickers who didn't book

---

## Creative testing plan

| Week | Active ads | Budget | Goal |
|---|---|---|---|
| 1 | All 3 running in parallel | $5/day total ($1.67/ad) | Find winner |
| 2 | Top 2 by CTR | $5/day ($2.50/ad) | Optimize |
| 3 | Winner only | $5-10/day | Scale |
| 4+ | Winner + retargeting | $10-15/day | Compound |

**Winning metric:** Cost per WhatsApp conversation started. Target: <$5.  
**Stop if:** CTR < 0.5% after 1000 impressions (creative is dead).

---

## Pre-requisites (must be done before launch)

| Item | Owner | Status |
|---|---|---|
| Meta Pixel installed on ometzdental.com | Erebus (after Meta App created) | Pending paso 5 |
| Conversions API token | Ivan | Pending paso 5 |
| Meta Ad Account connected to Page | Ivan in Meta Business Suite | Pending paso 5 |
| Billing set on Ad Account | Ivan | Pending paso 5 |
| WhatsApp Business catalog | Ivan | Pending (see below) |
| First 30 followers + 5 reviews (social proof) | Ivan + organic | Pending |

---

## WhatsApp Business setup (for the click destination)

When someone clicks the ad → goes to WhatsApp → message pre-filled with:
"Hola Dra. Gaby, vengo de Facebook. Me gustaría [agendar una consulta / pedir una segunda opinión]."

This is the template at `templates/patient-testimonial-request-es.txt` reverse — same structure, different intent.

---

## Measurement

| Metric | Tool | Target |
|---|---|---|
| CPM (cost per 1000 impressions) | Ads Manager | <$8 in Asunción |
| CTR | Ads Manager | >1% |
| Cost per WhatsApp click | UTM tracking in URL → WhatsApp | <$2 |
| Cost per qualified booking | Manual tracking | <$15 |
| ROAS (revenue per ad $) | Manual | >3:1 by month 3 |

---

*This doc is a draft. Final assets + copy will be regenerated after first 30 days of organic content to identify what resonates.*
