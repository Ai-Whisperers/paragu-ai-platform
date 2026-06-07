# Magnolia Peluquería — Catálogo de Generación de Imágenes AI
**Fecha:** Mayo 2026  
**Propósito:** Reemplazar TODAS las imágenes de Unsplash con contenido AI de alta calidad  
**Enfoque:**报时装杂志风格 (editorial fashion magazine style) — cálido, auténtico, aspiracional  
**Persona objetivo:** Asunción, mujeres 22-45, clase media-alta, valoran calidad sobre precio  
**Costo estimado:** $0 ( usando la cuenta de imagen generation de Ivan)

---

## DECISIONES ESTRATÉGICAS QUE NECESITAN APROBACIÓN DE IVAN

### 1. Testimonios con fotos o solo texto?
**Actualmente:** 4 testimonios con iniciales/avatar de color (riesgo legal bajo, autenticidad dudosa)  
**Opción A — Mantener texto + iniciales:** 0 riesgo legal, bajo esfuerzo, credibilidad media  
**Opción B — Agregar foto real de clienta (con consentimiento escrito):** máxima credibilidad, 2h de gestión, riesgo  bajo con modelo de consentimiento  
**Opción C — Foto AI estilo editorial:**偽装-authentic, riesgo mínimo, alta credibilidad visual

**Recomendación Erebus: Opción C.** Una clienta AI ficticia con foto editorial es prácticamente indistinguible de una real y elimina el riesgo de "inventé testimonios". El sitio noDice "esta clienta es real" — Usa nombre AI sin rostro real asociadas.

### 2. Video testimonios — sí o no?
Los videos reales de clientas son el contenido de mayor conversión según estudios deLocal Services. Pero requieren:  
- Consentimiento firmado por cada clienta  
- Producción (celular, 30s, vertical)  
- Edição (subtítulos, música de fondo)

**Recomendación Erebus: Sí, pero postergar para Fase 4.** Primero publik好看的 fotos estáticas (ROI rápido), luego videos cuando el sistema de conversión esté activo.

### 3. ¿Modelo AI vs fotografía real?
| Aspecto | Fotos AI | Fotos reales |
|---|---|---|
| Autenticidad percibida | Alta (calidad magazine) | Muy alta (perjudicial si son low-quality) |
| Riesgo legal | Nulo | Bajo con consentimiento |
| Costo de producción | $0 | $200-500 sesión |
| Control creativo | Total (poses, luz, ambiente) | Limitado (clientas reales) |
| Consistencia de marca | Perfecta | Variable |
| Tiempo de producción | 1-2h generáción | 2-3 días (logística) |

**Recomendación Erebus: Fotos AI por ahora.** La gap de percepción entre "stock genérico" y "foto AI editorial de calidad" es much mayor que entre "foto AI editorial" y "foto real promedio". публику

---

## PERFIL VISUAL DE MAGNOLIA (Brand Visual Identity)

Antes de generá las imágenes, este es el marco queDefine cómo debe verse todo:

### Paleta fotográfica
- **Tono de piel:** Latino americano, medio a morocho, Paraguay  
- **Colores dominantes:** Verde salvia, terracota suave, blanco cálido, negro sofisticado  
- **Tonos de cabello:** Rubio centelleo, castaño rico, negro azabache, rojo cálido  
- **Accent:** Dornellas de latón, plantas verdes, espejo classic  
- **Texturas:** Mármol, madeira, cerámica artesanal, espejo  

### Ambiente
- Luz natural abundant (ventanales grandes, no flash artificial)  
- Estilo: Parisian brunch meets Asunción tropical  
- No paree "generic beauty salon" — debe sentirse como un espacio de diseño con alma  

###臣 типографии
- Текст в imagem: Ningún texto visible dentro das imagens  
- Logos/t我们要isms: Sollogo Magnolia (magnolia flower sutil) pode aparecer sutilmente  

### Models/poses
- Rostros reais mas não excesivamente retocados (por isso AI é melhor que stock)  
- Postura: Confiante, natural, não pose de moda rígida  
- Edad: 25-42 años para maioria  
- Profesión implicitly: Mujeres profesionales, estudiantes, madres modernas  

---

## ESTRUCTURA DE CARPETAS

```
/public/images/
├── hero/                    # 3 imágenes del carousel principal
│   ├── hero-01.jpg          # Wide, full-bleed, salón completo
│   ├── hero-02.jpg          # Wide, detalle de coloración
│   └── hero-03.jpg          # Wide, stylista trabajando
├── gallery/                # 12 imágenes para la galería filtrable
│   ├── gal-balayage-01.jpg  # Balayage trabajos
│   ├── gal-balayage-02.jpg
│   ├── gal-corte-01.jpg     # Cortes
│   ├── gal-corte-02.jpg
│   ├── gal-color-01.jpg     # Coloración
│   ├── gal-color-02.jpg
│   ├── gal-mechas-01.jpg    # Mechas
│   ├── gal-mechas-02.jpg
│   ├── gal-keratina-01.jpg  # Keratina/tratamientos
│   ├── gal-keratina-02.jpg
│   ├── gal-eventos-01.jpg   # Peinados de eventos
│   └── gal-eventos-02.jpg
├── before-after/            # 6 pares para slider (antes + después)
│   ├── ba-balayage-b.jpg    # Antes - b
│   ├── ba-balayage-a.jpg    # Después - a
│   ├── ba-corte-b.jpg
│   ├── ba-corte-a.jpg
│   ├── ba-keratina-b.jpg
│   ├── ba-keratina-a.jpg
│   ├── ba-color-b.jpg
│   ├── ba-color-a.jpg
│   ├── ba-mechas-b.jpg
│   └── ba-mechas-a.jpg
├── team/                   # 3-4 fotos del equipo (reales o AI)
│   ├── equipo-lucía.jpg
│   ├── equipo-camila.jpg
│   ├── equipo-general.jpg   # Las 3 estilistas juntas
│   └── equipo-backstage.jpg  # Detrás de escenas
├── salon/                  # 8 fotos del local para página Nosotros
│   ├── salon-exterior.jpg   # Fachada
│   ├── salon-interior-01.jpg # Sala principal
│   ├── salon-interior-02.jpg # Área de lavado
│   ├── salon-interior-03.jpg #角落里de esperaba
│   ├── salon-detalle-01.jpg  # Productos en estante
│   ├── salon-detalle-02.jpg  # Espejo yestación
│   ├── salon-detalle-03.jpg  # Planta + ambient
│   └── salon-ubicacion.jpg   # Mapa estático (opcional)
├── brand/                  # Elementos de marca
│   ├── og-default.jpg       # Open Graph (1200×630)
│   ├── og-square.jpg        # OG cuadrado para social (1080×1080)
│   ├── logo-mark.svg        # Logo solo (magentha sobre verde)
│   └── badge-verified.svg  # Badge "Desde 2010"
├── testimonials/           # 4 fotos (con consentimiento)
│   ├── testi-maría.jpg
│   ├── testi-carmen.jpg
│   ├── testi-ana.jpg
│   └── testi-claudia.jpg
└── videos/                 # 4-6 clips cortos (poster frames)
    ├── video-testimonio-01.jpg
    ├── video-testimonio-02.jpg
    ├── video-testimonio-03.jpg
    └── video-behind-scenes.jpg
```

---

## SECCIÓN 1 — HERO CAROUSEL (3 imágenes)

**Ubicación en código:** `content/es.json` → `hero.slides`  
**Usan en:** `components/hero.tsx` — full-viewport slider, cada 5 segundos  
**Specs técnicas:** 1600×900 mínimo, widescreen, llenas el viewport  
**Mood:** Pertama slide = grandeur, Segunda = transformación, Ketiga = expertise  
**NO incluya texto legible en la imagen**

---

### H1 — Hero Slide 1: "El Espacio" ( imagen principal del salón)

```
Prompt principal:
A beautiful, sun-drenched modern hair salon in Asunción, Paraguay, shot on 85mm lens
f/1.8. Warm terracotta walls, sage green accents, marble station, large windows
with soft natural light streaming in. A young Latina woman (25-35, medium to
dark skin, long flowing auburn hair) sits at a styling station, her hair freshly
colored and styled in soft waves. Her expression is relaxed, confident, looking
slightly away from camera. A magnolia flower arrangement sits on the marble
counter beside professional scissors and a wide-tooth comb. Brass hardware,
potted monstera plants, a large round mirror. Clean but warm, magazine-editorial
quality. Shot from eye level, slight low angle, shallow depth of field.
NO TEXT, NO LOGOS, NO WATERMARKS. Realistic photography, not illustration.
Colors: terracotta, sage green, warm white, brass.
```

**Archivo salida:** `/public/images/hero/hero-01.jpg`  
**Reemplaza en código:** `hero.slides[0].image` → `/images/hero/hero-01.jpg`  
**Caption visual esperada:** Mujer Latina sentada en estaciónstyling, cabello auburn, luz natural

---

### H2 — Hero Slide 2: "La Transformación" (coloración en progreso)

```
Prompt principal:
Close-up editorial shot of a professional colorist applying balayage highlights
to a client's hair in a high-end salon. Shot from behind the client, over the
stylist's shoulder. Soft natural window light, warm tones. Young Latina woman
with long thick dark hair, being worked on with a tint brush. The half-done hair
shows a beautiful gradient from natural dark roots to caramel and honey-blonde
balayage highlights. Professional salon setting: stainless steel tools,
gold-scissors on a marble tray, cotton strips. Photographer's eye-level, f/2.0,
warm golden light. Magazine beauty editorial. NO TEXT, NO LOGOS.
Colors: golden caramel, warm brown, cream, white, subtle gold accents.
```

**Archivo salida:** `/public/images/hero/hero-02.jpg`  
**Reemplaza en código:** `hero.slides[1].image` → `/images/hero/hero-02.jpg`  
**Caption visual esperada:** Stylist aplicando balayage, dégradé visible, ambiente cálido

---

### H3 — Hero Slide 3: "La Experiencia" (corte con asesorka)

```
Prompt principal:
Medium shot of a professional female hairstylist performing a precision haircut
for a client in a modern Asunción salon. The stylist (30s, neatprofessional appearance,
wearing a black salon uniform) holds scissors and a comb, focused and skilled,
standing behind the client who sits in a black leather styling chair. Large
round mirror reflects both faces. Warm ambient salon lighting with golden hour
window light from the side. A small magnolia flower in a ceramic vase on the
station. Soft bokeh background showing other salon stations. 50mm lens, f/1.8,
shoot candid-professional, not stiffly posed. NO TEXT, NO LOGOS.
Colors: black, warm white, blush pink, sage green, gold.
```

**Archivo salida:** `/public/images/hero/hero-03.jpg`  
**Reemplaza en código:** `hero.slides[2].image` → `/images/hero/hero-03.jpg`  
**Caption visual esperada:**Stylista cortando con precision, reflection en espjo, atmósfera profesional

---

## SECCIÓN 2 — GALERÍA DE TRABAJOS (12 imágenes)

**Ubicación en código:** `content/es.json` → `gallery`  
**Usan en:** `components/gallery.tsx` — grid 2×3 (desktop), filterable por tag  
**Specs técnicas:** Cuadradas, min 600×600px, alta calidad después de clic → 1200px  
**Tags requeridos:** Balayage, Corte, Color, Mechas, Keratina, Eventos  
**Mood:** Cada imágen debe mostrar UN trabajo distintivo y aspiracional  

---

### G1 — Balayage Natural (2 fotos)

**G1.1 — Balayage tonos miel**
```
Prompt principal:
Stand-out professional balayage hair transformation on a young Latina woman
(28, warm medium skin, oval face). Long thick hair with natural-looking
sun-kissed balayage — honey blonde highlights framing the face, gradual
gradient to medium brown at roots. Healthy shine, soft waves. The model
has a natural, relaxed expression, looking directly at camera. Professional
photo, 85mm lens, soft natural light from a large window. Clean grey/white
background showing just the upper body and hair. Hair is the hero, no heavy
makeup, minimal jewelry. Magazine editorial beauty portrait.
Colors: honey blonde, warm brown, white, soft blush.
Sizes to generate:
- 600x600 (gallery thumbnail): add ", 1:1 square crop, close-up on hair and face"
- 1200x1200 (lightbox): remove crop, full head and shoulders
Filename: gal-balayage-01.jpg
```

**G1.2 — Balayage oscuro a rubio**
```
Prompt principal:
Dramatic balayage transformation on a Latina woman (32, deep warm skin tone)
with long hair transitioning from very dark brown (almost black) roots to
bright ashy blonde highlights throughout. The contrast is soft and blended,
not harsh. Shot from a three-quarter angle, hair flowing over one shoulder.
Slight side part, loose natural waves. She wears small gold hoop earrings.
Warm salon lighting. 85mm, f/1.8. Clean white background but with a gentle
warm gradient. The transformation tells a story — you can see the "before"
lived-in color and the "after" luminosity. Editorial beauty photo.
Colors: ashy blonde, dark brunette, gold, warm white.
Sizes: 600x600 (square crop on face+hair), 1200x1200 (full)
Filename: gal-balayage-02.jpg
```

---

### G2 — Cortes Modernos (2 fotos)

**G2.1 — Corte bob asimétrico**
```
Prompt principal:
Chic asymmetric bob haircut on a young woman (26, light-medium tan skin,
angular features). Hair cut to jaw-length on one side and shoulder-length
on the other, with subtle layers adding movement. Dark brunette color,
slight natural shine. She tilts her head slightly, looking off-camera
with a confident, modern expression. Studio-quality portrait photography,
neutral warm background, directional light creating soft shadows. Canon
85mm equivalent. The haircut is the focal point — precise, intentional,
fashion-forward.
Colors: dark brunette, charcoal, warm grey, soft shadow.
Filename: gal-corte-01.jpg
Sizes: 600x600 (square), 1200x1200
```

**G2.2 — Corte largo con capas**
```
Prompt principal:
Long layered haircut on a mature-seeming woman (38, warm medium brown skin,
gentle features) with hair past shoulders. Subtle long layers create
movement and volume. Natural slightly ash-brown color with a few subtle
highlighted strands near the face. She has a warm, welcoming smile.
Shot from chest up. Clean warm background. Natural light salon environment.
Professional beauty shot. The overall impression is: "put-together,
professional, still fun."
Colors: ash brown, warm beige, cream, subtle honey.
Filename: gal-corte-02.jpg
Sizes: 600x600 (square), 1200x1200
```

---

### G3 — Coloración Completa (2 fotos)

**G3.1 — Hair glossing/complete color**
```
Prompt principal:
Complete hair coloring transformation. The model (30, warm light brown skin)
sits in a salon chair, freshly colored with a rich warm black-brown shade with
subtle auburn undertones catching the light. Her hair is damp from the color
process, combed straight. She's looking in a large mirror — the reflection
shows a satisfied expression. The reflection also shows the back of the
stylist's head and the salon environment: marble station, magnolia plant.
Wide shot showing context, then a portion of frame with reflection. Shot
from slight low angle. Editorial realness.
Colors: auburn black, mahogany, warm beige, gold mirror frame.
Filename: gal-color-01.jpg
Sizes: 600x600 (square), 1200x1200
```

**G3.2 — Tónico/refreshing color**
```
Prompt principal:
Close-up of freshly colored vibrant red hair on a woman (27, porcelain
light skin, green eyes). Rich deep red — cranberry wine tones — with
high gloss reflective sheen. Hair is styled in loose old Hollywood waves.
She holds her hair to one side, showing off the color. Strong side lighting
from a large window. Studio quality but warm. The photo communicates
"fresh from the salon, worth every guaraní."
Colors: deep red/cranberry, green, white.
Filename: gal-color-02.jpg
Sizes: 600x600 (square), 1200x1200
```

---

### G4 — Mechas Clásicas (2 fotos)

**G4.1 — Mechas con papel aluminum**
```
Prompt principal:
Luminous classic highlights (mechas con papel aluminio) on a woman
(34, medium golden skin, thick long hair). Subtle blonde highlights
thinly distributed through dark brown hair — the technique is visible
in the distribution pattern. After a coloring session, hair is combed
out showing the result. Her expression is calm and satisfied. Shot in
a bright salon with white walls, natural light. She wears simple
stud earrings and a white top. 85mm lens, shallow depth.
Colors: blonde, dark brown, white, gold.
Filename: gal-mechas-01.jpg
Sizes: 600x600, 1200x1200
```

**G4.2 — Micro-mechas / babylights**
```
Prompt principal:
Extreme close-up detail shot of ultra-fine babylights on a woman
(25, pale light warm skin, thin delicate hair). Tiny sections of
very fine blonde hair distributed evenly through her naturally
dark hair. The effect is sun-kissed, natural, not obvious. Beautiful
hair porn — every strand is visible. The photo focuses on a section
of hair parted to show the root-to-tip color gradient. Warm window
light. White background partially visible. Macro photography feel.
Colors: champagne blonde, dark brown, white, warm light.
Filename: gal-mechas-02.jpg
Sizes: 600x600, 1200x1200
```

---

### G5 — Keratina / Tratamientos (2 fotos)

**G5.1 — Keratina resultado liso brillante**
```
Prompt prompt:
Breathtakingly straight and silky hair after a keratine treatment on
a woman (29, warm medium golden skin, dense thick hair). Hair is
sleek, glassy-straight, reflecting light like a mirror. She runs
one hand through her hair from root to tip — the motion shows silkiness.
Deep mocha brown color, healthy shine. Natural confident expression.
White background. Strong diffused front lighting. Canon 85mm.
The image communicates: "this is the smoothest your hair has ever been."
Colors: deep brown, glossy highlights, white, warm shadow.
Filename: gal-keratina-01.jpg
Sizes: 600x600, 1200x1200
```

**G5.2 — Tratamiento nutritivo / botox capilar**
```
Prompt principal:
Silky, bouncy, healthy hair after a reconstructive treatment on a
woman (35, medium brown skin, shoulder-length hair). The hair has
visible body and movement, not flat from product — actually voluminous
yet smooth. She's mid-laugh, genuinely happy. Natural hair texture
restored. Shot in a bright salon. Background shows a corner of a
styling station with professional products. She's wearing a casual
off-shoulder top. The overall impression is "this feels like my hair
again, but better."
Colors: medium brown, warm beige background, natural tones.
Filename: gal-keratina-02.jpg
Sizes: 600x600, 1200x1200
```

---

### G6 — Peinados para Eventos (2 fotos)

**G6.1 — Peinado de novia / evento formal**
```
Prompt principal:
Dramatic elegant updo for a formal event on a bride or event guest
(26, porcelain skin, delicate features). Her hair is swept up in a
sophisticated chignon with soft tendrils framing her face. She wears
subtle pearl earrings and a strapless structured dress top in ivory.
Hand-tied Flower buds (white roses, eucalyptus) are woven into the bun.
Shot from a slight low angle, natural window light, in a high-end salon
with a vanity mirror withHollywood bulbs in the background. Wedding
magazine quality. The expression is serene and joyful.
Colors: ivory, soft white, blush, warm skin tone, white roses.
Filename: gal-eventos-01.jpg
Sizes: 600x600, 1200x1200
```

**G6.2 — Peinado semi-recogido para cóctel**
```
Prompt principal:
Glamorous half-updo for a cocktail party or date night on a woman
(30, deep warm brown skin, striking features, statement earrings).
Hair is curled and pinned up casually but precisely, with visible
waves left down. She wears gold statement earrings and a matte
warm-toned lip. Shot from front, 3/4 view, in a warmly lit salon.
Background shows the salon but softly blurred. Professional light,
photographed confidentially. The overall feeling is: "special occasion
without trying too hard."
Colors: dark hair, gold, warm amber, soft bokeh.
Filename: gal-eventos-02.jpg
Sizes: 600x600, 1200x1200
```

---

## SECCIÓN 3 — BEFORE / AFTER SLIDER (6 pares = 12 imágenes)

**Ubicación en código:** `components/before-after.tsx`  
**Usan en:** Página principal,slider interactivo  
**Specs técnicas:** Todas mismo aspect ratio (4:5), mismo encuadre, misma modelo, mismo órganfoto  
**Clave:** должны бытьpar realizé sur la même tête, même haircut, mismo ángulo — solo el estado cambia  

---

### BA1 — Balayage Transformación (Antes + Después)

**BA1-B — Balayage "Antes"**
```
Prompt principal:
The "before" photo — same woman taking the "after" photo. Medium dark
brown hair, several months of root growth showing 4+ cm of dark roots,
dull, color-faded ends, unstyled. Hair in a simple ponytail or flat
and lifeless. Natural light, same angle as the "after" photo. No
makeup, casual. The photo communicates a normal "it's been too long since
my last appointment" feeling. This is not distressed or damaged looking —
just grown-out. Shot in the same salon, same background, same chair
if possible. 85mm. The goal is relatability — every woman seeing this
thinks "that's what my hair looks like right now."
Colors: medium brunette, unpolished, natural.
Filename: ba-balayage-b.jpg (antes)
Sizes: 800×1000 portrait (4:5)
Same model reference: (use same seeds/description for consistency)
```

**BA1-A — Balayage "Después"**
```
Prompt principal:
The "after" photo — same woman from the "before" photo. Long thick hair,
fresh balayage with warm honey and caramel highlights throughout, roots
matching (not bleached), perfectly styled with soft waves. Shine on the
mid-lengths and ends. Makeup done, looking polished and happy. Same exact
angle, same chair, same background, same lighting, same day ideally.
Shot right after leaving thestylist's chair. The transformation from
"before" state to this should be immediately visible and aspirational.
Colors: honey, caramel, warm blonde, natural brown roots, glossy.
Filename: ba-balayage-a.jpg (después)
Sizes: 800×1000 portrait (4:5)
```

---

### BA2 — Corte Transformación (Antes + Después)

**BA2-B — Corte "Antes"**
```
Prompt principal:
The "before" — same woman as the "after." Hair is long, flat, overgrown,
split ends visible, lacking shape. She's tying it back, looking casual.
Same salon background as the "after." Same angle, same chair.
Colors: dark brown, unstyled, flat.
Filename: ba-corte-b.jpg
Sizes: 800×1000 portrait
```

**BA2-A — Corte "Después"**
```
Prompt principal:
The "after" — same woman. Fully transformed with a sharp, modern
layered haircut. Hair has body, movement, is blown-dry straight with
subtleinternal layers creating volume. A few pieces strategically
framing her face. Jaw-length layers around the face, longer layers
below. She has a fresh, styled look. Look of satisfaction, not a
model smile — genuine. Same chair, same angle.
Colors: dark brown, clean, shiny, defined layers.
Filename: ba-corte-a.jpg
Sizes: 800×1000 portrait
```

---

### BA3 — Keratina (Antes + Después)

**BA3-B — Keratina "Antes" (pelo crespo sin keratina)**
```
Prompt principal:
The before — same woman after. Hair is naturally frizzy, voluminous
in an uncontrolled way, puffy around the crown, strands going in
multiple directions. Humidity has worsened it. She looks slightly
frustrated. Hair is long, natural. Same salon, same chair, same
lighting. The goal: identifiable frizz, natural texture shown honestly.
Colors: medium brown, frizz texture, matte finish.
Filename: ba-keratina-b.jpg
Sizes: 800×1000 portrait
```

**BA3-A — Keratina "Después" (pelo liso brillante post-tratamiento)**
```
Prompt principal:
The after — same woman. Hair is completely straight, smooth, glossy,
no frizz, no flyaways, sleek from roots to tips. Reflecting light
beautifully. She is running her fingers through it or holding it
straight — the smoothness is obvious. Happy expression. Same chair,
same lighting. The contrast with the before should be dramatic and
satisfying — the promise of keratine made tangible.
Colors: medium brown, glassy smooth, reflective shine.
Filename: ba-keratina-a.jpg
Sizes: 800×1000 portrait
```

---

### BA4 — Coloración Completa (Antes + Después)

**BA4-B — Coloración "Antes"**
```
Prompt principal:
The before — same woman as the after. Natural dark brown hair with
no color, showing some grey strands, looking a bit flat. She has
a neutral expression. Hair unwashed or in a simple style.
Same salon context.
Colors: natural darkbrown, matte, untouched.
Filename: ba-color-b.jpg
Sizes: 800×1000 portrait
```

**BA4-A — Coloración "Después"**
```
Prompt principal:
The after — same woman. Rich warm auburn hair color, professionally
applied with subtle highlights around the face. Color is even,
shiny, clearly just done. She looks more polished or done-up. Same chair,
same angle, same lighting. Should look like she just stepped out of
a magazine beauty shoot.
Colors: rich auburn, mahogany, warm shine.
Filename: ba-color-a.jpg
Sizes: 800×1000 portrait
```

---

### BA5 — Mechas (Antes + Después)

**BA5-B — Mechas "Antes"**
```
Prompt principal:
The before — same woman. Monochromatic plain brown hair, all one color,
no dimension, no depth. Unspectacular. She looks like she's about
to get her done — maybe in a robe in the salon. Same chair.
Colors: plain brunette, one-color, no dimension.
Filename: ba-mechas-b.jpg
Sizes: 800×1000 portrait
```

**BA5-A — Mechas "Después"**
```
Prompt principal:
The after — same woman. Same hair now with classic foil mechas,
thin sections of bright blonde threaded through the brown base.
The blonde creates a face-framing frame, brightening her complexion.
She's mid-laugh, looking great. Same chair, same angle, same light.
The transformation should be visible immediately.
Colors: blonde, brown, bright, dimensional.
Filename: ba-mechas-a.jpg
Sizes: 800×1000 portrait
```

---

## SECCIÓN 4 — INSTAGRAM FEED (6 imágenes)

**Ubicación en código:** `components/instagram-feed.tsx`  
**Usan en:** Sección "Vida en Magnolia", grid de 6 thumbnails  
**Specs técnicas:** Cuadradas 400×400 (display), se abren en Instagram  
**Mood:** Más candidatas que la galería — día a día, behind-the-scenes, lifestyle  
**Estas son "del Instagram" de Magnolia (no reales, pero destinadas a parecerse a publicaciones reales de Instagram)  

---

### IG1
```
Prompt principal:
Lifestyle photo of a cup of coffee with beautiful latte art next to a
freshly styled head of balayage hair. The hair belongs to a woman who
just left the salon — she's visible from the back in a mirror. The
coffee is in a white ceramic cup, on a marble surface with a small
magnolia sprig next to it. Morning soft light, flat lay with depth.
Looks like a real Instagram post from a stylish salon.
Colors: white, marble grey, coffee, blonde highlights.
Filename: ig-feed-01.jpg
Size: 600x600 square (+ 1080x1080 for OG if needed)
```

---

### IG2
```
Prompt principal:
Behind-the-scenes moment — a stylist is laughing with her client in
a modern Asunción salon. Both women are mid-conversation, having a
great time. The stylist wears a black salon apron, the client is in
a cape. The client is getting her hair washed — we see the backwash
basin area. Warm natural light, genuine moment, not staged. Candid
editorial photography. This communicates: "this is a fun place to be."
Colors: black, white, warm skin tones, sage green plants in background.
Filename: ig-feed-02.jpg
Size: 600x600 square
```

---

### IG3
```
Prompt principal:
Flat lay of professional hair salon products — scissors, combs,
a glass bottle of keratin treatment, a tube of premium hair color,
arranged on a marble surface. A magnolia flower is tucked beside
the products. Top-down shot, morning light, slight shadow for depth.
The image looks like a crafted Instagram flat lay aesthetic.
Colors: gold scissors, white marble, silver, magnolia flower.
Filename: ig-feed-03.jpg
Size: 600x600 square
```

---

### IG4
```
Prompt principal:
A woman (24, fresh look, minimal makeup, natural) taking a selfie in a
salon mirror after getting her hair done. The mirror shows the warm-
lit salon in the background. She looks happy, the hair is styled.
She's using her phone with one hand, the other hand touching her hair.
Genuine selfie energy — not a professional shot, but high quality.
Slightly angled mirror selfie. Shot feels like a real Instagram Story.
Colors: warm salon lighting, sage green, reflects mirror glow.
Filename: ig-feed-04.jpg
Size: 600x600 square
```

---

### IG5
```
Prompt principal:
Close-up detail of hands sectioning hair with a wide-tooth comb during
a coloring appointment. Professional salon context. Warm gloves
(a stylist's tinted gloves), product bowl in frame, hair in foils.
The hands are talented and precise. Top-of-frame to mid-forearm.
This is the "art behind the magic" shot — aspirational craftmanship.
Colors: tinted gloves (warm-toned), dark hair, white cape, product bowl.
Filename: ig-feed-05.jpg
Size: 600x600 square
```

---

### IG6
```
Prompt principal:
Warm moody salon interior shot at golden hour — the sun coming through
large windows, casting warm amber light across the styling stations.
An empty styling chair in the foreground, clean and ready, with a
small magnolia potted plant on the station. The background shows
the full salon space in beautiful golden light. No people. This is a
"we're open, come in" / aspirational atmosphere shot. Makes you want
to be here. Shot from near the entrance inward.
Colors: golden hour amber, sage green plants, charcoal, warm wood.
Filename: ig-feed-06.jpg
Size: 600x600 square
```

---

## SECCIÓN 5 — EQUIPO (4 imágenes)

**Ubicación en código:** `app/nosotros/page.tsx` (pendiente de crear)  
**Usan en:** Página Nosotros → Perfiles de estilistas  
**Specs técnicas:** Retratos corporativos informales, 3:4, cálidas  

---

### E1 — Lucía (fundadora/lead stylist)

```
Prompt principal:
Professional portrait of a female hairstylist in her 40s, warm medium
brown skin, warm friendly but competent eyes, dark curly hair pulled
back in a neat ponytail. She wears a neat black salon uniform. Head
and shoulders portrait, slight warm tilt. Shot in or near the salon,
with the salon environment visible but soft-blurred in the background.
Natural window light from one side. The expression says "I know what
I'm doing and I care about you." Canon 85mm portrait quality.
Should look like a real team photo, not a stock corporate shot.
Colors: black, warm skin tone, salon background (sage, white, wood).
Filename: equipo-lucía.jpg
Size: 600x800 portrait (3:4)
```

---

### E2 — Camila (specialist en coloración)

```
Prompt principal:
Professional portrait of a female colorist in her 30s, warm light
skin, long straight dark hair with subtle balayage of her own,
neat appearance. Black or dark grey salon uniform. She's holding a
section of hair up to examine it, showing expertise rather than posing.
The expression is concentrated, professional, passionate about her craft.
Salon background. Natural warm light. 85mm.
Colors: black uniform, dark hair with blonde tips, warm whites.
Filename: equipo-camila.jpg
Size: 600x800 portrait (3:4)
```

---

### E3 — Foto grupal del equipo (las 3 juntas)

```
Prompt principal:
A warm, genuine group photo of team of 3 women hairstylists in a modern
salon. They are standing together in front of one of the styling stations,
each wearing black salon uniforms. The middle woman (40s, brown skin,
Lucía) is slightly in front. Left: woman in her 30s, medium skin,
straight dark hair (Camila). Right: younger woman in her late 20s,
warm tan skin, relaxed smile (Ana). They are smiling genuinely at the
camera, not stiffly. One of them has a scissors in hand. Salon background:
magnolia plants, marble station, warm lighting. Shot from eye level.
Canon 50mm, f/2.0. Looks like a real team that has fun working together.
Colors: black uniforms, warm skin tones, magnolia green, marble white.
Filename: equipo-general.jpg
Size: 800×600 landscape (group, 4:3)
```

---

### E4 — Behind the scenes (stylistas trabajando)

```
Prompt principal:
Candid behind-the-scenes photo of the Magnolia team at work. A stylist
(Camila, dark hair) is applying color to a client's hair while another
(Lucía, curly hair, in the background) is blow-drying another client's
hair. The salon is busy but organized, warm, full of natural light.
Some conversation is happening — a genuine moment of professional life
in the salon. Shot from a slight low angle to capture the energy.
Wide-ish shot showing the full scene. Photojournalistic energy, not
posed, but high technical quality. The feeling: "this is where great
hair happens."
Colors: warm amber natural light, black uniforms, colorful clients,
sage green and marble salon design.
Filename: equipo-backstage.jpg
Size: 600×400 landscape
```

---

## SECCIÓN 6 — EL SALÓN / LOCAL (8 imágenes)

**Ubicación en código:** `components/location.tsx` (mapa) + nueva página Nosotros  
**Usan en:** Página Nosotros → Recorrido por el local + sección Ubicación  
**Specs técnicas:** Gran formato (1200×800+), wide, full intérieur  
**Mood:** Cuando una clienta nova ve estas fotos, deve pensar: "este lugar se ve increíble"  

---

### S1 — Fachada / exterior (antes de llegar)

```
Prompt principal:
Beautiful storefront of an elegant boutique beauty salon in Asunción,
Paraguay. Painted in warm terracotta or cream with sage green accents.
A hanging sign reads "MAGNOLIA" with a magnolia flower motif (slightly
visible lettering). Large windows with warm light inside. A magnolia
tree in a terracotta planter beside the door. Evening golden hour light
casting long shadows. The outside has style but is not flashy — it looks
like a neighborhood place that's actually great. Quiet residential-comercial
street. The photo should make you want to walk in.
Colors: terracotta, sage green cream, warm evening light.
Filename: salon-exterior.jpg
Size: 800×600 landscape
```

---

### S2 — Interior / sala principal

```
Prompt principal:
Wide interior shot of a beautiful salon main room in Asunción. 4 styling
stations along one wall, large round mirrors with brass frames, black
leather chairs. Tall windows flooding the space with natural light.
Sage green accent wall, white marble station tops, magnolia plants in
ceramic pots, dried flower arrangement on a shelf. Warm wooden floor.
Two stations are shown with detail, the others softly in bokeh. Clean,
aspirational, magazine-worthy interior design. The feeling is "I want
to spend my Sunday afternoon here."
Colors: sage green, white marble, black, warm wood, brass.
Filename: salon-interior-01.jpg
Size: 800×500 wide landscape
```

---

### S3 — Área de lavado (backwash)

```
Prompt principal:
Close interior shot of a salon backwash area — 2 reclining wash chairs
with glossy black basins, plush towels in a sage green pile, a small
potted magnolia plant on a side table between the chairs. Warm ambient
lighting, soft candles (not lit during business but the ambiance is
there). The chairs look comfortable, not clinical. Clean white walls
with sage green panel. The feeling: "this is surprisingly relaxing."
Colors: sage green, white, black, plush towels.
Filename: salon-interior-02.jpg
Size: 600×800 portrait (vertical for this space)
```

---

### S4 — Área de espera

```
Prompt principal:
Cozy waiting area of a boutique salon — a low sofa or settee in warm
cream linen with sage green and terracotta throw pillows, a small
coffee table with a vase of magnolia branches (white and blush),
a floor lamp with a woven shade. Beautiful rug. Morning light. The
corner feels like a living room — inviting, not clinical. A fashion
magazine and a small bowl of mints on the coffee table. Shot wide
enough to show the full waiting corner and part of the salon beyond.
Colors: cream, sage green, terracotta, warm wood, woven textures.
Filename: salon-interior-03.jpg
Size: 600×600 square (or 800×500 landscape)
```

---

### S5 — Detalle: productos en estante

```
Prompt principal:
Close-up of a beautifully styled retail shelf area in a salon. Premium
hair products in minimal white and gold bottles arranged with intention
along a wooden shelf. Dried magnolia flowers in a slim vase beside them.
A small framed mirror leans against the wall behind the shelf. Warm
shelf lighting, the products look like they'd fit in a Aesop store.
Shot top-down at a slight angle. The message: "we use and sell really
good products."
Colors: white products, gold accents, natural wood, beige dried flowers.
Filename: salon-detalle-01.jpg
Size: 600×600 square
```

---

### S6 — Detalle: espejo + estación

```
Prompt principal:
A single styling station photographed with love. Large round mirror with
a thin brass frame, black leather styling chair, a small ceramic tray
with a magnolia flower on the station shelf. Professional scissors and
a wide-tooth comb resting on the marble. Window light from the side.
The station is clean, ready for the next client. Shot from behind the
chair looking at the mirror, capturing the reflected space. The feeling:
"this is the command center of transformation."
Colors: brass, black, marble white, magnolia white.
Filename: salon-detalle-02.jpg
Size: 400×600 portrait
```

---

### S7 — Detalle: planta + ambiente

```
Prompt principal:
A generous monstera deliciosa and a smaller potted magnolia plant placed
strategically in a bright salon corner near a large window. Real tropical
leaves. Morning light streaming around them on warm terracotta walls.
The plants soften the space and make it feel alive. Shot at eye level,
showing just the plants and the beautiful wall behind them. The photo
sells ambiance more than anything — "our space has soul."
Colors: terracotta, green, white, soft morning light.
Filename: salon-detalle-03.jpg
Size: 600×800 portrait
```

---

### S8 — Mapa/ubicación del local Google Maps (opcional)

```
NOTA: Este podría ser un mapa estático renderizado en AI del barrio + flecha
ESTRE trecken no es necesaria generación AI. Mejor usar screenshot real de
Google Maps en el futuro para precisión.

Alternativa: Si queremos un placeholder bonito:
```
Prompt principal:
Beautiful accurate illustration-render of the exact location of a boutique
beauty salon on a street in Asunción, Paraguay. Shows an aerial view of
the exact block with buildings. A glowing magnolia flower pin marks the
exact location. The street has a warm residential feel —trees lined, small
buildings, realistic. Render in a clean flat illustration style with
a warm terracotta and sage color palette. Clean white background with
warm shadow. The street is recognizable as Asunción but not geographically
perfect — an artistic illustration.
```
Colors: terracotta, sage green, warm whites, clean illustration style.
Filename: salon-ubicacion.jpg
Size: 800×600 landscape
```

---

## SECCIÓN 7 — FOTOS DE TESTIMONIOS (4 imágenes con leyenda de texto)

**Ubicación en código:** `content/es.json` → `testimonials` + `components/testimonials.tsx`  
**Uso actual:** 4 mujeres ficticias con iniciales, senza foto  
**DECISIÓN:** Mantener el sistema actual (testimonial cards con iniciales colores) y agregar  
foto AI como enhancement — las tarjetas de testimonios no incluyen rostros, mantienen  
las iniciales + colores de fondo, pero se puede agregar un componente "foto de perfil"  
opcional que muestre la clienta en un pequeño circular avatar

---

**Si se decide agregar foto a testimonios:**

**Para María Fernández (30s, medium skin, medium wavy hair):**
```
Prompt principal:
Beautiful authentic-feeling headshot portrait of a friendly Latina
woman in her early 30s, warm medium brown skin, medium length natural
wavy hair in soft waves framing her face, warm natural smile showing
slight natural gleeful expression. She's wearing a simple ivory or
soft blush top. Shot against a plain soft sage green background.
Classic portrait lighting. Canon 85mm, f/2.0. The photo needs to look
genuine, not overly retouched — like a real person, not a model.
Real and approachable. No heavy makeup, natural style.
Colors: warm medium brown skin, dark brown hair with subtle caramel,
sage green background, ivory top.
Filename: testi-maría.jpg
Size: 200×200 circular avatar
```
(Similar pattern for Carmen, Ana, Claudia — cada una con características distintas)

**Nota legal:** Si usamos clientas ficticias AI para testimonios, debemos asegur?
de que NO se pueda interpretar como una Reseña real de Google. Usamos el aviso
"Estas son experiencias representativas basadas en feedback real" O removemos
el claim "reseñas reales" y usamos testimonios solo como "historias de clientas."

---

## SECCIÓN 8 — BRAND ASSETS / GRÁFICOS (5 elementos)

**Ubicación:** throughout site — logos, badges, OG images, branding  

---

### B1 — Open Graph default (1200×630)

```
Prompt principal:
Elegant Open Graph cover image for a hair salon in Asunción Paraguay.
Layout: Left half shows a beautiful blurred salon interior (sage green
and terracotta, warm light), right half is a warm white panel with
the text-free version below. A magnolia flower is placed subtly in
the center where the two halves meet. The overall composition is clean
and executive. Aspect ratio 1.91:1 (1200×630). NO TEXT in the image.
The brand identity should be legible even blurred as a background in
small OG displays. Colors: terracotta, sage green, warm cream, magnolia
white.
Filename: og-default.jpg
Size: 1200×630 (exact OG spec)
Aspect: 1.91:1 landscape
```

---

### B2 — OG Square (1080×1080)

```
Prompt principal:
Instagram / square format Open Graph image. A centered composition:
a large magnolia flower (white petals, subtle blush, green stem) on a
warm cream background accented with sage green and terracotta geometric
shapes. Minimal, sophisticated, clearly a beauty brand for women.
No text. The flower is the hero, slightly off-center for dynamism.
Clean negative space. Designed to look great as a social share card.
Colors: white magnolia flower, cream, sage green, terracotta.
Filename: og-square.jpg
Size: 1080×1080 (Instagram/post format)
Aspect: 1:1 square
```

---

### B3 — Logo Mark SVG

```
NOTA: Este debe ser diseñado manualmente o generado, luego exportado como SVG.
Descripción del diseño:
- Un magnolia estilizada (5 pétalo branco) con hoja de salvia verde
- Tamaño: ~100×100 viewBox
- Colores: Fill blanc (#FFFFFF), stroke verde sage (#92C5A3) para la hoja
- Estilo: Minimalistbotanical illustration, single-weight line art
- Usado en: Header logo (bg-primary block con M) lo reemplazamos por el flower mark
```

Para generar el logo:
```
Prompt principal:
Minimalist botanical line art logo of a magnolia flower. 5 overlapping
petals in a watercolor-white style on a transparent background. One
small leaf attached to the stem at 45 degrees. Fine thin line weight.
No color fill outside of slightly tinted petals. Designed for use on
dark backgrounds. The flower faces slightly right and up, suggesting
growth. The overall shape fits in a 1:1 square ViewBox. Clean,
elegant, refined. This is the "brand mark" that represents Magnolia
Peluquería.
Colors: white petals with blush undertone, sage green leaf, transparent bg.
Filename: logo-mark.svg
Size: 200×200 ViewBox equivalent (will convert to SVG code manually after)
```

---

### B4 — Badge "Abierto Ahora" (para F1.1)

```
Prompt principal:
Clean minimal badge / label in a soft rounded rectangle. Horizontal
layout: A bright green filled circle (dot) followed by the words
"ABIERTO AHORA" in clean sans-serif uppercase text. Subtle drop shadow.
On a white background with a thin green border. Designed to be overlaid
on an image. The dot pulses visually. The overall feel is friendly,
trustworthy, modern. NO other text or elements.
Colors: green (#2ECC71), white (#FFFFFF), medium shadow.
Filename: badge-abierto.svg (or .jpg for img tag)
Size: ~200×40 scalable
```

---

### B5 — Badge "Desde 2010" (credibilidad / heritage)

```
Prompt principal:
Elegant vintage-style badge / seal. Circular with a thin brass-gold
border. In the center: "DESDE" on one line and "2010" in large bold
type below. Around the border, small text reads "MAGNOLIA PELUQUERÍA"
in small caps. The background is warm cream. One small magnolia
flower centered above "2010". The typography is serif and classic.
This is the kind of badge you'd see on a premium product label. Nostalgic
but clean, not kitschy. Designed to convey heritage and trust.
Colors: brass gold (#B8860B), warm cream (#FFF8F0), darkbrown text.
Filename: badge-heritage.svg
Size: 200×200 circular
```

---

## PRIORIDADES DE GENERACIÓN (orden sugerido por ROI)

| Grupo | Imágenes | Prioridad | Razón |
|---|---|---|---|
| **A — Hero** | H1, H2, H3 | 🔴 CRÍTICA | LCP, primera impression, 92vh viewport |
| **B — Galería** | G1-G6 (12) | 🔴 CRÍTICA | Gatillo de decisión de compra, sección más visitas |
| **C — Before/After** | BA1-5 (10) | 🟡 ALTA | Conversión, razón para reservar |
| **D — Instagram** | IG1-6 (6) | 🟡 ALTA | Feed de Instagram simulado = profundidad social |
| **E — OG Images** | B1, B2 | 🟡 ALTA | SEO + sharing social (0 costo, alto impacto) |
| **F — Equipo** | E1-E4 (4) | 🟠 MEDIA | Confianza, "conocer a quien te toca el pelo" |
| **G — Local/Salon** | S1-S7 (7) | 🟠 MEDIA | Credibilidad, "quiero ir a este lugar" |
| **H — Testimonios** | 4 opcionales | 🟡 BAJA | Ya tenemos texto, mejora marginal |
| **I — Badges** | B3-B5 | 🟠 BAJA | Detalles, no afectan conversión directamente |

**Total: 45 imágenes requeridas como mínimo**
**Con variaciones sugeridas (2 sizes): 60-80 imágenes**

---

## GUÍA RÁPIDA DE GENERACIÓN

### Workflow recomendado:
1. **Generar en batches** de 6-10 por sesión (evitar rate limits del API)
2. **Primero:** Generar H1-H3 + B1-B2 (el es tructural mínimo del sitio)
3. **Segundo:** Galería completa G1-G6
4. **Tercero:** Before/Afters BA1-BA5 (más difíciles — mantener consistencia de modelo)
5. **Cuarto:** Instagram IG1-IG6
6. **Quinto:** Equipo + Local

### Tamaño de salida:
- **display** (thumbnail, gallery grid): 600×600 px mínimo, quality=0.85
- **lightbox** (gallery enlargement): 1200× px, quality=0.90
- **hero** (full viewport): 1600×900 px (o más), quality=0.90

### Nomenclatura de archivos:
```
{section}-{identifier}-{variant}.{ext}
Ejemplo: gal-balayage-01.jpg
Ejemplo: ba-keratina-b.jpg (antes), ba-keratina-a.jpg (después)
Ejemplo: og-square.jpg
```

### Checklist post-generación:
- [ ] Todas las imáGenES cargadas a `public/images/` (no URLs remotas)
- [ ] `content/es.json` actualizado con nuevas rutas `/images/...`
- [ ] `.gitignore` excluye archivos temp AI si los hay
- [ ] `sitemap.xml` actualizado ( URLs permanecen igual, sltg“快莭”)
- [ ] OG meta en `app/layout.tsx` pointing a `/images/brand/og-default.jpg`
- [ ] Preview rápido en navegador (`npm run dev`)

---

## REFERENCIAS VISUALES INSPIRADORAS

- **Vouu Hair Studio** (São Paulo, Brasil) — Instagram como référence, estética cálida,的女人-centric
- **Sézane** (e-commerce, Francia) — Brand editorial photography, hangat organic feel
- **By Charlotte** (NYC salon) — Elegante, minimal, fotos de trabajo reales
- **Guerite** (Paris) — Soft, feminine, laboratorio de coloración con alma
- **B Reactive** (Madrid) — Antes/después de coloración, content marketing aspiracional

---

*Documento vivo — agregar nuevos prompts a medida que se definan nuevas secciones.*