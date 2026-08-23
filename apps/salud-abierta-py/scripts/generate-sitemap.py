#!/usr/bin/env python3
"""Generate sitemap.xml and robots.txt for the Next.js app.
Works with both:
- Static export (writes to out/)
- Standalone build (writes to .next/standalone/apps/<name>/public/)
"""
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "src" / "data" / "casos.ts"
APP_NAME = "salud-abierta-py"

# Output directories (in order of preference)
OUTPUT_DIRS = [
    ROOT / "out",  # static export
    ROOT / ".next" / "standalone" / "apps" / APP_NAME / "public",  # standalone runtime
]

BASE_URL = "https://salud-abierta.paragu-ai.com"

def main():
    # Parse casos
    with open(DATA_FILE, 'r') as f:
        content = f.read()
    caso_ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Build URLs
    urls = []
    for locale in ['es', 'en', 'guarani']:
        for path in ['', 'casos', 'hospitales', 'reportar', 'nosotros', 'metodologia', 'privacidad']:
            loc = f"{BASE_URL}/{locale}/" if path == '' else f"{BASE_URL}/{locale}/{path}/"
            priority = '1.0' if path == '' else '0.8'
            urls.append((loc, today, priority))
        for cid in caso_ids:
            urls.append((f"{BASE_URL}/{locale}/casos/{cid}/", today, '0.6'))

    # Build content
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for loc, lastmod, priority in urls:
        sitemap += f'  <url><loc>{loc}</loc><lastmod>{lastmod}</lastmod><priority>{priority}</priority></url>\n'
    sitemap += '</urlset>'

    robots = f"""User-agent: *
Allow: /

Sitemap: {BASE_URL}/sitemap.xml

Disallow: /_next/
Disallow: /404

Crawl-delay: 1
"""

    # Write to ALL valid output directories
    written = 0
    for out_dir in OUTPUT_DIRS:
        if out_dir.exists():
            out_dir.mkdir(parents=True, exist_ok=True)
            (out_dir / 'sitemap.xml').write_text(sitemap)
            (out_dir / 'robots.txt').write_text(robots)
            written += 1
            print(f"  ✓ {out_dir}/sitemap.xml + robots.txt")

    print(f"\n✅ sitemap.xml: {len(urls)} URLs, written to {written} dir(s)")

if __name__ == "__main__":
    main()
