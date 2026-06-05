# Site Template — Plan Questions

## 1. Content Identity — what should this template actually sell?

The current template has 3 conflicting identities:
- `site.json` / hero → web agency (builds websites for businesses)
- FAQs / WhyUs / gallery → hair salon (Wella, keratina, balayage, novias)
- Services page → business consulting (Gs. 150k mentorship, business plans)

Should this template be:
- (A) Vertical-agnostic — strip ALL industry-specific content, make everything a generic shell that any SMB can use (ferreteria, restaurant, lawyer, mechanic, salon — all equally valid)
- (B) Pick one industry and go deep — commit to ONE vertical (e.g., beauty salon OR web agency) and make the content consistent and real for that one case
- (C) Multi-demos — show it works for one specific business (e.g., hair salon) with the understanding that ParaguAI staff swaps content for different clients

## 2. WhyUs Section — the hardcoded salon content

The `WhyUsSection.tsx` has hardcoded reasons like "experiencia que se nota en cada corte y coloracion" and "+800 Clientas". This is TypeScript, not JSON — it can't be edited via content files.

Should I:
- (A) Move WhyUs to content JSON — make reasons configurable like everything else, remove hardcoded salon language
- (B) Make it vertical-generic — replace with generic reasons that work for any business (e.g., "10+ anos experiencia", "+500 clientes")
- (C) Leave as-is — it's low priority and the average client never reads the About page closely

## 3. Team Placeholders — "Tu Emprendedor" / "Tu Equipo"

The team JSON has literal placeholder names. This is an embarrassing showstopper for any demo.

Should I:
- (A) Replace with a fictional but realistic team — "Maria Fernandez, Desarrolladora" with a realistic bio and a real-looking placeholder photo URL (not Unsplash model)
- (B) Make it empty/minimal — just show a silhouette placeholder with "Tu nombre" in the config, no fake people
- (C) Point to content system — keep as placeholders but make sure the onboarding flow (WhatsApp config) prompts the client to fill this in

## 4. Portuguese Errors — "ajudar", "hoje"

These are on the About page in the "our story" section:
- "ajudar" (Portuguese) instead of "ayudar" (Spanish)
- "hoje" (Portuguese) instead of "hoy" (Spanish)
- Missing accents: "Mas" should be "Mas", "comenzo" should be "comenzo"

Should I:
- (A) Fix to proper Spanish — correct to "ayudar", "hoy" with proper accents
- (B) Rewrite the entire About story — the current story is generic agency fluff; maybe it needs a real rewrite not just spell-check
- (C) Replace with a template structure — "Your story here" placeholder that gets filled via WhatsApp onboarding

## 5. FAQ Content — hair salon in a web agency/consulting site

The FAQ talks about Wella/Olaplex products, bridal packages, and parking for 8 cars. Completely wrong for any non-salon business.

Should I:
- (A) Make generic FAQs — "How do I hire you?", "What's your process?", "Do you offer refunds?" — vertical-agnostic
- (B) Build a FAQ system that changes based on services — if services = consulting, show consulting FAQs; if = salon, show salon FAQs
- (C) Create multiple FAQ JSON files — `faqs-consulting.json`, `faqs-salon.json`, etc., picked by feature flag

## 6. The "9-19h" stat bug

The code animates it as "919+" (counts up to 919 from extracting digits). The content has a non-numeric stat "Horario flexible: 9-19h" which is a string, not a number.

Should I:
- (A) Fix the data — change "9-19h" to a numeric stat like "16h/dia de atencion"
- (B) Fix the code — make the stat renderer skip animation for non-numeric values and display them as-is
- (C) Both — fix data AND code

## 7. Type Safety — AnyRecord everywhere

`config.ts` casts everything as `Record<string, any>`, defeating TypeScript. The proper interfaces in `content-types.ts` (381 lines) exist but aren't used.

This is a big refactor — touches every component that reads from config.

Should I:
- (A) Fix it properly — replace all AnyRecord with proper typed interfaces from content-types.ts
- (B) Leave as-is — it's known technical debt, documented, not blocking
- (C) Fix only the critical paths — type the ones that crash at runtime (TeamSection, HeroSection, AnimatedStats) but leave lower-risk ones

## 8. Testimonials Carousel — controls don't scroll

The prev/next buttons don't actually scroll the CSS `overflow-x-auto` container. Only touch/wheel works.

Should I:
- (A) Quick fix — CSS scroll-sync, minimal code change
- (B) Rebuild the carousel — proper accessible pattern with keyboard nav and real scroll control
- (C) Leave as-is — it works on mobile via touch

## 9. Gallery Images — hardcoded beauty industry alt text

The gallery has alt text like "Resultado de balayage profesional", "Diseño de cejas profesional". If the client is a restaurant, this looks insane.

Should the gallery be:
- (A) Content JSON driven — just use whatever alt text the client provides in gallery.json
- (B) Template-generated — auto-generate alt text from the image filename or category
- (C) Remove gallery from core template — it's too hard to make generic, move to feature-flag optional

## 10. Scope — what's the goal?

Is this:
- (A) Make it production-ready — any Paraguayan SMB can deploy this without embarrassment
- (B) Make it a perfect demo — shows capability, but real deployment requires ParaguAI staff to configure content
- (C) Just fix the crashes and ship — fix the runtime bugs, leave the content issues for content team to handle
