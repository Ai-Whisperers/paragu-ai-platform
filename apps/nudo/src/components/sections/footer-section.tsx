export default function FooterSection() {
  return (
    <footer className="py-8 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#555] text-sm font-[family-name:var(--font-accent)] italic">
          &ldquo;Nüdo — Hardcore Metal desde Capiatá, Paraguay. Fundada en 2017.&rdquo;
        </p>
        <p className="text-[#555] text-xs">
          &copy; {new Date().getFullYear()} Nüdo. Todos los derechos reservados. Bad Vibes Records.
        </p>
      </div>
    </footer>
  )
}
