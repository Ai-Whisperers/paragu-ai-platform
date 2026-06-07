import { makeBooking, makeSubscriber, makeContact } from "./data-factory"

interface BookingRequest {
  client_name: string
  phone: string
  service: string
  preferred_date?: string
  notes?: string
  source?: string
}

interface GiftCardCheckoutRequest {
  amount: number
  recipientName: string
  recipientEmail: string
  message?: string
}

interface CartRequest {
  items: Array<{ id: string; name: string; qty: number; price: number }>
  customerPhone?: string
}

interface ContactRequest {
  name: string
  email: string
  message: string
  source?: string
}

interface SubscribeRequest {
  email: string
  name?: string
  lang?: string
}

export function makeBookingRequest(overrides?: Partial<BookingRequest>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b = makeBooking(overrides as any)
  return {
    client_name: b.client_name,
    phone: b.phone,
    service: b.service,
    preferred_date: b.preferred_date ?? undefined,
    notes: b.notes ?? undefined,
    source: b.source ?? "website",
  }
}

export function makeGiftCardCheckoutRequest(overrides?: Partial<GiftCardCheckoutRequest>) {
  const n = Math.floor(Math.random() * 1000) + 1
  return {
    amount: 50000,
    recipientName: `Recipient ${n}`,
    recipientEmail: `recipient${n}@test.com`,
    message: `Gift message ${n}`,
    ...overrides,
  }
}

export function makeCartRequest(overrides?: Partial<CartRequest>) {
  return {
    items: [
      { id: "prod-1", name: "Curso de Marketing", qty: 1, price: 150000 },
      { id: "prod-2", name: "Asesoría Fiscal", qty: 1, price: 80000 },
    ],
    customerPhone: "595981000000",
    ...overrides,
  }
}

export function makeContactRequest(overrides?: Partial<ContactRequest>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = makeContact(overrides as any)
  return {
    name: c.name ?? "",
    email: c.email,
    message: c.message ?? "",
    source: c.source ?? "website",
  }
}

export function makeSubscribeRequest(overrides?: Partial<SubscribeRequest>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = makeSubscriber(overrides as any)
  return {
    email: s.email,
    name: s.name ?? undefined,
    lang: s.lang ?? "es",
  }
}