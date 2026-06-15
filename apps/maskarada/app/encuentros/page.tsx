import { redirect } from "next/navigation";

// /encuentros now lives at /eventos under the 'Encuentros regulares' section.
// This page is kept as a redirect for backward compatibility (any external
// links pointing to /encuentros still work). The /encuentros/[slug] detail
// pages are kept as-is — they have full per-encuentro content.

export default function EncuentrosIndex() {
  redirect("/eventos#encuentros");
}
