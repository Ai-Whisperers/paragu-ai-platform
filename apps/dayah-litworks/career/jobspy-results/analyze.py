"""
ANALYZE — Daihana Araujo: skill gap + role match desde las descripciones de JobSpy.

Preguntas que responde:
  Q1. ¿Qué roles aparecen más y con qué títulos exactos?
  Q2. ¿Qué herramientas y habilidades piden con más frecuencia?
  Q3. ¿Cuáles tiene Daihana (match) y cuáles le faltan (gap)?
  Q4. ¿Qué clúster de roles puede aplicar HOY después del reframing?
  Q5. ¿Qué se abre con acciones a corto plazo (1-4 semanas)?
  Q6. ¿Hay datos de salario? ¿Cuál es el rango real del mercado?
"""
import sys, re, glob
sys.stdout.reconfigure(encoding="utf-8")

import pandas as pd
from collections import Counter

# ─── RUTAS ────────────────────────────────────────────────────────────────────
BASE = "C:/Users/PREDATOR/Documents/MonaisLair/projects/personal/career-daihana/jobspy-results/"

# ─── CARGAR TODOS LOS CSVs ────────────────────────────────────────────────────
files = glob.glob(BASE + "run*.csv")
if not files:
    print("No CSV files found. Run run1.py through run4.py first.")
    sys.exit(0)

dfs = []
for f in files:
    try:
        dfs.append(pd.read_csv(f, encoding="utf-8-sig"))
        print(f"Loaded: {f} ({len(dfs[-1])} rows)")
    except Exception as e:
        print(f"Error loading {f}: {e}")

df = pd.concat(dfs, ignore_index=True)
print(f"\nTotal loaded: {len(df)} rows")

# ─── DEDUP GLOBAL ─────────────────────────────────────────────────────────────
if "job_url" in df.columns:
    df = df.drop_duplicates(subset=["job_url"], keep="first")
print(f"After global dedup: {len(df)} rows")

# ─── SEGUNDA PASADA DE LIMPIEZA — ruido que se coló ──────────────────────────
NOISE_TITLES = [
    r"analista financier", r"analista fiscal", r"analista contable",
    r"contabilidad", r"nomina", r"nómina", r"asistente administrativa",
    r"it support", r"soporte técnico", r"técnico\s+de\s+sistemas",
    r"desarrollador", r"programador", r"software engineer",
    r"data scientist", r"machine learning", r"ingeniero",
    r"ventas", r"comercial", r"ejecutivo.*ventas",
    r"recursos humanos", r"reclutamiento", r"selección",
]

mask_noise = df["title"].str.contains(
    "|".join(NOISE_TITLES), flags=re.IGNORECASE, na=False
)
df = df[~mask_noise]
print(f"After second-pass title clean: {len(df)} rows")
print()

# ─── PERFIL DE DAYAH — qué TIENE vs qué puede FALTAR ─────────────────────────
DAYAH_HAS = {
    # diseño editorial
    "affinity publisher", "affinity designer", "affinity photo", "affinity",
    "canva", "logopit",
    # vídeo/motion
    "capcut",
    # plataformas editoriales
    "amazon kdp", "kdp", "wattpad", "booknek", "dreame", "buenovela", "sueñovela",
    # marketing digital
    "meta ads", "facebook ads", "instagram ads", "pauta",
    "community manager", "gestión de redes", "redes sociales",
    "planificación de contenidos", "calendario editorial",
    # escritura
    "copywriting", "redacción", "corrección", "corrector", "maquetación",
    "storytelling", "guión", "voz en off",
    # seo
    "seo", "dinorank",
    # amazon
    "autopublicación", "self-publishing",
    # psico (transferible)
    "psicología", "atención al cliente", "mediación",
}

# Tools/skills que aparecen en descripciones que Daihana NO tiene documentadas
DAYAH_GAPS_TO_DETECT = {
    # Adobe — la gran brecha de herramientas
    "adobe indesign":    "Adobe InDesign",
    "indesign":         "Adobe InDesign",
    "adobe illustrator": "Adobe Illustrator",
    "illustrator":      "Adobe Illustrator",
    "adobe photoshop":  "Adobe Photoshop",
    "photoshop":        "Adobe Photoshop",
    "adobe premiere":   "Adobe Premiere",
    "premiere":         "Adobe Premiere",
    "after effects":    "After Effects",
    "adobe suite":      "Adobe Creative Suite",
    "adobe creative":   "Adobe Creative Suite",
    # Diseño UI/web
    "figma":            "Figma",
    "sketch":           "Sketch",
    "coreldraw":        "CorelDraw",
    # Analytics
    "google analytics": "Google Analytics",
    "ga4":              "Google Analytics 4",
    "meta business":    "Meta Business Suite",
    "power bi":         "Power BI",
    "tableau":          "Tableau",
    # Marketing automation
    "hubspot":          "HubSpot",
    "mailchimp":        "Mailchimp",
    "active campaign":  "ActiveCampaign",
    "activecampaign":   "ActiveCampaign",
    "klaviyo":          "Klaviyo",
    # Social media tools
    "metricool":        "Metricool",
    "hootsuite":        "Hootsuite",
    "buffer":           "Buffer",
    "later":            "Later",
    "sprout":           "Sprout Social",
    # PM
    "notion":           "Notion",
    "trello":           "Trello",
    "asana":            "Asana",
    "monday":           "Monday.com",
    "jira":             "Jira",
    "clickup":          "ClickUp",
    # Video/audio
    "davinci":          "DaVinci Resolve",
    "premiere pro":     "Premiere Pro",
    "reels":            "Reels/Video",
    "tiktok":           "TikTok",
    # Email/newsletter
    "email marketing":  "Email Marketing",
    "newsletter":       "Email Marketing",
    "sendinblue":       "Sendinblue/Brevo",
    "brevo":            "Sendinblue/Brevo",
    # Ingles (crítico dado que ella no sabe)
    "inglés":           "Inglés requerido",
    "english":          "English required",
    "nivel b2":         "Inglés B2+ requerido",
    "nivel c1":         "Inglés C1 requerido",
    "bilingüe":         "Bilingüe (puede ser barrera)",
    # Otros
    "wordpress":        "WordPress",
    "shopify":          "Shopify",
    "woocommerce":      "WooCommerce",
    "e-commerce":       "eCommerce knowledge",
    "ecommerce":        "eCommerce knowledge",
    "xml":              "XML/EPUB",
    "epub":             "EPUB/formatos digitales",
    "ingramspark":      "IngramSpark",
    "google ads":       "Google Ads",
    "sem ":             "SEM/Google Ads",
}

# ─── Q1: FRECUENCIA DE TÍTULOS ────────────────────────────────────────────────
print("=" * 80)
print("Q1 — TÍTULOS MÁS FRECUENTES")
print("=" * 80)

if "title" in df.columns:
    title_counts = Counter(df["title"].str.strip().str.lower())
    most_common_titles = title_counts.most_common(30)
    for title, count in most_common_titles:
        print(f"  {count:3}x  {title}")

# ─── Q2 + Q3: FRECUENCIA DE SKILLS EN DESCRIPCIONES + GAP ────────────────────
print()
print("=" * 80)
print("Q2/Q3 — SKILLS EN DESCRIPCIONES: frecuencia + match con perfil de Dayah")
print("=" * 80)

with_desc = df[df["description"].notna()].copy()
n_desc = len(with_desc)
print(f"\nDescripciones disponibles: {n_desc}/{len(df)}")

# Contar todas las keywords en descripciones
gap_counter  = Counter()
has_counter  = Counter()

desc_text_all = " ".join(with_desc["description"].fillna("").tolist()).lower()

# Buscar gaps
for kw, label in DAYAH_GAPS_TO_DETECT.items():
    count = len(re.findall(r'\b' + re.escape(kw) + r'\b', desc_text_all))
    if count > 0:
        gap_counter[label] += count

# Buscar lo que tiene
for kw in DAYAH_HAS:
    count = len(re.findall(r'\b' + re.escape(kw) + r'\b', desc_text_all))
    if count > 0:
        has_counter[kw] += count

print("\n--- SKILLS QUE TIENE DAYAH (aparecen en descripciones) ---")
for skill, cnt in sorted(has_counter.items(), key=lambda x: -x[1]):
    if cnt > 0:
        print(f"  ✅  {skill:<35} ({cnt:3}x en descripciones)")

print("\n--- GAPS: skills que PIDEN y Dayah NO tiene ---")
for skill, cnt in sorted(gap_counter.items(), key=lambda x: -x[1]):
    if "inglés" in skill.lower() or "english" in skill.lower() or "bilingüe" in skill.lower() or "b2" in skill.lower() or "c1" in skill.lower():
        marker = "🚫"  # bloqueante si no sabe inglés
    elif cnt >= 3:
        marker = "❌"  # gap importante
    else:
        marker = "⚠️ "  # gap menor
    print(f"  {marker}  {skill:<35} ({cnt:3}x en descripciones)")

# ─── Q4: CLÚSTERES DE ROLES + MATCH ESTIMADO ─────────────────────────────────
print()
print("=" * 80)
print("Q4 — CLÚSTERES DE ROLES: qué puede aplicar HOY vs. a corto plazo")
print("=" * 80)

CLUSTERS = {
    "diseño_editorial": [
        "diseñ", "portada", "maquetación", "editorial", "book cover",
        "layout", "diagramación", "identidad visual"
    ],
    "content_manager": [
        "content manager", "gestión de contenidos", "community manager",
        "redes sociales", "contenidos", "social media"
    ],
    "marketing_editorial": [
        "marketing editorial", "marketing de autor", "marketing digital",
        "estrategia de contenidos", "plan de contenidos"
    ],
    "coordinacion_editorial": [
        "coordinador", "coordinadora", "responsable editorial",
        "jefe de contenidos", "dirección editorial"
    ],
    "creativo_agencia": [
        "creative", "agencia creativa", "dirección creativa",
        "director creativo", "estrategia creativa"
    ],
}

cluster_df = {}
for cluster, keywords in CLUSTERS.items():
    pattern = "|".join(keywords)
    mask = (
        df["title"].str.contains(pattern, case=False, na=False)
        | (df["description"].str.contains(pattern, case=False, na=False) if "description" in df.columns else False)
    )
    cluster_df[cluster] = df[mask]
    print(f"\n  [{cluster.upper()}] — {len(cluster_df[cluster])} postings")
    if len(cluster_df[cluster]) > 0:
        top = cluster_df[cluster]["title"].value_counts().head(5)
        for title, cnt in top.items():
            print(f"      {cnt:2}x {title}")

# ─── Q5: ANÁLISIS DE INGLÉS COMO BARRERA ─────────────────────────────────────
print()
print("=" * 80)
print("Q5 — INGLÉS: ¿cuántos roles lo requieren? (barrera crítica para Dayah)")
print("=" * 80)

if "description" in df.columns:
    english_pattern = r'\b(inglés|english|nivel b2|nivel c1|bilingüe|bilingual)\b'
    needs_english = df[df["description"].str.contains(english_pattern, case=False, na=False)]
    no_english    = df[~df["description"].str.contains(english_pattern, case=False, na=False)
                       & df["description"].notna()]
    desc_unknown  = df[df["description"].isna()]

    print(f"  Roles que mencionan inglés: {len(needs_english)}/{n_desc} ({len(needs_english)/max(n_desc,1)*100:.0f}%)")
    print(f"  Roles que NO mencionan inglés: {len(no_english)}/{n_desc} ({len(no_english)/max(n_desc,1)*100:.0f}%)")
    print(f"  Sin descripción (no se puede confirmar): {len(desc_unknown)}")
    print()
    print("  Roles SIN requisito de inglés explícito (candidatos directos para Dayah):")
    if len(no_english) > 0:
        scols = [c for c in ["search_country","title","company","location"] if c in no_english.columns]
        print(no_english[scols].to_string(index=False))

# ─── Q6: SALARIOS ─────────────────────────────────────────────────────────────
print()
print("=" * 80)
print("Q6 — SALARIOS: distribución de rangos donde hay datos")
print("=" * 80)

if "min_amount" in df.columns and df["min_amount"].notna().sum() > 0:
    sal = df[df["min_amount"].notna()].copy()
    sal["mid"] = (sal["min_amount"] + sal["max_amount"].fillna(sal["min_amount"])) / 2
    print(f"\n  Postings con datos de salario: {len(sal)}")
    for currency in sal["currency"].dropna().unique():
        sub = sal[sal["currency"] == currency]
        if len(sub) > 0:
            print(f"\n  [{currency}]")
            print(f"    Min declarado:   {sub['min_amount'].min():,.0f}")
            print(f"    Mediana min:     {sub['min_amount'].median():,.0f}")
            print(f"    Max declarado:   {sub['max_amount'].max():,.0f}")
            print(f"    Mediana mid:     {sub['mid'].median():,.0f}")
    print()
    scols = [c for c in ["search_country","title","company","min_amount","max_amount","currency"] if c in sal.columns]
    print(sal[scols].sort_values("min_amount", ascending=False).to_string(index=False))
else:
    print("  ⚠️  Sin datos de salario en este dataset (común en Indeed LATAM/España).")
    print("  Referencia de mercado desde conocimiento previo:")
    print("    España — diseñador editorial mid: €18.000–28.000/año (€1.500–2.333/mes)")
    print("    España — content manager editorial: €16.000–24.000/año (€1.333–2.000/mes)")
    print("    Colombia remoto — diseño editorial: $800–1.500 USD/mes")
    print("    México — diseño editorial: $900–1.800 USD/mes")

# ─── RESUMEN EJECUTIVO ────────────────────────────────────────────────────────
print()
print("=" * 80)
print("RESUMEN EJECUTIVO — PARA market-insights.md")
print("=" * 80)
print(f"""
DATOS DEL ANÁLISIS:
  Total de postings analizados: {len(df)}
  Con descripción completa: {n_desc}
  Búsqueda: España · Colombia · México · Argentina (Indeed + LinkedIn)
  Período: últimos 30 días

CLÚSTERES DE ROLES ENCONTRADOS:
""")
for cluster, cdf in cluster_df.items():
    print(f"  {cluster.upper()}: {len(cdf)} postings")

print(f"""
DISTRIBUCIÓN DE INGLÉS:
  Requieren inglés (barrera para Dayah): ver Q5 arriba
  Sin requisito de inglés: ver Q5 arriba

PRÓXIMA ACCIÓN:
  1. Revisar los postings del cluster diseño_editorial SIN inglés → aplicar
  2. Revisar gaps de Adobe (InDesign especialmente) → prioridad de aprendizaje
  3. Actualizar market-insights.md con hallazgos concretos
""")

print("Análisis completo.")
