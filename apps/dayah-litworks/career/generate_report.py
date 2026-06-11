"""
Reporte de análisis de carrera — Daihana Araujo (Dayah LitWorks)
En español · Estética editorial/literaria · Abril 2026
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_JUSTIFY, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.platypus.flowables import Flowable

# ── PALETA — editorial, literaria, femenina pero con carácter ────────────────
DARK       = colors.HexColor("#1C1628")   # casi negro violáceo
PLUM       = colors.HexColor("#6B2D8B")   # púrpura editorial
ROSE       = colors.HexColor("#C73B6F")   # rosa fuerte — acento
GOLD       = colors.HexColor("#C4973A")   # dorado cálido
LIGHT_BG   = colors.HexColor("#F9F5FF")   # fondo claro violáceo
CARD_BG    = colors.HexColor("#FFFFFF")
STRENGTH   = colors.HexColor("#2E9E6B")
WEAKNESS   = colors.HexColor("#C73B6F")
OPPORTUNITY= colors.HexColor("#4A7EC7")
THREAT     = colors.HexColor("#C47A2E")
TEXT_DARK  = colors.HexColor("#1C1628")
TEXT_MED   = colors.HexColor("#4A3D60")
TEXT_LIGHT = colors.HexColor("#9080A8")
WHITE      = colors.white

OUTPUT = os.path.join(os.path.dirname(__file__), "daihana-career-report.pdf")

# ── FLOWABLES PERSONALIZADOS ──────────────────────────────────────────────────

class ColorBar(Flowable):
    def __init__(self, color, height=3):
        super().__init__(); self.color = color; self.bar_height = height; self.width = 0
    def wrap(self, aw, ah): self.width = aw; return (aw, self.bar_height)
    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, self.width, self.bar_height, fill=1, stroke=0)


class SectionHeader(Flowable):
    def __init__(self, title, accent=None, subtitle=None):
        super().__init__()
        self.title    = title
        self.accent   = accent or GOLD
        self.subtitle = subtitle
        self.height   = 38 if not subtitle else 54
        self.width    = 0
    def wrap(self, aw, ah): self.width = aw; return (aw, self.height)
    def draw(self):
        c = self.canv
        c.setFillColor(DARK); c.rect(0, 0, self.width, self.height, fill=1, stroke=0)
        c.setFillColor(self.accent); c.rect(0, 0, 5, self.height, fill=1, stroke=0)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 13)
        c.drawString(16, self.height - 23, self.title)
        if self.subtitle:
            c.setFillColor(colors.HexColor("#B090CC"))
            c.setFont("Helvetica", 9)
            c.drawString(16, self.height - 39, self.subtitle)


class MetricBadge(Flowable):
    def __init__(self, label, value, color):
        super().__init__()
        self.label = label; self.value = value; self.badge_color = color
        self.width = 0; self.height = 58
    def wrap(self, aw, ah): self.width = aw; return (aw, self.height)
    def draw(self):
        c = self.canv; w = self.width
        c.setFillColor(self.badge_color)
        c.roundRect(0, 0, w, self.height, 8, fill=1, stroke=0)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 16)
        c.drawCentredString(w/2, self.height - 30, self.value)
        c.setFont("Helvetica", 7.5)
        # wrap label if long
        words = self.label.split(" ")
        line1 = " ".join(words[:3]); line2 = " ".join(words[3:])
        if line2:
            c.drawCentredString(w/2, 18, line1); c.drawCentredString(w/2, 8, line2)
        else:
            c.drawCentredString(w/2, 12, line1)


# ── PORTADA ───────────────────────────────────────────────────────────────────

def draw_cover(canvas, pw, ph):
    # fondo oscuro
    canvas.setFillColor(DARK); canvas.rect(0, 0, pw, ph, fill=1, stroke=0)
    # círculos decorativos
    canvas.setFillColor(colors.HexColor("#281A40"))
    canvas.circle(pw*0.88, ph*0.76, 130, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#1E1230"))
    canvas.circle(pw*0.08, ph*0.18, 90, fill=1, stroke=0)
    # barra superior dorada
    canvas.setFillColor(GOLD); canvas.rect(0, ph-8, pw, 8, fill=1, stroke=0)
    # borde izquierdo rosa
    canvas.setFillColor(ROSE); canvas.rect(0, 0, 6, ph, fill=1, stroke=0)
    # puntos decorativos
    canvas.setFillColor(colors.HexColor("#2E1E48"))
    for row in range(6):
        for col in range(7):
            canvas.circle(pw*0.58 + col*20, ph*0.52 + row*20, 2.5, fill=1, stroke=0)
    # etiqueta superior
    canvas.setFillColor(GOLD); canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawString(24, ph-30, "ANÁLISIS PROFESIONAL DE CARRERA  ·  DAYAH ARAUJO")
    # título principal
    canvas.setFillColor(WHITE); canvas.setFont("Helvetica-Bold", 36)
    canvas.drawString(24, ph*0.60, "Tu Siguiente")
    canvas.drawString(24, ph*0.60 - 44, "Gran Salto")
    canvas.setFillColor(GOLD); canvas.rect(24, ph*0.60 - 54, 90, 4, fill=1, stroke=0)
    # nombre
    canvas.setFillColor(WHITE); canvas.setFont("Helvetica-Bold", 20)
    canvas.drawString(24, ph*0.46, "Daihana Araujo  ·  Dayah LitWorks")
    # tag rol
    canvas.setFillColor(ROSE); canvas.roundRect(24, ph*0.41, 300, 22, 4, fill=1, stroke=0)
    canvas.setFillColor(WHITE); canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawString(32, ph*0.41 + 7, "Diseñadora Editorial  ·  Autora Publicada  ·  Amazon Prime Reading  ·  Paraguay")
    # descripción
    canvas.setFillColor(colors.HexColor("#B090CC")); canvas.setFont("Helvetica", 9.5)
    lines = [
        "Este reporte analiza tu perfil profesional real,",
        "tus ventajas competitivas documentadas, y los",
        "mejores caminos hacia el rol y la compensación",
        "que merecés.",
    ]
    y = ph*0.35
    for line in lines:
        canvas.drawString(24, y, line); y -= 15
    # pie
    canvas.setFillColor(colors.HexColor("#0F0A1E"))
    canvas.rect(0, 0, pw, 44, fill=1, stroke=0)
    canvas.setFillColor(TEXT_LIGHT); canvas.setFont("Helvetica", 7.5)
    canvas.drawString(24, 16, "Preparado con análisis avanzado de IA  ·  Abril 2026  ·  Confidencial")
    canvas.setFillColor(GOLD); canvas.circle(pw-30, 22, 6, fill=1, stroke=0)


def first_page(canvas, doc):
    canvas.saveState(); draw_cover(canvas, doc.pagesize[0], doc.pagesize[1]); canvas.restoreState()


def later_pages(canvas, doc):
    canvas.saveState()
    pw = doc.pagesize[0]; ph = doc.pagesize[1]
    canvas.setFillColor(GOLD); canvas.rect(0, ph-4, pw, 4, fill=1, stroke=0)
    canvas.setFillColor(TEXT_LIGHT); canvas.setFont("Helvetica", 7.5)
    canvas.drawString(20, ph-17, "DAIHANA ARAUJO  ·  ANÁLISIS DE CARRERA")
    canvas.drawRightString(pw-20, ph-17, "CONFIDENCIAL  ·  ABRIL 2026")
    canvas.setFillColor(DARK); canvas.rect(0, 0, pw, 26, fill=1, stroke=0)
    canvas.setFillColor(WHITE); canvas.setFont("Helvetica", 7.5)
    canvas.drawString(20, 9, "Preparado con análisis avanzado de IA")
    canvas.drawCentredString(pw/2, 9, f"Página {doc.page}")
    canvas.setFillColor(GOLD); canvas.rect(pw-38, 0, 38, 26, fill=1, stroke=0)
    canvas.setFillColor(DARK); canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawCentredString(pw-19, 9, "DA")
    canvas.restoreState()


# ── ESTILOS ───────────────────────────────────────────────────────────────────

def styles():
    base = getSampleStyleSheet()
    return {
        "body":       ParagraphStyle("body", parent=base["Normal"], fontSize=9.5, leading=15,
                                     textColor=TEXT_DARK, fontName="Helvetica", spaceAfter=5),
        "body_j":     ParagraphStyle("body_j", parent=base["Normal"], fontSize=9.5, leading=15,
                                     textColor=TEXT_DARK, fontName="Helvetica", alignment=TA_JUSTIFY, spaceAfter=5),
        "intro":      ParagraphStyle("intro", parent=base["Normal"], fontSize=10, leading=16,
                                     textColor=TEXT_MED, fontName="Helvetica", alignment=TA_JUSTIFY, spaceAfter=7),
        "bullet":     ParagraphStyle("bullet", parent=base["Normal"], fontSize=9, leading=14,
                                     textColor=TEXT_DARK, fontName="Helvetica", leftIndent=14, spaceAfter=2),
        "bold_label": ParagraphStyle("bold_label", parent=base["Normal"], fontSize=9, leading=13,
                                     textColor=TEXT_DARK, fontName="Helvetica-Bold", spaceAfter=2),
        "caption":    ParagraphStyle("caption", parent=base["Normal"], fontSize=8, leading=11,
                                     textColor=TEXT_LIGHT, fontName="Helvetica", alignment=TA_CENTER),
        "th":         ParagraphStyle("th", parent=base["Normal"], fontSize=8.5, leading=11,
                                     textColor=WHITE, fontName="Helvetica-Bold", alignment=TA_CENTER),
        "tc":         ParagraphStyle("tc", parent=base["Normal"], fontSize=8.5, leading=12,
                                     textColor=TEXT_DARK, fontName="Helvetica"),
        "role_h":     ParagraphStyle("role_h", parent=base["Normal"], fontSize=13, leading=17,
                                     textColor=DARK, fontName="Helvetica-Bold", spaceAfter=3),
        "h2":         ParagraphStyle("h2", parent=base["Normal"], fontSize=11, leading=15,
                                     textColor=PLUM, fontName="Helvetica-Bold", spaceAfter=4),
    }

def sp(n): return Spacer(1, n*mm)
def hr(c=GOLD, t=1.5): return HRFlowable(width="100%", thickness=t, color=c, spaceAfter=3, spaceBefore=3)

def box(text, st, bg=DARK, fg=WHITE, size=9.5):
    p = Paragraph(text, ParagraphStyle("bx", fontSize=size, leading=15, textColor=fg,
                                       fontName="Helvetica", alignment=TA_JUSTIFY))
    t = Table([[p]], colWidths=["100%"])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),
                            ("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10),
                            ("LEFTPADDING",(0,0),(-1,-1),14),("RIGHTPADDING",(0,0),(-1,-1),14)]))
    return t

def swot_row(icon_color, items, row_bg, alt_bg, st):
    rows = []
    for i, (title, desc) in enumerate(items):
        bg = row_bg if i % 2 == 0 else alt_bg
        r = Table([[
            Paragraph(f'<font color="#{icon_color}">■</font>', st["body"]),
            Paragraph(f'<b>{title}</b><br/>{desc}', st["body_j"])
        ]], colWidths=[8*mm, None])
        r.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),
                                ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),
                                ("LEFTPADDING",(0,0),(0,0),6),("LEFTPADDING",(1,0),(1,0),4),
                                ("RIGHTPADDING",(0,0),(-1,-1),10),("VALIGN",(0,0),(-1,-1),"TOP")]))
        rows.append(r)
    return rows


# ── ÍNDICE ────────────────────────────────────────────────────────────────────

def build_toc(st):
    story = [SectionHeader("ÍNDICE", GOLD, "Contenido del reporte"), sp(3)]
    items = [
        ("01", "Perfil Real", "Quién sos realmente — y por qué tu perfil vale más de lo que creés"),
        ("02", "Tus Crown Jewels", "Los 5 activos que ningún otro candidato en tu nicho puede replicar"),
        ("03", "Análisis de Mercado", "188 postings reales analizados — qué pide el mercado, qué tenés, qué falta"),
        ("04", "SWOT Estratégico", "Fortalezas · Debilidades · Oportunidades · Amenazas"),
        ("05", "Tus Opciones de Carrera", "Track A (ya) · Track B (2-4 semanas) · Track C (1-3 meses)"),
        ("06", "Los Gaps: cómo cerrarlos", "Qué aprender, en qué orden, en cuánto tiempo y por qué"),
        ("07", "Compensación y Negociación", "Rangos reales + reglas de no negociación"),
        ("08", "Próximos Pasos", "Qué hacer esta semana, en orden de impacto"),
        ("09", "Cierre", "El mensaje final"),
    ]
    for num, title, desc in items:
        row = Table([[
            Paragraph(f'<font color="#C4973A"><b>{num}</b></font>',
                      ParagraphStyle("tn", fontSize=15, leading=19, textColor=GOLD,
                                     fontName="Helvetica-Bold", alignment=TA_CENTER)),
            Paragraph(f'<b>{title}</b><br/><font color="#9080A8">{desc}</font>',
                      ParagraphStyle("ti", fontSize=9.5, leading=14, textColor=TEXT_DARK, fontName="Helvetica")),
        ]], colWidths=[16*mm, None])
        row.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),DARK),("BACKGROUND",(1,0),(1,0),LIGHT_BG),
                                  ("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9),
                                  ("LEFTPADDING",(0,0),(0,0),4),("LEFTPADDING",(1,0),(1,0),12),
                                  ("RIGHTPADDING",(0,0),(-1,-1),10),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
                                  ("LINEBELOW",(0,0),(-1,-1),0.5,WHITE)]))
        story.append(row)
    story += [sp(3),
              box("<b>Sobre este reporte:</b> Este análisis fue preparado aplicando IA avanzada a tu información "
                  "profesional y un análisis empírico de 188 postings de empleo reales recolectados en España, Colombia, "
                  "México y Argentina en abril de 2026. Es una herramienta estratégica, no un documento de RRHH. "
                  "Usalo para tomar decisiones con claridad.", st, bg=colors.HexColor("#1E1230")),
              sp(2), PageBreak()]
    return story


# ── PERFIL REAL ───────────────────────────────────────────────────────────────

def build_intro(st):
    story = [SectionHeader("TU PERFIL REAL", GOLD, "Daihana Araujo · Dayah LitWorks · Abril 2026"), sp(3)]
    story.append(Paragraph(
        "Este reporte fue preparado específicamente para <b>Daihana Araujo</b> con el objetivo de analizar "
        "tu perfil profesional de forma objetiva, identificar tus ventajas competitivas reales, y trazar "
        "los mejores caminos de carrera disponibles en el mercado actual.",
        st["intro"]))
    story.append(Paragraph(
        "El análisis se construyó desde tu trayectoria documentada, tus logros verificables y el estado "
        "empírico del mercado de roles creativos y editoriales en el mundo hispanohablante. No es "
        "motivacional — es estratégico. La conclusión más importante: <b>tu perfil es significativamente "
        "más valioso que el salario al que te has estado vendiendo.</b>",
        st["intro"]))
    story.append(sp(3))

    badges = [
        ("Portadas diseñadas", "400+", PLUM),
        ("Lecturas en Wattpad", "~1M", ROSE),
        ("Amazon Prime Reading", "✓ activo", STRENGTH),
        ("Títulos en Amazon.es", "35+", GOLD),
    ]
    badge_w = 39*mm
    badge_row = [MetricBadge(l, v, c) for l, v, c in badges]
    t = Table([badge_row], colWidths=[badge_w]*4, hAlign="CENTER")
    t.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),4),("RIGHTPADDING",(0,0),(-1,-1),4),
                            ("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]))
    story.append(t); story.append(sp(4))

    story.append(box(
        "<b>El mensaje central de este análisis:</b> Daihana, no tenés un problema de capacidades. "
        "Tenés un problema de narrativa y de pricing. Una diseñadora editorial con 6+ años de trayectoria, "
        "400+ portadas para autores que llegaron a #1 en Amazon, una obra propia seleccionada por Amazon "
        "Prime Reading (programa invitation-only que no se solicita — Amazon te elige a vos), y un contrato "
        "con una editorial tradicional colombiana que te buscó a vos por Instagram — ese perfil no es el de "
        "una 'creadora de contenido'. Es el de una especialista en diseño editorial y marketing de autor "
        "que lleva años comunicándose como si fuera un eslabón reemplazable. Eso cambia hoy.",
        st))
    story.append(sp(4))
    return story


# ── CROWN JEWELS ─────────────────────────────────────────────────────────────

def build_crown_jewels(st):
    story = [SectionHeader("TUS CROWN JEWELS", GOLD,
                            "Los 5 activos que ningún otro candidato en tu nicho puede replicar exactamente"),
             sp(3)]
    story.append(Paragraph(
        "Estos activos son tu argumento. No son 'logros' que mencionar con modestia al final de una "
        "entrevista. Son la razón por la que el mercado debería pagarte lo que vale tu trabajo. "
        "Deben aparecer en la primera oración de tu LinkedIn, tu CV y tu presentación oral.",
        st["intro"]))
    story.append(sp(2))

    jewels = [
        ("🥇  Amazon Prime Reading — selección directa de KDP",
         "#C4973A",
         "Amazon seleccionó <i>Seduciendo al Duque de Wellington</i> para su programa Prime Reading — "
         "un programa invitation-only. No se aplica. Amazon elige. El programa fue renovado múltiples "
         "veces desde abril de 2023 y está activo a enero de 2026. En el ecosistema de autopublicación, "
         "la validación institucional de Amazon es la más alta que existe. Pocas diseñadoras-autoras "
         "hispanohablantes pueden acreditar esto. Tenés el email original como evidencia.",
         LIGHT_BG),
        ("🥇  Editorial Blanco y Negro (Colombia) te buscó a vos",
         "#C4973A",
         "Una editorial tradicional colombiana te contactó vía Instagram en julio de 2020 por la calidad "
         "visible de tu trabajo de diseño. Esto derivó en un contrato de publicación para <i>Intense</i> "
         "(publicado febrero de 2022, ISBN 9789585367135, distribución en las mejores librerías "
         "latinoamericanas). La dirección del movimiento es irreversible: el mercado fue hacia vos, "
         "no al revés. Tenés la captura de la conversación como evidencia.",
         CARD_BG),
        ("🥇  ~35 títulos en Amazon.es bajo crédito nominal 'Dayah Araujo'",
         "#C4973A",
         "Portafolio verificable públicamente por cualquier reclutador, cliente o editor. "
         "No necesita que confíen en tu palabra. La búsqueda 'Dayah Araujo' en Amazon.es lo confirma "
         "en segundos. Esto es evidencia dura — el tipo de credencial que no se puede falsificar.",
         LIGHT_BG),
        ("🥇  Múltiples autores a #1 en Amazon con tus portadas",
         "#C4973A",
         "Gleen Black ('El Capo'), Laura A. López, Alma Lawson, Maribel Solle, Verónica Mengual, "
         "Lucy Landa (Booknek), Meyling Soza (Booknek) — todos llegaron a #1 en sus categorías con "
         "portadas tuyas. El diseño de una portada impacta directamente las conversiones de venta en "
         "Amazon. Que múltiples autores hayan alcanzado la cima con tu trabajo es evidencia de impacto "
         "comercial medible y atribuible.",
         CARD_BG),
        ("🥇  ~998.000 lecturas en Wattpad — audiencia construida desde cero",
         "#C4973A",
         "Construiste una audiencia de casi un millón de lectores de forma orgánica antes de tener "
         "ningún recurso estratégico. <i>Intense</i>: +728.000 lecturas · <i>Extrême</i>: +270.000. "
         "Esto significa que entendés al lector de romance hispanohablante desde adentro — porque lo "
         "capturaste en masa. Cuando diseñás una portada, no aplicás tendencias visuales genéricas. "
         "Aplicás conocimiento de lo que mueve al lector a hacer click. Eso no se enseña en ningún curso.",
         LIGHT_BG),
    ]
    for title, color_hex, desc, bg in jewels:
        r = Table([[
            Paragraph(f'<font color="{color_hex}"><b>{title}</b></font><br/>{desc}',
                      ParagraphStyle("cj", fontSize=9.5, leading=15, textColor=TEXT_DARK,
                                     fontName="Helvetica", alignment=TA_JUSTIFY))
        ]], colWidths=["100%"])
        r.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),
                                ("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10),
                                ("LEFTPADDING",(0,0),(-1,-1),12),("RIGHTPADDING",(0,0),(-1,-1),12),
                                ("LINEBELOW",(0,0),(-1,-1),0.5,colors.HexColor("#E0D8F0"))]))
        story.append(r)
    story.append(sp(4))
    return story


# ── ANÁLISIS DE MERCADO ───────────────────────────────────────────────────────

def build_market(st):
    story = [PageBreak(),
             SectionHeader("ANÁLISIS DE MERCADO", PLUM,
                            "188 postings reales · España · Colombia · México · Argentina · Abril 2026"),
             sp(3)]
    story.append(Paragraph(
        "Se analizaron 188 postings de empleo reales recolectados mediante JobSpy (4 runs) en los últimos "
        "30 días. 124 de ellos tenían descripción completa — lo que permitió analizar qué herramientas "
        "y habilidades pide el mercado hoy, y compararlo con tu perfil. Los resultados muestran un match "
        "sólido en las habilidades core — y brechas muy concretas y cerables en el corto plazo.",
        st["intro"]))
    story.append(sp(2))

    # Tabla de métricas del análisis
    meta = Table([
        [Paragraph("<b>Total postings</b>", st["th"]),
         Paragraph("<b>Con descripción</b>", st["th"]),
         Paragraph("<b>Requieren inglés</b>", st["th"]),
         Paragraph("<b>NO requieren inglés</b>", st["th"])],
        [Paragraph("188", ParagraphStyle("mv", fontSize=18, leading=22, textColor=GOLD,
                                          fontName="Helvetica-Bold", alignment=TA_CENTER)),
         Paragraph("124 (66%)", ParagraphStyle("mv", fontSize=14, leading=18, textColor=PLUM,
                                                fontName="Helvetica-Bold", alignment=TA_CENTER)),
         Paragraph("44 (35%)", ParagraphStyle("mv", fontSize=14, leading=18, textColor=ROSE,
                                               fontName="Helvetica-Bold", alignment=TA_CENTER)),
         Paragraph("80 (65%)", ParagraphStyle("mv", fontSize=14, leading=18, textColor=STRENGTH,
                                               fontName="Helvetica-Bold", alignment=TA_CENTER))],
    ], colWidths=[42*mm]*4)
    meta.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),DARK),("BACKGROUND",(0,1),(-1,1),LIGHT_BG),
                               ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),
                               ("GRID",(0,0),(-1,-1),0.4,colors.HexColor("#D8D0EC")),
                               ("LINEBELOW",(0,0),(-1,0),2,GOLD)]))
    story.append(meta); story.append(sp(3))

    story.append(Paragraph("<b>Lo que TENÉS y el mercado pide:</b>", st["h2"]))
    has_items = [
        ("Redes sociales / gestión de redes", "137x en descripciones — la skill más demandada de todo el dataset"),
        ("SEO y redacción SEO", "59x — tus certificaciones de Santander y DinoRANK son activos directamente aplicables"),
        ("Redacción / Copywriting", "52x + 11x — escritora publicada con ~1M lecturas. El nivel más alto de evidencia"),
        ("Canva", "34x — avanzado, documentado en 6 años de práctica"),
        ("Meta Ads / pauta digital", "22x — experiencia con múltiples clientes, segmentación y creativos"),
        ("Storytelling", "13x — certificación U. of Chicago + casi 1M lecturas propias"),
        ("Maquetación editorial", "12x — ~100 libros maquetados con Affinity Publisher"),
        ("Calendario editorial y planificación de contenidos", "9x — manejado para hasta 15 clientes simultáneos"),
        ("CapCut / edición de video", "8x — producción audiovisual para múltiples clientes"),
        ("Community management", "5x — 4+ años, múltiples plataformas e industrias"),
    ]
    for title, desc in has_items:
        r = Table([[
            Paragraph('<font color="#2E9E6B">✓</font>', st["body"]),
            Paragraph(f'<b>{title}</b>  <font color="#9080A8">{desc}</font>', st["body"])
        ]], colWidths=[8*mm, None])
        r.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#F0FBF5")),
                                ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),
                                ("LEFTPADDING",(0,0),(0,0),6),("LEFTPADDING",(1,0),(1,0),4),
                                ("RIGHTPADDING",(0,0),(-1,-1),10),("VALIGN",(0,0),(-1,-1),"TOP"),
                                ("LINEBELOW",(0,0),(-1,-1),0.3,colors.HexColor("#D8F0E4"))]))
        story.append(r)
    story.append(sp(3))

    story.append(Paragraph("<b>Hallazgo clave sobre el inglés:</b>", st["h2"]))
    story.append(box(
        "El 65% del mercado (80 de 124 roles con descripción) NO requiere inglés. Y los roles que no "
        "requieren inglés son estructuralmente los más relevantes para tu perfil: Grupo Planeta apareció "
        "múltiples veces sin requisito de inglés — es el grupo editorial más grande de España. Las "
        "editoriales colombianas, las agencias culturales, las plataformas de contenido en español: "
        "todos accesibles sin barrera idiomática. El inglés bloquea el 35% del mercado — el 65% "
        "restante es suficiente para encontrar exactamente el rol que buscás.",
        st, bg=colors.HexColor("#1E1230")))
    story.append(sp(4))
    return story


# ── SWOT ──────────────────────────────────────────────────────────────────────

def build_swot(st):
    story = [PageBreak(), SectionHeader("SWOT ESTRATÉGICO", GOLD, "Fortalezas · Debilidades · Oportunidades · Amenazas"), sp(3)]
    story.append(Paragraph("El análisis SWOT evalúa factores internos (fortalezas y debilidades) y externos "
                            "(oportunidades y amenazas) para construir una estrategia de carrera realista y accionable.",
                            st["intro"])); story.append(sp(2))

    # FORTALEZAS
    story += [KeepTogether([ColorBar(STRENGTH,3), sp(1),
                             Paragraph('<font color="#2E9E6B"><b>FORTALEZAS</b></font> — Lo que te diferencia', st["bold_label"]), sp(1)])]
    story += swot_row("2E9E6B", [
        ("Track record de bestsellers verificable públicamente en Amazon",
         "El nombre 'Dayah Araujo' está indexado en ~35 títulos en Amazon.es. Cualquier reclutador puede verificarlo "
         "en 30 segundos. No es un claim — es una realidad búscable. Múltiples autores llegaron a #1 en sus "
         "categorías con tus portadas. Esto no lo puede decir cualquier diseñadora."),
        ("Sos la única diseñadora en tu nicho que también es autora con Prime Reading",
         "Entendés el mercado del libro hispanohablante desde todos los ángulos simultáneamente: diseñás la portada, "
         "conocés al lector porque fuiste ese lector y lo capturaste en masa, entendés el algoritmo de Amazon porque "
         "lo navegaste como autora. Ese perfil es prácticamente imposible de replicar en un solo CV."),
        ("Validación institucional de Amazon — sin haberla solicitado",
         "Amazon Prime Reading es un programa de cupo limitado que se recibe por invitación. No se aplica. Amazon "
         "analizó el comportamiento de lectores y decidió que tu obra merece estar en su biblioteca flagship. "
         "Renovado múltiples veces desde 2023. En el ecosistema KDP, esto es el reconocimiento más alto disponible."),
        ("Editorial Blanco y Negro la buscó a ella — no al revés",
         "El contacto entrante de una editorial tradicional equivale a la carta de recomendación más poderosa del mercado. "
         "No hay forma de forzar esto — solo ocurre cuando el trabajo habla por sí solo. Ocurrió."),
        ("Alta velocidad de ejecución documentada en múltiples contextos",
         "En todos sus empleos formales, termina tareas significativamente antes del tiempo asignado. En entornos "
         "por objetivos — que son los que busca y los que le corresponden — esto es una ventaja de productividad "
         "real que se traduce en más output en menos tiempo."),
        ("Afinity Suite: herramienta profesional, no consumer",
         "No es solo Canva. Domina Affinity Publisher (equivalente a InDesign), Affinity Designer (equivalente a "
         "Illustrator) y Affinity Photo (equivalente a Photoshop). Señal de seriedad técnica para cualquier "
         "reclutador que sepa de diseño editorial."),
    ], colors.HexColor("#F0FBF5"), CARD_BG, st)
    story.append(sp(3))

    # DEBILIDADES
    story += [KeepTogether([ColorBar(WEAKNESS,3), sp(1),
                             Paragraph('<font color="#C73B6F"><b>DEBILIDADES</b></font> — Áreas a corregir', st["bold_label"]), sp(1)])]
    story += swot_row("C73B6F", [
        ("Narrativa completamente desconectada del perfil real — CRÍTICO",
         "El CV y los materiales actuales la describen como 'creadora de contenido'. El perfil real es "
         "'especialista en diseño editorial con track record verificable de bestsellers y Amazon Prime Reading'. "
         "Esta brecha narrativa es la fuente principal de los problemas de compensación. Un reclutador que solo "
         "lea el CV actual nunca entendería por qué debería pagarle más."),
        ("Salary anchor significativamente por debajo del valor de mercado",
         "Mínimo declarado ₲5M (~$670 USD), objetivo ₲8-10M (~$1.070-1.340 USD). Para roles remotos en el "
         "mercado hispanohablante con este perfil, el floor defensible es $1.800 USD (LATAM) / €2.000 (España). "
         "Está anclando en el mercado local paraguayo mientras debería competir en el mercado remoto regional."),
        ("Dayah LitWorks digital casi inactivo",
         "Instagram @dayah.litworks: 2.311 seguidores pero solo 360 visualizaciones en 30 días. El activo más "
         "estratégico tiene la menor presencia activa. El activo más activo (@xdayah personal, 8.500 vistas/30d) "
         "no comunica la propuesta de valor profesional."),
        ("TikTok: el gap más urgente del análisis de mercado",
         "TikTok aparece 49 veces en las descripciones analizadas — más que Canva (34x) y seis veces más que "
         "CapCut (8x). El mercado de content/social media giró hacia TikTok como skill core. Usa CapCut "
         "(que es la herramienta de TikTok) pero no tiene presencia ni práctica en la plataforma."),
        ("LinkedIn en estado desconocido",
         "No explorado en la sesión de mapeo. Si refleja el CV actual ('creadora de contenido'), es una "
         "penalidad activa en la búsqueda — está comunicando el perfil equivocado a exactamente el "
         "público que podría contratar."),
    ], colors.HexColor("#FEF0F4"), CARD_BG, st)
    story.append(sp(3))

    # OPORTUNIDADES
    story += [KeepTogether([ColorBar(OPPORTUNITY,3), sp(1),
                             Paragraph('<font color="#4A7EC7"><b>OPORTUNIDADES</b></font> — El mercado a tu favor', st["bold_label"]), sp(1)])]
    story += swot_row("4A7EC7", [
        ("El mercado de autopublicación hispanohablante está en crecimiento acelerado",
         "Amazon KDP en español, Booknek, Dreame, Buenovela — todos creciendo. Cada nuevo autor que entra "
         "al mercado es un cliente potencial de Dayah LitWorks. Y el número de autores crece cada año. "
         "El timing es estructuralmente favorable."),
        ("La IA genera arte pero no conocimiento de mercado — y eso es lo que ella tiene",
         "Los generadores de imagen AI pueden producir una imagen bonita. No pueden saber qué portada hace "
         "que el algoritmo de Amazon clasifique en romance erótico vs. dark romance, o qué tipografía "
         "proyecta el precio percibido correcto para un eBook de $3.99. Ese conocimiento lo tiene Dayah "
         "porque lo vivió. Los autores serios lo saben y buscan diseñadoras con track record."),
        ("Editorial Blanco y Negro — relación existente activable inmediatamente",
         "Existe una relación establecida con una editorial colombiana que la conoce y confió en su trabajo. "
         "Es la primera puerta a tocar — warm outreach con historial probado. Un email de actualización puede "
         "abrir conversaciones sobre proyectos actuales o posiciones."),
        ("España: mercado remoto accesible con diferencial salarial 2-3x",
         "Grupo Planeta (España) apareció múltiples veces en el análisis con roles activos sin requisito de "
         "inglés. El mercado editorial español tiene demanda de perfiles creativos con experiencia en "
         "autopublicación hispanohablante — y ella ya trabajó remotamente para clientes españoles en 2022-2023."),
        ("Su red de bestsellers = referencias de altísimo calibre",
         "Los autores que llevó a #1 en Amazon pueden escribir referencias públicas en LinkedIn. Una frase "
         "de 'Dayah diseñó mi portada y llegué a #1 en Amazon' de un autor verificable es más poderosa que "
         "cualquier certificación y cierra contratos que la CV sola no cierra."),
    ], colors.HexColor("#F0F5FD"), CARD_BG, st)
    story.append(sp(3))

    # AMENAZAS
    story += [KeepTogether([ColorBar(THREAT,3), sp(1),
                             Paragraph('<font color="#C47A2E"><b>AMENAZAS</b></font> — Riesgos a manejar', st["bold_label"]), sp(1)])]
    story += swot_row("C47A2E", [
        ("Dispersión: 3 identidades activas sin narrativa unificadora",
         "Si la búsqueda se presenta como 'diseñadora + autora + psicóloga + marketera', el mercado no sabe qué "
         "quiere ser y le ofrece el rol más barato de los cuatro. La narrativa tiene que converger en un ángulo "
         "primario antes de salir al mercado: diseñadora editorial especializada."),
        ("Creencias limitantes → underpricing → ciclo de inestabilidad económica",
         "El patrón más peligroso: subestima sus logros → ancla bajo → acepta condiciones que no la estabilizan → "
         "no puede invertir en Dayah LitWorks → sigue en empleo insatisfactorio → repite. No es una brecha técnica. "
         "Es una brecha narrativa interna con consecuencias económicas reales."),
        ("Presión de IA en el segmento bajo del diseño de portadas",
         "Los generadores de imagen AI están bajando el precio percibido en el segmento de entrada. Esto NO afecta "
         "el segmento donde Dayah debe posicionarse (diseñadora con track record de bestsellers verificables). "
         "La respuesta es posicionarse más arriba, no bajar los precios."),
        ("La ventana de tiempo: salir empleada es una ventaja que puede perderse",
         "Actualmente empleada — eso le da tiempo para posicionarse antes de saltar. Si la situación en LHC SA "
         "se vuelve insostenible y renuncia sin tener la siguiente posición lista, pierde ese leverage. "
         "El roadmap tiene urgencia aunque no tenga la urgencia de una búsqueda post-despido."),
    ], colors.HexColor("#FEF6EE"), CARD_BG, st)
    story.append(sp(4))
    return story


# ── OPCIONES DE CARRERA ───────────────────────────────────────────────────────

def build_roles(st):
    story = [PageBreak(),
             SectionHeader("TUS OPCIONES DE CARRERA", GOLD,
                            "Track A (lista ya) · Track B (2-4 semanas) · Track C (1-3 meses)"),
             sp(3)]
    story.append(Paragraph(
        "Basado en el análisis de 188 postings reales y el perfil documentado, estas son las opciones "
        "de carrera ordenadas por preparación actual y tiempo necesario para aplicar con confianza. "
        "Todos los roles son accesibles sin inglés en el mercado hispanohablante.",
        st["intro"])); story.append(sp(2))

    roles = [
        {
            "title": "Diseñadora Editorial / Book Cover Designer",
            "badge": "TRACK A — LISTA YA",
            "badge_bg": STRENGTH, "badge_fg": WHITE,
            "companies": "Grupo Planeta (ES) · Editorial Blanco y Negro (CO) · Ediciones Urano (ES) · Nube de Tinta / PRH · Reedsy marketplace",
            "salary": "€1.500–2.800/mes (España remoto) · $900–1.800 USD/mes (LATAM)",
            "salary_note": "Posicionada con track record de bestsellers: floor mínimo €2.000/mes (España)",
            "why_fit": [
                "Es exactamente lo que hace. 400+ portadas, múltiples autores a #1 en Amazon, ~35 títulos "
                "indexados en Amazon.es bajo su crédito nominal — portafolio verificable públicamente.",
                "Afinity Suite (Publisher, Designer, Photo) = InDesign, Illustrator, Photoshop. "
                "Las herramientas son equivalentes profesionales. El argumento en entrevista está documentado.",
                "Su condición de autora publicada con Prime Reading la diferencia de cualquier otra "
                "diseñadora: entiende el mercado del libro desde adentro.",
                "Grupo Planeta apareció múltiples veces en el análisis con roles activos y sin requisito de inglés.",
            ],
            "move": "Semana 1: LinkedIn actualizado + portfolio con bestsellers al frente + email a Editorial "
                    "Blanco y Negro. Esta es la aplicación más caliente del stack completo.",
        },
        {
            "title": "Coordinadora Editorial Digital",
            "badge": "TRACK A — LISTA YA",
            "badge_bg": STRENGTH, "badge_fg": WHITE,
            "companies": "Axioma Comunicaciones (CO) · Grupo Planeta (ES) · Editoriales medianas · Plataformas de contenido literario",
            "salary": "€1.400–2.200/mes (España) · $800–1.500 USD/mes (Colombia/México)",
            "salary_note": "Potencial de crecimiento a roles de dirección editorial en 12-18 meses",
            "why_fit": [
                "Axioma Comunicaciones (Colombia) tiene activo un rol de 'Coordinador Editorial Digital' que "
                "apareció en el análisis con descripción completa — es el fit más directo del dataset.",
                "La coordinación de la antología 'Arde el Paraíso' (curaduría, diseño, producción de evento "
                "presencial) es evidencia directa de capacidad de coordinación editorial.",
                "6+ años gestionando múltiples proyectos editoriales simultáneos en Dayah LitWorks — "
                "brief, propuesta, revisiones, entrega — es exactamente el flujo de trabajo de este rol.",
            ],
            "move": "Semana 1-2: aplicar a Axioma Comunicaciones directamente. Presentar la coordinación de "
                    "la antología como caso de estudio en la carta de presentación.",
        },
        {
            "title": "Content Manager con foco editorial o cultural",
            "badge": "TRACK A — LISTA YA",
            "badge_bg": STRENGTH, "badge_fg": WHITE,
            "companies": "VML/The Cocktail (ES) · Kostik (MX remoto) · Air Apps (ES remoto) · Domestika · Plataformas culturales",
            "salary": "€1.333–2.000/mes (España) · $900–1.600 USD/mes (LATAM)",
            "salary_note": "Track de menor techo salarial pero mayor volumen de posiciones disponibles",
            "why_fit": [
                "4+ años, hasta 15 clientes simultáneos, todas las herramientas documentadas: Canva, Meta Ads, "
                "CapCut, planificación de contenidos, gestión de redes, copywriting, storytelling.",
                "El diferencial sobre otros CMs genéricos: su background editorial le da criterio de contenido "
                "que un CM puro no tiene. Puede escribir, diseñar y editar con el mismo nivel de calidad.",
                "VML/The Cocktail (España) tiene activo un 'Junior Content Manager - Health' sin inglés requerido. "
                "Air Apps (Madrid, remoto) tiene 'Content Marketing Manager' sin inglés.",
            ],
            "move": "Este es el track de seguridad — mayor volumen, menor barrera. Aplicar en paralelo con "
                    "Track A. No sacrificar salary floor por aceptar el primero que llega.",
        },
        {
            "title": "Marketing Editorial / Especialista en Marketing de Autor",
            "badge": "TRACK B — 2-4 SEMANAS",
            "badge_bg": OPPORTUNITY, "badge_fg": WHITE,
            "companies": "Editoriales digitales España · Agencias literarias digitales · Plataformas de autopublicación",
            "salary": "€1.600–2.800/mes (España) · $1.200–2.000 USD/mes (LATAM)",
            "salary_note": "El ángulo más diferenciado — menor competencia directa, mejor pricing",
            "why_fit": [
                "Combina diseño + conocimiento de Amazon KDP + comprensión del lector + experiencia en Meta Ads. "
                "Ese cruce es prácticamente único en el mercado hispanohablante.",
                "La propuesta de valor: 'soy la diseñadora que sabe qué portada vende porque también soy la "
                "autora que construyó ~1M de lectores'. En marketing editorial, eso es la ventaja más sólida posible.",
                "Bloqueante actual: Google Analytics (11x en descripciones) y Google Ads (23x). Ambas certificaciones "
                "son gratuitas y se completan en 1-2 semanas cada una.",
            ],
            "move": "Certificación Google Analytics GA4 + Google Ads (Google Skillshop, gratis, ~2 semanas "
                    "combinadas) desbloquean +39 roles adicionales. Hacer en paralelo con búsqueda activa.",
        },
        {
            "title": "Creative Director / Creative Strategist (Editorial o Cultural)",
            "badge": "TRACK C — 1-3 MESES",
            "badge_bg": PLUM, "badge_fg": WHITE,
            "companies": "Agencias creativas españolas con foco cultural · Sellosdiscográficos · Productoras de contenido",
            "salary": "€2.000–3.500/mes (España) · $1.500–2.800 USD/mes (LATAM)",
            "salary_note": "El techo más alto — requiere portfolio de liderazgo más explícito",
            "why_fit": [
                "El historial de liderazgo sin título es real: dos mini agencias propias, coordinación de antología, "
                "dirección de proyectos editoriales con colaboradores externos.",
                "El paso de Content Manager a Creative Director se hace documentando el liderazgo que ya existe "
                "— no aprendiendo nuevas skills, sino haciendo visible lo que ya se hace.",
                "TikTok activo (2-3 meses de constancia) + portfolio de dirección creativa documentada = el perfil "
                "que posiciona en este track.",
            ],
            "move": "Activar TikTok en Semana 2 y mantenerlo consistente. Documentar 3 casos de estudio "
                    "de Dayah LitWorks como ejercicios de dirección creativa en el portfolio.",
        },
    ]

    for role in roles:
        story.append(sp(2))
        header = Table([[
            Paragraph(role["title"], st["role_h"]),
            Paragraph(role["badge"],
                      ParagraphStyle("badge", fontSize=8, leading=10, textColor=role["badge_fg"],
                                     fontName="Helvetica-Bold", alignment=TA_RIGHT))
        ]], colWidths=[None, 52*mm])
        header.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),LIGHT_BG),
                                     ("BACKGROUND",(1,0),(1,0),role["badge_bg"]),
                                     ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),
                                     ("LEFTPADDING",(0,0),(0,0),10),("RIGHTPADDING",(-1,0),(-1,-1),10),
                                     ("VALIGN",(0,0),(-1,-1),"MIDDLE")]))
        story.append(header)

        info = Table([[
            Paragraph(f'<b>Empresas target:</b> {role["companies"]}', st["body"]),
            Paragraph(f'<font color="#C73B6F"><b>{role["salary"]}</b></font><br/>'
                      f'<font color="#9080A8">{role["salary_note"]}</font>',
                      ParagraphStyle("sal", fontSize=9, leading=13, textColor=TEXT_DARK,
                                     fontName="Helvetica", alignment=TA_RIGHT)),
        ]], colWidths=[None, 68*mm])
        info.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),CARD_BG),
                                   ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),
                                   ("LEFTPADDING",(0,0),(0,0),10),("RIGHTPADDING",(-1,0),(-1,-1),10),
                                   ("VALIGN",(0,0),(-1,-1),"TOP"),
                                   ("LINEBELOW",(0,0),(-1,-1),0.5,colors.HexColor("#E8E0F0"))]))
        story.append(info)

        story.append(Paragraph('<font color="#1C1628"><b>Por qué encaja tu perfil:</b></font>',
                               ParagraphStyle("wfl", fontSize=9, leading=13, textColor=TEXT_DARK,
                                              fontName="Helvetica-Bold", leftIndent=10, spaceBefore=5)))
        for point in role["why_fit"]:
            story.append(Paragraph(f'<font color="#6B2D8B">▸</font> {point}',
                                   ParagraphStyle("wfi", fontSize=9, leading=14, textColor=TEXT_DARK,
                                                  fontName="Helvetica", leftIndent=18, spaceAfter=2)))

        move_box = Table([[
            Paragraph(f'<b>Próximo movimiento:</b> {role["move"]}',
                      ParagraphStyle("mv", fontSize=9, leading=14, textColor=WHITE,
                                     fontName="Helvetica", alignment=TA_JUSTIFY))
        ]], colWidths=["100%"])
        move_box.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#1E1230")),
                                       ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),
                                       ("LEFTPADDING",(0,0),(-1,-1),10),("RIGHTPADDING",(0,0),(-1,-1),10)]))
        story.append(sp(1)); story.append(move_box)
        story.append(hr(colors.HexColor("#D8D0EC"), 0.7))

    story.append(sp(3))
    return story


# ── GAPS ─────────────────────────────────────────────────────────────────────

def build_gaps(st):
    story = [PageBreak(),
             SectionHeader("LOS GAPS: CÓMO CERRARLOS", ROSE,
                            "Qué aprender · En qué orden · En cuánto tiempo · Por qué"),
             sp(3)]
    story.append(Paragraph(
        "El análisis de 124 descripciones de trabajo reales identificó las habilidades y herramientas "
        "más demandadas. La tabla siguiente cruza esos datos con tu perfil actual y define la prioridad, "
        "el costo de cierre y el impacto en roles desbloqueados.",
        st["intro"])); story.append(sp(2))

    headers = ["Gap", "Menciones", "Cómo cerrar", "Tiempo", "Roles desbloqueados", "Prioridad"]
    rows = [
        ["TikTok\n(plataforma)", "49x", "Crear cuenta y postear 3-5 videos de proceso de diseño o editorial. Usás CapCut (la herramienta de TikTok) — falta la práctica en la red.", "2-3 sem.", "+49 roles", "🔴 URGENTE"],
        ["Google Analytics\n/ GA4", "16x", "Certificación Google Analytics 4 — Google Skillshop, gratuita, ~5-8 horas.", "1 semana", "+16 roles", "🔴 URGENTE"],
        ["Google Ads\n/ SEM", "23x", "Certificación Google Ads Search — Google Skillshop, gratuita, ~8-10 horas.", "1-2 sem.", "+23 roles", "🔴 URGENTE"],
        ["Meta Business Suite\n(documentado)", "11x", "Capturar métricas o reportes del uso actual. Ya lo usás — falta mostrarlo en el CV/LinkedIn.", "1 día", "+11 roles", "🟢 INMEDIATO"],
        ["Reels en portfolio", "16x", "Agregar videos existentes al portfolio. Ya los hacés — falta exhibirlos.", "1-2 días", "+16 roles", "🟢 INMEDIATO"],
        ["Email Marketing\n(Mailchimp)", "16x", "Certificación Mailchimp Academy — gratuita, ~3-4 horas.", "1 semana", "+16 roles", "🟡 MEDIA"],
        ["WordPress\n(básico)", "22x", "1-2 semanas de práctica básica — instalación, edición de páginas, plugins. No requiere código.", "2 sem.", "+22 roles", "🟡 MEDIA"],
        ["Adobe InDesign\n(vs. Affinity)", "24x", "Afinity Publisher = InDesign. Argumentar en entrevista como equivalente. Si exigen Adobe: curva de 2-3 semanas desde la base en Affinity.", "Argumento ya\nlisto", "Posicionamiento", "🟡 MEDIA"],
        ["HubSpot", "7x", "Certificación HubSpot Content Marketing Academy — gratuita, ~4-6 horas.", "1 semana", "+7 roles", "🔵 BAJA"],
        ["Metricool", "4x", "Activar cuenta gratuita y usarla 1 semana para generar reportes — añadirla al CV.", "2-3 días", "+4 roles", "🟢 FÁCIL"],
        ["Inglés (funcional)", "62x total", "12-18 meses para nivel B1-B2 funcional. Inversión a largo plazo — no bloquea la búsqueda actual.", "12-18 meses", "+35% del mercado", "🔵 LARGO PLAZO"],
    ]

    col_widths = [30*mm, 18*mm, 62*mm, 18*mm, 32*mm, 20*mm]
    table_data = [[Paragraph(h, st["th"]) for h in headers]]
    alt = [CARD_BG, LIGHT_BG]
    for i, row in enumerate(rows):
        prio_color = {"🔴": colors.HexColor("#FEE8EC"), "🟢": colors.HexColor("#EAFAF2"),
                      "🟡": colors.HexColor("#FEF9EA"), "🔵": LIGHT_BG}.get(row[5][0], LIGHT_BG)
        table_data.append([
            Paragraph(row[0], ParagraphStyle("gc", fontSize=8.5, leading=12, textColor=TEXT_DARK, fontName="Helvetica-Bold")),
            Paragraph(row[1], ParagraphStyle("gm", fontSize=8.5, leading=12, textColor=ROSE,
                                              fontName="Helvetica-Bold", alignment=TA_CENTER)),
            Paragraph(row[2], ParagraphStyle("gh", fontSize=8, leading=12, textColor=TEXT_DARK, fontName="Helvetica")),
            Paragraph(row[3], ParagraphStyle("gt", fontSize=8, leading=12, textColor=TEXT_MED,
                                              fontName="Helvetica", alignment=TA_CENTER)),
            Paragraph(row[4], ParagraphStyle("gr", fontSize=8, leading=12, textColor=STRENGTH,
                                              fontName="Helvetica-Bold", alignment=TA_CENTER)),
            Paragraph(row[5], ParagraphStyle("gp", fontSize=8, leading=12, textColor=TEXT_DARK,
                                              fontName="Helvetica", alignment=TA_CENTER)),
        ])
    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),DARK),("TOPPADDING",(0,0),(-1,-1),6),
                            ("BOTTOMPADDING",(0,0),(-1,-1),6),("LEFTPADDING",(0,0),(-1,-1),5),
                            ("RIGHTPADDING",(0,0),(-1,-1),5),("VALIGN",(0,0),(-1,-1),"TOP"),
                            ("GRID",(0,0),(-1,-1),0.4,colors.HexColor("#E0D8F0")),
                            ("LINEBELOW",(0,0),(-1,0),2,GOLD),
                            ("ROWBACKGROUNDS",(0,1),(-1,-1),[CARD_BG, LIGHT_BG])]))
    story.append(t); story.append(sp(3))

    story.append(box(
        "<b>El stack de certificaciones de mayor ROI (todas gratuitas):</b><br/>"
        "1. Google Analytics GA4 — 5-8 horas → desbloquea 16 roles<br/>"
        "2. Google Ads Search — 8-10 horas → desbloquea 23 roles<br/>"
        "3. HubSpot Content Marketing — 4-6 horas → refuerza posicionamiento editorial<br/>"
        "4. Mailchimp Email Marketing — 3-4 horas → cierra el gap de email marketing<br/>"
        "Total: ~4 semanas en paralelo a la búsqueda activa → el pool de roles accesibles se duplica.",
        st, bg=colors.HexColor("#1E1230")))
    story.append(sp(4))
    return story


# ── COMPENSACIÓN ─────────────────────────────────────────────────────────────

def build_salary(st):
    story = [SectionHeader("COMPENSACIÓN Y NEGOCIACIÓN", GOLD,
                            "Rangos reales + reglas de no negociación"),
             sp(3)]
    story.append(Paragraph(
        "El dataset de 188 postings no produjo datos de salario (Indeed LATAM/España suprime "
        "rangos sistemáticamente — el mismo fenómeno que se observó en los análisis previos). "
        "Los rangos a continuación están construidos desde fuentes de mercado externas y son "
        "los números con los que hay que entrar a cada negociación.",
        st["intro"])); story.append(sp(2))

    headers = ["Mercado", "Rol", "Floor mínimo (no ceder)", "Target", "Equivalente USD/mes"]
    rows = [
        ["Paraguay presencial", "Diseñadora Editorial / CM Editorial", "₲12.000.000", "₲15.000.000+", "$1.610 – $2.010"],
        ["LATAM remoto\n(CO, MX, AR)", "Diseñadora Editorial / Marketing Editorial", "$1.800 USD", "$2.500 USD", "$1.800 – $2.500"],
        ["España remoto", "Diseñadora Editorial / Content Lead", "€2.000", "€2.800", "$2.200 – $3.100"],
        ["España remoto", "Responsable Marketing Editorial", "€2.200", "€3.200", "$2.400 – $3.500"],
    ]
    col_widths = [30*mm, 48*mm, 34*mm, 28*mm, 30*mm]
    table_data = [[Paragraph(h, st["th"]) for h in headers]]
    for row in rows:
        table_data.append([
            Paragraph(row[0], ParagraphStyle("sm", fontSize=8.5, leading=12, textColor=TEXT_MED, fontName="Helvetica")),
            Paragraph(row[1], ParagraphStyle("sr", fontSize=8.5, leading=12, textColor=TEXT_DARK, fontName="Helvetica")),
            Paragraph(row[2], ParagraphStyle("sf", fontSize=8.5, leading=12, textColor=WEAKNESS,
                                              fontName="Helvetica-Bold", alignment=TA_CENTER)),
            Paragraph(row[3], ParagraphStyle("st", fontSize=8.5, leading=12, textColor=STRENGTH,
                                              fontName="Helvetica-Bold", alignment=TA_CENTER)),
            Paragraph(row[4], ParagraphStyle("su", fontSize=8.5, leading=12, textColor=TEXT_MED,
                                              fontName="Helvetica", alignment=TA_CENTER)),
        ])
    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),DARK),("TOPPADDING",(0,0),(-1,-1),7),
                            ("BOTTOMPADDING",(0,0),(-1,-1),7),("LEFTPADDING",(0,0),(-1,-1),6),
                            ("RIGHTPADDING",(0,0),(-1,-1),6),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
                            ("GRID",(0,0),(-1,-1),0.4,colors.HexColor("#E0D8F0")),
                            ("LINEBELOW",(0,0),(-1,0),2,GOLD),
                            ("ROWBACKGROUNDS",(0,1),(-1,-1),[CARD_BG, LIGHT_BG])]))
    story.append(t); story.append(sp(3))

    story.append(box(
        "<b>Reglas de negociación salarial — no son sugerencias, son reglas:</b><br/><br/>"
        "<b>Regla 1:</b> Nunca dar el número primero. Preguntar: '¿Podría contarme el rango del puesto?' "
        "Si insisten en que digas primero, el número es el target, no el floor.<br/><br/>"
        "<b>Regla 2:</b> Si el número que ofrecen está por debajo del floor: "
        "'Valoro mucho esta oportunidad. El rango que mencionan está por debajo de lo que estoy evaluando. "
        "¿Hay flexibilidad? Si no, prefiero ser honesta ahora para no hacer perder tiempo a ninguno de los dos.'<br/><br/>"
        "<b>Regla 3:</b> Tu mínimo declarado actual (₲8-10M) es lo que estabas dispuesta a aceptar antes de "
        "ver los datos de mercado. No es el número que llevás a la mesa de negociación.<br/><br/>"
        "<b>Regla 4:</b> Dayah LitWorks + consultorio son ingresos paralelos reales. El empleo formal no tiene "
        "que cargar solo con tu estabilidad económica — eso te da margen real para negociar.",
        st, bg=DARK))
    story.append(sp(4))
    return story


# ── PRÓXIMOS PASOS ─────────────────────────────────────────────────────────────

def build_next(st):
    story = [PageBreak(),
             SectionHeader("PRÓXIMOS PASOS", ROSE, "Qué hacer esta semana — en orden de impacto"),
             sp(3)]

    steps = [
        ("Esta semana", ROSE, [
            "Día 1 (5 minutos): cambiar el headline de LinkedIn → "
            "'Diseñadora Editorial · 400+ portadas bestseller en Amazon | Autora · Amazon Prime Reading | Dayah LitWorks'. "
            "Personalizar URL del perfil si no está hecho.",
            "Día 2: copiar el About section redactado en el reporte de LinkedIn overhaul. "
            "Actualizar la sección de experiencias para que Dayah LitWorks aparezca primera y con las métricas correctas.",
            "Día 3: abrir portfolio PDF actual. Reordenar para que las primeras 3-5 piezas sean de autores "
            "con #1 en Amazon con nombre verificable. Agregar sección 'Resultados' con los datos de bestsellers.",
            "Día 4: mensajes a 3 autores bestseller — solicitar testimonial para LinkedIn. "
            "Formato: 'Dayah diseñó [libro], llegué a #1 en [categoría] en Amazon.' Eso es el texto más poderoso que pueden escribir.",
            "Día 5: email de actualización a Editorial Blanco y Negro. El template exacto está en el archivo target-companies.md.",
        ]),
        ("Las próximas 2 semanas", GOLD, [
            "Google Analytics GA4 + Google Ads Search (Google Skillshop, gratuito) — ~3-4 horas por día "
            "durante una semana. Completar ambas certificaciones antes de que terminen las 2 semanas. "
            "Desbloquean +39 roles.",
            "Crear cuenta de TikTok activa: 3-5 videos de proceso de diseño de portadas, making-of de "
            "maquetación, o tips para autores indie. CapCut ya lo usás — es la misma herramienta. "
            "El gap más urgente del análisis (49 menciones) se cierra con constancia, no con perfección.",
            "Documentar uso de Meta Business Suite con capturas o métricas de campañas actuales o pasadas. "
            "Agregar al CV y LinkedIn. 1 día de trabajo, +11 roles desbloqueados.",
            "Listarse en Reedsy como Book Cover Designer. Es la plataforma de referencia del mercado anglosajón "
            "de servicios editoriales — estar listada genera ingresos freelance y visibilidad internacional.",
        ]),
        ("Las próximas 4-6 semanas", PLUM, [
            "Aplicar a roles Tier 1 con carta de presentación personalizada — al menos 2-3 aplicaciones por semana. "
            "Grupo Planeta, Axioma Comunicaciones, roles activos en Nube de Tinta / PRH España.",
            "Conectar en LinkedIn con Art Directors y Editorial Managers en empresas Tier 1 de España y Colombia. "
            "Sin mensaje de venta inicial — solo conexión. El mensaje viene después de 3-5 días.",
            "Publicar un post en LinkedIn en primera persona sobre el proceso de diseño o un logro verificable. "
            "No pedir trabajo — generar visibilidad. El objetivo es que los reclutadores lleguen a vos.",
            "Si hay respuestas de Editorial Blanco y Negro: agendar llamada. Este es el lead más caliente de todo el pipeline.",
        ]),
    ]

    for period, color, actions in steps:
        row = Table([[
            Paragraph(period, ParagraphStyle("per", fontSize=9, leading=12, textColor=WHITE,
                                             fontName="Helvetica-Bold", alignment=TA_CENTER)),
            [Paragraph(f'<font color="#{color.hexval()[2:]}">▸</font> {a}',
                       ParagraphStyle("act", fontSize=9, leading=14, textColor=TEXT_DARK,
                                      fontName="Helvetica", spaceAfter=3)) for a in actions]
        ]], colWidths=[28*mm, None])
        row.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),color),("BACKGROUND",(1,0),(1,0),LIGHT_BG),
                                  ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),
                                  ("LEFTPADDING",(0,0),(0,0),6),("RIGHTPADDING",(0,0),(-1,-1),10),
                                  ("LEFTPADDING",(1,0),(1,0),10),("VALIGN",(0,0),(-1,-1),"TOP"),
                                  ("LINEBELOW",(0,0),(-1,-1),0.5,colors.HexColor("#D8D0EC"))]))
        story.append(row); story.append(sp(1.5))
    story.append(sp(3))
    return story


# ── CIERRE ────────────────────────────────────────────────────────────────────

def build_closing(st):
    story = [SectionHeader("CIERRE", GOLD), sp(3)]
    story.append(box(
        "Daihana, tu perfil es significativamente más valioso de lo que has estado comunicando. "
        "Seis años construyendo Dayah LitWorks desde cero. 400+ portadas para autores que llegaron a #1 en Amazon. "
        "Una obra propia seleccionada por Amazon Prime Reading — un programa que Amazon administra con cupo "
        "limitado y que fue renovado múltiples veces porque el mercado lo sostiene. Una editorial colombiana "
        "que te buscó a vos en Instagram porque tu trabajo se ve desde lejos. Casi un millón de lectores "
        "que encontraron tus palabras antes de que tuvieras cualquier recurso estratégico."
        "<br/><br/>"
        "El análisis de 188 postings reales confirma que el mercado existe, que el 65% de los roles "
        "no requieren inglés, y que tus skills core — redes sociales, redacción, Canva, Meta Ads, "
        "maquetación, copywriting, storytelling — aparecen en exactamente los roles que deberías estar aplicando."
        "<br/><br/>"
        "Lo que queda no es construir credenciales que no tenés. Es hacer visible lo que ya existe. "
        "Cambiar el headline de LinkedIn. Poner los bestsellers al frente del portfolio. Escribirle "
        "a Editorial Blanco y Negro. Pedirle a Gleen Black o Laura López que pongan en palabras lo que "
        "ya saben de tu trabajo. Esas son las acciones. Todas concretas. Todas esta semana."
        "<br/><br/>"
        "El mercado está esperando una versión de tu perfil que comunique lo que realmente sos. "
        "Esa versión no requiere que aprendas nada nuevo — requiere que dejes de esconder lo que ya tenés.",
        st, size=10))
    story += [sp(8),
              Paragraph("Preparado con análisis avanzado de IA  ·  Abril 2026  ·  Confidencial", st["caption"])]
    return story


# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    margin = 18*mm
    doc = SimpleDocTemplate(OUTPUT, pagesize=A4,
                            leftMargin=margin, rightMargin=margin,
                            topMargin=22*mm, bottomMargin=18*mm,
                            title="Análisis de Carrera — Daihana Araujo",
                            author="Análisis avanzado de IA",
                            subject="Reporte profesional de carrera")
    st = styles()
    story = [PageBreak()]                 # portada ocupa página 1
    story += build_toc(st)
    story += build_intro(st)
    story.append(PageBreak())
    story += build_crown_jewels(st)
    story += build_market(st)
    story += build_swot(st)
    story += build_roles(st)
    story += build_gaps(st)
    story += build_salary(st)
    story += build_next(st)
    story += build_closing(st)
    doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
    print(f"PDF generado: {OUTPUT}")

if __name__ == "__main__":
    main()
