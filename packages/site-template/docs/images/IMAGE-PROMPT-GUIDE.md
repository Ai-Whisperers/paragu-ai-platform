# IMAGE PROMPT GUIDE — Belleza Studio

## Quick Reference

### Generation Stats
- **Total Images:** 143 planned → 137 generated (6 skipped as duplicates/existing)
- **Generation Time:** ~3 hours total
- **Model Used:** FAL AI `fal-ai/fast-sdxl`
- **All prompts optimized for:** beauty editorial photography, warm Latin American aesthetic, Asunción Paraguay context

---

## Core Prompt Architecture

Every Belleza Studio image prompt follows this structure:

```
[SUBJECT] + [ACTION/STATE] + [SETTING] + [LIGHTING] + [BRAND_STYLE] + [TECHNICAL]
```

### Standard Prefix (always include):
```
Professional beauty editorial photography, [SUBJECT], warm diffused beauty lighting with warm amber fill, Asunción Paraguay premium beauty studio, Vogue Beauty/Allure aesthetic, Latin American woman with medium warm skin tone, photorealistic 8K quality, [COMPOSITION], [ASPECT]
```

### Lighting Formula (per category):
| Category | Lighting Addition |
|----------|------------------|
| Hero | `soft diffused beauty lighting with warm amber fill, upper 40% negative space for text overlay` |
| Service | `soft beauty lighting emphasizing hair shine and color dimension, warm neutral background` |
| Portrait | `butterfly beauty lighting with perfect catchlights, warm [COLOR] background tint` |
| Before/After | `identical lighting conditions for fair comparison, consistent framing` |
| Process | `documentary style beauty, warm natural studio lighting, authentic moments` |
| Decorative | `clean minimal aesthetic, top-down professional photography, warm neutral background` |
| Dark Mode | `deep moody background with spotlight on subject, dramatic accent lighting, rich shadow detail` |

---

## Category Prompt Templates

### HERO IMAGES (16:9)
```
[SUBJECT] with [FEATURE], [EXPRESSION], wearing [ATTIRE], [BACKGROUND_DESCRIPTION], upper 40% negative space for text overlay, Vogue Beauty editorial aesthetic, photorealistic 8K, shallow depth of field, 85mm lens, 16:9
```

### SERVICE IMAGES (4:3)
```
Close-up professional beauty photography of [SUBJECT], [DETAILED_DESCRIPTION], soft beauty lighting, warm neutral background, shallow depth of field focused on [FOCUS], 85mm, f/1.8, 4:3
```

### PORTRAIT/TESTIMONIAL (4:5)
```
Professional portrait of [PERSON_DESCRIPTION], [EXPRESSION], [POSE_DESCRIPTION], soft [LIGHTING_TYPE] with catchlights, warm [COLOR] background tint, relaxed [HANDS_POSE], direct eye contact, natural makeup, [HAIR_DESCRIPTION], 85mm, f/1.8, 4:5
```

### BEFORE/AFTER (4:5)
```
Side-by-side before and after [SERVICE], left side [BEFORE_DESCRIPTION], right side [AFTER_DESCRIPTION], identical lighting and framing, clean neutral background, professional studio Asunción, photorealistic 8K, 4:5
```

### PROCESS (16:9)
```
[CINEMATIC/ACTION] shot of [SCENE_DESCRIPTION], [DETAILS], warm professional lighting, Asunción studio, photorealistic 8K, 16:9
```

### DECORATIVE (1:1 or 16:9)
```
[ABSTRACT/STYLIZED_DESCRIPTION], clean minimal aesthetic, warm [COLOR_PALETTE], professional quality, [COMPOSITION], [ASPECT]
```

---

## Brand Color Usage in Prompts

| Brand Element | Prompt Keyword |
|---------------|---------------|
| Primary Navy | `#1a1a2e`, dark navy gradient, deep shadows |
| Secondary Coral | `#e94560`, warm coral accent, rose tint |
| Accent Violet | `#7c3aed`, violet purple tint |
| Rose Category | rose color tint, rose gold accents |
| Warm Backgrounds | warm cream, beige, cream walls |
| Skin Tones | medium warm skin tone, Latin American warmth |

---

## Lighting Master Reference

### Standard Beauty Lighting
```
soft diffused beauty lighting with warm amber fill, even exposure without harsh shadows, warm studio ambient, professional softbox setup, subject well-lit with flattering shadows
```

### Portrait Lighting
```
butterfly beauty lighting with perfect catchlights in eyes, soft fill to eliminate under-eye shadows, warm tone, professional beauty dish setup
```

### Dramatic/Low Key
```
deep moody background with accent spot lighting on subject, dramatic contrast, rich shadow detail preserved, sophisticated atmosphere
```

### Product/Flatlay
```
top-down professional photography lighting, even shadow-free illumination, clean white marble or neutral background, professional product photography setup
```

### Window/Natural
```
soft natural window light mixed with studio fill, warm indoor ambient, golden hour warmth, inviting atmosphere
```

---

## Aspect Ratio Guide

| Use | Ratio | Common Images |
|-----|-------|---------------|
| Hero/Banner | 16:9 | hero-*.png, cta-*.png, process-*.png, blog-*.png |
| Portrait/Testimonial | 4:5 | testimonial-portrait-*.png, beforeafter-*.png |
| Service/Gallery | 4:3 | service-*.png, gallery-*.png |
| Square | 1:1 | stats-*.png, decorative-*.png, utility-*.png |
| Social Share | 1.91:1 | utility-social-preview.png |

---

## Dark Mode Prompt Additions

For any image that needs a dark mode variant, append:
```
variant treatment: deep navy gradient background replacing warm studio tones, same subject properly exposed with warm skin tones, accent lighting more prominent, dramatic editorial beauty photography
```

---

## Before/After Consistency Rules

1. **Same person, same day** — both shots must be the same client
2. **Identical framing** — same camera angle, same distance
3. **Identical lighting** — same light setup, same direction
4. **Consistent angle** — side-by-side always same side view
5. **Fair representation** — before should not be worst-case lighting

---

## Prompt Quality Checklist

Before finalizing any prompt, verify:

- [ ] Subject clearly defined (woman, hair type, service type)
- [ ] Action/state specified (receiving service, showing result, etc.)
- [ ] Setting provided (Asunción studio specifics)
- [ ] Lighting formula included (beauty appropriate)
- [ ] Brand style language (warm, Latin American, editorial)
- [ ] Technical specs (aspect ratio, 8K, photorealistic)
- [ ] No conflicting style terms (e.g., "cold" + "warm")
- [ ] Negative space calculated for text overlay (hero = 40%)
- [ ] Color grade specified (warm, not cool)

---

## Common Prompt Components (Copy-Paste)

### Subject Descriptors
- "woman with fresh [SERVICE] result"
- "Latin American woman [AGE] with medium warm skin tone"
- "client revealing beautiful hair transformation"
- "stylist executing [TECHNIQUE] with precision"

### Action Descriptors
- "looking at camera with confident warm smile"
- "sitting relaxed in salon chair"
- "touching her beautiful hair with joy"
- "eyes closed enjoying the treatment moment"

### Background Descriptors
- "Asunción Paraguay premium beauty studio"
- "warm cream walls with soft ambient light"
- "modern styling stations visible in background softly blurred"
- "clean neutral warm background"

### Technical Descriptors
- "photorealistic 8K quality"
- "shallow depth of field f/1.8"
- "85mm lens equivalent"
- "upper 40% negative space for text overlay"
- "rich warm color grade"

---

## Usage Examples

### Example 1: New Hero Image
**Goal:** Hero for color service page
**Subject:** Woman with stunning balayage
**Prompt:**
```
Professional beauty editorial photography of woman with freshly done balayage hair, warm brunette base transitioning to blonde highlights, intense shine and smooth movement, slight head tilt looking at camera with confident warm smile, wearing elegant burgundy top, soft diffused beauty lighting with warm amber fill, Asunción Paraguay premium beauty studio with warm cream walls, upper 40% negative space for text overlay, Vogue Beauty editorial aesthetic, Latin American woman 30s with medium warm skin tone, photorealistic 8K, shallow depth of field f/1.8, 85mm lens, 16:9
```

### Example 2: Before/After Keratina
**Goal:** Show keratina transformation
**Prompt:**
```
Side-by-side before and after keratina treatment, left side showing frizzy damaged hair with frizz halo and humidity damage, right side showing silky smooth straight hair with mirror-like shine and healthy movement, same woman same day same outfit, identical lighting and framing for fair comparison, clean warm cream background, professional beauty studio Asunción Paraguay, photorealistic 8K quality, 4:5 aspect ratio
```

### Example 3: Testimonial Portrait
**Goal:** Authentic client portrait for testimonials
**Prompt:**
```
Professional portrait of woman in her early 30s, warm genuine smile reaching eyes, sitting at salon vanity with warm mirror lighting, wearing coral top, soft butterfly beauty lighting with perfect catchlights, warm rose color tint in background gradient, relaxed hands, direct friendly eye contact, Latin American with medium warm skin tone, natural makeup, voluminous styled hair, photorealistic 8K, 85mm lens, f/1.8, 4:5 aspect ratio
```

---

## Optimization Tips

### For Better Hair Shine:
Add: "maximum hair shine visible, healthy cuticle reflection, ring light setup for shine enhancement"

### For More Dramatic Results:
Add: "cinematic lighting, rich contrast, deep shadows, dramatic reveal moment"

### For Warmer Feel:
Add: "warm amber fill light, golden hour warmth, inviting comfortable atmosphere"

### For Text Overlay Clarity:
Add: "upper [35-45]% negative space, subject positioned in lower 2/3, clean area for typography"

### For Paraguayan Authenticity:
Add: "Latin American woman with medium warm skin tone, Asunción Paraguay setting, local beauty aesthetic"

---

*Document version: 1.0 — Belleza Studio Image Prompt Guide*
*Last updated: May 30, 2026*
*Total images generated: 137*
*All prompts optimized for fal-ai/fast-sdxl model*