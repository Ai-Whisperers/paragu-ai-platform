# Vendor Research + Store Blueprints

**Date:** 2026-06-16
**Status:** Research only. No vendors contacted yet. Kiki to identify and approach.
**Sources:** Kiki's brief mentions leather maker, candle vendor, BDSM kugurumi vendor, shirts vendor, sex toys vendor, lube vendor. Plus research on what other kink communities (FetLife, Mocha, Recon) sell.

---

## Vendors mentioned by Kiki (already in scope)

| # | Type | What they'd sell | Display in /tienda | Why it fits | Vendor profile we'd need |
|---|---|---|---|---|---|
| 1 | **Leather maker** | Hand-crafted leather cuffs, collars, harnesses, floggers, paddles | High-ticket items (Gs 200k-1M+), photography-heavy. Custom orders via WhatsApp. | High signal of the scene's craftsmanship. FetLife-class product. | One leatherworker PY or AR. Inventory 20-50 SKUs |
| 2 | **Candle vendor** | Massage candles, wax-play candles, soy wax with low-temp melt | Sensory-friendly, sensorial. Mid-ticket (Gs 50-150k). | Fits the "lo oscuro necesita cuidado" theme. Wax play is a documented activity. | Local maker, ideally PY-based for shipping. 5-20 SKUs. |
| 3 | **BDSM kugurumi vendor** | Adult kawaii onesies (sensory-friendly, easy on/off, kinky-cute aesthetic) | Mid-ticket (Gs 80-200k). Niche but fits the brand. | Kugurumi is huge in the Japanese kink scene; novelty in LATAM. Low-competition. | Etsy/Instagram-based maker. Willing to ship LATAM. 3-10 designs. |
| 4 | **Shirts vendor** | Fetish-wear tees, subtle kink prints, "kinkster" lifestyle | Low-mid ticket (Gs 60-120k). Print-on-demand friendly. | Low barrier to entry, easy inventory. Good for events. | Print-on-demand operator or local screen-printer. 10-30 designs. |
| 5 | **Sex toys vendor** | Plugs, wands, restraints, gags, suction toys, vibrators | Mid-high ticket (Gs 100-500k). Health + age gate. | Already a category in mature kink marketplaces. Kiki's audience expects this. | Wholesale supplier or small boutique. PY/AR-based. 30-100 SKUs. |
| 6 | **Lube vendor** | Water-based, silicone, hybrid lubes. Smaller sizes + bulk. | Low-ticket (Gs 30-80k). Recurring purchase. | Consumable. Drives repeat customers. Always sellable. | Wholesale or local maker. PY/AR. 3-10 SKUs. |

---

## Additional vendor types to research (from broader kink-marketplace research)

| # | Type | What they'd sell | Why relevant | Notes |
|---|---|---|---|---|
| 7 | **Rope/bondage** (Moñai already in this slot) | Shibari ropes, jute, hemp, nylon. Different lengths, materials. | Moñai is the existing vendor. Worth documenting the category for future rotation. | Rope is a category leader — never zero SKUs. |
| 8 | **Impact play gear** | Floggers, crops, paddles, riding crops, single-tails | Most-requested category in kink markets. Local craftsmanship is the moat. | Can overlap with the leather maker (1) but worth a dedicated slot for variety. |
| 9 | **Sensory play / sensory deprivation** | Sleep masks, blindfolds, earplugs, headgear, feathers, pinwheels | Lower-ticket, accessible. Good for beginners. | Often bundled with starter kits. |
| 10 | **Service play gear** | Wartenberg wheels, medical play kits, speculums, sounds | Niche. Needs trust signals. | Often combined with #5 (sex toys) for the medical-play enthusiast. |
| 11 | **Leather apparel** | Harness, vest, chaps, jock, cap | High-ticket. Photography-driven. | Often crosses with #1 (leather maker) but worth a slot. |
| 12 | **Bondage gear (rope-free)** | Cuffs, rope, tape, spreader bars, under-bed restraint systems | Core category. Low-mid ticket. | The "easy entry" category — a first-time customer can buy a $30 cuff set. |
| 13 | **Aftercare + wellness** | Massage oil, lotion, herbal tea, blanket, sleep mask | Different vibe. Genuine care signal. | Our brand says "lo oscuro necesita cuidado" — aftercare is a literal expression of that. |
| 14 | **Books + media** | Physical books: "The New Bottoming Book", "Screw the Roses", "SM 101"; magazines | Lower-ticket. Long shelf life. | Reference / educational. Drives cross-category sales (you buy a book, you come back for the harness). |
| 15 | **Latex apparel** | Latex sheets, hoods, gloves, leggings | Niche but high-signal. | Usually a brand partnership (e.g. Libidex, Vex). Out of reach as a local vendor — could be a "we recommend" page |
| 16 | **Workshop / class passes** | Shibari classes, negotiation workshops, rope jams | Not products — slots | Could be sold through the site (calendar + payment), but probably better as a separate feature. Skip for the store for now. |
| 17 | **Event tickets** | Maskarada tickets, alté tickets | Not products — slots | Already exists. Could live in /tienda as a "category" or stay separate in /entradas. |

---

## Store blueprint: 4-tier layout

A clean `/tienda` should organize the catalog so customers can browse by intent, not just by vendor. The current single-vendor layout (just Moñai) doesn't need this, but a multi-vendor shop does.

### Tier 1 — Category pages (top nav)
- `/tienda/ropas-y-textiles` (cuffs, harnesses, shirts, kugurumi)
- `/tienda/juguetes` (sex toys, plugs, vibrators)
- `/tienda/sensorial` (candles, massage, blindfolds, feathers)
- `/tienda/impacto` (floggers, crops, paddles)
- `/tienda/bondage` (rope, cuffs, tape, spreader bars)
- `/tienda/cuidado-y-aftercare` (oils, lubes, teas, blankets)
- `/tienda/lectura` (books, zines)

### Tier 2 — Vendor pages
- `/tienda/[vendor-slug]` (vendor bio, all their products, contact, story)
- Each vendor has: logo, tagline, story, contact, location, social, product count, status

### Tier 3 — Product detail
- `/tienda/[vendor-slug]/[product-slug]`
- Standard PDP: photos, price, variants (size/color/length), description, "Comprar" or "Hablar por WhatsApp"

### Tier 4 — Cart + checkout
- `/tienda/carrito` (exists)
- Checkout options per I2:
  - **Option C (Mercado Pago / Bancard PY / Tigo Money / SIPAP transfer)** — automated
  - **Option WhatsApp-direct** — bypasses cart entirely, opens wa.me/595981200255 with prefilled message

---

## How to find vendors (operational notes for Kiki)

**Best channels (in order of how the LATAM kink scene actually finds each other):**
1. **In-person at events** — Moñai was found this way. Best conversion.
2. **Instagram / TikTok shop** — search for the craft tags (`#shibari #cuerdasparaguay #leathercraft`)
3. **Etsy** — search "shibari rope" or "leather cuff" with PY/AR/BR region
4. **Mazmo marketplace** — kink social network has a vendor section
5. **FetLife vendors** — global but PY/AR/BR vendors exist
6. **Referrals from the community** — the 120-person Telegram group, the 4 maskarada editions of attendees
7. **Cold outreach to craft markets** — find leather/candle/cosplay vendors at PY fairs, invite

**Vendors we'd reject (criteria):**
- Don't share our values (consent-first, kink-positive, trans-inclusive)
- Don't ship to PY
- Don't want to do the WhatsApp-direct option
- Already exclusive to another PY kink community (rare but possible)
- Dropshippers / resellers without their own craft

**Incentive for vendors to join (what we offer):**
- Free listing on `/tienda` (we don't charge commissions yet — see I2)
- A vendor profile page they can link from their IG
- Cross-promotion via the Maskarada Instagram + Telegram group
- Booth at the next maskarada (real foot traffic)
- 0% commission for the first 3 vendors for 6 months, as a launch incentive

---

## How Kiki should use this

1. **Pick 2-3 priority vendors to approach first** — my guess: leather maker (high signal), candle vendor (low barrier), lube vendor (recurring revenue). The shirt / kugurumi / sex toys vendors are real but harder to find.
2. **Identify them in person first** — at the next alté / munch / craft fair. The Telegram group is a good fishing ground too.
3. **Don't promise commissions yet** — we don't have the math. I2 (payment processor) needs to land first.
4. **Defer the multi-vendor shop layout** — keep the /tienda simple until you have 2+ vendors actively selling.

---

## What I did NOT do (and why)

- Did not contact any vendors
- Did not estimate market size, revenue projections, or commission % (depends on I2)
- Did not design the full multi-vendor UI (depends on I2 landing first)
- Did not include adult-content vendors (sex videos, cam services) — out of scope per nuestro manifiesto
