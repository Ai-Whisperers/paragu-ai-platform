#!/usr/bin/env python3
"""Phase 3.2 — Fix small drift keys (non-dutchLanding, non-blog[23..25]).

Approach for each drift key:
  - Empty strings in es that don't exist in other locales: REMOVE from es
    (drift is in opposite direction: en has the key, es has empty)
  - Brand values (ogImage, twitterHandle) that exist in some locales
    but not all: copy from es (the source-of-truth) to missing locales
  - FAQ items that exist in en/nl/de but not es: SKIP (content-design
    split, faqPage.full is the actually-rendered section and that's
    already aligned)
  - Whatsapp schema (es has phone number, others have object): reshape
    es to match the others
  - deutschlandPage.process.steps in de only: translate to en/nl
"""
import json


def fix_locale(lang, content):
    """Apply fixes in-place."""
    out = content

    # 1. Remove empty tagline/whatsapp from faqPage.cta and whyCountryPage.cta
    #    (these are empty strings in es that don't exist in other locales).
    for parent in ["faqPage", "whyCountryPage"]:
        if parent not in out:
            continue
        cta = out[parent].get("cta")
        if not isinstance(cta, dict):
            continue
        for k in ("tagline", "whatsapp"):
            if k in cta and cta[k] == "":
                del cta[k]

    # 2. seo.ogImage / siteDescription / twitterHandle — copy from es to en/de
    #    BUT translate the Spanish siteDescription to the target locale.
    if lang in ("en", "de"):
        seo = out.setdefault("seo", {})
        # ogImage and twitterHandle are brand values, same in all locales
        seo["ogImage"] = "/images/brand/og-default.webp"
        seo["twitterHandle"] = "@nexaparaguay"
        # siteDescription needs to be translated, not copy-pasted
        if lang == "en":
            seo["siteDescription"] = (
                "Nexa Paraguay — Your move to Paraguay, end-to-end. "
                "Professional accompaniment for residency, banking, "
                "housing and settling in."
            )
        else:  # de
            seo["siteDescription"] = (
                "Nexa Paraguay — Ihr Umzug nach Paraguay, von Anfang bis "
                "Ende betreut. Professionelle Begleitung für Aufenthalt, "
                "Bank, Wohnen und Eingewöhnung."
            )

    # 3. whatsapp — es has phone number, others have object with
    #    buttonText + message. Reshape es.
    if lang == "es":
        wp = out.get("whatsapp")
        if isinstance(wp, str) and wp.startswith("595"):
            # Spanish message
            out["whatsapp"] = {
                "buttonText": "WhatsApp",
                "message": "Hola, me interesa recibir más información sobre Nexa Paraguay.",
            }

    # 4. deutschlandPage.process.steps[0..2] (en + nl) — translate from de
    if lang in ("en", "nl"):
        dp = out.get("deutschlandPage", {})
        proc = dp.get("process", {})
        steps = proc.get("steps", [])
        if steps:
            # Read de.json for the source content
            with open("content/de.json") as f:
                de_data = json.load(f)
            de_steps = de_data.get("deutschlandPage", {}).get("process", {}).get("steps", [])
            if de_steps:
                if lang == "en":
                    translations = [
                        ("Preparation in Germany", "We review your documents, apostille them and prepare the dossier. You collect everything conveniently from home."),
                        ("One trip to Paraguay", "You fly to Asunción. In one coordinated day we complete all the government procedures — migration, police, Cédula."),
                        ("Arrival & settling in", "We activate your tax ID (RUC) and your bank account. If needed, we also help with finding a home."),
                    ]
                else:  # nl
                    translations = [
                        ("Voorbereiding in Duitsland", "Wij beoordelen uw documenten, apostilleren ze en stellen het dossier samen. U verzamelt alles gemakkelijk vanuit huis."),
                        ("Eén reis naar Paraguay", "U vliegt naar Asunción. Op één gecoördineerde dag ronden we alle overheidsprocedures af — migratie, politie, Cédula."),
                        ("Aankomst & installatie", "We activeren uw belastingnummer (RUC) en uw bankrekening. Indien nodig helpen we ook bij het vinden van een woning."),
                    ]
                for i, (title, desc) in enumerate(translations):
                    if i < len(steps):
                        if isinstance(steps[i], dict):
                            steps[i]["title"] = title
                            steps[i]["description"] = desc
                    elif i < len(de_steps):
                        steps.append({"title": title, "description": desc})


def main():
    # Read es.json first to use as source for copy operations
    es = json.load(open("content/es.json"))
    for lang in ["es", "en", "nl", "de"]:
        path = f"content/{lang}.json"
        with open(path) as f:
            d = json.load(f)
        fix_locale(lang, d)
        with open(path, "w") as f:
            json.dump(d, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"  {lang}: applied Phase 3.2 fixes")


if __name__ == "__main__":
    main()