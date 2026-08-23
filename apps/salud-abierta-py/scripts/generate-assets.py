#!/usr/bin/env python3
"""Generate static assets (favicon, OG image) for the Next.js app.
Works with both static export and standalone build."""
from pathlib import Path

ROOT = Path(__file__).parent.parent
APP_NAME = "salud-abierta-py"

OUTPUT_DIRS = [
    ROOT / "out",  # static export
    ROOT / ".next" / "standalone" / "apps" / APP_NAME / "public",  # standalone runtime
]

FAVICON = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="8" fill="#1B2A4A"/>
  <path d="M32 8 C42 16, 50 20, 58 20 L58 36 C58 50, 44 56, 32 58 C20 56, 6 50, 6 36 L6 20 C14 20, 22 16, 32 8 Z"
        fill="none" stroke="#C9A96E" stroke-width="3"/>
  <path d="M22 32 L29 39 L42 26" fill="none" stroke="#C9A96E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""

OG_IMAGE = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#1B2A4A"/>
  <rect x="0" y="600" width="1200" height="4" fill="#C9A96E"/>
  <text x="80" y="180" font-family="system-ui" font-size="42" font-weight="600" fill="#C9A96E">SaludAbierta PY</text>
  <text x="80" y="340" font-family="system-ui" font-size="72" font-weight="700" fill="white">Tu voz cuenta.</text>
  <text x="80" y="430" font-family="system-ui" font-size="72" font-weight="700" fill="white">El sistema tiene que cambiar.</text>
  <text x="80" y="490" font-family="system-ui" font-size="26" font-weight="400" fill="rgba(255,255,255,0.85)">Primer observatorio ciudadano de negligencia médica en Paraguay</text>
  <rect x="80" y="540" width="200" height="50" fill="rgba(201,169,110,0.15)" rx="4"/>
  <text x="180" y="572" text-anchor="middle" font-family="system-ui" font-size="32" font-weight="800" fill="#C9A96E">25</text>
  <text x="180" y="588" text-anchor="middle" font-family="system-ui" font-size="11" fill="white">casos</text>
  <rect x="300" y="540" width="200" height="50" fill="rgba(201,169,110,0.15)" rx="4"/>
  <text x="400" y="572" text-anchor="middle" font-family="system-ui" font-size="32" font-weight="800" fill="#C9A96E">15</text>
  <text x="400" y="588" text-anchor="middle" font-family="system-ui" font-size="11" fill="white">hospitales</text>
  <rect x="520" y="540" width="200" height="50" fill="rgba(201,169,110,0.15)" rx="4"/>
  <text x="620" y="572" text-anchor="middle" font-family="system-ui" font-size="32" font-weight="800" fill="#C9A96E">3</text>
  <text x="620" y="588" text-anchor="middle" font-family="system-ui" font-size="11" fill="white">idiomas</text>
</svg>
"""

def main():
    written = 0
    for out_dir in OUTPUT_DIRS:
        if out_dir.exists():
            out_dir.mkdir(parents=True, exist_ok=True)
            (out_dir / "favicon.svg").write_text(FAVICON)
            images_dir = out_dir / "images"
            images_dir.mkdir(parents=True, exist_ok=True)
            (images_dir / "og-default.svg").write_text(OG_IMAGE)
            written += 1
            print(f"  ✓ {out_dir}/favicon.svg + images/og-default.svg")
    print(f"\n✅ Assets written to {written} dir(s)")

if __name__ == "__main__":
    main()
