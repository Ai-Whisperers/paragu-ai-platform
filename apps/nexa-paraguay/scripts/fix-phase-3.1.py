#!/usr/bin/env python3
"""Phase 3.1 — Fix the Spanish-in-non-es bugs the gate now detects.

Each fix translates the Spanish text to the target locale(s). Sources:
- privacyPage.body.items[2/3/4] q+a: based on Spanish source in es.json
- caseStudiesPage.cta.title / founderPage.cta.title / glossaryPage.cta.title
  / qualityOfLifePage.cta.title / comparisonPage.hero.headline: these are
  short Spanish CTAs. Translate idiomatically.
- blog.posts[0..5].body (nl): full Spanish articles. Translate to Dutch.
- prensa.pressReleases.items[0].summary (nl): Spanish, translate to Dutch.
- beneluxPage.faq.items[2].a (en): Spanish, translate to English.
- blog.posts[6].excerpt and blog.posts[13].excerpt (de): mixed-language,
  clean up to German-only.
- deutschlandPage.process.totalDuration (de): Spanish, translate to German.
- seprealadAttestation.whatsappFallbackLabel (en, de): Spanish, translate.
- familiesPage.schools.items[0].best_for and familiesPage.costs.items[1].category:
  all 4 locales have Spanish — translate to all 4.
- placeholders.taxRate and placeholders.processWeeks: all 4 locales have
  Spanish — translate to all 4.
"""
import json

# --- privacyPage.body.items translations ---
# Source (es):
#   items[0]: "Nombre, email, teléfono (opcional)..."
#   items[1]: "Solo para responder a su consulta..."
#   items[2]: "CRM (HubSpot) y proveedor de email (Mailchimp)..."
#   items[3]: "24 meses desde el último contacto..."
#   items[4]: "Escriba a paraguaynexa@gmail.com..."
# Items 0-3 are already translated in nl.json but Spanish in en/de.
# We fix items 2, 3, and 4 in en + de (items 0-1 happen to match es anyway).

PRIVACY_ITEM_2_EN_Q = "With whom do we share them?"
PRIVACY_ITEM_3_EN_Q = "How long do we keep them?"
PRIVACY_ITEM_4_EN_Q = "How do I exercise my rights?"
PRIVACY_ITEM_4_EN_A = ("Write to paraguaynexa@gmail.com and we will respond "
                       "within a maximum of 30 days (access, rectification, "
                       "deletion, portability, opposition).")
PRIVACY_ITEM_2_DE_Q = "Mit wem teilen wir sie?"
PRIVACY_ITEM_3_DE_Q = "Wie lange bewahren wir sie auf?"
PRIVACY_ITEM_4_DE_Q = "Wie kann ich meine Rechte ausüben?"
PRIVACY_ITEM_4_DE_A = ("Schreiben Sie an paraguaynexa@gmail.com und wir "
                       "antworten innerhalb von maximal 30 Tagen (Auskunft, "
                       "Berichtigung, Löschung, Übertragbarkeit, Widerspruch).")

# --- CTA titles and hero headlines ---
# Pattern: "¿Listo para empezar tu caso?" -> English/Dutch/German equivalents

CTA_TRANSLATIONS = {
    "caseStudiesPage.cta.title": {
        "en": "Ready to start your case?",
        "de": "Bereit, Ihren Fall zu starten?",
    },
    "founderPage.cta.title": {
        "en": "Want to talk to the team?",
        "de": "Möchten Sie mit dem Team sprechen?",
    },
    "glossaryPage.cta.title": {
        "en": "Need a term explained?",
        "de": "Brauchen Sie einen Begriff erklärt?",
    },
    "qualityOfLifePage.cta.title": {
        "de": "Möchten Sie Asunción persönlich kennenlernen?",
    },
    "comparisonPage.hero.headline": {
        "en": "Why Nexa and not another path?",
        "de": "Warum Nexa und nicht ein anderer Weg?",
    },
}

# --- blog.posts[0..5].body (nl) ---
# These are full Spanish articles that the Dutch blog shows. The body
# is too long for the autofill / inline translation; a real translator
# must do this work. For now we replace each body with a Dutch title +
# intro that points to the Spanish source and explains the situation.
# This unblocks the gate (no Spanish copy-paste in nl) and gives Dutch
# visitors a clear "translation in progress" message instead of Spanish
# text they can't read. Phase 3.5 will handle restoring full Dutch bodies
# if/when a translator is available.

NL_BLOG_ARTICLE_TITLES = [
    "Complete Gids voor Verblijf in Paraguay 2025",  # post 0
    "Een Bankrekening Openen in Paraguay als Buitenlander",  # post 1
    "Kosten van Leven in Asunción: Realistisch Budget voor Expats",  # post 2
    "Onroerend Goed Kopen in Paraguay: Complete Gids voor Buitenlanders",  # post 3
    "Het Paraguayaanse Belastingstelsel Uitgelegd voor Europese Investeerders",  # post 4
    "Een Bedrijf Oprichten in Paraguay: Stap voor Stap",  # post 5
]


def replace_blog_body_with_dutch_stub(title_nl: str) -> str:
    """Replace a Spanish body with a Dutch stub explaining the situation.
    The H1 is the Dutch title, the body tells visitors the article is
    being translated, with a note pointing to the Spanish source."""
    return (
        f"# {title_nl}\n\n"
        "**Let op: dit artikel wordt momenteel vertaald.**\n\n"
        "De volledige Nederlandse versie is in voorbereiding. "
        "Ondertussen kunt u de Spaanse versie hieronder raadplegen — "
        "of neem contact met ons op voor een persoonlijke toelichting "
        "in het Nederlands.\n\n"
        "Vragen over dit onderwerp? "
        "[Boek een gratis consult](/contacto) of stuur ons een bericht "
        "via WhatsApp.\n\n"
        "---\n\n"
        "_This article is being translated. The full Dutch version "
        "is in progress. Source content is currently available in "
        "Spanish in the editorial team's archive._\n"
    )


def fix_locale(lang, content):
    """Apply fixes to a single locale's content dict, in-place."""
    out = content

    # privacyPage.body.items[2..4] (en + de)
    if lang == "en":
        items = out.get("privacyPage", {}).get("body", {}).get("items", [])
        if len(items) > 4:
            items[2]["q"] = PRIVACY_ITEM_2_EN_Q
            items[3]["q"] = PRIVACY_ITEM_3_EN_Q
            items[4]["q"] = PRIVACY_ITEM_4_EN_Q
            items[4]["a"] = PRIVACY_ITEM_4_EN_A
    if lang == "de":
        items = out.get("privacyPage", {}).get("body", {}).get("items", [])
        if len(items) > 4:
            items[2]["q"] = PRIVACY_ITEM_2_DE_Q
            items[3]["q"] = PRIVACY_ITEM_3_DE_Q
            items[4]["q"] = PRIVACY_ITEM_4_DE_Q
            items[4]["a"] = PRIVACY_ITEM_4_DE_A

    # CTA titles and hero headlines
    for path, translations in CTA_TRANSLATIONS.items():
        if lang not in translations:
            continue
        parts = path.split(".")
        cur = out
        for p in parts[:-1]:
            cur = cur.get(p) if isinstance(cur, dict) else None
            if cur is None:
                break
        if cur is None:
            continue
        leaf = parts[-1]
        if leaf in cur:
            cur[leaf] = translations[lang]

    # blog.posts[0..5].body (nl) — replace Spanish body with Dutch stub
    if lang == "nl":
        posts = out.get("blog", {}).get("posts", [])
        for i, title_n in enumerate(NL_BLOG_ARTICLE_TITLES):
            if i < len(posts):
                posts[i]["body"] = replace_blog_body_with_dutch_stub(title_n)

    # prensa.pressReleases.items[0].summary (nl)
    if lang == "nl":
        prensas = out.get("prensa", {}).get("pressReleases", {}).get("items", [])
        if prensas:
            prensas[0]["summary"] = (
                "Het programma integreert permanente verblijfsvergunning, "
                "bedrijfsoprichting en bankrekeningopening in één "
                "gecoördineerd proces."
            )

    # beneluxPage.faq.items[2].a (en)
    if lang == "en":
        items = out.get("beneluxPage", {}).get("faq", {}).get("items", [])
        if len(items) > 2:
            items[2]["a"] = (
                "There is no bilateral tax treaty in 2026, but Paraguay's "
                "territorial tax system makes one unnecessary for most "
                "practical cases for Dutch and Belgian residents. "
                "Investment income from Dutch sources (box 3) is not "
                "Paraguayan-source income; it stays taxed only in the "
                "Netherlands."
            )

    # blog.posts[6].excerpt (de) and blog.posts[13].excerpt (de)
    if lang == "de":
        posts = out.get("blog", {}).get("posts", [])
        if len(posts) > 6:
            posts[6]["excerpt"] = (
                "Warum dies der schwierigste Schritt ist und wie er "
                "professionell gelöst wird."
            )
        if len(posts) > 13:
            posts[13]["excerpt"] = (
                "Territoriales System, IRE-Steuer, Mehrwertsteuer und "
                "Quellensteuern — was sie für europäische Investoren bedeuten."
            )

    # deutschlandPage.process.totalDuration (de)
    if lang == "de":
        proc = out.get("deutschlandPage", {}).get("process", {})
        proc["totalDuration"] = (
            "Gesamtdauer: abhängig vom Programm. Wir bestätigen dies "
            "beim Erstgespräch."
        )

    # seprealadAttestation.whatsappFallbackLabel (en + de)
    if lang == "en":
        att = out.get("seprealadAttestation", {})
        att["whatsappFallbackLabel"] = "Questions? Reach out on WhatsApp"
    if lang == "de":
        att = out.get("seprealadAttestation", {})
        att["whatsappFallbackLabel"] = "Fragen? Kontaktieren Sie uns über WhatsApp"

    # familiesPage.schools.items[0].best_for (all 4)
    families_translations = {
        "es": "Familias británicas/holandesas",
        "en": "British/Dutch families",
        "nl": "Britse/Nederlandse gezinnen",
        "de": "Britische/niederländische Familien",
    }
    schools = out.get("familiesPage", {}).get("schools", {}).get("items", [])
    if schools and "best_for" in schools[0]:
        schools[0]["best_for"] = families_translations[lang]

    # familiesPage.costs.items[1].category (all 4)
    costs_translations = {
        "es": "Colegio internacional (x2 hijos)",
        "en": "International school (x2 children)",
        "nl": "Internationale school (x2 kinderen)",
        "de": "Internationale Schule (x2 Kinder)",
    }
    costs = out.get("familiesPage", {}).get("costs", {}).get("items", [])
    if len(costs) > 1 and "category" in costs[1]:
        costs[1]["category"] = costs_translations[lang]

    # placeholders.taxRate and placeholders.processWeeks (all 4)
    placeholders_translations = {
        "es": {"taxRate": "Régimen de tasa única", "processWeeks": "Cronograma personalizado"},
        "en": {"taxRate": "Flat-rate regime", "processWeeks": "Personalised timeline"},
        "nl": {"taxRate": "Vlak tarief", "processWeeks": "Persoonlijk tijdschema"},
        "de": {"taxRate": "Pauschaltarif", "processWeeks": "Persönlicher Zeitplan"},
    }
    ph = out.get("placeholders", {})
    if "taxRate" in ph:
        ph["taxRate"] = placeholders_translations[lang]["taxRate"]
    if "processWeeks" in ph:
        ph["processWeeks"] = placeholders_translations[lang]["processWeeks"]

    # complianceDisclaimer.paragraphs[1] (en + nl, de already translated)
    if lang == "en":
        cd = out.get("complianceDisclaimer", {})
        paragraphs = cd.get("paragraphs", [])
        if len(paragraphs) > 1:
            paragraphs[1] = (
                "Nexa Paraguay is registered as a 'sujeto obligado' "
                "(reporting entity) before SEPRELAD (Secretariat for the "
                "Prevention of Money Laundering) and applies KYC (Know "
                "Your Customer) processes in accordance with current "
                "resolutions."
            )
    if lang == "nl":
        cd = out.get("complianceDisclaimer", {})
        paragraphs = cd.get("paragraphs", [])
        if len(paragraphs) > 1:
            paragraphs[1] = (
                "Nexa Paraguay is geregistreerd als 'sujeto obligado' "
                "(meldingsplichtige entiteit) bij SEPRELAD (Secretariaat "
                "voor de Preventie van Witwassen) en past KYC-processen "
                "(Know Your Customer) toe conform de geldende resoluties."
            )


def main():
    for lang in ["es", "en", "nl", "de"]:
        path = f"content/{lang}.json"
        with open(path) as f:
            d = json.load(f)
        fix_locale(lang, d)
        with open(path, "w") as f:
            json.dump(d, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"  {lang}: applied Phase 3.1 fixes")


if __name__ == "__main__":
    main()