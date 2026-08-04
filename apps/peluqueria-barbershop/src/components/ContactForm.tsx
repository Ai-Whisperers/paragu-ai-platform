'use client';
/**
 * ContactForm component — used by all 19 ParaguAI lead sites.
 *
 * Submits to https://leads.paragu-ai.com/api/contact
 * Shows success/error states inline.
 */
import { useState } from 'react';

interface ContactFormProps {
  slug: string;
  whatsapp?: string;
  serviceOptions?: string[];
}

export default function ContactForm({ slug, whatsapp, serviceOptions = [] }: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: serviceOptions[0] || '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      setErrorMsg('Por favor decinos tu nombre');
      setStatus('error');
      return;
    }
    if (!form.phone && !form.email) {
      setErrorMsg('Necesitamos tu teléfono o email para contactarte');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      const r = await fetch('https://leads.paragu-ai.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          message: form.message,
          source: 'website_form',
        }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setStatus('ok');
      setForm({ name: '', phone: '', email: '', service: serviceOptions[0] || '', message: '' });
    } catch (e: any) {
      setStatus('error');
      setErrorMsg('No pudimos enviar el mensaje. Por favor escribinos por WhatsApp.');
    }
  };

  const wa = (whatsapp || '').replace(/[^0-9]/g, '');

  return (
    <section
      id="contacto"
      style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: '#AF7AC9', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Contactanos
          </p>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Pedí tu turno o consulta
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 500, margin: '0 auto' }}>
            Completá el formulario y te respondemos en menos de 1 hora. O si preferís, escribinos directo por WhatsApp.
          </p>
        </div>

        {status === 'ok' && (
          <div
            style={{
              background: 'rgba(91, 192, 122, 0.15)',
              border: '1px solid rgba(91, 192, 122, 0.4)',
              borderRadius: 8,
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              color: '#5bc07a',
            }}
          >
            ✓ ¡Recibido! Te responderemos en breve por WhatsApp o email.
          </div>
        )}

        {status === 'error' && errorMsg && (
          <div
            style={{
              background: 'rgba(233, 69, 96, 0.15)',
              border: '1px solid rgba(233, 69, 96, 0.4)',
              borderRadius: 8,
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              color: '#ff8090',
            }}
          >
            ✗ {errorMsg}
          </div>
        )}

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
              Nombre *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 6,
                color: '#fff',
                fontSize: '1rem',
              }}
              placeholder="Tu nombre"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                WhatsApp
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 6,
                  color: '#fff',
                  fontSize: '1rem',
                }}
                placeholder="+595 9XX XXXXXX"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 6,
                  color: '#fff',
                  fontSize: '1rem',
                }}
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {serviceOptions.length > 0 && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                Servicio de interés
              </label>
              <select
                value={form.service}
                onChange={e => update('service', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 6,
                  color: '#fff',
                  fontSize: '1rem',
                }}
              >
                <option value="">— Seleccionar —</option>
                {serviceOptions.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
              Mensaje (opcional)
            </label>
            <textarea
              value={form.message}
              onChange={e => update('message', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 6,
                color: '#fff',
                fontSize: '1rem',
                resize: 'vertical',
              }}
              placeholder="Contanos brevemente qué necesitás..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              background: status === 'sending' ? '#7D60A4' : '#7834C0',
              color: '#fff',
              padding: '0.875rem 1.5rem',
              border: 'none',
              borderRadius: 6,
              fontSize: '1rem',
              fontWeight: 600,
              cursor: status === 'sending' ? 'wait' : 'pointer',
              marginTop: '0.5rem',
            }}
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {wa && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '1rem' }}>
              o escribinos directo por{' '}
              <a
                href={`https://wa.me/${wa}?text=${encodeURIComponent('Hola! Quiero hacer una consulta.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', textDecoration: 'underline' }}
              >
                WhatsApp
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}