# Site Template — Final 6 Questions

Answer each question. I'll start executing once you confirm.

---

## 1. Dual Pages — how does the client switch between Template and Example?

Every major section gets two versions:
- `page.tsx` = template prompt mode (client fills their own)
- `page.example.tsx` = ParaguAI filled-in example

How does the visitor see one vs the other?

- (A) URL-based — `/es/` = template prompts, `/es/ejemplo/` = ParaguAI example
- (B) Subdomain or param — `?mode=template` vs `?mode=example`
- (C) Only show TEMPLATE mode in the template repo — Example mode is a separate demo site entirely
- (D) Feature flag in site.json — `site.mode: "template" | "example"` controls which globally

---

## 2. Feature flags — where do they live?

Currently `content/es/site.json` has `features: { blog, ecommerce, giftCards, loyaltyProgram }` as booleans.

With new naming:
- `features.giftCards` → `features.creditoPrepago`
- `features.loyaltyProgram` → `features.programaLealtad`

Where should feature flags live?

- (A) Keep in site.json — feature flags are separate from content, clients edit site.json to enable/disable
- (B) Move to content JSON — each section has its own `enabled: true/false` in its content file
- (C) Both — site.json for global flags, content JSON for section-specific config

---

## 3. Instagram Feed — keep or remove?

Currently shows mock Unsplash images. In template mode:

- (A) Remove entirely — too specific/inconsistent for a generic template
- (B) Show as disabled placeholder — "Conecta tu Instagram para mostrar tu feed aqui"
- (C) Keep but feature flag OFF by default

---

## 4. Exit Intent Popup — keep or remove?

Currently in `app/[lang]/page.tsx`. High-friction annoyance vs legitimate lead tool.

- (A) Remove — known high-friction annoyance, bad for Paraguayan SMB context
- (B) Make it a template prompt — "Este popup aparece cuando alguien esta por irse. Uselo para ofrecer algo de valor: descuento, consulta gratis, informacion."
- (C) Keep as-is but feature flag OFF by default

---

## 5. Referral system — what does it say in template mode?

Currently: "Trae una amiga y ambas ganan puntos."

For a service business template:

- (A) Template prompt: "TRAE UN CLIENTE — Cuando un cliente trae a alguien nuevo, ambos reciben un beneficio. Define el beneficio que ofrecen."
- (B) Keep the example as-is for ParaguAI demo
- (C) Remove from template — too complex for most SMBs

---

## 6. Blog section — keep or remove?

Blog is feature-flagged. In template mode:

- (A) Keep infrastructure — show 3 meta blog posts as examples + explanation of why blog matters
- (B) Make it a separate demo page — `/blog` shows what it looks like, not part of main template flow
- (C) Remove from main template — clients who want it enable via feature flag, too specific to show generically
