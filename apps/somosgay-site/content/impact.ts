// Cumulatively tracked metrics — sourced from Informe Anual 2020 (audited).
// These are conservative numbers used for the "Impact verified" section on
// the homepage. Updated annually when new audited reports land.

export interface ImpactMetric {
  label: string;
  value: number;
  unit: string; // "tests", "consultas", "personas", "guaraníes"
  since: string;
  detail?: string;
  /** Formatted for big-number display */
  displayValue?: string;
}

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    label: "Tests de VIH tomados",
    value: 1300,
    unit: "tests",
    since: "2020",
    detail: "Cifra confirmada en Informe Anual 2020, auditado por Account Control & Asociados.",
  },
  {
    label: "Personas alcanzadas en redes sociales",
    value: 100000,
    unit: "personas",
    since: "2020",
    detail: "Alcance combinado Instagram, Facebook, Twitter, YouTube, TikTok.",
  },
  {
    label: "Años de trabajo continuo en Paraguay",
    value: 21,
    unit: "años",
    since: "2005",
    detail: "Asociación Civil formalmente constituida; ONG registrada en Itaipu.",
  },
  {
    label: "Programas activos",
    value: 5,
    unit: "programas",
    since: "2026",
    detail: "Clínica Kunu'u + Tekoharã + Ñande Rekorã + Karu Porã + Programa Kunu'u.",
  },
  {
    label: "Memoria 108 documentada",
    value: 108,
    unit: "víctimas",
    since: "1959",
    detail: "Homenaje anual desde 2014 a las víctimas de las razias de septiembre de 1959.",
  },
  {
    label: "Financiadores internacionales",
    value: 4,
    unit: "organizaciones",
    since: "2009",
    detail: "amfAR, UNAIDS, Global Fund, AHF.",
  },
];

export function getImpactValue(label: string): ImpactMetric | undefined {
  return IMPACT_METRICS.find((m) => m.label === label);
}
