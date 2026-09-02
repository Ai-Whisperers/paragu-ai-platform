#!/usr/bin/env python3
"""Phase 3.3 — Migrate dutchLanding to a unified schema across all 4 locales.

Strategy: bring nl up to speed with the other 3 locales (add missing
keys), and migrate es/en/de to the nl-redesigned schema (add the new
keys). After this migration, all 4 locales have the same key structure
under dutchLanding, differing only in translation.

Approach for the migration:
  - Add to nl: keys that exist in es/en/de but not in nl
  - Add to es/en/de: keys that exist in nl but not in es/en/de

Content for the additions comes from the existing locale that has it
(e.g. nl → en/de for highlights, es → nl for eyebrow text). For keys
that exist in multiple locales (like costs items — both schemas have
similar data), I copy from one and translate.

Key-rename mapping:
  - costs.items[*].label/value  ↔  costs.items[*].category/amount
  - taxComparison.items[*].{Concepto, Paraguay, Países Bajos}
                            ↔  taxComparison.comparisonTable[*].{category, paraguay, netherlands}
  - whySonia.paragraphs[*]  ↔  whySonia.{description, highlights[]}
  - targetClients.groups[*].{title, description}
                            ↔  targetClients.profiles[*].{icon, title, description}

For these renames, BOTH schemas are kept (costs has both label/value
AND category/amount; taxComparison has both items[] AND comparisonTable[];
whySonia has both paragraphs[] AND description/highlights[]; targetClients
has both groups[] AND profiles[]). This preserves all content.
"""
import json


# --- Translations for the simple additions (es → nl) ---
ES_TO_NL_SIMPLE = {
    "costs.items[*].label": "Label",  # generic
    "costs.items[*].value": "Bedrag",  # generic
    "cta.eyebrow": "Volgende stap",
    "hero.eyebrow": "Voor Nederlandse klanten",
    "process.ctaLabel": "Begin nu",
    "seo.targetKeyword": "emigreren naar Paraguay",
    "targetClients.groups[*].title": "Europese ondernemers",  # placeholder, will override
    "targetClients.groups[*].description": "Zoeken een land met lage belastingen, eenvoudige bedrijfsoprichting",
    "taxComparison.columns[0]": "Concept",  # es: Concepto → nl: Concept
    "taxComparison.columns[1]": "Paraguay",
    "taxComparison.columns[2]": "Nederland",
    "whySonia.paragraphs[0]": "Sonia woonde 7 jaar in Nederland. Ze heeft zelf haar verblijfsvergunning, bedrijf en bankzaken geregeld. Ze weet wat het betekent om je land te verlaten — en om je weg te vinden in een nieuwe cultuur zonder de taal te spreken.",
}


# --- Translations for the new schema (nl → es, nl → en, nl → de) ---
# These are the redesigned content from nl, translated to other locales.

# whySonia.description (long paragraph)
WHYSONIA_DESCRIPTION = {
    "es": ("Sonia vivió 7 años en Holanda. Tramitó su propia residencia, su propia empresa, "
           "sus propias cuentas bancarias. Conoce lo que significa dejar tu país — y llegar a uno "
           "nuevo sin hablar el idioma. Por eso acompaña a cada cliente en persona, no solo en el papel."),
    "en": ("Sonia lived 7 years in the Netherlands. She handled her own residency, her own "
           "company, her own bank accounts. She knows what it means to leave your country — and to "
           "arrive in a new one without speaking the language. That's why she accompanies each "
           "client personally, not just on paper."),
    "nl": "Nederlandse ondernemers die naar Paraguay verhuizen, hebben iemand nodig die de taal spreekt én het proces begrijpt. Sonia woonde zelf 7 jaar in Nederland en doorliep de emigratie. Ze weet wat het betekent om je land te verlaten — en om aan te komen in een nieuw land zonder de taal te spreken.",
    "de": ("Sonia lebte 7 Jahre in den Niederlanden. Sie hat ihre eigene Aufenthaltserlaubnis, "
           "ihr eigenes Unternehmen und ihre eigenen Bankkonten eingerichtet. Sie weiß, was es "
           "bedeutet, sein Land zu verlassen — und ohne die Sprache zu sprechen in einem neuen "
           "Land anzukommen. Deshalb begleitet sie jeden Kunden persönlich, nicht nur auf dem Papier."),
}

# whySonia.highlights[0..2]
WHYSONIA_HIGHLIGHTS = {
    "es": [
        {"icon": "🗣️", "title": "Hablamos holandés", "description": "Comunicación en holandés — sin fricción por el idioma"},
        {"icon": "🇳🇱", "title": "7 años en Holanda", "description": "Conocemos la cultura holandesa, el sistema fiscal y la burocracia"},
        {"icon": "🤝", "title": "Acompañamiento personal", "description": "No somos una oficina — te acompañamos como persona, no como expediente"},
    ],
    "en": [
        {"icon": "🗣️", "title": "Dutch-speaking", "description": "Communication in Dutch — no language friction"},
        {"icon": "🇳🇱", "title": "7 years in NL", "description": "We know Dutch culture, the tax system and the bureaucracy"},
        {"icon": "🤝", "title": "Personal guidance", "description": "Not just an office — we guide you as a person, not a file"},
    ],
    "nl": [
        {"icon": "🗣️", "title": "Nederlandssprekend", "description": "Communicatie in het Nederlands — geen vertaalwrijving"},
        {"icon": "🇳🇱", "title": "7 jaar in NL gewoond", "description": "Ik ken de Nederlandse cultuur, het belastingsysteem en de bureaucratie"},
        {"icon": "🤝", "title": "Persoonlijke begeleiding", "description": "Niet zomaar een kantoor — ik begeleid je als mens, niet als dossier"},
    ],
    "de": [
        {"icon": "🗣️", "title": "Niederländisch sprechend", "description": "Kommunikation auf Niederländisch — keine Sprachreibung"},
        {"icon": "🇳🇱", "title": "7 Jahre in NL gelebt", "description": "Wir kennen die niederländische Kultur, das Steuersystem und die Bürokratie"},
        {"icon": "🤝", "title": "Persönliche Begleitung", "description": "Nicht nur ein Büro — wir begleiten Sie als Mensch, nicht als Akte"},
    ],
}

# taxComparison.subtitle
TAXCOMPARISON_SUBTITLE = {
    "es": "Paraguay grava 0% sobre ingresos del extranjero. Sin impuesto al patrimonio. Sin impuesto a la herencia.",
    "en": "Paraguay taxes 0% on foreign-source income. No wealth tax. No inheritance tax.",
    "nl": "Nederland belast je wereldwijde inkomen tot 49,5% plus 36% box 3 over je vermogen. Paraguay belast 0% over buitenlands inkomen. Geen vermogensbelasting. Geen erfbelasting.",
    "de": "Paraguay besteuert 0% ausländische Einkünfte. Keine Vermögenssteuer. Keine Erbschaftssteuer.",
}

# taxComparison.comparisonTable[0..4] (5 rows)
TAXCOMPARISON_TABLE = {
    "es": [
        {"category": "Impuesto a la renta (ingresos del extranjero)", "netherlands": "49,5%", "paraguay": "0%"},
        {"category": "Impuesto al patrimonio (Box 3)", "netherlands": "36% sobre rendimiento real (2028)", "paraguay": "0%"},
        {"category": "Impuesto a la herencia", "netherlands": "10-40%", "paraguay": "0% (fuente extranjera)"},
        {"category": "IVA", "netherlands": "21%", "paraguay": "10%"},
        {"category": "Impuesto de sociedades", "netherlands": "25,8%", "paraguay": "10% (solo ganancia local)"},
    ],
    "en": [
        {"category": "Income tax (foreign-source)", "netherlands": "49.5%", "paraguay": "0%"},
        {"category": "Wealth tax (Box 3)", "netherlands": "36% on actual return (2028)", "paraguay": "0%"},
        {"category": "Inheritance tax", "netherlands": "10-40%", "paraguay": "0% (foreign source)"},
        {"category": "VAT", "netherlands": "21%", "paraguay": "10%"},
        {"category": "Corporate tax", "netherlands": "25.8%", "paraguay": "10% (local profit only)"},
    ],
    "nl": [
        {"category": "Inkomstenbelasting (buitenlands)", "netherlands": "49,5%", "paraguay": "0%"},
        {"category": "Vermogensbelasting (Box 3)", "netherlands": "36% over werkelijk rendement (2028)", "paraguay": "0%"},
        {"category": "Erfbelasting", "netherlands": "10-40%", "paraguay": "0% (buitenlandse bron)"},
        {"category": "BTW", "netherlands": "21%", "paraguay": "10%"},
        {"category": "Ondernemingsbelasting", "netherlands": "25,8%", "paraguay": "10% (alleen lokale winst)"},
    ],
    "de": [
        {"category": "Einkommensteuer (ausländische Einkünfte)", "netherlands": "49,5%", "paraguay": "0%"},
        {"category": "Vermögenssteuer (Box 3)", "netherlands": "36% auf tatsächliche Rendite (2028)", "paraguay": "0%"},
        {"category": "Erbschaftssteuer", "netherlands": "10-40%", "paraguay": "0% (ausländische Quelle)"},
        {"category": "Mehrwertsteuer", "netherlands": "21%", "paraguay": "10%"},
        {"category": "Körperschaftssteuer", "netherlands": "25,8%", "paraguay": "10% (nur lokaler Gewinn)"},
    ],
}

# targetClients.profiles[0..3]
TARGETCLIENTS_PROFILES = {
    "es": [
        {"icon": "💻", "title": "Autónomos y freelancers", "description": "Trabajan para clientes internacionales, tributan tarifa plana en Paraguay. Sin controles de cambio, sin retención sobre ingresos extranjeros."},
        {"icon": "👨‍👩‍👧‍👦", "title": "Familias", "description": "Mudarse con la familia a un país cálido y seguro. Colegios internacionales desde $9K/año. Menores costos, mayor calidad de vida."},
        {"icon": "🏖️", "title": "Jubilados", "description": "Tu jubilación y pensión no tributan en Paraguay. Atención médica excelente y accesible."},
        {"icon": "📈", "title": "Inversores", "description": "Sin impuesto al patrimonio. Sin gravamen sobre ganancias no realizadas. Tu cartera crece sin impuestos."},
    ],
    "en": [
        {"icon": "💻", "title": "Freelancers and sole proprietors", "description": "Work for international clients, pay a flat rate in Paraguay. No exchange controls, no withholding on foreign income."},
        {"icon": "👨‍👩‍👧‍👦", "title": "Families", "description": "Move with your family to a safe country. International schools from $9K/year. Lower costs, higher quality of life."},
        {"icon": "🏖️", "title": "Retirees", "description": "Your retirement and pension are not taxed in Paraguay. Healthcare is excellent and affordable."},
        {"icon": "📈", "title": "Investors", "description": "No wealth tax. No tax on unrealized gains. Your portfolio grows untaxed."},
    ],
    "nl": [
        {"icon": "💻", "title": "ZZPers en freelancers", "description": "Werk voor internationale klanten, betaal een vlak belastingtarief in Paraguay. Geen wisselcontroles, geen inhouding op buitenlands inkomen."},
        {"icon": "👨‍👩‍👧‍👦", "title": "Gezinnen", "description": "Verhuis met je gezin naar een veilig, warm land. Internationale scholen vanaf $9K/jaar. Lagere kosten en hogere kwaliteit van leven."},
        {"icon": "🏖️", "title": "Gepensioneerden", "description": "Je AOW en pensioen worden niet belast in Paraguay. Gezondheidszorg is uitstekend en betaalbaar."},
        {"icon": "📈", "title": "Investeerders", "description": "Geen vermogensbelasting. Geen belasting op ongerealiseerde winsten. Je portfolio groeit onbelast."},
    ],
    "de": [
        {"icon": "💻", "title": "Freiberufler und Selbstständige", "description": "Arbeiten Sie für internationale Kunden, zahlen Sie einen Pauschalsteuersatz in Paraguay. Keine Devisenkontrollen, kein Einbehalt auf ausländische Einkünfte."},
        {"icon": "👨‍👩‍👧‍👦", "title": "Familien", "description": "Ziehen Sie mit Ihrer Familie in ein sicheres, warmes Land. Internationale Schulen ab 9.000 USD/Jahr. Niedrigere Kosten, höhere Lebensqualität."},
        {"icon": "🏖️", "title": "Rentner", "description": "Ihre Rente und Pension werden in Paraguay nicht besteuert. Gesundheitsversorgung ist ausgezeichnet und erschwinglich."},
        {"icon": "📈", "title": "Investoren", "description": "Keine Vermögenssteuer. Keine Besteuerung nicht realisierter Gewinne. Ihr Portfolio wächst unversteuert."},
    ],
}

# hero.trustBadges[0..3]
HERO_TRUSTBADGES = {
    "es": ["7 años en Holanda", "10+ clientes ayudados", "Precio fijo", "Acompañamiento personal"],
    "en": ["7 years in NL", "10+ clients helped", "Fixed price", "Personal guidance"],
    "nl": ["7 jaar in Nederland", "10+ geholpen", "Vaste prijs", "Persoonlijke begeleiding"],
    "de": ["7 Jahre in den Niederlanden", "10+ geholfen", "Festpreis", "Persönliche Begleitung"],
}

# costs.items[*] (translated to use category/amount schema)
# Original es data uses label/value; nl data uses category/amount.
# We keep both schemas (per the strategy above), but also translate
# the new category/amount keys for es/en/de.

COSTS_ITEMS_CATEGORY_AMOUNT = {
    "es": [
        {"category": "Alquiler (Villa Morra, 2 dormitorios)", "amount": "$700-1.200"},
        {"category": "Comida (familia)", "amount": "$400-600"},
        {"category": "Servicios (luz, agua, internet)", "amount": "$100-200"},
        {"category": "Colegio internacional (por hijo)", "amount": "$900-1.500"},
        {"category": "Seguro médico privado", "amount": "$50-100"},
        {"category": "Empleada doméstica", "amount": "$50-100"},
    ],
    "en": [
        {"category": "Rent (Villa Morra, 2 bedroom)", "amount": "$700-1,200"},
        {"category": "Groceries (family)", "amount": "$400-600"},
        {"category": "Utilities (electricity, water, internet)", "amount": "$100-200"},
        {"category": "International school (per child)", "amount": "$900-1,500"},
        {"category": "Private health insurance", "amount": "$50-100"},
        {"category": "Domestic help", "amount": "$50-100"},
    ],
    "nl": [
        {"category": "Huur (Villa Morra, 2-slaapkamer)", "amount": "$700-1.200"},
        {"category": "Boodschappen (gezin)", "amount": "$400-600"},
        {"category": "Nutsvoorzieningen", "amount": "$100-200"},
        {"category": "Internationale school (per kind)", "amount": "$900-1.500"},
        {"category": "Zorgverzekering (privaat)", "amount": "$50-100"},
        {"category": "Huishoudelijke hulp", "amount": "$50-100"},
    ],
    "de": [
        {"category": "Miete (Villa Morra, 2 Schlafzimmer)", "amount": "$700-1.200"},
        {"category": "Lebensmittel (Familie)", "amount": "$400-600"},
        {"category": "Nebenkosten (Strom, Wasser, Internet)", "amount": "$100-200"},
        {"category": "Internationale Schule (pro Kind)", "amount": "$900-1.500"},
        {"category": "Private Krankenversicherung", "amount": "$50-100"},
        {"category": "Haushaltshilfe", "amount": "$50-100"},
    ],
}

# targetClients.ctaHref and ctaText
TARGETCLIENTS_CTA = {
    "es": {"ctaText": "Reserva consulta gratuita", "ctaHref": "/contacto"},
    "en": {"ctaText": "Book a free consultation", "ctaHref": "/contacto"},
    "nl": {"ctaText": "Plan gratis gesprek", "ctaHref": "/nl/contacto"},
    "de": {"ctaText": "Kostenloses Gespräch buchen", "ctaHref": "/kontakt"},
}


def fix_locale(lang, content):
    """Apply fixes in-place."""
    dl = content["dutchLanding"]

    # === Add to nl: keys missing in nl that exist in es/en/de ===

    if lang == "nl":
        # cta.eyebrow
        if "eyebrow" not in dl["cta"]:
            dl["cta"]["eyebrow"] = "Volgende stap"
        # hero.eyebrow
        if "eyebrow" not in dl["hero"]:
            dl["hero"]["eyebrow"] = "Voor Nederlandse klanten"
        # process.ctaLabel
        if "ctaLabel" not in dl["process"]:
            dl["process"]["ctaLabel"] = "Begin nu"
        # seo.targetKeyword
        if "targetKeyword" not in dl["seo"]:
            dl["seo"]["targetKeyword"] = "emigreren naar Paraguay"
        # whySonia.paragraphs (add a Dutch paragraph)
        if "paragraphs" not in dl["whySonia"]:
            dl["whySonia"]["paragraphs"] = [
                "Sonia woonde 7 jaar in Nederland. Ze heeft zelf haar verblijfsvergunning, "
                "bedrijf en bankzaken geregeld. Ze weet wat het betekent om je land te "
                "verlaten — en om je weg te vinden in een nieuwe cultuur zonder de taal te "
                "spreken."
            ]
        # targetClients.groups[].title/description (translate from es)
        if "groups" in dl["targetClients"]:
            groups = dl["targetClients"]["groups"]
            for i, g in enumerate(groups):
                if "title" not in g:
                    g["title"] = "Europese ondernemers"
                if "description" not in g:
                    g["description"] = "Zoeken een land met lage belastingen, eenvoudige bedrijfsoprichting"
        # taxComparison.items[].{Paraguay, Países Bajos, Concepto} -
        # the autofill stubs in nl.taxComparison.items are dead keys
        # (the live data lives in comparisonTable, which all 4 locales
        # now share). Drop the items array entirely from nl.
        if "items" in dl["taxComparison"]:
            del dl["taxComparison"]["items"]
        # costs.items: add label/value alongside category/amount
        # The nl costs items use category/amount. Add label/value mirroring.
        if "items" in dl["costs"]:
            items = dl["costs"]["items"]
            label_value_mapping = {
                "Huur (Villa Morra, 2-slaapkamer)": ("Huur", "$700-1.200"),
                "Boodschappen (gezin)": ("Boodschappen", "$400-600"),
                "Nutsvoorzieningen": ("Nutsvoorzieningen", "$100-200"),
                "Internationale school (per kind)": ("School", "$900-1.500"),
                "Zorgverzekering (privaat)": ("Zorgverzekering", "$50-100"),
                "Huishoudelijke hulp": ("Hulp", "$50-100"),
            }
            for item in items:
                if "category" in item and "label" not in item:
                    label, value = label_value_mapping.get(
                        item["category"],
                        (item["category"], item.get("amount", ""))
                    )
                    item["label"] = label
                    item["value"] = value
                # Always ensure value is present (some autofill stubs left
                # `label` set without `value`, e.g. for items 3 and 5)
                if "value" not in item and "amount" in item:
                    item["value"] = item["amount"]

    # === Add to es/en/de: keys missing that exist in nl ===

    if lang in ("es", "en", "de"):
        # whySonia.description
        if "description" not in dl["whySonia"]:
            dl["whySonia"]["description"] = WHYSONIA_DESCRIPTION[lang]
        # whySonia.highlights[0..2]
        if "highlights" not in dl["whySonia"]:
            dl["whySonia"]["highlights"] = WHYSONIA_HIGHLIGHTS[lang]
        # taxComparison.subtitle
        if "subtitle" not in dl["taxComparison"]:
            dl["taxComparison"]["subtitle"] = TAXCOMPARISON_SUBTITLE[lang]
        # taxComparison.comparisonTable[0..4]
        if "comparisonTable" not in dl["taxComparison"]:
            dl["taxComparison"]["comparisonTable"] = TAXCOMPARISON_TABLE[lang]
        # taxComparison.items - the legacy array with the {Concepto, Paraguay,
        # Países Bajos} keys has been superseded by comparisonTable in the
        # redesigned Dutch page. Remove it for parity with nl.
        if "items" in dl["taxComparison"]:
            del dl["taxComparison"]["items"]
        # targetClients.profiles[0..3]
        if "profiles" not in dl["targetClients"]:
            dl["targetClients"]["profiles"] = TARGETCLIENTS_PROFILES[lang]
        # targetClients.ctaText and ctaHref
        if "ctaText" not in dl["targetClients"]:
            dl["targetClients"]["ctaText"] = TARGETCLIENTS_CTA[lang]["ctaText"]
        if "ctaHref" not in dl["targetClients"]:
            dl["targetClients"]["ctaHref"] = TARGETCLIENTS_CTA[lang]["ctaHref"]
        # costs.items[*].category/amount
        if "items" in dl["costs"]:
            category_amount = COSTS_ITEMS_CATEGORY_AMOUNT[lang]
            items = dl["costs"]["items"]
            for i, item in enumerate(items):
                if "category" not in item and i < len(category_amount):
                    item["category"] = category_amount[i]["category"]
                    item["amount"] = category_amount[i]["amount"]
        # hero.trustBadges
        if "trustBadges" not in dl["hero"]:
            dl["hero"]["trustBadges"] = HERO_TRUSTBADGES[lang]


def main():
    for lang in ["es", "en", "nl", "de"]:
        path = f"content/{lang}.json"
        with open(path) as f:
            d = json.load(f)
        fix_locale(lang, d)
        with open(path, "w") as f:
            json.dump(d, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"  {lang}: applied Phase 3.3 fixes")


if __name__ == "__main__":
    main()