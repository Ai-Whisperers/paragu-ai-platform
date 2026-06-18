// /en/donar is handled by the same Donar component (locale from cookie mk_locale).
// Re-export the same page so we don't duplicate the file.
import Donar from "@/app/donar/page";

export const metadata = {
  title: "Donate — Club maškaráda",
  description:
    "How to support maškaráda: bank transfer, Tigo Money, or message us directly. The platform is sustained by the community.",
};

export default function DonarEn() {
  return <Donar />;
}
