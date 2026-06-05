#!/usr/bin/env python3
"""
Belleza Studio — Continue Image Generation (remaining images)
Picks up from where previous script left off.
"""
import os
import time
import json
import requests
from pathlib import Path

FAL_KEY = "9e8fa2bf-657a-46f0-8bad-02744a8af5ad:80c6ad5d2e27de8dfcfd4ebd77253ff3"
BASE_URL = "https://queue.fal.run/fal-ai/fast-sdxl"
HEADERS = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}
IMAGES_DIR = Path("/home/ai-whisperers/site-template/public/images")
LOG_FILE = Path("/home/ai-whisperers/site-template/logs/image-generation.json")

# Remaining 34 images (picking up from #95 onwards)
IMAGES = [
    # ========== BRANDING (remaining) ==========
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

counter = [0]

def generate_image(filepath: str, prompt: str, retries: int = 3) -> bool:
    for attempt in range(retries):
        try:
            full_path = IMAGES_DIR / filepath
            full_path.parent.mkdir(parents=True, exist_ok=True)

            if full_path.exists():
                print(f"SKIP: {filepath}")
                counter[0] += 1
                return True

            resp = requests.post(BASE_URL, headers=HEADERS,
                               json={"prompt": prompt, "num_images": 1}, timeout=60)
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
                        counter[0] += 1
                        print(f"DONE [{counter[0]}/{len(IMAGES)}]: {filepath}")
                        return True

                if status_data.get("status") in ("FAILED", "ERROR"):
                    break

            print(f"TIMEOUT {filepath}")
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
        time.sleep(1.5)

    log_data = {"remaining_total": total, "done": done, "failed": failed,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")}
    with open(LOG_FILE, 'w') as f:
        json.dump(log_data, f, indent=2)

    print(f"\n=== REMAINING COMPLETE ===")
    print(f"Done: {done}/{total}")
    if failed:
        print(f"Failed ({len(failed)}):")
        for f in failed:
            print(f"  - {f}")

if __name__ == "__main__":
    main()