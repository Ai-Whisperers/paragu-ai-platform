import { z } from 'zod'

// Single source of truth for the case schema. Used by:
//   - the public submission API (app/api/cases/route.ts)
//   - the moderation edit endpoint (app/api/cases/[id]/route.ts)
//   - client form validation in the report page
//   - tests (lib/validation/__tests__/case.test.ts)

export const CASE_TYPES = ['femicidio', 'abuso', 'acoso'] as const
export const JUDICIAL_STATES = ['en_proceso', 'cerrado'] as const
export const CASE_STATES = ['pendiente', 'aprobado', 'rechazado'] as const

const CountryName = z.string().trim().min(1).max(100)
const DateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida (YYYY-MM-DD)')

const Lat = z.number().min(-90).max(90)
const Lng = z.number().min(-180).max(180)

const SafeUrl = z
  .string()
  .url()
  .max(500)
  .refine(
    (u: string) => {
      try {
        const proto = new URL(u).protocol
        return proto === 'https:' || proto === 'http:'
      } catch {
        return false
      }
    },
    'URL inválida',
  )

const SafeUrlList = z
  .array(z.unknown())
  .transform((arr: unknown[]) =>
    arr
      .map((u: unknown) => {
        if (typeof u !== 'string') return null
        try {
          const url = new URL(u)
          if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
          if (u.length > 500) return null
          return u
        } catch {
          return null
        }
      })
      .filter((u): u is string => u !== null),
  )
  .pipe(z.array(z.string()).max(10, 'Máximo 10 fuentes'))

const SafeString = (max: number) =>
  z
    .string()
    .max(max + 200)
    .transform((s: string) => s.trim().slice(0, max).replace(/<[^>]*>/g, ''))

export const CaseSubmissionSchema = z
  .object({
    nombre: SafeString(200).refine((s: string) => s.length > 0, 'Nombre requerido'),
    victima: SafeString(200).optional().nullable(),
    fecha: DateString,
    tipo: z.enum(CASE_TYPES, { errorMap: () => ({ message: 'Tipo inválido' }) }),
    pais: CountryName,
    ciudad: SafeString(100).refine((s: string) => s.length > 0, 'Ciudad requerida'),
    descripcion: SafeString(2000).optional().default(''),
    foto_url: SafeUrl.optional().nullable(),
    fuentes: SafeUrlList.optional().default([]),
    proceso_judicial: z.enum(JUDICIAL_STATES).optional().nullable(),
    lat: Lat,
    lng: Lng,
  })
  .strict()

export type CaseSubmission = z.infer<typeof CaseSubmissionSchema>

export const CaseEditSchema = CaseSubmissionSchema.extend({
  estado: z.enum(CASE_STATES),
})
export type CaseEdit = z.infer<typeof CaseEditSchema>

export function validationErrorResponse(error: z.ZodError) {
  return {
    status: 400 as const,
    body: {
      error: 'Datos inválidos',
      details: error.flatten().fieldErrors,
    },
  }
}
