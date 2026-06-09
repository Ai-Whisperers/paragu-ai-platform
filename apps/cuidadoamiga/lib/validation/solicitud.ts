import { z } from 'zod'

const CountryName = z.string().trim().min(1).max(100)
const SafeString = (max: number) =>
  z
    .string()
    .max(max + 200)
    .transform((s: string) => s.trim().slice(0, max).replace(/<[^>]*>/g, ''))

export const SolicitudSchema = z
  .object({
    nombre: SafeString(120).refine((s: string) => s.length > 0, 'Nombre requerido'),
    mail: z.string().trim().toLowerCase().email('Mail inválido').max(200),
    pais: CountryName,
    organizacion: SafeString(200).optional().nullable(),
    motivo: SafeString(300).refine((s: string) => s.length > 0, 'Motivo requerido'),
    como_se_entero: z.enum(['Redes sociales', 'Organización feminista', 'Me lo compartieron', 'Otro']),
  })
  .strict()

export type SolicitudInput = z.infer<typeof SolicitudSchema>
