"use client";

import { useEffect } from "react";

/**
 * Reads the `mk_locale` cookie on the client and sets `<html lang>` to match.
 * Server already set it in the root layout, but the switcher may change it
 * without a full reload. This syncs the DOM attribute.
 */
export default function HtmlLangSyncer({ locale }: { locale: "es" | "en" }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
