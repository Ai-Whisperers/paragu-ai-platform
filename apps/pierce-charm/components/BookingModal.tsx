"use client";

import { useEffect, useState, useCallback } from "react";
import { useCart } from "./CartBar";
import { whatsappUrl } from "@/lib/site-config";
import { CrossInverted, CrescentMoon } from "./ornaments";

const STORAGE_KEY_BOOKING = "pierce_charm_booking_v1";

export interface BookingData {
  name: string;
  phone: string;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:MM
  service: string;     // perforación / consulta / joyería / varios
  notes: string;
  savedAt: number;
}

interface Props {
  phone?: string;
}

const SERVICES = [
  { id: "perforacion", label: "Perforación" },
  { id: "consulta", label: "Consulta previa (10-15 min)" },
  { id: "joyeria", label: "Ver / comprar joyería" },
  { id: "cambio", label: "Cambio de joya / downsizing" },
  { id: "varios", label: "Varios" },
];

function readBooking(): BookingData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_BOOKING);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeBooking(d: BookingData | null) {
  if (typeof window === "undefined") return;
  try {
    if (d) {
      sessionStorage.setItem(STORAGE_KEY_BOOKING, JSON.stringify(d));
    } else {
      sessionStorage.removeItem(STORAGE_KEY_BOOKING);
    }
    window.dispatchEvent(new CustomEvent("pierce-booking:updated", { detail: { booking: d } }));
  } catch {
    // ignore
  }
}

export function useBooking() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setBooking(readBooking());
      setHydrated(true);
    }, 0);
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { booking: BookingData | null } | undefined;
      if (detail) setBooking(detail.booking);
      else setBooking(readBooking());
    };
    window.addEventListener("pierce-booking:updated", onUpdate);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pierce-booking:updated", onUpdate);
    };
  }, []);

  const save = useCallback((d: BookingData) => {
    writeBooking(d);
    setBooking(d);
  }, []);
  const clear = useCallback(() => {
    writeBooking(null);
    setBooking(null);
  }, []);

  return { booking, hydrated, save, clear };
}

/**
 * Modal de reserva: nombre, WhatsApp, fecha, hora, servicio, notas.
 * Combina con el carrito y genera el mensaje completo para WhatsApp.
 */
export function BookingModal({ phone = "595981324569" }: Props) {
  const { items, clear: clearCart } = useCart();
  const { booking, hydrated, save, clear: clearBooking } = useBooking();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [callerPhone, setCallerPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("perforacion");
  const [notes, setNotes] = useState("");

  // Date constraints: today + 60 days, no Sundays
  const [today] = useState(() => new Date().toISOString().split("T")[0]);
  const [maxDate] = useState(() => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);

  // Listen for global open event (so any CTA can launch the modal)
  useEffect(() => {
    if (!hydrated) return;
    const onOpen = () => setOpen(true);
    window.addEventListener("pierce-booking:open", onOpen);
    return () => window.removeEventListener("pierce-booking:open", onOpen);
  }, [hydrated]);

  // Pre-fill from existing booking
  useEffect(() => {
    if (!open || !booking) return;
    const t = setTimeout(() => {
      setName(booking.name);
      setCallerPhone(booking.phone);
      setDate(booking.date);
      setTime(booking.time);
      setService(booking.service);
      setNotes(booking.notes);
    }, 0);
    return () => clearTimeout(t);
  }, [open, booking]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !date || !time) return;

      const saved: BookingData = {
        name: name.trim(),
        phone: callerPhone.trim(),
        date,
        time,
        service,
        notes: notes.trim(),
        savedAt: Date.now(),
      };
      save(saved);

      // Build WhatsApp message
      const grouped = items.reduce<Record<string, { name: string; region: string; price: string; count: number }>>((acc, it) => {
        if (!acc[it.id]) acc[it.id] = { name: it.name, region: it.region, price: it.price, count: 0 };
        acc[it.id].count++;
        return acc;
      }, {});

      const itemsText = Object.values(grouped)
        .map((g) => `• ${g.count > 1 ? `${g.count}× ` : ""}${g.name} (${g.region})${g.price ? ` — ${g.price}` : ""}`)
        .join("\n");

      const serviceLabel = SERVICES.find((s) => s.id === service)?.label || service;

      // Format date as DD/MM
      let dateText = date;
      try {
        const d = new Date(date + "T12:00:00");
        if (!isNaN(d.getTime())) {
          const dd = String(d.getDate()).padStart(2, "0");
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          dateText = `${dd}/${mm}`;
        }
      } catch {
        // keep as-is
      }

      const parts = [
        `Hola! Quiero reservar en Pierce Charm.`,
        ``,
        `Nombre: ${saved.name}`,
        saved.phone ? `Mi WhatsApp: ${saved.phone}` : null,
        `Fecha tentativa: ${dateText} · ${time}`,
        `Servicio: ${serviceLabel}`,
        itemsText ? `\nMi selección:\n${itemsText}` : null,
        saved.notes ? `\nNotas: ${saved.notes}` : null,
        `\n¿Pueden confirmar disponibilidad?`,
      ].filter(Boolean) as string[];

      const message = parts.join("\n");

      // Open WhatsApp
      window.open(whatsappUrl(phone, message), "_blank", "noopener,noreferrer");

      // Clear cart after successful reservation
      if (items.length > 0) clearCart();
      closeModal();
    },
    [name, callerPhone, date, time, service, notes, items, save, phone, clearCart, closeModal]
  );

  if (!hydrated) return null;

  // Available time slots (Luana: L-V 12-20, Sáb 9-15)
  const slots = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  return (
    <>
      {/* Trigger button (visible in CartBar area + as standalone) */}
      {!open && (
        <div
          className="fixed left-3 right-3 md:left-auto md:right-6 md:bottom-6 z-20 pointer-events-auto"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
        >
          <button
            onClick={openModal}
            className="btn-gothic tap w-full md:w-auto justify-center"
            aria-label="Reservar cita"
          >
            <CrescentMoon size={14} className="text-[var(--color-gold)]" />
            {booking ? `Editar reserva · ${booking.date} ${booking.time}` : "Reservar cita"}
          </button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div className="relative w-full md:max-w-lg bg-[var(--color-surface)] border border-[var(--color-gold)] shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="eyebrow text-[var(--color-gold)] mb-1">𓆩 ☆ 𓆪</p>
                <h2 id="booking-title" className="text-[1.3rem] leading-tight">
                  {booking ? "Editar reserva" : "Reservá tu cita"}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] text-xl px-2"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submit} className="px-5 py-5 space-y-4">
              {/* Items en carrito (si hay) */}
              {items.length > 0 && (
                <div className="border border-[var(--color-primary-light)]/40 bg-[var(--color-primary)]/10 px-3 py-2 text-[0.85rem]">
                  <p className="text-[var(--color-gold)] font-[var(--font-display)] uppercase tracking-[0.18em] text-[0.7rem] mb-1">
                    Tu selección
                  </p>
                  <p className="text-[var(--color-foreground)]/90">
                    {items.length} {items.length === 1 ? "pieza" : "piezas"} se {items.length === 1 ? "incluirá" : "incluirán"} en el mensaje
                  </p>
                </div>
              )}

              {/* Nombre */}
              <div>
                <label htmlFor="bk-name" className="block text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-1.5">
                  Nombre <span className="text-[var(--color-gold)]">*</span>
                </label>
                <input
                  id="bk-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cómo te llamamos"
                  className="w-full px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="bk-phone" className="block text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-1.5">
                  Tu WhatsApp <span className="text-[var(--color-muted-foreground)] normal-case tracking-normal text-[0.7rem]">(opcional)</span>
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  value={callerPhone}
                  onChange={(e) => setCallerPhone(e.target.value)}
                  placeholder="0981 123 456"
                  className="w-full px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
              </div>

              {/* Fecha + Hora */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bk-date" className="block text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-1.5">
                    Fecha <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <input
                    id="bk-date"
                    required
                    type="date"
                    min={today}
                    max={maxDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="bk-time" className="block text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-1.5">
                    Hora <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <select
                    id="bk-time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  >
                    <option value="">Elegí…</option>
                    {slots.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-[0.7rem] text-[var(--color-muted-foreground)] -mt-2">
                Lun-Vie 12-20 · Sáb 9-15 · Dom cerrado
              </p>

              {/* Servicio */}
              <div>
                <label htmlFor="bk-service" className="block text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-1.5">
                  Servicio
                </label>
                <select
                  id="bk-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Notas */}
              <div>
                <label htmlFor="bk-notes" className="block text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-1.5">
                  Notas <span className="text-[var(--color-muted-foreground)] normal-case tracking-normal text-[0.7rem]">(opcional)</span>
                </label>
                <textarea
                  id="bk-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alergias, dudas, referencias de joyería, lo que quieras comentarnos…"
                  className="w-full px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
                />
              </div>

              {/* Aviso */}
              <div className="text-[0.75rem] text-[var(--color-muted-foreground)] leading-relaxed border-t border-[var(--color-border)] pt-3">
                Te llevamos al WhatsApp con todo pre-armado. Luana confirma disponibilidad y seña (Gs 50.000 transferible hasta 24h antes).
              </div>

              {/* Submit */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn-gothic tap flex-1 justify-center"
                >
                  <CrossInverted size={12} className="text-[var(--color-gold)]" />
                  {booking ? "Actualizar y enviar" : "Reservar por WhatsApp"}
                </button>
                {booking && (
                  <button
                    type="button"
                    onClick={() => {
                      clearBooking();
                      closeModal();
                    }}
                    className="btn-gothic-outline tap"
                    aria-label="Cancelar reserva guardada"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/** Helper: dispatch a global open event from any CTA */
export function openBooking() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("pierce-booking:open"));
}