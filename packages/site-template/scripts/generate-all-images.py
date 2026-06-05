#!/usr/bin/env python3
"""
Belleza Studio — Image Generation Script
Uses FAL AI (fal-ai/fast-sdxl) for image generation
"""
import os
import time
import json
import requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock

FAL_KEY = "9e8fa2bf-657a-46f0-8bad-02744a8af5ad:80c6ad5d2e27de8dfcfd4ebd77253ff3"
BASE_URL = "https://queue.fal.run/fal-ai/fast-sdxl"
HEADERS = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}
IMAGES_DIR = Path("/home/ai-whisperers/site-template/public/images")
LOG_FILE = Path("/home/ai-whisperers/site-template/logs/image-generation.json")

counter_lock = Lock()
completed_count = [0]  # Using list to allow mutation in nested function

# All 143 improved prompts for Belleza Studio
IMAGES = [
    # ========== HERO (3) ==========
    ("hero/hero-color-expertise.png",
     "Professional beauty editorial photography, woman with freshly done balayage hair, warm brunette base with natural blonde highlights, intense shine and smooth movement, slight head tilt looking at camera with confident warm smile, wearing elegant burgundy top, soft diffused beauty lighting with warm amber fill, Asunción Paraguay premium beauty studio background with warm cream walls and soft ambient light, upper 40% negative space for text overlay, Vogue Beauty editorial aesthetic, Latin American woman 30s with medium warm skin tone, photorealistic 8K quality, shallow depth of field f/1.8, 85mm lens, 16:9"),
    ("hero/hero-transformation.png",
     "Cinematic before and after reveal, woman touching her beautiful hair showing transformation from faded neglected to vibrant healthy balayage, joyful expression revealing confidence, soft side lighting emphasizing color dimension and shine, warm cream studio background Asunción, professional beauty photography, upper 35% negative space, elegant typography space, Latin American woman late 20s, photorealistic 8K, rich warm color grade, dramatic yet welcoming mood, 16:9"),
    ("hero/hero-studio-experience.png",
     "Wide cinematic shot modern Asunción beauty studio interior, stylist carefully applying color treatment to client's hair at premium styling station, client relaxed smiling reading magazine, air conditioned comfortable atmosphere, warm ambient lighting with studio accent spots, plants and modern cream décor in background softly blurred, other styling stations visible in distance, welcoming professional environment, upper 40% negative space for text overlay, photorealistic 8K, warm inviting atmosphere, 16:9"),

    # ========== SERVICES — CORTE (4) ==========
    ("services/corte/corte-dama.png",
     "Beautiful woman sitting in salon chair after fresh haircut, modern layered lob style with subtle waves, wearing black top, looking at camera with confident smile, soft natural window light mixed with studio fill, warm beige salon interior background, professional beauty photography, Latin American woman mid 20s, healthy natural hair shine, shallow depth of field focused on hair and face, photorealistic 8K, 85mm lens, 4:3"),
    ("services/corte/corte-caballero.png",
     "Professional barber giving haircut to male client in modern Asunción salon, scissors and comb in hand mid-cut, side angle view showing precise technique, client relaxed, warm lighting, clean modern interior with dark leather chair, professional atmosphere, photorealistic 8K, documentary style, 4:3"),
    ("services/corte/corte-nina.png",
     "Delightful scene of young girl age 7 getting her hair cut, parent standing beside for comfort, children's salon corner with colorful but tasteful décor, stylist with gentle approach, happy engaged child, warm safe atmosphere, Asunción Paraguay, photorealistic 8K, 4:3"),
    ("services/corte/corte-senior.png",
     "Elegant senior woman age 65 receiving haircut, dignified and refined result, soft silver hair styled beautifully, warm smile, wearing cream blouse, Asunción beauty studio, natural lighting from window, respectful professional care, photorealistic 8K, 4:3"),

    # ========== SERVICES — COLOR (4) ==========
    ("services/color/color-balayage.png",
     "Ultra detailed beauty photography of woman showing fresh balayage result, warm caramel brunette base professionally painted into soft blonde highlights around face and through ends, natural sun-kissed effect, incredible shine and dimension, flowing movement in hair, looking at camera with warm sophisticated smile, soft beauty lighting emphasizing highlights, warm cream background, Latin American woman 30s, photorealistic 8K, macro hair detail visible, 85mm lens, 4:3"),
    ("services/color/color-tinte.png",
     "Professional in-action shot of colorist applying tinte to client's hair, foil highlights being placed, color bowl and brush in hand, focused technique, Asunción beauty studio, warm professional lighting, client relaxed reading magazine, clean modern station, photorealistic 8K, documentary beauty, 4:3"),
    ("services/color/color-mechas.png",
     "Close-up beauty shot showing stunning highlights result, babylights and full highlights creating beautiful dimension around face, warm golden blonde tone, incredible shine showing healthy hair cuticle, slight movement, neutral warm background, professional lighting from above, Latin American woman hair detail, photorealistic 8K, 4:3"),
    ("services/color/color-ombre.png",
     "Side profile beauty shot showing ombré color effect, dark espresso roots transitioning to warm caramel lengths, seamless natural gradient, styled with soft waves, warm salon lighting, Asunción Paraguay, woman 25-30 looking off camera with confident expression, photorealistic 8K, 4:3"),

    # ========== SERVICES — TRATAMIENTO (4) ==========
    ("services/tratamiento/tratamiento-keratina.png",
     "Dramatic before and after keratina treatment, left side showing frizzy damaged hair with frizz and lack of shine, right side showing silky smooth straight hair with incredible shine and movement, same woman same day, professional studio lighting, warm neutral background, visible transformation, Asunción beauty studio, photorealistic 8K, 4:5"),
    ("services/tratamiento/tratamiento-botox.png",
     "Close-up of woman revealing hair after botox capillary treatment, intense hydration and shine, healthy smooth strands, soft styled look, warm satisfied smile, professional beauty lighting, warm cream background, Latin American woman 35, photorealistic 8K, 4:3"),
    ("services/tratamiento/tratamiento-hidratacion.png",
     "Beauty photography of deep hydration treatment result, woman's hair showing deep moisture and health, natural shine, smooth texture, styled with soft waves, warm inviting look, professional beauty lighting, Asunción studio, Latin American woman 28, photorealistic 8K, 4:3"),
    ("services/tratamiento/tratamiento-productos.png",
     "Flatlay of professional hair treatment products, Wella Olaplex Schwarzkopf professional bottles and vials, clean white marble background, scissors and applicator brush, premium quality feel, Asunción Paraguay, top-down photography, clean minimal aesthetic, photorealistic 8K, 4:3"),

    # ========== PROCESS (4) ==========
    ("process/process-reserva.png",
     "Warm lifestyle shot of Paraguayan woman booking appointment via WhatsApp on smartphone, finger about to send message, satisfied calm expression, natural indoor lighting from window, cozy Asunción home setting with warm tones, phone screen showing WhatsApp conversation with Belleza Studio contact visible, photorealistic 8K, authentic moment, 16:9"),
    ("process/process-consulta.png",
     "Professional consultation moment, stylist and client at mirror discussing desired look, iPad showing color options and inspiration photos, engaged active listening, warm professional rapport, Asunción beauty studio, soft natural lighting, photorealistic 8K, 16:9"),
    ("process/process-servicio.png",
     "Cinematic in-service shot, stylist carefully executing color application, client eyes closed relaxed enjoying the transformation process, warm studio lighting, professional concentration visible, Asunción studio with modern equipment visible, photorealistic 8K, rich warm tones, 16:9"),
    ("process/process-resultado.png",
     "Joyful moment of client seeing final result in mirror, expression of delight and satisfaction, stylist standing proudly with professional smile, beauty reveal instant, warm lighting, Asunción studio, Latin American woman late 20s, photorealistic 8K, 16:9"),

    # ========== GALLERY (12) ==========
    ("gallery/gallery-balayage-1.png",
     "Portfolio quality beauty shot of stunning balayage result, flowing waves with incredible dimension, warm brunette to beachy blonde gradient, intense professional shine, woman looking off camera with sophisticated expression, warm studio lighting, clean cream background, Asunción Paraguay, photorealistic 8K, 4:3"),
    ("gallery/gallery-balayage-2.png",
     "Bold color transformation showcase, vivid balayage with rich tones and expert blending, professional photography with perfect lighting to show color depth, woman with confident stance, warm studio Asunción, photorealistic 8K, 4:3"),
    ("gallery/gallery-corte-1.png",
     "Modern textured haircut result, woman with choppy layered bob showing movement and volume, styled with natural waves, professional beauty shot, warm lighting, cream background, Asunción studio, photorealistic 8K, 4:3"),
    ("gallery/gallery-corte-2.png",
     "Precision layered haircut on woman with thick hair, showing expert shaping and movement, styled for everyday elegance, professional beauty photography, warm natural lighting, Asunción Paraguay, photorealistic 8K, 4:3"),
    ("gallery/gallery-keratina-1.png",
     "Before and after keratina transformation, sleek straight shiny hair result, dramatic change demonstration, woman with confident look, professional studio lighting, Asunción beauty studio, photorealistic 8K, 4:3"),
    ("gallery/gallery-keratina-2.png",
     "Close-up of silky smooth keratina result showing cuticle health and shine, woman's hair flowing over shoulder, soft movement, professional beauty lighting, warm studio background, Asunción Paraguay, photorealistic 8K, 4:3"),
    ("gallery/gallery-uñas-1.png",
     "Elegant nail art showcase, close-up of sculpted nails with detailed design, French tip with subtle floral accent, perfect shape and shine, professional macro shot, clean neutral background, Asunción studio, photorealistic 8K, 4:3"),
    ("gallery/gallery-uñas-2.png",
     "Beautiful semipermanent nail results, rich burgundy color with high gloss finish, healthy natural nail shape, elegant lifestyle shot with hands elegantly positioned, warm soft lighting, Asunción beauty studio, photorealistic 8K, 4:3"),
    ("gallery/gallery-cejas-1.png",
     "Close-up beauty shot of perfectly shaped eyebrows using Russian brow technique, clean defined shape with natural thickness, man's hands holding tweezers with professional precision, warm lighting, Asunción studio, photorealistic 8K, 4:3"),
    ("gallery/gallery-cejas-2.png",
     "Woman showing her beautifully shaped and tinted eyebrows, close-up face portrait with eyebrows as focal point, confident expression, soft beauty lighting, warm background, Asunción studio, photorealistic 8K, 4:3"),
    ("gallery/gallery-novias-1.png",
     "Elegant bridal updo hairstyle, intricate braided design with soft tendrils, veil being adjusted, bride looking at camera with joyful emotional expression, professional bridal photography, warm soft lighting, Asunción studio, photorealistic 8K, 4:3"),
    ("gallery/gallery-novias-2.png",
     "Bridal makeup result, flawless natural glam makeup, soft romantic eyes, rose lip, glowing skin, bride in elegant lighting, professional photography, Asunción beauty studio, photorealistic 8K, 4:3"),

    # ========== BEFORE/AFTER (8) ==========
    ("beforeafter/beforeafter-color-1.png",
     "Side-by-side before and after hair color transformation, left side faded dull orange-brown hair with visible roots and brassiness, right side rich warm brown with subtle highlights and intense shine, identical lighting and framing for fair comparison, woman same pose both sides, clean neutral background, professional studio Asunción, photorealistic 8K, 4:5"),
    ("beforeafter/beforeafter-color-2.png",
     "Gray coverage transformation, left side showing gray roots and uneven color distribution, right side showing unified rich chestnut brown color, professional beauty photography, identical conditions, warm studio lighting, Asunción, photorealistic 8K, 4:5"),
    ("beforeafter/beforeafter-corte-1.png",
     "Haircut transformation, left side showing uneven outdated style with no shape, right side showing modern layered precision cut with beautiful movement, woman looking at camera both sides, warm studio lighting Asunción, photorealistic 8K, 4:5"),
    ("beforeafter/beforeafter-corte-2.png",
     "Textured haircut transformation, before showing flat unstyled hair lacking volume and shape, after showing textured layers with movement and dimension, woman with confident look, professional studio lighting, Asunción, photorealistic 8K, 4:5"),
    ("beforeafter/beforeafter-keratina-1.png",
     "Keratina treatment dramatic result, left side frizzy damaged hair with humidity damage and frizz halo, right side silky smooth straight hair with mirror-like shine, same woman same day same outfit, professional studio Asunción, photorealistic 8K, 4:5"),
    ("beforeafter/beforeafter-keratina-2.png",
     "Before and after close-up showing hair cuticle transformation, damaged rough scales visible on left, smooth healthy cuticle reflection on right, macro beauty photography, warm studio lighting, Asunción beauty studio, photorealistic 8K, 4:5"),
    ("beforeafter/beforeafter-uñas-1.png",
     "Nail transformation from damaged to beautiful, left side showing broken weak nails with dry cuticles, right side showing sculpted acrylic nails with perfect French tip and high shine, hands in same position for comparison, clean white background, photorealistic 8K, 4:5"),
    ("beforeafter/beforeafter-general-1.png",
     "Complete beauty makeover, before showing hair needing color cut and style plus no makeup, after showing complete transformation with fresh balayage styled hair, professional makeup and confident expression, same woman, warm studio Asunción, photorealistic 8K, 4:5"),

    # ========== TESTIMONIAL PORTRAITS (10) ==========
    ("testimonials/testimonial-portrait-1.png",
     "Professional portrait of woman in her early 30s, warm genuine smile reaching eyes, sitting at salon vanity with warm mirror lighting, wearing coral top, soft butterfly beauty lighting with perfect catchlights, warm rose color tint in background gradient, relaxed hands, direct friendly eye contact, Latin American with medium warm skin tone, natural makeup, voluminous styled hair, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-portrait-2.png",
     "Executive style portrait of woman 40s, confident composed expression, wearing navy blouse, professional studio lighting, violet background tint, hands elegantly positioned, curly hair professionally styled, Latin American, warm welcoming feel, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-portrait-3.png",
     "Fresh natural portrait of young woman early 20s, student energy with genuine smile, wearing sage green top, sky blue background tint, natural light window mixed with fill, casual elegant style, straight healthy hair, minimal natural makeup, approachable warm energy, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-portrait-4.png",
     "Elegant mother of bride portrait, sophisticated expression with warmth, wearing champagne blouse, amber gold background tint, professional lighting, pearl earrings subtle, hair in elegant updo, grace and dignity, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-portrait-5.png",
     "Professional business woman portrait, confident friendly smile, wearing burgundy top, rose background tint, clean professional studio lighting, straight polished hair with subtle highlights, minimal jewelry, warm approachable energy, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-portrait-6.png",
     "Creative professional woman portrait, artistic vibe with confident expression, wearing black with gold accessories, violet purple background tint, dramatic beauty lighting, bolder makeup look, hair with fun textured style, creative energy, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-portrait-7.png",
     "Loyal client portrait, comfortable warm expression of someone who belongs, wearing cream soft top, warm amber background tint, natural relaxed pose, hair with beautiful grown-out balayage showing maintenance, minimal effortless beauty, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-portrait-8.png",
     "First-time visitor excited expression, curious warm energy, wearing yellow top bringing warmth, sky blue background tint, window natural light, open friendly expression, hair showing fresh color result, anticipation and excitement, photorealistic 8K, 85mm, 4:5"),
    ("testimonials/testimonial-group-1.png",
     "Group photo of three friends leaving beauty studio together, all with fresh cuts and color, laughing and celebrating, wearing stylish casual wear, warm golden hour window light, Asunción Paraguay street setting outside studio, genuine friendship moments, photorealistic 8K, 16:9"),
    ("testimonials/testimonial-transformation-1.png",
     "Full body portrait of happy client showing off her new hair result, confident pose with arm movement showing off style, wearing elegant casual dress, warm studio lighting, beautiful background, Latin American woman late 20s, joyful expression, photorealistic 8K, 4:5"),

    # ========== TEAM (5) ==========
    ("team/team-group-photo.png",
     "Professional team portrait of all 4 stylists at Belleza Studio Asunción, wearing coordinated elegant black work attire, standing together in front of their stylish cream and coral salon interior, warm welcoming genuine smiles, arms relaxed, diverse Latin American team with different skin tones, soft even beauty lighting all faces, clean professional look, photorealistic 8K, 50mm, f/2.8, 16:9"),
    ("team/team-lead-stylist.png",
     "Executive portrait of lead colorist and stylist, confident professional expression, wearing stylish all-black work outfit, standing in studio with warm background, 10+ years experience visible in confidence, warm approachable energy, professional lighting with catchlights, Asunción Paraguay, photorealistic 8K, 85mm, 4:5"),
    ("team/team-stylist-corte.png",
     "Action shot of cut specialist stylist creating beautiful haircut, scissors and comb in hand mid-technique, focused professional expression, client in chair blurred background, Asunción beauty studio, warm professional lighting, documentary style beauty photography, photorealistic 8K, 16:9"),
    ("team/team-stylist-color.png",
     "Portrait of colorist holding foil highlights and color brush, professional tools visible, wearing black work attire with subtle coral accent, warm studio background, confident friendly expression, professional pride in craft, Asunción studio, photorealistic 8K, 85mm, 4:5"),
    ("team/team-nail-tech.png",
     "Portrait of nail technician with detailed nail art work visible, hands elegantly displaying beautiful nail design, wearing black with small floral detail, clean professional look, warm studio lighting, Asunción beauty studio, photorealistic 8K, 85mm, 4:5"),

    # ========== STATS ICONS (5) ==========
    ("stats/stats-anos.png",
     "Clean modern vector illustration icon, calendar with golden star badge showing 10+ years, warm coral and navy color scheme matching brand, minimal elegant design, transparent background, scalable vector style, 1:1"),
    ("stats/stats-clientes.png",
     "Modern flat illustration of diverse group of women icons representing 3500+ clients, warm coral rose color palette, clean minimal design, circular arrangement suggesting community, transparent background, 1:1"),
    ("stats/stats-servicios.png",
     "Icon showing star burst with checkmark representing 12000+ services completed, warm gradient coral to gold, professional badge style, clean minimal aesthetic, transparent background, 1:1"),
    ("stats/stats-rating.png",
     "Elegant star rating display showing 4.9 stars with golden stars on navy circle, premium quality feel, clean modern design, warm gold and navy brand colors, transparent background, 1:1"),
    ("stats/stats-location.png",
     "Stylized map pin icon with Asunción text and coral accent, modern minimal design, warm brand colors, transparent background, 1:1"),

    # ========== REASONS/BENEFITS (6) ==========
    ("reasons/reasons-productos.png",
     "Lifestyle shot of stylist showing Wella professional hair products to client, professional bottles visible, trust and quality communication, warm Asunción studio lighting, Latin American woman approving quality, photorealistic 8K, 16:9"),
    ("reasons/reasons-atencion.png",
     "Intimate consultation moment, stylist actively listening to client with warm eye contact, clipboard with notes, showing personalized attention, Asunción studio, soft warm lighting, photorealistic 8K, 16:9"),
    ("reasons/reasons-ambiente.png",
     "Wide shot of beautiful Asunción studio interior showing premium environment, air conditioned comfort, modern styling stations, warm ambient lighting, comfortable waiting area with plants, welcoming atmosphere, photorealistic 8K, 16:9"),
    ("reasons/reasons-precios.png",
     "Transparent pricing moment, stylist showing clear printed price list to client, no hidden costs visible, honest open communication, warm professional setting, Asunción Paraguay, photorealistic 8K, 16:9"),
    ("reasons/reasons-pago.png",
     "Close-up of multiple payment options being shown to client, phone with Mercado Pago, card reader, cash, all options visible representing easy payment, warm friendly transaction, Asunción studio, photorealistic 8K, 16:9"),
    ("reasons/reasons-garantia.png",
     "Happy satisfied client with beautiful result, confidence and trust visible, stylist and client both smiling, satisfaction guarantee moment, Asunción beauty studio, warm golden lighting, photorealistic 8K, 16:9"),

    # ========== BLOG THUMBNAILS (10) ==========
    ("blog/blog-color-trends-2026.png",
     "Editorial style flatlay of hair color inspiration, color swatches in warm tones arranged beautifully with hair strand samples, professional photography with warm lighting, minimal aesthetic, Asunción studio, readable at small sizes, 16:9"),
    ("blog/blog-balayage-guide.png",
     "Before and after balayage transformation as focal point, soft gradient background, professional beauty photography, text space available, warm tones, Asunción studio, 16:9"),
    ("blog/blog-keratina-care.png",
     "Silky smooth hair result with professional hair care products arranged, flatlay style, warm cream background, products clearly visible Wella Olaplex,养护 concept visual, Asunción studio, 16:9"),
    ("blog/blog-bridal-prep.png",
     "Elegant bridal hair trial moment, bride with trial updo looking in mirror with anticipation, stylist adjusting tendril, soft romantic lighting, Asunción studio, warm emotional feel, 16:9"),
    ("blog/blog-nail-art-ideas.png",
     "Beautiful grid of nail art designs, various styles from classic French to bold colors, top-down macro photography, clean white background, elegant showcase, Asunción studio, 16:9"),
    ("blog/blog-brow-shaping.png",
     "Close-up of perfectly shaped eyebrows with subtle makeup, clean defined architecture visible, warm lighting, professional brow work showcase, Asunción studio, 16:9"),
    ("blog/blog-summer-hair.png",
     "Lifestyle shot of woman with beautiful hair in outdoor Asunción setting, natural sunlight, beachy casual vibe, flowing waves with movement, summer warmth, Latin American woman, 16:9"),
    ("blog/blog-color-maintenance.png",
     "Professional color maintenance visual, fresh vibrant color with gloss treatment sheen, close-up hair photography showing shine, after care products visible, warm studio Asunción, 16:9"),
    ("blog/blog-first-visit.png",
     "Welcome visual for first-time visitors, warm inviting image of studio entrance, friendly atmosphere, new client checklist concept, Asunción Paraguay, 16:9"),
    ("blog/blog-seasonal-looks.png",
     "Fashion forward hair editorial, model with trending hairstyle, editorial beauty photography, runway inspired look, professional lighting, Asunción studio, 16:9"),

    # ========== PROMOTIONS (9) ==========
    ("promotions/promo-color-package.png",
     "Marketing visual for color plus treatment package, beautiful balayage result with overlay showing package savings, warm studio lighting, price overlay design in clean style, Asunción studio, 16:9"),
    ("promotions/promo-bridal-package.png",
     "Elegant bridal package promotion, bride with complete bridal look, veil and flowers, package value visual, warm romantic lighting, Asunción studio, 16:9"),
    ("promotions/promo-referral.png",
     "Two women friends leaving studio together, refer a friend concept, gift card overlay visible, warm celebration moment, Asunción Paraguay street, 16:9"),
    ("promotions/promo-seasonal.png",
     "Seasonal special offer visual, autumn leaves with warm hair color, limited time offer design element, warm seasonal tones, Asunción studio, 16:9"),
    ("promotions/promo-first-visit.png",
     "New client welcome offer visual, warm welcoming design with first visit discount badge, studio interior background, Asunción beauty studio branding, 16:9"),
    ("promotions/promo-package-3.png",
     "Three-service package visual, woman receiving multiple services indication, cut color treatment all visible conceptually, package savings overlay, warm Asunción studio, 16:9"),
    ("promotions/promo-membership.png",
     "Loyalty membership program visual, woman with loyalty card and app interface visible, satisfied member energy, Asunción studio, 16:9"),
    ("promotions/promo-gift-card.png",
     "Elegant gift card design mockup, premium gold and coral on cream, gift box element, special occasion design, Asunción studio, 16:9"),
    ("promotions/promo-reveal.png",
     "Mystery offer reveal visual, elegant curtain being pulled back showing surprise offer, excitement and anticipation, warm lighting, Asunción studio, 16:9"),

    # ========== CTA BANNERS (5) ==========
    ("cta/cta-book-now.png",
     "Bold conversion banner for WhatsApp booking, warm background with elegant woman silhouette, prominent book now CTA button in coral, phone WhatsApp visual element, Asunción branding, 16:9"),
    ("cta/cta-view-services.png",
     "Services overview banner, collage of service results (cut color treatment) with clean typography overlay, navy and coral brand colors, professional warm feel, 16:9"),
    ("cta/cta-special-offer.png",
     "Limited time offer banner with urgency element, countdown timer visual, special discount visible, warm professional design, Asunción studio branding, 16:9"),
    ("cta/cta-beforeafter.png",
     "Before after transformation banner showing dramatic results, inspiring confidence, clean typography, warm dramatic lighting, Asunción studio, 16:9"),
    ("cta/cta-general-brand.png",
     "General brand awareness banner, studio interior beautiful shot with logo prominent, warm inviting colors, Asunción Paraguay, 16:9"),

    # ========== CONTACT/LOCATION (4) ==========
    ("contact/contact-exterior.png",
     "Clean professional studio exterior shot, Belleza Studio signage visible, welcoming entrance with plants, Asunción Paraguay urban setting, warm lighting, professional photography, 16:9"),
    ("contact/contact-interior.png",
     "Inviting studio interior shot showing warm welcoming atmosphere, styling stations visible, comfortable ambiance, plants and modern decor, warm lighting, Asunción, 16:9"),
    ("contact/contact-parking.png",
     "Parking area clear signage at studio entrance, easy access visible, Asunción location convenience, professional entrance shot, 16:9"),
    ("contact/contact-team-greeting.png",
     "Warm moment of team member greeting client at entrance, genuine hospitality, welcoming gesture, Asunción studio entrance, natural warm light, photorealistic 8K, 16:9"),

    # ========== BRANDING ELEMENTS (8) ==========
    ("branding/branding-hero-bg-1.png",
     "Elegant gradient background for hero sections, navy to coral diagonal gradient, subtle brand pattern overlay, clean professional, text space optimized, 16:9"),
    ("branding/branding-hero-bg-2.png",
     "Subtle texture background with brand colors, warm cream with coral accent elements, elegant minimal design, professional quality, 16:9"),
    ("branding/branding-overlay-dark.png",
     "Dark overlay template for text over images, navy with subtle gradient, 60% opacity center fading to edges, professional finish, 16:9"),
    ("branding/branding-overlay-light.png",
     "Light overlay for dark backgrounds, warm cream tint, subtle elegance, professional quality, 16:9"),
    ("branding/branding-texture-1.png",
     "Subtle fabric texture in brand colors, cream and rose gold accent, elegant premium feel, usable as background or accent, 1:1"),
    ("branding/branding-divider-floral.png",
     "Elegant floral divider element, delicate rose and foliage in brand colors, decorative separator for sections, transparent background, 4:1"),
    ("branding/branding-logo-area.png",
     "Clean professional logo placement area, adequate negative space for logo mark, warm gradient background, professional finish, 16:9"),
    ("branding/branding-watermark.png",
     "Subtle branded watermark element, logo mark in low opacity for image protection, coral and navy, professional quality, 1:1"),

    # ========== DECORATIVE (10) ==========
    ("decorative/decorative-hair-wave.png",
     "Beautiful abstract shot of flowing hair strands with natural wave movement, single strand macro showing healthy cuticle and shine, dark brown hair against warm cream gradient, artistic elegant, minimal composition, warm color grade, 1:1"),
    ("decorative/decorative-color-splash.png",
     "Abstract artistic representation of hair color transformation, warm color splash art in coral amber and gold, creative artistic interpretation, modern abstract style, 1:1"),
    ("decorative/decorative-equipment.png",
     "Flatlay of professional beauty equipment, premium scissors and brushes arranged artfully, warm neutral background, Asunción studio, professional quality, 1:1"),
    ("decorative/decorative-products-flat.png",
     "Top-down flatlay of professional hair product lineup, Wella Schwarzkopf Olaplex bottles arranged with brush and scissors, clean white marble background, premium quality feel, Asunción studio, 1:1"),
    ("decorative/decorative-light-kit.png",
     "Professional beauty lighting setup visual, softbox and reflector arrangement, warm ambient studio lighting concept, Asunción studio, clean minimal, 1:1"),
    ("decorative/decorative-mirror-vanity.png",
     "Elegant salon vanity mirror with warm Hollywood bulb lighting, clean professional makeup setup area, Asunción studio, warm inviting, 1:1"),
    ("decorative/decorative-flower-accent.png",
     "Delicate floral accent element, roses and eucalyptus in muted coral and cream tones, botanical illustration quality, elegant decorative use, 1:1"),
    ("decorative/decorative-texture-gold.png",
     "Rose gold metallic texture element, subtle shimmer and luxury feel, elegant accent for premium sections, warm gold rose tone, 1:1"),
    ("decorative/decorative-abstract-warm.png",
     "Warm abstract gradient art, coral rose and amber tones flowing together, modern artistic background element, professional quality, 16:9"),
    ("decorative/decorative-sparkle.png",
     "Subtle sparkle and glint elements, golden light reflections, elegant luxury accent, bridal and premium feel, transparent background, 1:1"),

    # ========== UTILITY (10) ==========
    ("utility/utility-placeholder-portrait.png",
     "Placeholder silhouette for missing portrait image, elegant feminine silhouette in brand colors, professional quality, 4:5"),
    ("utility/utility-placeholder-landscape.png",
     "Placeholder silhouette for missing landscape image, elegant abstract shape in brand colors, professional quality, 16:9"),
    ("utility/utility-empty-gallery.png",
     "Empty gallery state illustration, elegant frame with subtle beauty icon inside, warm muted tones, Asunción studio branding, 16:9"),
    ("utility/utility-error-404.png",
     "Friendly 404 error page illustration, elegant beauty themed design with subtle hair and scissors motif, warm approachable error message feel, navy and coral, 16:9"),
    ("utility/utility-error-maintenance.png",
     "Coming soon maintenance page illustration, elegant clock and sparkle elements, warm professional feel, Asunción studio branding, 16:9"),
    ("utility/utility-loading-spinner.png",
     "Branded loading animation frame, elegant spinner with Belleza Studio coral accent, smooth professional motion, 1:1"),
    ("utility/utility-confirmation.png",
     "Success confirmation illustration, elegant checkmark in coral with celebration sparkles, warm positive feel, Asunción studio branding, 1:1"),
    ("utility/utility-newsletter-success.png",
     "Newsletter signup success illustration, envelope with heart element, warm coral colors, Asunción studio branding, 1:1"),
    ("utility/utility-social-preview.png",
     "Social media share preview image, elegant branded card with studio name and tagline, warm professional appearance, 1.91:1"),
    ("utility/utility-favicon-icon.png",
     "Brand icon favicon, elegant stylized B mark with coral accent, clean scalable design, 1:1"),

    # ========== DARK MODE VARIANTS (8) ==========
    ("dark/dark-hero-color.png",
     "Same as hero color expertise but with moody dark background treatment, deep navy gradient background replacing warm studio tones, subject properly exposed with same warm skin tones, dramatic editorial beauty photography, photorealistic 8K, 16:9"),
    ("dark/dark-hero-studio.png",
     "Moody dark variant of studio interior hero, deeper shadows with accent lighting more prominent, same warm subject exposure, dramatic inviting atmosphere, photorealistic 8K, 16:9"),
    ("dark/dark-service-balayage.png",
     "Dark dramatic balayage shot, deep moody background with spotlight on hair, same subject and composition but darker treatment, accent lighting on highlights, photorealistic 8K, 4:3"),
    ("dark/dark-gallery-color.png",
     "Dark rich version of color gallery shot, deep shadows with color vibrance enhanced, dramatic beauty photography, photorealistic 8K, 4:3"),
    ("dark/dark-cta-book.png",
     "Dark mode CTA banner design, deep navy background with coral text and elements, same content but sophisticated dark theme, 16:9"),
    ("dark/dark-contact-interior.png",
     "Moody dark interior shot of studio, deep warm shadows with accent lighting, cozy inviting despite darkness, photorealistic 8K, 16:9"),
    ("dark/dark-beforeafter-keratina.png",
     "Dramatic dark before after keratina, deep moody lighting on transformation, contrast enhanced, photorealistic 8K, 4:5"),
    ("dark/dark-error-404.png",
     "Dark mode error page, deep navy background with coral accent elements, same friendly approach but sophisticated dark theme, 16:9"),
]

def generate_image(filepath: str, prompt: str, retries: int = 3) -> bool:
    """Generate a single image and save to filepath."""
    for attempt in range(retries):
        try:
            full_path = IMAGES_DIR / filepath
            full_path.parent.mkdir(parents=True, exist_ok=True)

            if full_path.exists():
                print(f"SKIP: {filepath}")
                return True

            resp = requests.post(
                BASE_URL,
                headers=HEADERS,
                json={"prompt": prompt, "num_images": 1},
                timeout=60
            )
            data = resp.json()

            if "request_id" not in data:
                print(f"ERROR {filepath}: {data}")
                continue

            request_id = data["request_id"]
            status_url = data.get("status_url", "")

            for _ in range(60):
                time.sleep(2)
                status_resp = requests.get(status_url, headers=HEADERS, timeout=30)
                status_data = status_resp.json()

                if status_data.get("status") == "COMPLETED":
                    result_url = f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}"
                    img_resp = requests.get(result_url, headers=HEADERS, timeout=60)
                    if img_resp.status_code == 200:
                        with open(full_path, 'wb') as f:
                            f.write(img_resp.content)
                        with counter_lock:
                            completed_count[0] += 1
                        print(f"DONE [{completed_count[0]}/{len(IMAGES)}]: {filepath}")
                        return True
                    # Try alternate URL
                    img_resp2 = requests.get(status_url, headers=HEADERS, timeout=60)
                    if img_resp2.status_code == 200:
                        with open(full_path, 'wb') as f:
                            f.write(img_resp2.content)
                        with counter_lock:
                            completed_count[0] += 1
                        print(f"DONE [{completed_count[0]}/{len(IMAGES)}]: {filepath}")
                        return True

                if status_data.get("status") in ("FAILED", "ERROR"):
                    print(f"FAILED {filepath}: {status_data}")
                    break

            print(f"TIMEOUT {filepath}: {request_id}")
        except Exception as e:
            print(f"EXCEPTION {filepath}: {e}")
            time.sleep(5)

    return False

def main():
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    (IMAGES_DIR.parent / "logs").mkdir(exist_ok=True)

    total = len(IMAGES)
    done = 0
    failed = []

    for i, (filepath, prompt) in enumerate(IMAGES):
        print(f"[{i+1}/{total}] {filepath}")
        if generate_image(filepath, prompt):
            done += 1
        else:
            failed.append(filepath)
        time.sleep(1.5)  # Rate limiting

    # Save log
    log_data = {
        "total": total,
        "done": done,
        "failed": failed,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    with open(LOG_FILE, 'w') as f:
        json.dump(log_data, f, indent=2)

    print(f"\n=== COMPLETE ===")
    print(f"Done: {done}/{total}")
    if failed:
        print(f"Failed ({len(failed)}):")
        for f in failed:
            print(f"  - {f}")

if __name__ == "__main__":
    main()