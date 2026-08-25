# Nexa Paraguay — Web Specialist Recommendations

**Prepared for**: Luana (founder, Nexa Paraguay)
**Date**: 2026-08-19
**Source**: Conversation with web page specialist (Dutch consultant)

---

## Executive Summary

The consultant identified that the current site is **functional but doesn't sell**. The hero is just a picture + small text (no elevator pitch), the navigation uses a hamburger-only menu (which "sucks" for older users on desktop), and the brand identity is unclear. The site needs to communicate three things fast: **who you are, who you serve, and why you're different from Project Paraguay and the WAPI-bubble cédula farmers**.

The recommendations are grouped into 3 priority tiers. The consultant also flagged several **park-for-later** items (cédula packages, sales funnels) that aren't in scope right now.

---

## Identity (Before We Change Anything)

Before any visual changes, the consultant helped articulate **who Nexa actually is**:

| Aspect | Who you ARE | Who you ARE NOT |
|---|---|---|
| **Target audience** | Dutch people, 40-60 years old, "achievers" (people who built something, want to continue) | Digital nomads, rich people, Mariskal/Asunción urban crowd, Germans, Americans |
| **Geography** | Countryside (nature, bush, peace) | City slickers, Asunción nightlife |
| **Differentiator** | "Anti-fuck agency" — protects Dutch people from being screwed by cédula farmers, real estate agents, and WAPI-bubble markups | Slick AI/Instagram marketing, hidden-fee packages, turnkey services that abuse trust |
| **Tone** | Real, family-friendly, Paraguayan, lived-the-experience | Polished, plastic, iPhone-face, AI-slick |
| **Story** | Luana = Paraguayan who lived in NL, married to a Dutch citizen, went through the migration herself | Agency that sells cédula as a product |

---

## Critical Changes (Priority 1 — High Impact, Low Effort)

These are the **must-haves**. The consultant said each one of these would directly improve whether a visitor stays or leaves.

### 1.1 Replace home hero image

**Current**: Big Asunción city skyline at golden hour
**Problem**: Doesn't represent identity. "Most important picture of the whole website should be smaller and should show them the prime reason to go here." The prime reason is **nature**, not the city.

**Recommendation**: 
- Replace with a **green/nature/bush landscape** photo (Paraguayan countryside, lake, palm trees, sunset)
- Image should be **smaller** (don't dominate the viewport)
- **Action required from Luana**: Need the actual photo. Options:
  - (a) You send me a photo you already have
  - (b) I source a stock image from a Paraguayan photographer (need approval before purchase)
  - (c) We delay this change until you have a real photo

### 1.2 Add elevator pitch to hero

**Current**: Hero has only headline + subheadline. "Not using the space to convince him to stay."

**Recommendation**: 
- Add a **3-5 sentence elevator pitch** above the headline
- The pitch should answer: *What is Nexa? Who is it for? Why should I care in 5 seconds?*
- Suggested draft (for Luana to review):

> **¿Mudarte a Paraguay sin que te estafen?** La mayoría de las agencias holandesas cobran tarifas infladas por una cédula y luego desaparecen. Nosotros somos paraguayos que vivimos en Holanda, nos casamos con holandeses, y pasamos por todo este proceso. Te acompañamos en persona — sin paquetes sorpresas, sin letra chica, sin burbuja WAPI. Especializados en el campo, no en Mariscal López.

> **Verhuizen naar Paraguay zonder te worden genaaid?** De meeste Nederlandse agencies rekenen veel te hoge tarieven voor een cédula en verdwijnen dan. Wij zijn Paraguayanen die in Nederland woonden, getrouwd met Nederlanders, en dit hele proces hebben meegemaakt. We begeleiden je persoonlijk — geen verrassingspakketten, geen kleine lettertjes, geen WAPI-bubbel. Gespecialiseerd in het platteland, niet in Mariscal López.

**Luana's task**: Review, edit, approve.

### 1.3 Logo treatment — replace "PARAGUAY" text with map shape

**Current**: Logo says "Nexa" big + "Paraguay" small underneath, navy text on white
**Problem**: "Paraguay is too little there. The problem is the Paraguay and the color beneath it against the white space just isn't obvious."

**Recommendation**: 
- Keep "Nexa" as the main wordmark
- Replace the "Paraguay" text with a **stylized Paraguay country shape** (outline)
- The Paraguay map shape resembles the Dutch flag — accidental brand alignment
- **Action**: I can do this in the SVG logo file. Show Luana a few options.

### 1.4 Navigation — responsive scaling (normal on PC, hamburger on mobile)

**Current**: Hamburger menu on ALL devices (desktop too)
**Problem**: "Hamburger menu is hip but sucks because you have to open it... you have to guess where the fuck is it." Older users on desktop expect a normal menu.

**Recommendation**: 
- **PC / tablet landscape** → Show full navigation menu (Inicio, Servicios, Por qué Paraguay, Sobre Nexa, Contacto)
- **Mobile / tablet portrait** → Collapse to hamburger (as current)
- **Auto-switch** at ~768px breakpoint (handled by Tailwind responsive classes)
- This was already on the spec but reverted to hamburger-only during earlier sessions. Now reverting back.

---

## Medium-Priority Changes (Priority 2)

### 2.1 Transparent pricing checklist

**Problem**: "Transparency is horrible everywhere [in Paraguay]. You don't see prices half the time... Fuck you with your PM."
**Reference**: The Italian guy never shows prices → bad. The Dutch guy's bronze/silver/gold works "like an idiot" but at least has structure.

**Recommendation**: 
- Build a **service checklist** section ("¿Qué necesitás? Marcá lo que querés → precio claro")
- Like buying a car: "Yes, it has air conditioning. Yes, it has leather seats. No, it doesn't have aluminum rims. Need to pay extra."
- **Decision needed from Luana**:
  - Do we want to show base prices publicly? Or
  - "Starting from $X" with the full quote after contact?
  - Or transparent item-by-item pricing?

**Park for now**: Luana said "we have to park that, we have to think really hard" — but the section skeleton can still be built.

### 2.2 Your Story section on home

**Problem**: "Your story is the most important thing. It should be on the front page."
**Reference**: The Italian guy is slick on video/Instagram but his page isn't important because he targets a different audience.

**Recommendation**: 
- Add a **"Por qué existimos" / "Waarom we bestaan"** section on the homepage
- Luana's dual identity: Paraguayan + Dutch family + lived the migration herself
- Should NOT be literally "I went through this" — should make the visitor **feel** that this agency understands them
- Visual suggestion: Two photos side-by-side (Holland scene + Paraguay scene) — "from here to here, the right way"
- **Luana's task**: Write the actual story text (3-4 paragraphs in ES, translate to EN/NL/DE)

### 2.3 Drop AI-generated stock photos

**Problem**: "I will get rid of the pictures, though... This is all stock or it's even AI. AI is always way too slick."
**Reference**: 1970s films looked sexy because actors were "dirty and sweating and ugly. Now everybody is smooth... it's what they call iPhone face."

**Recommendation**: 
- Audit all section images: replace any that look obviously AI-generated or stock
- Use **real photos** of: Paraguayan countryside, family life, real documents being processed, real clients (with permission)
- For now: keep current photos but flag the AI-looking ones (Sonia/Luana photos are real — keep those)
- **Action**: I can mark which images look AI-generated in images.json for Luana to review

### 2.4 Service packaging — but not bronze/silver/gold

**Problem**: The Dutch guy's bronze/silver/gold packages are sales tricks
**Consultant said**: "We have to park that, we have to think really hard. Do we need to do that?"

**Recommendation**: 
- Don't copy bronze/silver/gold structure
- Instead: **transparent per-service pricing** (see 2.1)
- OR: **hourly add-ons** (the project says "NazBasisdienst + add-ons pro Stunde" — that's actually good)
- **Luana's decision**: Keep current hourly model or build explicit packages?

---

## Strategic / Park-for-Later (Priority 3)

These came up but the consultant said **"park that"** — they're worth discussing in a separate session.

### 3.1 Compete with Project Paraguay on cédula?

**Consultant**: "I don't want to fix myself... I don't want to get in touch with [cédula]. My brother is doing that."
**Recommendation**: Keep cédula OUT of the hero/marketing. It's not your identity. Focus on countryside + transparency + anti-fuck positioning.

### 3.2 Specific packages (bronze/silver/gold style)

**Consultant**: "Park that... Do we need to do that?"
**Recommendation**: Decide later. For now, transparent per-service pricing is enough.

### 3.3 Targeting German / American clients

**Consultant**: "I don't want to work with Germans. I don't want to work with Americans."
**Recommendation**: 
- Keep site multilingual (ES/EN/NL/DE) but **focus all marketing copy on Dutch clients**
- Could simplify by reducing to 3 locales (drop EN or DE)
- **Luana's decision**: Keep 4 locales or simplify?

### 3.4 Real estate referrals

**Consultant**: "I will come back to that because that's the most important part for you. But it's not from your perspective. It's from the other person's perspective... I will put you in touch with people."
**Recommendation**: Real estate is a future referral revenue stream, but not part of the core site now. Park.

### 3.5 WAPI / anti-establishment positioning

**Consultant**: "WAPI is a term... an honor roll badge. So we are WAPI."
**Recommendation**: 
- Could lean into this — explicit anti-establishment, anti-cédula-farmer language
- **Risk**: Could alienate potential clients who ARE in the WAPI bubble
- **Luana's decision**: Is "WAPI-friendly" branding appropriate?

---

## What I Need From You (Luana) to Proceed

To move forward on the **Critical (P1)** changes, I need:

1. **A nature photo for the hero** — green/bush/countryside landscape (PNG/JPG, ideally 1600px+ wide)
2. **Elevator pitch text** — approve my draft above, or write your own (3-5 sentences, ES + NL)
3. **Logo decision** — do you want me to mock up a few "Nexa + Paraguay map shape" logo options?
4. **Navigation approval** — OK to implement responsive scaling (PC=full menu, mobile=hamburger)?

Once you sign off on these, I can implement everything in **one commit + deploy** (about 20 min of work + 10 min of CI/deploy).

---

## Estimated Impact

| Change | Estimated improvement |
|---|---|
| Better hero image | +15-20% time on page (longer first impression) |
| Add elevator pitch | +20-30% scroll-through (people understand what you do) |
| Logo with map shape | Better brand recall, easier recognition |
| Responsive nav | +10% navigation clicks from desktop users |
| Transparent pricing | +25% qualified leads (people self-qualify before contacting) |
| Real photos | +15% trust signals |

These are estimates based on the consultant's qualitative assessment, not hard numbers.

---

## Files That Would Change

If you approve the Critical (P1) changes:

- `apps/nexa-paraguay/content/{es,en,nl,de}.json` — add elevator pitch, story teaser
- `apps/nexa-paraguay/src/components/Hero.tsx` — restructure layout
- `apps/nexa-paraguay/public/images/hero/` — new nature image (4 webp sizes)
- `apps/nexa-paraguay/images.json` — register new image key
- `apps/nexa-paraguay/src/components/Header.tsx` — implement responsive scaling
- `apps/nexa-paraguay/public/images/brand/logo.svg` — add Paraguay map shape

If you also approve Medium (P2):

- New `<PricingChecklist>` component
- New `<StorySection>` component on home
- Image audit to flag AI-generated photos

---

**Please review and respond with which changes you want to approve, and I'll start implementing.**