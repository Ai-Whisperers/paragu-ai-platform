# Nexa Paraguay — Web Content Action Plan

**Goal**: Update the website to reflect the new brand identity (per the brand synthesis)
**Target**: Live deployment in coordinated phases
**Owner**: Luana + Hermes

---

## Executive Summary

This document outlines **4 phases of work** across **10 distinct content updates**. Each phase has:
- Clear deliverables
- Content source (from the interview PDF)
- Effort estimate
- Files that will change
- Success criteria

**Recommendation**: Do Phase 1 (Hero + Story) first — biggest impact, fastest to ship. Then evaluate before continuing.

---

## Phase 1: Hero Rewrite + Story Section (Priority 1 — CRITICAL)

**Why first**: The hero is what every visitor sees first. It needs to communicate the brand identity in 5 seconds. The interview gave us Sonia's voice directly — we should use her actual words.

### Deliverable 1.1: Updated Home Hero
**Where**: `/es/` homepage, `/en/`, `/nl/`, `/de/`

**Content source**: Direct quotes from interview

**Spanish draft** (already drafted in web-specialist recommendations):
> "¿Mudarte a Paraguay sin que te estafen? La mayoría de las agencias holandesas cobran tarifas infladas por una cédula y luego desaparecen. Nosotros somos paraguayas que vivimos en los Países Bajos, Sonia se casó con un holandés y juntas pasamos por todo este proceso. Te acompañamos en persona — sin paquetes sorpresas, sin letra chica, sin burbuja WAPI. Especializados en el campo, no en zonas turísticas de Asunción."

**Dutch draft** (use Sonia's actual interview voice):
> "Verhuizen naar Paraguay zonder te worden genaaid? De meeste Nederlandse agencies rekenen veel te hoge tarieven voor een cédula en verdwijnen dan. Wij zijn Paraguayse vrouwen die in Nederland woonden, waarvan Sonia getrouwd is met een Nederlander, en dit hele proces hebben meegemaakt. We begeleiden je persoonlijk — geen verrassingspakketten, geen kleine lettertjes, geen WAPI-bubbel. Gespecialiseerd in het platteland, niet in toeristische wijken."

**Files**:
- `apps/nexa-paraguay/content/{es,en,nl,de}.json` — add elevator pitch to `home.hero`
- `apps/nexa-paraguay/src/components/Hero.tsx` — restructure layout to fit pitch above headline
- `apps/nexa-paraguay/public/images/hero/` — **NEEDS LUANA'S APPROVAL**: get a real countryside photo (not Asunción skyline)

### Deliverable 1.2: New "Your Story" Section on Home
**Where**: New section on `/es/` homepage, between hero and pillars

**Content source**: From interview Q&A

**Spanish draft** (from Sonia's interview):
> ## ¿Por qué existimos?
>
> Fundé Nexa porque vi a una pareja holandesa pagar el doble por una casa en un barrio que yo jamás habría recomendado. Como paraguaya que vivió 7 años en los Países Bajos — casada con un holandés, criando hijos entre dos culturas — entiendo lo que se siente llegar a un país nuevo sin saber en quién confiar.
>
> Hoy vivo en una propiedad rodeada de árboles, a minutos de Asunción, con tres perros, tres gatos y pronto gallinas. No estoy en una oficina en una zona turística de Asunción. Estoy en la vida que te estoy ayudando a conseguir.
>
> "Es completamente normal tener miedo. Yo también lo sentí. Mudarse a un país nuevo es un cambio enorme y lleva tiempo adaptarse — unos seis meses. Date esa gracia. Día a día, empiezas a entender cómo funcionan las cosas." — Sonia

**Dutch version** (mirror the same tone):
> ## Waarom we bestaan
>
> Ik heb Nexa opgericht omdat ik een Nederlands stel de dubbele prijs zag betalen voor een huis in een buurt die ik nooit zou aanbevelen. Als Paraguayse die 7 jaar in Nederland woonde — getrouwd met een Nederlander, kinderen opvoedend tussen twee culturen — begrijp ik hoe het voelt om in een nieuw land te komen zonder te weten wie je kunt vertrouwen.
>
> Nu woon ik op een terrein met bomen, minuten van Asunción, met drie honden, drie katten en binnenkort kippen. Ik zit niet op een kantoor in een toeristische buurt van Asunción. Ik leef het leven waar ik je bij help.
>
> "Het is volkomen normaal om bang te zijn. Ik voelde het ook. Verhuizen naar een nieuw land is een enorme verandering en het kost tijd om je aan te passen — zo'n zes maanden. Geef jezelf die ruimte. Dag bij dag begin je te begrijpen hoe dingen werken." — Sonia

**EN/DE versions** (translated versions)

**Files**:
- `apps/nexa-paraguay/content/{es,en,nl,de}.json` — add `home.yourStory` section
- `apps/nexa-paraguay/nexa-pages/home.json` — add the section to page config
- `apps/nexa-paraguay/src/components/sections/` — create or use existing StorySection component
- **NEEDS from Luana**: Personal photo of Sonia at her home (with dogs/cats, trees)

**Effort**: 3 hours (after Luana approves copy and provides photo)

---

## Phase 2: Transparent Services + Anti-Agency (Priority 1)

**Why second**: Now that visitors trust us from the hero+story, we need to SHOW transparency in how we work — what we do, what we don't, and what red flags to avoid.

### Deliverable 2.1: Anti-Agency Section (New on Homepage or /sobre)
**Where**: New "Lo que no somos" / "What we're NOT" section

**Spanish draft** (from interview, the 3 red flags):
> ## Lo que no somos
>
> Después de años trabajando con europeos que se mudan a Paraguay, hemos visto **3 señales de alerta** que aparecen una y otra vez en otras agencias:
>
> ### 🚩 Cobros excesivos por residencia
> Algunas agencias cobran tarifas muy altas por trámites de residencia e inmigración. Los recién llegados simplemente no saben cuánto deberían costar estos procesos. Trabajamos diferente — cobramos una tarifa de servicio clara y nunca inflamos el costo.
>
> ### 🚩 Propiedades con precio inflado
> Los europeos no conocen el mercado local, lo que facilita agregar márgenes grandes. Aunque colaboramos con profesionales inmobiliarios, **nunca recomendamos una propiedad basada en comisión**. Nuestra prioridad siempre es ayudarte a encontrar el hogar correcto al precio correcto.
>
> ### 🚩 Desaparecen después de la venta
> Muchos clientes reportan que, una vez terminado el papeleo y vendida la propiedad, las agencias desaparecen. **El apoyo continuo suele faltar.** Construimos relaciones a largo plazo y te seguimos ayudando con la vida cotidiana en Paraguay: hospitales, escuelas, supermercados, ferreterías, restaurantes — porque la reubicación no es solo papeleo, es ayudarte a sentirte en casa.
>
> ### ¿Cómo trabajamos nosotros?
> - **Tarifa de servicio clara** — sin sorpresas, sin letra chica
> - **Comisión inmobiliaria estándar** — nunca basada en comisión inflada
> - **Apoyo continuo** — te ayudamos después de la compra también

**Dutch version** (similar structure, Dutch tone):
> ## Wat we niet zijn
>
> Na jaren werken met Europeanen die naar Paraguay verhuizen, zien we **3 rode vlaggen** die steeds weer opduiken bij andere agencies...

**Files**:
- `apps/nexa-paraguay/content/{es,en,nl,de}.json` — add `home.antiAgency` section
- `apps/nexa-paraguay/nexa-pages/home.json` — add section
- Possibly a new `AntiAgencySection` component

**Effort**: 2 hours

### Deliverable 2.2: Transparent Services Checklist on /servicios
**Where**: Update `/servicios` page, add to existing services section

**Concept**: A "checklist" like buying a car, where users see what's included and what's not (per web specialist recommendation)

**Spanish draft**:
> ## Qué incluye nuestro servicio — y qué no
>
> Somos transparentes sobre lo que ofrecemos. A diferencia de las agencias que esconden costos o prometen paquetes "todo incluido", aquí ves exactamente qué obtienes:
>
> ### ✅ Incluido en cada servicio
> - Acompañamiento personal en migraciones, escribanía, bancos
> - Traducción oficial de documentos
> - Trámites de residencia y cédula
> - **Tarifa de servicio clara** (sin sorpresas)
>
> ### ❌ NO incluye
> - **NO** "comisión secreta" — nunca recomendamos propiedades basadas en comisión
> - **NO** paquetes "todo incluido" con letra chica
> - **NO** marketing inmobiliario con propiedades infladas
> - **NO** promesa de "30 días para residencia" (la realidad son ~6 meses)
>
> ### 💰 Cómo nos pagan
> 1. **Tarifa de servicio clara** — acordada antes de empezar
> 2. **Comisión inmobiliaria estándar** (si compras propiedad) — pero solo si encontramos el hogar correcto al precio correcto
> 3. **Sin costos ocultos** — todo está en el contrato

**Dutch version** (similar):

**Files**:
- `apps/nexa-paraguay/content/{es,en,nl,de}.json` — add `servicesPage.transparency` section
- `apps/nexa-paraguay/nexa-pages/servicios.json` — add to page config
- `apps/nexa-paraguay/src/components/sections/` — new `TransparencyChecklist` component

**Effort**: 3 hours

---

## Phase 3: Photography & Visual Identity (Priority 2)

**Why third**: Words are powerful, but images are what visitors remember. Replace generic stock/AI photos with real countryside life.

### Deliverable 3.1: Photo Audit
**Current state**: Per audit, 90+ image keys in `images.json`, many AI-generated or stock (per web specialist)

**Action**:
1. Review every image key in `apps/nexa-paraguay/images.json`
2. Flag which look AI-generated or stock
3. Categorize: keep / replace / remove
4. **NEEDS from Luana**: Real photos of:
   - Sonia at her property (countryside, trees, animals)
   - Luana with Sonia
   - Office/home base
   - Any happy client photos (with permission)

**Effort**: 2 hours (audit) + ongoing (photo collection)

### Deliverable 3.2: Replace Hero Image
**Current**: Big Asunción skyline photo
**New**: Real countryside photo (per consultant: "the prime reason is nature, not the city")

**Need from Luana**: A countryside photo (sunset over fields, lake, palm trees, etc.)

**Files**:
- `apps/nexa-paraguay/public/images/hero/` — new nature photo + webp variants

**Effort**: 30 minutes (after photo provided)

### Deliverable 3.3: Real Photography Style Guide
**Based on interview content**:
- Warm, slightly desaturated
- Real people in real moments
- NO stock, NO AI faces, NO trendy-neighborhood nightlife
- Countryside life: trees, gardens, animals, family

**Files**:
- `apps/nexa-paraguay/docs/04-images/photography-style-guide.md` (new)

**Effort**: 1 hour

---

## Phase 4: Customer Stories + Lead Magnet (Priority 3)

**Why fourth**: Builds on the trust we've established. Real stories from real clients are the ultimate "social proof" for someone considering Nexa.

### Deliverable 4.1: Customer Testimonial Section
**Where**: New section on home + /sobre

**Format**: "Familias que ya dieron el paso" / "Families who took the step"
- 2-3 real stories (need consent from clients)
- Photo of family + their location in Paraguay
- Quote about their experience with Nexa

**Need from Luana**: 
- Identify 2-3 recent clients willing to share their story
- Get written/recorded consent
- Provide a quote about the experience

**Files**:
- `apps/nexa-paraguay/content/{es,en,nl,de}.json` — add `home.testimonials` or `sobre.successStories`
- `apps/nexa-paraguay/public/images/testimonials/` — real family photos

**Effort**: 2 weeks (depends on client response time)

### Deliverable 4.2: "Relocation Guide for Dutch Families" PDF
**Where**: Downloadable lead magnet, linked from hero and services page

**Content**: 10-15 page PDF with:
- "Why Paraguay" (with the interview's economic data)
- "What to expect in your first 6 months"
- "Cost breakdown" (transparent pricing)
- "Red flags to avoid" (the anti-agency section)
- "How Nexa works" (the transparency checklist)

**Languages**: ES + NL (primary), EN + DE (secondary)

**Files**:
- New: `apps/nexa-paraguay/public/downloads/nexa-relocation-guide-es.pdf`
- New: `apps/nexa-paraguay/public/downloads/nexa-relocation-guide-nl.pdf`
- `apps/nexa-paraguay/src/components/` — new `LeadMagnetCTA` component

**Effort**: 1 week

---

## What's Already Done (from previous sessions)

You don't need to redo this work:
- ✅ Logo (NS + Paraguay map + Nexa Paraguay wordmark)
- ✅ Favicon (centered N + map)
- ✅ Color palette (navy #1B2A4A + gold #C9A96E + red accent)
- ✅ 4 locales (ES/EN/NL/DE) working consistently
- ✅ Responsive nav (PC=full, mobile=hamburger)
- ✅ Logo fits within nav bar height

---

## Decision Points — What I Need From Luana

Before I start Phase 1, I need:

| Decision | Status | Notes |
|---|---|---|
| **1. Approve hero copy** (ES + NL drafts) | ⏳ Need review | I drafted based on the consultant's earlier spec |
| **2. Approve "Your Story" copy** | ⏳ Need review | Sonia's interview quotes used directly |
| **3. Provide countryside hero photo** | ⏳ Need asset | Or approve me sourcing from stock photo service |
| **4. Provide personal photo of Sonia** | ⏳ Need asset | For "Your Story" section |
| **5. Approve removing "rich-people / city-slickers" market segment** | ⏳ Need confirm | Per consultant's positioning recommendation |
| **6. Approve the 3 red flags language** | ⏳ Need review | Could sound aggressive — Luana should approve tone |

---

## Estimated Total Effort

| Phase | Effort | When |
|---|---|---|
| Phase 1 (Hero + Story) | 3-5 hrs | | This week |
| Phase 2 (Anti-Agency + Services) | 5 hrs | | Next week |
| Phase 3 (Photography) | 2 hrs + ongoing | | Over 2-4 weeks |
| Phase 4 (Stories + PDF) | 2-3 weeks | | When client photos ready |

---

## Recommended Rollout Sequence

**Week 1** (Phase 1 + part of Phase 2):
- Hero rewrite + Your Story section
- Anti-Agency section (high impact, immediate trust signal)
- Deploy + measure

**Week 2-3** (Phase 3 + 4):
- Photography audit
- Customer story collection
- PDF lead magnet

**Week 4+** (Iterate):
- Measure engagement (time on page, conversion rate)
- Iterate on copy based on feedback
- Add more content as needed

---

## Files That Will Change (Summary)

**Phase 1-2** (text content):
- `apps/nexa-paraguay/content/{es,en,nl,de}.json` (content)
- `apps/nexa-paraguay/nexa-pages/home.json` (page config)
- `apps/nexa-paraguay/nexa-pages/servicios.json` (page config)
- New components: `Hero.tsx`, `StorySection.tsx`, `AntiAgencySection.tsx`, `TransparencyChecklist.tsx`

**Phase 3** (images):
- `apps/nexa-paraguay/public/images/hero/` (replace)
- `apps/nexa-paraguay/public/images/testimonials/` (add)
- `apps/nexa-paraguay/images.json` (update keys)

**Phase 4** (PDF + stories):
- `apps/nexa-paraguay/public/downloads/` (new)
- `apps/nexa-paraguay/content/{es,en,nl,de}.json` (add customer story sections)

---

## Success Metrics

How we'll know this worked:
- **Time on homepage**: Currently ~30 sec, target 90+ sec (longer engagement)
- **Bounce rate**: Target <50%
- **Consultation requests**: Track via /agenda page or WhatsApp clicks
- **Brand recall**: Survey users "what does Nexa stand for?" → expect "honest, transparent, anti-agency"

---

## Approval Process

Each phase will:
1. **Draft** the content (I write, based on interview + web specialist recommendations)
2. **Show** to her (via this doc + screenshots)
3. **Wait** for approval
4. **Deploy** (single commit per phase)
5. **Verify** live

---

**Ready to start?** If you approve the overall plan, I'll begin drafting Phase 1 (Hero + Story) tonight. I'll need Luana's feedback on the drafts before deploying.

---

**Files saved to**:
- `/opt/data/scratchpad/nexa-web-content-action-plan.md`
- (Pending: git push to repo after approval)