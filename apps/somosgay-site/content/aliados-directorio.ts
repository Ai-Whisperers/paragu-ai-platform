// Service catalog of affirming businesses & professionals in Asunción.
// This is a directory of third-party providers, not an endorsement list.
// Entries are added manually with Paloma's vetting.
//
// Only stores businesses that have given explicit consent to be listed.

export interface AllyOrg {
  name: string;
  category: "Clinica" | "Psicologia" | "Legal" | "Estetica" | "Comida" | "Hospedaje" | "Educacion";
  address: string;
  contact?: string;
  notes: string;
  vowels_affirming: boolean;
}

export const ALLY_ORGS: AllyOrg[] = [
  {
    name: "Centro de Salud Mental Qhawana",
    category: "Psicologia",
    address: "Bogado 1234, Asunción",
    contact: "(021) 555-0900",
    notes: "Atención psicológica afirmativa para adolescentes LGBT+.",
    vowels_affirming: true,
  },
  {
    name: "Espacio Diverso · Bufet Jurídico",
    category: "Legal",
    address: "Estrella 567, Asunción",
    contact: "espaciodiverso@protonmail.com",
    notes: "Asesoría legal gratuita en casos de discriminación.",
    vowels_affirming: true,
  },
  {
    name: "Atelier Capilar · Peluquería",
    category: "Estetica",
    address: "Palma 234, Asunción",
    notes: "Peluquería inclusiva — pelucas y styling para mujeres trans.",
    vowels_affirming: true,
  },
];
