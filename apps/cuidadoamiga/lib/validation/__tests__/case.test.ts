import { describe, it, expect } from 'vitest'
import { CaseSubmissionSchema, CaseEditSchema } from '../case'

describe('CaseSubmissionSchema', () => {
  const validBase = {
    nombre: 'Juan Pérez',
    victima: null,
    fecha: '2024-03-15',
    tipo: 'femicidio' as const,
    pais: 'Argentina',
    ciudad: 'Buenos Aires',
    descripcion: '',
    foto_url: null,
    fuentes: [],
    proceso_judicial: null,
    lat: -34.6037,
    lng: -58.3816,
  }

  it('accepts a valid case', () => {
    expect(CaseSubmissionSchema.safeParse(validBase).success).toBe(true)
  })

  it('strips HTML tags from text fields', () => {
    const r = CaseSubmissionSchema.safeParse({ ...validBase, nombre: '<script>alert(1)</script>Juan' })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.nombre).not.toContain('<script>')
      expect(r.data.nombre).toContain('Juan')
    }
  })

  it('trims whitespace from string fields', () => {
    const r = CaseSubmissionSchema.safeParse({ ...validBase, nombre: '  Juan Pérez  ' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.nombre).toBe('Juan Pérez')
  })

  it('rejects invalid date format', () => {
    expect(CaseSubmissionSchema.safeParse({ ...validBase, fecha: '15/03/2024' }).success).toBe(false)
  })

  it('rejects invalid case type', () => {
    expect(CaseSubmissionSchema.safeParse({ ...validBase, tipo: 'robo' }).success).toBe(false)
  })

  it('rejects out-of-range lat/lng', () => {
    expect(CaseSubmissionSchema.safeParse({ ...validBase, lat: 91 }).success).toBe(false)
    expect(CaseSubmissionSchema.safeParse({ ...validBase, lng: -181 }).success).toBe(false)
  })

  it('filters non-http(s) URLs from fuentes', () => {
    const r = CaseSubmissionSchema.safeParse({ ...validBase, fuentes: ['ftp://example.com', 'not a url'] })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.fuentes).toEqual([])
  })

  it('caps fuentes at 10', () => {
    const many = Array.from({ length: 15 }, (_, i) => `https://example.com/${i}`)
    expect(CaseSubmissionSchema.safeParse({ ...validBase, fuentes: many }).success).toBe(false)
  })

  it('rejects empty nombre and ciudad', () => {
    expect(CaseSubmissionSchema.safeParse({ ...validBase, nombre: '   ' }).success).toBe(false)
    expect(CaseSubmissionSchema.safeParse({ ...validBase, ciudad: '' }).success).toBe(false)
  })

  it('rejects unknown extra fields (strict mode)', () => {
    expect(CaseSubmissionSchema.safeParse({ ...validBase, evil: true }).success).toBe(false)
  })
})

describe('CaseEditSchema', () => {
  const validEdit = {
    nombre: 'Juan',
    fecha: '2024-03-15',
    tipo: 'abuso' as const,
    pais: 'Argentina',
    ciudad: 'Córdoba',
    descripcion: '',
    fuentes: [],
    lat: -31.4,
    lng: -64.2,
    estado: 'aprobado' as const,
  }

  it('requires an estado field', () => {
    expect(CaseEditSchema.safeParse(validEdit).success).toBe(true)
    const { estado: _e, ...withoutEstado } = validEdit
    expect(CaseEditSchema.safeParse(withoutEstado).success).toBe(false)
  })

  it('rejects invalid estado values', () => {
    expect(CaseEditSchema.safeParse({ ...validEdit, estado: 'borrado' }).success).toBe(false)
  })
})
