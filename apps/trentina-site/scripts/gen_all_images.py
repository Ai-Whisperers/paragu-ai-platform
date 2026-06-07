#!/usr/bin/env python3
"""
Batch image generator for Trentina — 172 images via FAL flux/schnell
Usage: python3 scripts/gen_all_images.py [phase]
phases: all, f1, f2, f3, f4, f5
"""
import asyncio, os, sys, urllib.request, json, time

FAL_KEY = "9e8fa2bf-657a-46f0-8bad-02744a8af5ad:80c6ad5d2e27de8dfcfd4ebd77253ff3"
BASE_DIR = "/root/trentina-site/public/images"
os.makedirs(BASE_DIR, exist_ok=True)

def fal_generate(prompt: str, output_path: str, aspect: str = "1:1") -> bool:
    """Generate one image via FAL flux schnell, save to output_path. Returns True on success."""
    import fal_client

    aspect_map = {"square": "1:1", "landscape": "16:9", "portrait": "9:16"}
    ratio = aspect_map.get(aspect, "1:1")

    try:
        result = asyncio.run(fal_client.generate_async(
            "fal-ai/flux/schnell",
            prompt=prompt,
            aspect_ratio=ratio,
            num_images=1,
        ))
        images = result.get("images", [])
        if not images:
            print(f"  [FAIL] {output_path} — no images returned")
            return False
        url = images[0]["url"]
        local_path = os.path.join(BASE_DIR, output_path)
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        urllib.request.urlretrieve(url, local_path)
        size = os.path.getsize(local_path)
        print(f"  [OK] {output_path} ({size//1024}KB)")
        return True
    except Exception as e:
        print(f"  [ERROR] {output_path}: {e}")
        return False

# ─── IMAGE DEFINITIONS ───────────────────────────────────────────────────────
# (path, prompt, aspect)

IMAGES = {
    # HERO IMAGES (landscape)
    "f1": [
        ("hero-cervezas.jpg",        "Professional craft beer photography — beer flight with 5 different craft beer glasses arranged on a dark slate bar counter. Golden pilsner, amber APA, deep copper IPA, pale gold Metatron IPL, and dark brown Dunkel. Each glass with thick white foam. Dark moody ambient lighting, warm LED spots. Shallow depth of field. Paraguayan craft brewery. No text, no labels.", "landscape"),
        ("hero-tienda.jpg",           "Professional product photography of an assortment of craft beer packs and boxes stacked on a rustic wooden shelf. Multiple longneck bottles visible, golden pilsner style. Warm amber warehouse lighting. Dark moody background. Craft brewery retail aesthetic. No text, no labels.", "landscape"),
        ("hero-gallery.jpg",          "Professional photography of a curated collection of craft beer moments — glasses clinking, beer being poured, friends laughing, golden amber liquid catching light. Dark atmospheric bar setting. Candid lifestyle, warm candlelight. Shallow depth of field. No text, no labels.", "landscape"),
        ("hero-contact.jpg",          "Professional photography of a rustic craft brewery entrance at night, warm golden light glowing through windows onto dark stone exterior. Location marker overlay concept. Moody evening atmosphere, Paraguayan winter evening. No text, no labels.", "landscape"),
    ],

    # BEER PRODUCT SHOTS (square unless noted)
    "f1b": [
        ("beers/pilsen-longneck.jpg",   "Professional product photography of a golden pilsner craft beer longneck bottle isolated on pure black background. Crystal clear golden liquid, white foam label area. Studio lighting, high contrast. No text, no labels, no distracting elements.", "square"),
        ("beers/pilsen-500ml.jpg",      "Professional product photography of a golden pilsner craft beer 500ml bottle on a dark slate surface. Condensation drops on bottle. Warm side lighting, dark moody background. Studio quality. No text, no labels.", "square"),
        ("beers/pilsen-glass.jpg",      "Professional product photography of a golden pilsner craft beer in a standard pint glass on a dark walnut bar counter. Thick white foam head, crystal clear golden body. Condensation on glass. Warm amber overhead lighting. Dark moody background. No text, no labels.", "square"),
        ("beers/apa-longneck.jpg",      "Professional product photography of an amber American Pale Ale craft beer longneck bottle on a dark slate surface. Orange-amber liquid visible. Warm dramatic side lighting. Dark moody background. Studio quality. No text, no labels.", "square"),
        ("beers/ipa-can.jpg",          "Professional product photography of a copper-red India Pale Ale craft beer in a sleek aluminum can on a dark copper surface. Condensation drops. Warm dramatic lighting. Dark moody background. Modern craft can aesthetic. No text, no labels.", "square"),
        ("beers/metatron-bottle.jpg",   "Professional product photography of a pale gold Metatron India Pale Lager bottle on a dark slate surface. Light straw color, elegant label area. Clean minimal lighting. Dark moody background. Studio quality. No text, no labels.", "square"),
        ("beers/dunkel-bottle.jpg",     "Professional product photography of a dark brown Munich Dunkel craft beer bottle on a black surface. Deep ruby brown color visible through glass. Dark moody dramatic lighting with warm highlights. Studio quality. No text, no labels.", "square"),
        ("beers/flight-4.jpg",         "Professional craft beer photography — beer flight with 4 different style glasses on a dark slate bar. Pilsner, APA, IPA, Metatron. Each perfectly filled with foam. Overhead warm lighting, dark moody. Top-down angle. No text, no labels.", "square"),
        ("beers/flight-5.jpg",         "Professional craft beer photography — beer flight with 5 different craft beer glasses on a rustic wooden bar counter. Pilsen, APA, IPA, Metatron, Dunkel. Thick white foam on each. Warm amber spotlights, dark moody. Shallow depth of field. No text, no labels.", "square"),
        ("beers/label-pilsen.jpg",     "Extreme close-up macro photography of a craft beer bottle label for a pilsner beer. Cream parchment texture, vintage serif typography area, golden border. Dark moody background. Professional product photography. No actual text readable, abstract label design.", "square"),
        ("beers/label-ipa.jpg",        "Extreme close-up macro photography of a craft beer bottle label for an IPA beer. Dark textured label, bold typography area, amber border. Dark moody background. Professional product photography. No actual text readable, abstract label design.", "square"),
    ],

    # PACK SHOTS (landscape)
    "f1c": [
        ("packs/pack-longneck-open.jpg",  "Professional product photography of an open cardboard beer pack box revealing longneck bottles inside, golden pilsner style. Wooden pallet in dark industrial warehouse. Warm amber overhead lighting. No text, no labels.", "landscape"),
        ("packs/pack-pilsen-500-open.jpg","Professional product photography of an open cardboard beer pack box with 500ml pilsner bottles visible. Dark warehouse setting. Warm side lighting. No text, no labels.", "landscape"),
        ("packs/pack-mix-4.jpg",         "Professional product photography of a cardboard beer pack box containing mixed craft beer bottles — golden, amber, copper, dark. Dark moody warehouse lighting. No text, no labels.", "landscape"),
        ("packs/pack-mix-3.jpg",         "Professional product photography of three different 6-pack craft beer boxes grouped together — pilsner, apa, ipa styles. Dark industrial setting. Warm lighting. No text, no labels.", "landscape"),
        ("packs/pack-party.jpg",         "Professional product photography of multiple stacked beer pack boxes in large quantity on a wooden pallet. Party volume, wholesale quantity. Dark warehouse. Warm amber lights. No text, no labels.", "landscape"),
        ("packs/individual-6.jpg",       "Professional product photography of 6 individual craft beer bottles of different styles grouped together on a dark slate surface. Variety pack concept. Warm dramatic lighting. No text, no labels.", "square"),
        ("packs/delivery-box.jpg",       "Professional product photography of a sealed cardboard beer delivery box with subtle craft beer branding on dark concrete floor. Industrial setting, moody lighting. No text, no labels.", "landscape"),
    ],

    # CHOPP / DRAFT (landscape)
    "f2a": [
        ("chopp/tap-bar.jpg",          "Professional photography of a craft beer tap bar with multiple brass beer taps and fonts on dark wood. Golden pilsner beer flowing from one tap. Warm bar lighting, dark moody atmosphere. No text, no labels.", "landscape"),
        ("chopp/tap-single.jpg",       "Professional photography of a single craft beer tap faucet pouring fresh golden pilsner beer into a glass. Creamy white foam building. Dark moody background, warm spotlight on the pour. No text, no labels.", "landscape"),
        ("chopp/draft-pour.jpg",       "Professional photography of a bartender pouring a perfect pint of golden craft beer. Thick creamy head forming. Dark atmospheric bar background. Warm amber lighting, bokeh lights. Realistic, not cartoon. No text, no labels.", "landscape"),
        ("chopp/kegerator.jpg",       "Professional photography of a professional kegerator draft beer system with stainless steel kegs inside, glass front showing golden beer lines. Dark cold room setting. No text, no labels.", "landscape"),
        ("chopp/barrel-20l.jpg",      "Professional product photography of a 20 liter stainless steel beer keg barrel on a dark floor. Brewery setting, dramatic side lighting. Industrial craft brewery aesthetic. No text, no labels.", "landscape"),
        ("chopp/event-festival.jpg",  "Professional photography of a vibrant outdoor craft beer festival — people holding pints, colorful tents in background, warm golden hour lighting. Paraguay outdoor event, cheerful atmosphere. No text, no labels.", "landscape"),
        ("chopp/event-corporate.jpg", "Professional photography of a corporate event with waiters serving craft beer in elegant glasses. White tablecloth setting, professional atmosphere. Warm interior lighting. No text, no labels.", "landscape"),
        ("chopp/event-private.jpg",   "Professional photography of a private outdoor garden party with guests holding craft beer glasses, string lights, lush green background. Warm evening light. Paraguay residential setting. No text, no labels.", "landscape"),
        ("chopp/install-bar.jpg",     "Professional photography of a professional draft beer installation behind a restaurant bar. Multiple taps, beer fonts, stainless steel. Bartender adjusting the system. Dark moody. No text, no labels.", "landscape"),
        ("chopp/glasses-stack.jpg",   "Professional product photography of a stack of classic shaker beer pint glasses on a dark shelf. Clean, institutional. Dark moody background, warm overhead light. No text, no labels.", "square"),
        ("chopp/tap-handle.jpg",      "Professional macro photography of a decorative wooden beer tap handle with carved design. On a stainless steel beer font. Dark moody background, dramatic spotlight. No text, no labels.", "square"),
        ("chopp/cooler-detail.jpg",   "Professional photography of a professional beer cooling system with glycol lines and stainless steel components in a cold brewery room. Cool blue-white lighting. No text, no labels.", "landscape"),
    ],

    # PROCESO / ELABORACIÓN
    "f2b": [
        ("process/malt-bag.jpg",        "Professional photography of craft brewery malt bags stacked in a warehouse. Hessian gunnysacks with grain visible. Warm industrial lighting. Dark moody atmosphere. Paraguayan craft brewery. No text, no labels.", "landscape"),
        ("process/malt-mill.jpg",       "Professional photography of a mechanical grain mill machine in a craft brewery. Steel rollers, malt kernels in hopper. Industrial setting, dramatic lighting. No text, no labels.", "landscape"),
        ("process/mashing.jpg",         "Professional photography of a craft brewery mash tun being stirred, hot grain-water mixture. Steam rising. Warm interior lighting, industrial stainless steel vessel. No text, no labels.", "landscape"),
        ("process/lautering.jpg",        "Professional photography of lautering process in craft brewery — grain bed filtering in stainless steel lauter tun, golden wort running below. Industrial dramatic lighting. No text, no labels.", "landscape"),
        ("process/boiling.jpg",         "Professional photography of craft brewery brew kettle boiling — steam rising vigorously, copper or stainless vessel. Hops aroma visualized with lighting. Dark moody industrial. No text, no labels.", "landscape"),
        ("process/hop-add.jpg",         "Professional photography of craft brewer adding whole hop cones into a boiling kettle. Steam, golden light, green hops. Dramatic industrial brewery setting. No text, no labels.", "landscape"),
        ("process/whirlpool.jpg",       "Professional photography of whirlpool forming in a craft brewery hot liquor tank — circular flow of amber wort. Steam rising. Dark moody industrial lighting. No text, no labels.", "landscape"),
        ("process/cooling.jpg",         "Professional photography of plate heat exchanger cooling system in a craft brewery. Stainless steel industrial unit, steam and condensation. Dark moody lighting. No text, no labels.", "landscape"),
        ("process/yeast-pitch.jpg",     "Professional photography of liquid yeast being pitched into fermented beer in a stainless steel conical fermenter. Laboratory precision setting. Dark moody industrial. No text, no labels.", "landscape"),
        ("process/fermentation.jpg",    "Professional wide shot of a craft brewery fermentation room — multiple large stainless steel conical fermenters with temperature gauges. Cool blue lighting, industrial atmosphere. No text, no labels.", "landscape"),
        ("process/conditioning.jpg",    "Professional photography of beer conditioning tanks in a dark cold brewery cellar. Dim amber lighting, stainless steel bright tanks. Maturation room atmosphere. No text, no labels.", "landscape"),
        ("process/kegging.jpg",        "Professional photography of craft brewer filling a stainless steel Cornelius keg from a bright tank. Beer flowing, industrial setting. Dark moody atmosphere. No text, no labels.", "landscape"),
        ("process/bottling.jpg",       "Professional photography of craft beer bottling process — bottles moving on a conveyor line, manual labeling. Dark industrial brewery. No text, no labels.", "landscape"),
        ("process/labeling.jpg",       "Professional macro photography of hands applying a craft beer label to a bottle. Cream parchment label, golden beer bottle. Warm lighting. No text, no labels.", "square"),
        ("process/qc-glass.jpg",       "Professional photography of a craft brewer performing quality control — pouring beer into a tasting glass under bright light. Lab notebook nearby. Industrial setting. No text, no labels.", "landscape"),
        ("process/barrels-oak.jpg",   "Professional photography of oak whiskey or wine barrels in a craft brewery cellar. Dark cellar lighting, barrels stacked. Aging atmosphere. No text, no labels.", "landscape"),
        ("process/water-filter.jpg",   "Professional photography of water filtration system in a craft brewery — multiple filter housings, crystalline water flowing. Clean industrial setting, blue lighting. No text, no labels.", "landscape"),
        ("process/canning.jpg",        "Professional photography of craft beer being canned — aluminum cans moving through a seamer machine. Dark industrial brewery line. No text, no labels.", "landscape"),
    ],

    # GALERÍA (square)
    "f2c": [
        ("gallery/cerveza-pour-2.jpg",    "Professional photography of craft beer being poured into a glass at a 45 degree angle. Golden amber liquid, thick white foam forming. Dark atmospheric bar, warm candlelight bokeh. No text, no labels.", "square"),
        ("gallery/cerveza-foam.jpg",      "Extreme close-up macro photography of white beer foam bubbles, creamy texture, carbonation bubbles. Dark background, dramatic macro lens. No text, no labels.", "square"),
        ("gallery/cerveza-bubble.jpg",    "Macro photography through a glass of craft beer showing carbonation bubbles rising. Golden amber liquid, condensation drops on outside glass. Dark moody, macro lens. No text, no labels.", "square"),
        ("gallery/cerveza-color-compare.jpg", "Professional product photography — 5 different colored craft beer glasses in a row showing color gradient from pale gold to deep brown. Dark slate background, dramatic lighting. No text, no labels.", "landscape"),
        ("gallery/cerveza-label-close.jpg","Extreme close-up macro of a vintage craft beer bottle label on dark background. Parchment texture, embossed gold border detail. Professional macro photography. No readable text.", "square"),
        ("gallery/packaging-1.jpg",       "Professional photography of craft beer 6-pack being placed in a cardboard shipping box. Dark warehouse, warm lighting. No text, no labels.", "landscape"),
        ("gallery/packaging-2.jpg",       "Professional photography of stacked craft beer boxes ready for delivery in a dark warehouse. Warm amber overhead lighting. No text, no labels.", "landscape"),
        ("gallery/event-birthday.jpg",    "Professional photography of a birthday celebration with craft beer —蛋糕 and beer glasses on a festive table, warm party lighting, balloons in background. No text, no labels.", "landscape"),
        ("gallery/event-wedding.jpg",    "Professional photography of an outdoor wedding reception table with craft beer glasses, warm golden hour lighting, string lights, floral decorations. No text, no labels.", "landscape"),
        ("gallery/event-office.jpg",     "Professional photography of a corporate office after-work event with craft beer pints on a conference table, colleagues toasting. Modern office interior, warm lighting. No text, no labels.", "landscape"),
        ("gallery/event-outdoor.jpg",    "Professional photography of an outdoor festival crowd with craft beer in hand — people laughing, warm string lights, food trucks in background, golden hour. No text, no labels.", "landscape"),
        ("gallery/delivery-car.jpg",     "Professional photography of a delivery vehicle with craft beer boxes in the cargo area, sunset background. Paraguay urban setting. No text, no labels.", "landscape"),
        ("gallery/whatsapp-order.jpg",   "Professional mockup photography of a smartphone showing WhatsApp conversation about ordering craft beer — multiple beer images on screen, dark phone background. No text, no labels.", "square"),
        ("gallery/team-brewmaster-1.jpg","Professional portrait photography of a craft brewer in a brewery uniform standing among stainless steel fermentation tanks. Dark industrial setting, warm face lighting. Paraguayan craft brewery. No text.", "landscape"),
        ("gallery/team-brewmaster-2.jpg","Professional portrait photography of a craft brewer holding a pint of golden beer, smiling, industrial brewery background. Dark moody, warm golden key light. No text, no labels.", "landscape"),
        ("gallery/team-work.jpg",        "Professional photography of craft brewery team working together during brewing — two people checking equipment, steam, industrial stainless steel. Dark moody atmosphere. No text, no labels.", "landscape"),
        ("gallery/brewery-interior-1.jpg","Professional wide shot of craft brewery interior — tanks, pipes, warm industrial lighting, copper accents. Dark atmospheric. No text, no labels.", "landscape"),
        ("gallery/brewery-interior-2.jpg","Professional photography of craft brewery bright tank room at night — glowing stainless tanks, amber floor lighting, atmospheric. No text, no labels.", "landscape"),
        ("gallery/sunset-serve.jpg",    "Professional photography of a pint of craft beer being raised in a toast against a dramatic sunset sky — warm golden hour, silhouette. No text, no labels.", "landscape"),
        ("gallery/food-pairing-1.jpg",  "Professional food photography — craft beer pint alongside a grilled meat platter, Paraguay style asado. Dark moody table setting, warm candlelight. No text, no labels.", "landscape"),
        ("gallery/food-pairing-2.jpg",  "Professional food photography — craft beer flight with a cheese and charcuterie board. Dark slate surface, warm atmospheric lighting. No text, no labels.", "landscape"),
    ],

    # FÁBRICA / FACILITY
    "f3a": [
        ("facility/exterior-day.jpg",    "Professional architectural photography of a craft brewery exterior facade during daytime. Rustic industrial building with Trentina signage concept. Paraguay suburban industrial area. No text, no labels.", "landscape"),
        ("facility/exterior-night.jpg",  "Professional architectural photography of a craft brewery at night — warm golden light glowing through industrial windows, dark night sky. Paraguay. No text, no labels.", "landscape"),
        ("facility/tank-room.jpg",       "Professional wide-angle photography of a craft brewery fermentation room with large stainless steel conical fermenters. Cool blue industrial lighting, dark moody atmosphere. No text, no labels.", "landscape"),
        ("facility/bright-tank.jpg",     "Professional photography of stainless steel bright conditioning tanks in a dark brewery cellar. Warm amber floor lighting, atmospheric. No text, no labels.", "landscape"),
        ("facility/brewhouse.jpg",       "Professional photography of a craft brewery brewhouse — mash tun, lauter tun, brew kettle all visible in one industrial space. Warm interior lighting. No text, no labels.", "landscape"),
        ("facility/cold-room.jpg",       "Professional photography of a brewery cold room with glycol chiller units. Cold blue-white lighting, stainless steel walls. Industrial craft brewery. No text, no labels.", "landscape"),
        ("facility/bottling-area.jpg",   "Professional photography of a craft brewery bottling area — bottles on conveyor, labeling station, boxes stacked. Dark industrial lighting. No text, no labels.", "landscape"),
        ("facility/office-tasting.jpg",  "Professional photography of a craft brewery office and tasting room — rustic wooden table, beer glasses, brewmaster portrait area. Warm cozy interior, Paraguayan craft. No text, no labels.", "landscape"),
        ("facility/signage.jpg",         "Professional photography of craft brewery outdoor signage on a fence or building exterior. Rustic industrial, warm golden lighting. Night setting. No text, no labels.", "landscape"),
        ("facility/aerial.jpg",          "Professional aerial drone photography from above a craft brewery industrial complex — rooftops, parking area, green surroundings. Paraguay suburban. No text, no labels.", "landscape"),
    ],

    # EQUIPO
    "f3b": [
        ("equipment/mash-lauter-tun.jpg", "Professional photography of a stainless steel mash lauter tun in a craft brewery. Grain bed visible, industrial dramatic lighting. No text, no labels.", "landscape"),
        ("equipment/brew-kettle.jpg",    "Professional photography of a copper craft brewery brew kettle with steam rising. Fire or direct heat underneath. Dark moody industrial setting. No text, no labels.", "landscape"),
        ("equipment/heat-exchanger.jpg", "Professional macro photography of a plate heat exchanger unit in a craft brewery. Stainless steel industrial, water droplets. Dark moody lighting. No text, no labels.", "landscape"),
        ("equipment/fermenter-conical.jpg","Professional photography of a large stainless steel conical fermenter in a craft brewery. Temperature gauge, sampling port visible. Cool blue industrial lighting. No text, no labels.", "landscape"),
        ("equipment/glycol-chiller.jpg", "Professional photography of a glycol chilling unit in a craft brewery. Blue-white industrial lighting, stainless steel housing. No text, no labels.", "landscape"),
        ("equipment/kegs-stack.jpg",     "Professional product photography of silver Cornelius kegs stacked 3 high in a dark cold room. Blue industrial lighting, atmospheric. No text, no labels.", "landscape"),
        ("equipment/bottling-line.jpg",  "Professional photography of a small craft beer bottling line — rinser, filler, capper in dark industrial brewery. No text, no labels.", "landscape"),
        ("equipment/analysis-lab.jpg",   "Professional photography of a craft brewery quality analysis lab corner — test tubes, hydrometer, lab notebook, beer sample glasses. Clean white and steel. No text, no labels.", "landscape"),
    ],

    # INGREDIENTES
    "f3c": [
        ("ingredients/malt-variety.jpg",    "Professional flat lay photography of different types of craft brewery malt varieties — pale, crystal, chocolate, Munich — in small bowls on dark background. Warm overhead lighting. No text, no labels.", "square"),
        ("ingredients/hops-whole.jpg",      "Professional macro photography of whole hop cones and hop pellets on dark background. Green hops, yellow lupulin visible. Dramatic lighting. No text, no labels.", "square"),
        ("ingredients/hops-cone.jpg",      "Extreme close-up macro photography of a single hop cone — green bracts, yellow lupulin glands visible. Dark moody background. No text, no labels.", "square"),
        ("ingredients/yeast-culture.jpg",  "Professional macro photography of liquid yeast culture in a glass flask — creamy white suspension. Laboratory setting, blue-white lighting. No text, no labels.", "square"),
        ("ingredients/water-glass.jpg",     "Professional photography of crystal clear craft brewing water in a glass cylinder vessel with measurement markings. Pure, clean, scientific. Dark background. No text, no labels.", "square"),
        ("ingredients/malt-sorghum.jpg",   "Professional close-up photography of sorghum malt grains on a dark surface. Red and gold grain colors. Warm dramatic lighting. No text, no labels.", "square"),
        ("ingredients/cacao-nibs.jpg",     "Professional macro photography of dark roasted cacao nibs scattered on dark background. Rich brown-black color. Dramatic spotlight. No text, no labels.", "square"),
        ("ingredients/citrus-hops.jpg",    "Professional photography of fresh citrus fruit slices — grapefruit, orange, lime — alongside hop cones on dark background. Aroma concept. Warm dramatic lighting. No text, no labels.", "square"),
    ],

    # SOCIAL MEDIA
    "f4a": [
        ("social/ig-feed-1.jpg",  "Professional craft beer product photo for Instagram feed — single golden pint with thick foam on dark moody background. Golden hour warm light. Minimal, clean composition. No text, no labels.", "square"),
        ("social/ig-feed-2.jpg",  "Professional lifestyle Instagram photo — craft beer at a social gathering, people laughing, warm string lights, dark atmospheric background. No text, no labels.", "square"),
        ("social/ig-feed-3.jpg",  "Professional Instagram post — craft brewer pouring beer from a tap, dark industrial background, warm dramatic lighting. Minimal composition. No text, no labels.", "square"),
        ("social/ig-feed-4.jpg", "Professional product Instagram photo — craft beer pack box on dark wood, warm amber lighting. Minimal, clean. No text, no labels.", "square"),
        ("social/ig-feed-5.jpg", "Professional craft beer process photo — stainless steel brewery tank, steam, industrial dramatic lighting. Minimal composition. No text, no labels.", "square"),
        ("social/ig-story-1.jpg", "Professional vertical Instagram story photo — bartender pouring craft beer, dark bar, warm spotlight. 9:16 portrait format. No text, no labels.", "portrait"),
        ("social/ig-story-2.jpg", "Professional vertical Instagram story photo — craft beer glass being raised in toast against sunset. Warm golden hour. 9:16 portrait. No text, no labels.", "portrait"),
        ("social/ig-story-3.jpg", "Professional vertical Instagram story photo — craft brewery exterior at night, warm golden window glow. Paraguay street scene. 9:16 portrait. No text, no labels.", "portrait"),
        ("social/fb-cover.jpg",  "Professional wide Facebook cover photo — panoramic craft beer landscape. Multiple pints, industrial barrel room, warm golden tones. No text, no labels.", "landscape"),
        ("social/fb-post-1.jpg",  "Professional Facebook post image — single craft beer product shot with dark background and warm ambient glow. Minimal. No text, no labels.", "landscape"),
        ("social/fb-post-2.jpg", "Professional Facebook post image — craft beer event promo concept, outdoor festival crowd with beer. Warm celebratory mood. No text, no labels.", "landscape"),
        ("social/wa-status-1.jpg","Professional WhatsApp status — vertical craft beer pouring shot, dark moody bar, warm bokeh lights. 9:16 portrait format. No text, no labels.", "portrait"),
        ("social/wa-status-2.jpg","Professional WhatsApp status — vertical craft beer pack gift concept, wrapped box with ribbon. Warm gift giving mood. 9:16 portrait. No text, no labels.", "portrait"),
        ("social/profile-ig.jpg", "Professional Instagram profile photo — craft beer logo concept on dark background. Minimal, clean. Square format. No text.", "square"),
        ("social/profile-fb.jpg", "Professional Facebook profile photo — craft beer brewery logo concept on dark background. Minimal, clean. Circular crop. No text.", "square"),
    ],

    # MARIDAJE
    "f4b": [
        ("pairing/pilsen-meat.jpg",    "Professional food photography — golden pilsner pint alongside grilled chicken breast on a dark plate. Paraguay home cooking setting, warm candlelight. No text, no labels.", "landscape"),
        ("pairing/pilsen-cheese.jpg",  "Professional food photography — pilsner craft beer with a board of soft white cheeses. Dark slate surface, warm dramatic lighting. No text, no labels.", "landscape"),
        ("pairing/apa-spicy.jpg",      "Professional food photography — amber APA craft beer alongside spicy grilled chorizo and chimichurri. Dark moody table setting. Paraguay style. No text, no labels.", "landscape"),
        ("pairing/apa-grill.jpg",      "Professional food photography — APA craft beer with a thick steak on the grill, flames in background. Dark smoky atmosphere. No text, no labels.", "landscape"),
        ("pairing/ipa-burger.jpg",     "Professional food photography — copper-red IPA craft beer alongside a juicy gourmet burger with melted cheese. Dark bar background, warm lighting. No text, no labels.", "landscape"),
        ("pairing/ipa-cheese.jpg",     "Professional food photography — IPA craft beer with aged strong cheese board. Dark moody table setting, candlelight. No text, no labels.", "landscape"),
        ("pairing/dunkel-chocolate.jpg","Professional food photography — dark brown Dunkel craft beer alongside dark chocolate bar. Dark moody background, dramatic spotlight. No text, no labels.", "landscape"),
        ("pairing/dunkel-dessert.jpg", "Professional food photography — dark Munich Dunkel beer alongside tiramisu dessert. Dark elegant table setting, warm candlelight. No text, no labels.", "landscape"),
    ],

    # SEO / META
    "f4c": [
        ("og-beers.jpg",     "Professional Open Graph social share image for a craft beer website cervezas page — 5 different beer glasses in a row showing all beer styles. Dark moody background. Optimized for 1200x630. No text, no labels.", "landscape"),
        ("og-tienda.jpg",    "Professional Open Graph social share image for a craft beer shop page — craft beer packs in gift box on dark wood. Warm amber lighting. 1200x630. No text, no labels.", "landscape"),
        ("og-chopp.jpg",     "Professional Open Graph image for a craft beer draft service page — bartender pouring perfect golden pint. Dark bar background. 1200x630. No text, no labels.", "landscape"),
        ("og-nosotros.jpg",  "Professional Open Graph image for about page — craft brewer in front of brewery tanks, warm industrial lighting. 1200x630. No text, no labels.", "landscape"),
        ("og-gallery.jpg",   "Professional Open Graph image for gallery page — mosaic of craft beer moments, glasses, brewery, people. Dark atmospheric. 1200x630. No text, no labels.", "landscape"),
    ],

    # UI / ICONOGRAFÍA
    "f4d": [
        ("icons/beer-icon.svg",       "Minimalist line art SVG icon of a beer pint glass with foam. Simple, clean, single color on transparent background. 512x512 viewBox.", "square"),
        ("icons/chopp-icon.svg",      "Minimalist line art SVG icon of a beer tap font with drip. Simple, clean, single color on transparent background. 512x512 viewBox.", "square"),
        ("icons/delivery-icon.svg",    "Minimalist line art SVG icon of a delivery box with beer bottle inside. Simple, clean, single color on transparent. 512x512 viewBox.", "square"),
        ("icons/purity-icon.svg",     "Minimalist line art SVG icon of the 1516 Reinheitsgebot shield emblem. Simple, clean, single color on transparent. 512x512 viewBox.", "square"),
        ("icons/map-marker.svg",      "Minimalist SVG map pin icon with Paraguay country outline inside. Simple, clean, single color on transparent. 512x512 viewBox.", "square"),
        ("icons/whatsapp-icon.svg",   "Minimalist WhatsApp chat bubble SVG icon. Simple, clean, single color on transparent background. 512x512 viewBox.", "square"),
        ("icons/instagram-icon.svg",  "Minimalist Instagram camera SVG icon. Simple, clean, single color on transparent background. 512x512 viewBox.", "square"),
        ("icons/facebook-icon.svg",   "Minimalist Facebook letter F SVG icon. Simple, clean, single color on transparent background. 512x512 viewBox.", "square"),
    ],

    # LOGO SVG
    "f4e": [
        ("logo-trentina.svg",        "Professional SVG logo design for a Paraguayan craft beer brand called Trentina. Circular emblem with a hop cone or beer glass motif. Elegant serif typography. Gold and dark colors. Transparent background.", "square"),
        ("logo-trentina-white.svg",  "Same logo as logo-trentina.svg but inverted — white lines on transparent background. For use on dark backgrounds.", "square"),
        ("favicon.svg",              "Minimalist SVG favicon for craft beer brand — simple beer glass or hop icon. 32x32 viewBox. Single color on transparent.", "square"),
    ],

    # BACKGROUNDS / TEXTURAS
    "f5a": [
        ("bg/bg-grain.svg",        "Subtle animated SVG grain noise texture overlay for dark backgrounds. Very low opacity, fine film grain pattern. Seamless tileable.", "square"),
        ("bg/bg-hexagon.svg",      "Subtle seamless SVG hexagonal cell pattern for dark backgrounds. Dark gray lines on very dark background. Low opacity.", "square"),
        ("bg/bg-bubble-dark.jpg",   "Professional dark textured background image — subtle carbonation bubble pattern in very dark tones. For section dividers or overlays. Tileable concept.", "landscape"),
        ("bg/bg-malt-texture.jpg",  "Subtle warm brown textured background evoking malted grain. Very low contrast, muted tones. For section backgrounds.", "landscape"),
        ("bg/bg-hop-green.jpg",     "Very dark muted green textured background evoking hop fields. Low contrast, atmospheric. For section backgrounds.", "landscape"),
        ("bg/bg-barrel-wood.jpg",   "Dark rich wooden barrel stave texture background. Deep brown with subtle grain. For CTA section backgrounds.", "landscape"),
        ("bg/bg-gradient-gold.jpg", "Subtle radial gradient background — very dark edges fading to dark amber center. Clean modern craft aesthetic.", "landscape"),
        ("bg/noise-texture.png",    "Professional film grain noise PNG texture overlay, dark tones. 50% opacity, tileable. For dark theme overlay effects.", "square"),
    ],

    # CONTACTO
    "f5b": [
        ("contact/storefront.jpg",    "Professional architectural photography of a craft brewery storefront — rustic industrial entrance with warm lighting, Paraguay suburban area. Evening golden hour. No text, no labels.", "landscape"),
        ("contact/interior-degustacion.jpg","Professional photography of a craft brewery tasting room interior — rustic wooden bar, beer taps, stools, warm Edison bulb lighting. Cozy inviting atmosphere. No text, no labels.", "landscape"),
        ("contact/map-scene.jpg",     "Professional drone photography of an industrial suburban area in Paraguay where a craft brewery is located. Warm late afternoon light. No text, no labels.", "landscape"),
    ],

    # HOGAR / LIFESTYLE
    "f5c": [
        ("lifestyle/cerveza-terraza.jpg",  "Professional lifestyle photography — person relaxing on a terrace with a pint of craft beer, string lights, city skyline at dusk. Paraguay. No text, no labels.", "landscape"),
        ("lifestyle/cerveza-amigos.jpg",   "Professional lifestyle photography — group of 4 friends laughing and holding craft beer pints outdoors. Warm golden hour lighting. No text, no labels.", "landscape"),
        ("lifestyle/cerveza-asado.jpg",     "Professional lifestyle photography — craft beer alongside a Paraguayan asado — meat on grill, Chimichurri, friends gathered. Warm firelight. No text, no labels.", "landscape"),
        ("lifestyle/cerveza-pileta.jpg",   "Professional lifestyle photography — refreshing summer scene with craft beer bottles in a pool floatie, sunglasses, sunshine. Paraguay summer. No text, no labels.", "landscape"),
        ("lifestyle/cerveza-frio.jpg",     "Professional close-up product lifestyle — very cold craft beer bottle with heavy condensation drops, ice bucket, warm blurred background. No text, no labels.", "square"),
        ("lifestyle/cerveza-atardecer.jpg", "Professional lifestyle photography — person sitting with craft beer watching the sunset, Paraguay countryside. Warm golden hour, dramatic sky. No text, no labels.", "landscape"),
        ("lifestyle/cerveza-office.jpg",    "Professional lifestyle photography — after work casual setting, colleagues with craft beer in modern office kitchen. Warm evening light. No text, no labels.", "landscape"),
    ],
}

def run_phase(phase_key: str, delay: float = 1.5) -> dict:
    """Run one phase of image generation. Returns stats dict."""
    tasks = IMAGES.get(phase_key, [])
    if not tasks:
        # Try sub-keys for phase groups
        for k in sorted(IMAGES.keys()):
            if k.startswith(phase_key):
                tasks += IMAGES[k]
        if not tasks:
            print(f"Unknown phase: {phase_key}")
            return {"total": 0, "ok": 0, "failed": 0}

    print(f"\n=== PHASE {phase_key}: {len(tasks)} images ===")
    ok, failed = 0, 0
    for i, (path, prompt, aspect) in enumerate(tasks, 1):
        print(f"[{i}/{len(tasks)}] ", end="", flush=True)
        if fal_generate(prompt, path, aspect):
            ok += 1
        else:
            failed += 1
        time.sleep(delay)  # Rate limit respect
    return {"total": len(tasks), "ok": ok, "failed": failed}

def run_all(delay: float = 1.0) -> None:
    total_ok, total_failed = 0, 0
    all_tasks = sum(len(v) for v in IMAGES.values())
    print(f"\n=== ALL PHASES: {all_tasks} images ===")
    phase_keys = sorted(IMAGES.keys())
    for pk in phase_keys:
        stats = run_phase(pk, delay=delay)
        total_ok += stats["ok"]
        total_failed += stats["failed"]
    print(f"\n=== TOTAL: {total_ok} OK, {total_failed} FAILED ===")

if __name__ == "__main__":
    phase = sys.argv[1] if len(sys.argv) > 1 else "all"
    delay = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
    if phase == "all":
        run_all(delay=delay)
    else:
        run_phase(phase, delay=delay)
