class LCG {
  private state: number
  constructor(seed: number) {
    this.state = seed
  }
  next(): number {
    this.state = (this.state * 1664525 + 1013904223) >>> 0
    return this.state / 0x100000000
  }
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min
  }
  pick<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)]
  }
  uuid(): string {
    const bytes = new Uint8Array(16)
    for (let i = 0; i < 16; i++) {
      bytes[i] = this.nextInt(0, 255)
    }
    const toHex = (b: number) => b.toString(16).padStart(2, "0")
    return [
      Array.from(bytes.slice(0, 4)).map(toHex).join(""),
      Array.from(bytes.slice(4, 6)).map(toHex).join(""),
      Array.from(bytes.slice(6, 8)).map(toHex).join(""),
      Array.from(bytes.slice(8, 10)).map(toHex).join(""),
      Array.from(bytes.slice(10, 16)).map(toHex).join(""),
    ].join("-")
  }
}

let _seed = 0xdeadbeef
let _counter = 0

export function seededRandom(): LCG {
  _seed = (_seed ^ (_seed << 13)) >>> 0
  _seed = (_seed ^ (_seed >> 17)) >>> 0
  _seed = (_seed ^ (_seed << 5)) >>> 0
  _counter++
  return new LCG((_seed ^ _counter) >>> 0)
}

export function resetSeed(newSeed = 0xdeadbeef): void {
  _seed = newSeed
  _counter = 0
}

let _seqBooking = 0
let _seqGiftCard = 0
let _seqPromotion = 0
let _seqSubscriber = 0
let _seqContact = 0
let _seqClient = 0

const NAMES = ["Ana", "Carlos", "Maria", "Juan", "Lucia", "Pedro", "Sofia", "Miguel", "Laura", "Diego"]
const SERVICES = ["Asesoría Fiscal", "Curso de Marketing", "Producto Premium", "Consulta Legal"]

function seq(type: "booking" | "giftcard" | "promotion" | "subscriber" | "contact" | "client"): number {
  switch (type) {
    case "booking": return ++_seqBooking
    case "giftcard": return ++_seqGiftCard
    case "promotion": return ++_seqPromotion
    case "subscriber": return ++_seqSubscriber
    case "contact": return ++_seqContact
    case "client": return ++_seqClient
  }
}

interface Booking {
  id: string
  client_name: string
  phone: string
  service: string
  preferred_date?: string | null
  notes?: string | null
  source?: string
  status?: string
  created_at?: string
  updated_at?: string
  metadata?: Record<string, unknown>
}

interface GiftCard {
  id: string
  token: string
  amount: number
  balance: number
  recipient_name?: string | null
  recipient_email?: string | null
  status: "active" | "redeemed" | "cancelled"
  created_at: string
  updated_at: string
}

interface Promotion {
  id: string
  title: string
  subtitle?: string | null
  badge?: string | null
  description?: string | null
  wa_message?: string | null
  is_active?: boolean
  expires_at?: string | null
  color?: string
  sort_order?: number
  created_at?: string
  updated_at?: string
}

interface Subscriber {
  email: string
  name?: string | null
  lang?: string
  created_at?: string
}

interface Contact {
  email: string
  name?: string | null
  message?: string | null
  source?: string
  created_at?: string
}

interface Client {
  id: string
  phone: string
  name: string
  visits: number
  tier: string
  points?: number
  email?: string | null
}

export function makeBooking(overrides?: Partial<Booking>): Booking {
  const n = seq("booking")
  return {
    id: `booking-${n}`,
    client_name: `${NAMES[n % NAMES.length]} ${n}`,
    phone: `595981${String(1000 + n).padStart(4, "0")}`,
    service: SERVICES[n % SERVICES.length],
    preferred_date: n % 2 === 0 ? `2026-0${(n % 9) + 1}-${10 + (n % 5)}` : null,
    notes: n % 3 === 0 ? `Notas de prueba ${n}` : null,
    source: "website",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

export function makeGiftCard(overrides?: Partial<GiftCard>): GiftCard {
  const n = seq("giftcard")
  const amount = overrides?.amount ?? (n * 10000)
  return {
    id: `gc-${n}`,
    token: `token-${n}-${seededRandom().uuid()}`,
    amount,
    balance: amount,
    recipient_name: n % 2 === 0 ? `Destinatario ${n}` : null,
    recipient_email: n % 3 === 0 ? `destinatario${n}@test.com` : null,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

export function makePromotion(overrides?: Partial<Promotion>): Promotion {
  const n = seq("promotion")
  return {
    id: `promo-${n}`,
    title: `Promoción ${n}`,
    subtitle: n % 2 === 0 ? `Subtítulo ${n}` : null,
    badge: n % 3 === 0 ? "Nuevo" : null,
    description: `Descripción de promoción ${n}`,
    wa_message: `¡Aprovecha la promoción ${n}!`,
    is_active: true,
    expires_at: `2026-12-31T23:59:59.000Z`,
    color: "rose",
    sort_order: n,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

export function makeSubscriber(overrides?: Partial<Subscriber>): Subscriber {
  const n = seq("subscriber")
  return {
    email: `usuario${n}@test.com`,
    name: `${NAMES[n % NAMES.length]}`,
    lang: "es",
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

export function makeContact(overrides?: Partial<Contact>): Contact {
  const n = seq("contact")
  return {
    email: `contacto${n}@test.com`,
    name: `${NAMES[n % NAMES.length]}`,
    message: `Mensaje de prueba ${n}`,
    source: "website",
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

export function makeClient(overrides?: Partial<Client>): Client {
  const n = seq("client")
  const points = (n * 15) % 300
  let tier = "bronce"
  if (points >= 200) tier = "oro"
  else if (points >= 80) tier = "plata"
  return {
    id: `client-${n}`,
    phone: `595981${String(2000 + n).padStart(4, "0")}`,
    name: `${NAMES[n % NAMES.length]} ${n}`,
    visits: n,
    tier,
    points,
    ...overrides,
  }
}