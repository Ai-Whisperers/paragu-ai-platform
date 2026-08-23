// EmergencyExit.tsx — trauma-informed UX: botón siempre visible para salir
'use client';

import { X } from 'lucide-react';

export default function EmergencyExit() {
  return (
    <a
      href="https://www.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="emergency-exit no-print"
      aria-label="Salir rápidamente del sitio"
      title="Salir del sitio"
    >
      <X className="inline w-4 h-4 mr-1" aria-hidden="true" />
      Salir
    </a>
  );
}
