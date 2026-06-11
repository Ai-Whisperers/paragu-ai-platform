import raw from "@/content/es.json";

export interface Content {
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  [key: string]: unknown;
}

export default raw as Content;

export interface ProcessStep {
  step: number
  title: string
  description: string
}
