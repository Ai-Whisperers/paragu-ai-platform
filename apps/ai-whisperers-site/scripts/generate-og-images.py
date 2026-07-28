#!/usr/bin/env python3
"""
Generate OG (Open Graph) images for Ai-Whisperers site.

Outputs (1200x630 PNG):
  public/og/og-home.png             — site home / Organization logo
  public/og/og-landings-empresa.png — Plan Empresa
  public/og/og-landings-profesional.png — Plan Profesional (HERO)
  public/og/og-landings-ecommerce.png   — Tienda Online
  public/og/og-landings-hosting.png     — Solo Hosting

Design tokens match the app's dark/indigo brand (globals.css):
  bg #0a0a0f, accent #6366f1, accent-2 #8b5cf6, accent-3 #06b6d4, green #10b981.

Run:
  python3 scripts/generate-og-images.py
"""
from __future__ import annotations

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ---------- Brand tokens ----------
BG = (10, 10, 15)              # #0a0a0f
BG_DEEP = (6, 6, 12)
ACCENT = (99, 102, 241)         # #6366f1 indigo
ACCENT_2 = (139, 92, 246)       # #8b5cf6 purple
ACCENT_3 = (6, 182, 212)        # #06b6d4 cyan
GREEN = (16, 185, 129)          # #10b981
WHITE = (245, 245, 247)
MUTED = (170, 170, 190)

W, H = 1200, 630

# ---------- Fonts ----------
# Reuse the Inter family that ships in paragu-ai-videos/assets/fonts/.
FONT_DIR = Path("/root/paragu-ai-videos/assets/fonts")
FONT_BOLD = str(FONT_DIR / "Geist-Bold.ttf")
FONT_REG = str(FONT_DIR / "Inter-Regular.ttf")
# Geist-Bold for the title (closer to display), Inter-Regular for body.


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    if Path(path).exists():
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def font(size: int, *, bold: bool = True) -> ImageFont.FreeTypeFont:
    return load_font(FONT_BOLD if bold else FONT_REG, size)


# ---------- Background ----------
def draw_bg(img: Image.Image, accent_color: tuple[int, int, int]) -> None:
    """Solid dark bg + soft accent radial glow on the right."""
    draw = ImageDraw.Draw(img)
    # Base
    draw.rectangle([0, 0, W, H], fill=BG)

    # Soft accent radial glow (right side) — drawn as overlapping translucent ellipses.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for i, alpha in enumerate([60, 40, 25, 15]):
        offset = i * 60
        bbox = [W - 380 - offset, -200 - offset, W + 380 + offset, 700 + offset]
        gdraw.ellipse(bbox, fill=accent_color + (alpha,))
    img.paste(glow, (0, 0), glow)

    # Subtle grid texture (1px dots every 32px) — keeps it from feeling flat
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grid)
    for x in range(0, W, 32):
        for y in range(0, H, 32):
            gdraw.ellipse([x, y, x + 1, y + 1], fill=(255, 255, 255, 18))
    img.paste(grid, (0, 0), grid)


def draw_text_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    *,
    x: int,
    y: int,
    max_width: int,
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    line_spacing: int = 8,
) -> int:
    """Word-wrap text to max_width. Returns the y at the last line bottom."""
    words = text.split()
    lines: list[str] = []
    current = ""
    for w in words:
        candidate = (current + " " + w).strip()
        bbox = draw.textbbox((0, 0), candidate, font=fnt)
        if bbox[2] - bbox[0] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)

    cy = y
    for line in lines:
        draw.text((x, cy), line, font=fnt, fill=fill)
        bbox = draw.textbbox((0, 0), line, font=fnt)
        cy += bbox[3] - bbox[1] + line_spacing
    return cy


# ---------- Layout helpers ----------
def eyebrow(draw: ImageDraw.ImageDraw, text: str, accent: tuple[int, int, int]) -> None:
    f_eye = font(22, bold=True)
    # small accent dot
    draw.ellipse([80, 84, 96, 100], fill=accent)
    draw.text((112, 80), text, font=f_eye, fill=accent)


def title(draw: ImageDraw.ImageDraw, text: str, accent: tuple[int, int, int], *, hero: bool) -> None:
    f_title = font(96 if hero else 84, bold=True)
    draw_text_wrapped(draw, text, x=80, y=160, max_width=W - 160, fnt=f_title, fill=WHITE, line_spacing=6)


def subtitle(draw: ImageDraw.ImageDraw, text: str, *, max_chars: int = 140) -> None:
    if len(text) > max_chars:
        text = text[: max_chars - 1].rstrip() + "…"
    f_sub = font(30, bold=False)
    # Approx char width; PIL doesn't expose font metrics cleanly here, so wrap on chars too.
    draw_text_wrapped(draw, text, x=80, y=H - 150, max_width=W - 160, fnt=f_sub, fill=MUTED, line_spacing=8)


def footer(draw: ImageDraw.ImageDraw, left: str, right: str, *, accent: tuple[int, int, int]) -> None:
    f_foot = font(22, bold=True)
    draw.text((80, H - 60), left, font=f_foot, fill=WHITE)
    # right-aligned url/price
    bbox = draw.textbbox((0, 0), right, font=f_foot)
    rw = bbox[2] - bbox[0]
    draw.text((W - 80 - rw, H - 60), right, font=f_foot, fill=accent)


def price_badge(draw: ImageDraw.ImageDraw, label: str, value: str, *, fill: tuple[int, int, int]) -> None:
    """Small rounded badge in the upper-right area."""
    f_label = font(18, bold=True)
    f_val = font(28, bold=True)
    label_bbox = draw.textbbox((0, 0), label, font=f_label)
    val_bbox = draw.textbbox((0, 0), value, font=f_val)
    pad_x, pad_y = 22, 14
    w = max(label_bbox[2] - label_bbox[0], val_bbox[2] - val_bbox[0]) + pad_x * 2
    h = (label_bbox[3] - label_bbox[1]) + (val_bbox[3] - val_bbox[1]) + pad_y * 2 + 8
    x0 = W - w - 80
    y0 = 80
    x1, y1 = x0 + w, y0 + h
    # rounded rect
    radius = 18
    bg = Image.new("RGBA", (w + 4, h + 4), (0, 0, 0, 0))
    bgd = ImageDraw.Draw(bg)
    bgd.rounded_rectangle([0, 0, w, h], radius=radius, fill=fill + (28,), outline=fill + (90,), width=2)
    Image.alpha_composite(draw._image if hasattr(draw, "_image") else Image.alpha_composite(Image.new("RGBA", (1, 1), (0, 0, 0, 0)), Image.new("RGBA", (1, 1), (0, 0, 0, 0))), bg)  # noop fallback
    # Composite onto the actual image:
    composite = Image.new("RGBA", draw.im.size, (0, 0, 0, 0))
    cd = ImageDraw.Draw(composite)
    cd.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill + (28,), outline=fill + (90,), width=2)
    cd.text((x0 + pad_x, y0 + pad_y - 4), label, font=f_label, fill=fill)
    cd.text((x0 + pad_x, y0 + pad_y + (label_bbox[3] - label_bbox[1]) + 4), value, font=f_val, fill=WHITE)
    draw.im.paste(composite, (0, 0), composite)


def write_page(
    out_path: Path,
    *,
    eyebrow_text: str,
    title_text: str,
    subtitle_text: str,
    footer_left: str,
    footer_right: str,
    accent: tuple[int, int, int],
    badge: tuple[str, str] | None = None,
    hero: bool = False,
) -> None:
    img = Image.new("RGB", (W, H), BG)
    draw_bg(img, accent)
    draw = ImageDraw.Draw(img)
    # NB: draw.im only exists on ImageDraw created from an Image, so the badge path needs the
    # same image — we'll re-do the badge compositing onto `img` directly to keep things simple.
    eyebrow(draw, eyebrow_text.upper(), accent)
    title(draw, title_text, accent, hero=hero)
    subtitle(draw, subtitle_text)
    footer(draw, footer_left, footer_right, accent=accent)
    if badge:
        _badge_onto(img, badge[0], badge[1], accent)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "PNG", optimize=True)
    print(f"wrote {out_path} ({out_path.stat().st_size // 1024} KB)")


def _badge_onto(img: Image.Image, label: str, value: str, accent: tuple[int, int, int]) -> None:
    """Draw a translucent rounded badge directly on img (avoids the draw.im path)."""
    f_label = font(18, bold=True)
    f_val = font(32, bold=True)
    tmp = ImageDraw.Draw(img)
    label_bbox = tmp.textbbox((0, 0), label, font=f_label)
    val_bbox = tmp.textbbox((0, 0), value, font=f_val)
    pad_x, pad_y = 22, 14
    w = max(label_bbox[2] - label_bbox[0], val_bbox[2] - val_bbox[0]) + pad_x * 2
    h = (label_bbox[3] - label_bbox[1]) + (val_bbox[3] - val_bbox[1]) + pad_y * 2 + 8
    x0 = W - w - 80
    y0 = 70
    x1, y1 = x0 + w, y0 + h
    radius = 18
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=accent + (40,), outline=accent + (160,), width=2)
    ld.text((x0 + pad_x, y0 + pad_y - 4), label, font=f_label, fill=accent)
    ld.text((x0 + pad_x, y0 + pad_y + (label_bbox[3] - label_bbox[1]) + 4), value, font=f_val, fill=WHITE)
    img.paste(layer, (0, 0), layer)


# ---------- Pages ----------
PUBLIC_OG = Path(__file__).resolve().parents[1] / "public" / "og"


def main() -> None:
    pages = [
        # Home / Organization logo
        dict(
            name="og-home.png",
            eyebrow_text="AI WHISPERERS · PARAGUAY",
            title_text="AI Whisperers",
            subtitle_text="Construimos sitios, SaaS, agentes y herramientas en producción desde Paraguay. 30+ repos públicos. 42 sitios de clientes en producción.",
            footer_left="ai-whisperers.org",
            footer_right="Respondemos al toque",
            accent=ACCENT,
            hero=False,
        ),
        # Plan Empresa
        dict(
            name="og-landings-empresa.png",
            eyebrow_text="PLAN EMPRESA · MID-MARKET",
            title_text="Sabé cuánto vuelve de cada campaña.",
            subtitle_text="Sitio institucional + landing + CRM + WhatsApp Business para empresas py con 10–80 empleados.",
            footer_left="Gs 450.000 setup",
            footer_right="Gs 639.000 / mes",
            accent=ACCENT_2,
            badge=("MENSUAL", "Gs 639K"),
            hero=False,
        ),
        # Plan Profesional (HERO)
        dict(
            name="og-landings-profesional.png",
            eyebrow_text="PLAN PROFESIONAL · 48 HORAS LISTO",
            title_text="Tu consultorio en Google con un toque.",
            subtitle_text="Sitio profesional + SEO local + WhatsApp Business + reservas. Listo en 48 horas.",
            footer_left="Gs 450.000 setup",
            footer_right="Gs 381.000 / mes",
            accent=ACCENT,
            badge=("MENSUAL", "Gs 381K"),
            hero=True,
        ),
        # Tienda Online
        dict(
            name="og-landings-ecommerce.png",
            eyebrow_text="TIENDA ONLINE · 2 SEMANAS",
            title_text="Vende online sin saber de tecnología.",
            subtitle_text="Catálogo + Tigo Money + Personal Pay + WhatsApp para coordinar envío.",
            footer_left="Setup bonificado para el 1.° cliente",
            footer_right="Gs 381.000 / mes",
            accent=GREEN,
            badge=("DESDE", "Gs 381K"),
            hero=False,
        ),
        # Solo Hosting
        dict(
            name="og-landings-hosting.png",
            eyebrow_text="SOLO HOSTING · MIGRACIÓN EN 24 HORAS",
            title_text="Tu sitio estable y atendido en español.",
            subtitle_text="SSL + backups diarios + 99,5% uptime SLA + soporte por WhatsApp. Migramos tu sitio gratis.",
            footer_left="Migración gratis",
            footer_right="Gs 97.000 / mes",
            accent=ACCENT_3,
            badge=("MENSUAL", "Gs 97K"),
            hero=False,
        ),
    ]

    for p in pages:
        out_name = p.pop("name")
        write_page(PUBLIC_OG / out_name, **p)


if __name__ == "__main__":
    main()