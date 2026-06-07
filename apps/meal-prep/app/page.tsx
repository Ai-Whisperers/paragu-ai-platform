"use client";

import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PLANES = [
  {
    nombre: "Individual",
    precio: "400.000",
    periodo: "Gs/semana",
    descripcion: "Para uno. Tu heladera ordenada, porcionada y lista para cocinar.",
    incluye: [
      "Lista personalizada semanal",
      "Compramos en Abasto + feria",
      "Lavado + corte + porcionado",
      "Organización en tuppers",
      "Cadena de frío garantizada",
    ],
    populares: false,
    color: "forest",
  },
  {
    nombre: "Pareja",
    precio: "650.000",
    periodo: "Gs/semana",
    descripcion: "Para dos. Cocinar juntos sin el caos de la planificación.",
    incluye: [
      "Lista coordinada para dos",
      "Compramos en Abasto + feria",
      "Lavado + corte + porcionado",
      "Organización en tuppers",
      "Recetas adaptadas a两人的 gustos",
    ],
    populares: true,
    color: "terracotta",
  },
  {
    nombre: "Familia",
    precio: "900.000",
    periodo: "Gs/semana",
    descripcion: "Para 3-4 personas. La semana organizada desde la heladera.",
    incluye: [
      "Lista familiar semanal",
      "Compramos en Abasto + feria",
      "Whole-animal cuando conviene",
      "Lavado + corte + porcionado",
      "Organización por zonas (carne, veggie, etc.)",
    ],
    populares: false,
    color: "forest",
  },
];

const PASOS = [
  {
    numero: "01",
    titulo: "Mandás tu lista",
    descripcion:
      "Nos decís qué les gusta comer, restricciones, favoritos de la semana. Adaptamos la lista a tu presupuesto.",
    icono: "📋",
  },
  {
    numero: "02",
    titulo: "Compramos por vos",
    descripcion:
      "Vamos al Abasto y feria de San Lorenzo. Seleccionamos frescura, negociamos precio, descartamos lo que no sirve.",
    icono: "🛒",
  },
  {
    numero: "03",
    titulo: "Preparamos todo",
    descripcion:
      "Lavamos, cortamos, porcionamos y organizamos en tuppers. Cada cosa en su lugar, identificada con fecha.",
    icono: "🔪",
  },
  {
    numero: "04",
    titulo: "Te lo entregamos",
    descripcion:
      "Delivery en San Lorenzo con caja térmica. Tu heladera llega ordenada, tus porciones listas para cocinar.",
    icono: "📦",
  },
];

const FAQS = [
  {
    pregunta: "¿Qué es el mise-en-place semanal?",
    respuesta:
      "Es el sistema profesional de cocina donde todo está preparado antes de cocinar. Nosotros hacemos ese trabajo pesado: lavar, cortar y porcionar tus ingredientes para que vos solo cocines.",
  },
  {
    pregunta: "¿Qué incluye exactamente?",
    respuesta:
      "Compramos en Abasto y feria, lavamos todo, cortamos verduras, porcionamos carnes, organizamos en tuppers con etiquetas de fecha. Queda todo en tu heladera listo para cocinar.",
  },
  {
    pregunta: "¿Tengo que seguir tus recetas?",
    respuesta:
      "No. Nos das tus listas de compras y favoritos. Nosotros solo preparamos los ingredientes. Cocinás como siempre, solo que sin el trabajo previo.",
  },
  {
    pregunta: "¿Qué pasa si no me gusta algún ingrediente?",
    respuesta:
      "Tu perfil alimentario está registrado desde el inicio. Tomamos nota de todo lo que no va, y siempre verificamos la lista antes de comprar.",
  },
  {
    pregunta: "¿Qué pasa si no estoy en casa el día de entrega?",
    respuesta:
      "Coordinamos un horario que te sirva. Si no hay nadie, podemos dejar en coolers con hielo o coordinar otra ventana.",
  },
  {
    pregunta: "¿Hasta dónde llegan con delivery?",
    respuesta:
      "Por ahora cubrimos San Lorenzo y zonas cercanas de Asunción. Preguntanos si estás en otra zona.",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "#faf7f2" : "transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? 64 : 80,
          transition: "height 0.3s ease",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: "#2d5a3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🥗
          </div>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 22,
              fontWeight: 700,
              color: "#2d5a3d",
              letterSpacing: "-0.5px",
            }}
          >
            Prep
          </span>
          <span
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 12,
              color: "#6b6b6b",
              borderLeft: "1px solid #e8e4dc",
              paddingLeft: 10,
              marginLeft: 4,
            }}
          >
            De Abasto a Casa
          </span>
        </div>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
          className="hide-mobile"
        >
          {["Cómo funciona", "Planes", "Calculadora", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              style={{
                fontFamily: "var(--font-lato)",
                fontSize: 14,
                fontWeight: 400,
                color: "#2a2a2a",
                textDecoration: "none",
                letterSpacing: "0.3px",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contacto"
            style={{
              backgroundColor: "#2d5a3d",
              color: "#faf7f2",
              padding: "10px 22px",
              borderRadius: 8,
              fontFamily: "var(--font-lato)",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.3px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#3d7a52")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#2d5a3d")
            }
          >
            Escribir por WhatsApp
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            fontSize: 24,
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            backgroundColor: "#faf7f2",
            borderTop: "1px solid #e8e4dc",
            padding: "16px 24px 24px",
          }}
          className="show-mobile"
        >
          {["Cómo funciona", "Planes", "Calculadora", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontFamily: "var(--font-lato)",
                fontSize: 16,
                color: "#2a2a2a",
                textDecoration: "none",
                borderBottom: "1px solid #e8e4dc",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contacto"
            style={{
              display: "block",
              marginTop: 16,
              backgroundColor: "#2d5a3d",
              color: "#faf7f2",
              padding: "12px 22px",
              borderRadius: 8,
              fontFamily: "var(--font-lato)",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Escribir por WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#faf7f2",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          backgroundColor: "#e8f0e9",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          backgroundColor: "#f5ede4",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Text */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#e8f0e9",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 28,
              opacity: 0,
              animation: "fadeInUp 0.6s ease-out 0.1s forwards",
            }}
          >
            <span style={{ fontSize: 14, color: "#2d5a3d" }}>
              🔥 Nivel más elegido por clientes
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 700,
              color: "#2a2a2a",
              lineHeight: 1.1,
              marginBottom: 24,
              opacity: 0,
              animation: "fadeInUp 0.7s ease-out 0.2s forwards",
            }}
          >
            Tu semana,{" "}
            <span style={{ color: "#2d5a3d" }}>organizada</span>
            <br />
            desde la heladera
          </h1>

          <p
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 18,
              color: "#6b6b6b",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 440,
              opacity: 0,
              animation: "fadeInUp 0.7s ease-out 0.35s forwards",
            }}
          >
            Compramos, lavamos, cortamos y organizamos tus ingredientes para
            toda la semana. Vos cocinás. Nosotros hacemos el trabajo pesado.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeInUp 0.7s ease-out 0.5s forwards",
            }}
          >
            <a
              href="#planes"
              style={{
                backgroundColor: "#2d5a3d",
                color: "#faf7f2",
                padding: "14px 32px",
                borderRadius: 10,
                fontFamily: "var(--font-lato)",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.3px",
                boxShadow: "0 4px 20px rgba(45, 90, 61, 0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#3d7a52";
                (e.target as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#2d5a3d";
                (e.target as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Ver planes →
            </a>
            <a
              href="#como-funciona"
              style={{
                backgroundColor: "transparent",
                color: "#2d5a3d",
                padding: "14px 32px",
                borderRadius: 10,
                fontFamily: "var(--font-lato)",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                border: "2px solid #2d5a3d",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#e8f0e9";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              ¿Cómo funciona?
            </a>
          </div>

          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 32,
              opacity: 0,
              animation: "fadeInUp 0.7s ease-out 0.6s forwards",
            }}
          >
            {[
              { num: "100+", label: "Clientes activos" },
              { num: "Gs 400K", label: "Desde / semana" },
              { num: "San Lorenzo", label: "Cobertura" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#2d5a3d",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-lato)",
                    fontSize: 12,
                    color: "#6b6b6b",
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div
          style={{
            position: "relative",
            opacity: 0,
            animation: "fadeInUp 0.9s ease-out 0.4s forwards",
          }}
          className="hide-mobile"
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: 32,
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              position: "relative",
            }}
          >
            {/* Mock fridge view */}
            <div
              style={{
                backgroundColor: "#faf7f2",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #e8e4dc",
              }}
            >
              {/* Fridge header */}
              <div
                style={{
                  backgroundColor: "#2d5a3d",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-lato)",
                    fontSize: 12,
                    color: "#faf7f2",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  TU HELADERA — SEMANA DEL 13 MAY
                </span>
                <span style={{ fontSize: 16 }}>✅</span>
              </div>

              {/* Tupper grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  padding: 20,
                }}
              >
                {[
                  {
                    label: "Pollo",
                    cant: "4 porciones",
                    color: "#fde8c8",
                    tag: "🥩",
                  },
                  {
                    label: "Verduras",
                    cant: "6 porciones",
                    color: "#d4edda",
                    tag: "🥦",
                  },
                  {
                    label: "Carne molida",
                    cant: "3 porciones",
                    color: "#f8d7da",
                    tag: "🥡",
                  },
                  {
                    label: "Frutas",
                    cant: "5 porciones",
                    color: "#fff3cd",
                    tag: "🍎",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      backgroundColor: item.color,
                      borderRadius: 12,
                      padding: "14px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>
                      {item.tag}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-lato)",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#2a2a2a",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-lato)",
                        fontSize: 10,
                        color: "#6b6b6b",
                        marginTop: 2,
                      }}
                    >
                      {item.cant}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: -20,
                backgroundColor: "#fff",
                borderRadius: 14,
                padding: "12px 16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <span style={{ fontSize: 28 }}>⏱️</span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-lato)",
                    fontSize: 11,
                    color: "#6b6b6b",
                  }}
                >
                  Tiempo salvado
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#2d5a3d",
                  }}
                >
                  ~8 horas/sem
                </div>
              </div>
            </div>

            {/* Delivery badge */}
            <div
              style={{
                position: "absolute",
                top: -16,
                right: -16,
                backgroundColor: "#c4703b",
                borderRadius: 14,
                padding: "10px 16px",
                boxShadow: "0 4px 20px rgba(196,112,59,0.3)",
                color: "#fff",
                fontFamily: "var(--font-lato)",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
                animation: "float 4s ease-in-out 2s infinite",
              }}
            >
              🚚 Entrega incluída
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ComoFunciona() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="como-funciona"
      ref={ref}
      style={{
        padding: "100px 24px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 12,
              fontWeight: 700,
              color: "#c4703b",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Simple y sin drama
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: "#2a2a2a",
              lineHeight: 1.15,
            }}
          >
            Así funciona
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          className="pasos-grid"
        >
          {PASOS.map((paso, i) => (
            <div
              key={paso.numero}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
            >
              <div
                style={{
                  backgroundColor: "#faf7f2",
                  borderRadius: 20,
                  padding: 28,
                  height: "100%",
                  border: "1px solid #e8e4dc",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 24,
                    backgroundColor: "#2d5a3d",
                    color: "#fff",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-lato)",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {paso.numero}
                </div>
                <div style={{ fontSize: 36, marginBottom: 16, marginTop: 8 }}>
                  {paso.icono}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#2a2a2a",
                    marginBottom: 10,
                  }}
                >
                  {paso.titulo}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-lato)",
                    fontSize: 14,
                    color: "#6b6b6b",
                    lineHeight: 1.65,
                  }}
                >
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {PASOS.map((_, i) => (
          <div
            key={i}
            style={{
              display: "none",
            }}
            className={`pasos-arrow-${i}`}
          />
        ))}

        <style>{`
          @media (max-width: 900px) {
            .pasos-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 500px) {
            .pasos-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function Planes() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="planes"
      ref={ref}
      style={{
        padding: "100px 24px",
        backgroundColor: "#faf7f2",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 12,
              fontWeight: 700,
              color: "#c4703b",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Precios claros
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: "#2a2a2a",
              lineHeight: 1.15,
            }}
          >
            Elegí tu plan semanal
          </h2>
          <p
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 16,
              color: "#6b6b6b",
              marginTop: 12,
              maxWidth: 480,
              margin: "12px auto 0",
            }}
          >
            Sin contratos. Sin permanencia. Evaluás cada semana si seguís o no.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="planes-grid"
        >
          {PLANES.map((plan, i) => (
            <div
              key={plan.nombre}
              style={{
                backgroundColor: "#fff",
                borderRadius: 24,
                padding: 32,
                border: plan.populares
                  ? "2px solid #c4703b"
                  : "1px solid #e8e4dc",
                boxShadow: plan.populares
                  ? "0 8px 40px rgba(196,112,59,0.15)"
                  : "0 2px 16px rgba(0,0,0,0.04)",
                position: "relative",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
            >
              {plan.populares && (
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#c4703b",
                    color: "#fff",
                    padding: "4px 20px",
                    borderRadius: 999,
                    fontFamily: "var(--font-lato)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  ⭐ MÁS ELEGIDO
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#2a2a2a",
                  }}
                >
                  {plan.nombre}
                </h3>
                <div
                  style={{
                    backgroundColor: plan.populares ? "#fde8c8" : "#e8f0e9",
                    borderRadius: 8,
                    padding: "4px 10px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-lato)",
                      fontSize: 11,
                      color: plan.populares ? "#c4703b" : "#2d5a3d",
                      fontWeight: 700,
                    }}
                  >
                    {plan.populares ? "Popular" : "Basic"}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#2d5a3d",
                  }}
                >
                  {plan.precio}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-lato)",
                    fontSize: 14,
                    color: "#6b6b6b",
                    marginLeft: 4,
                  }}
                >
                  {plan.periodo}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-lato)",
                  fontSize: 14,
                  color: "#6b6b6b",
                  lineHeight: 1.6,
                  marginBottom: 24,
                  minHeight: 48,
                }}
              >
                {plan.descripcion}
              </p>

              <div
                style={{
                  borderTop: "1px solid #e8e4dc",
                  paddingTop: 20,
                  marginBottom: 24,
                }}
              >
                {plan.incluye.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ color: "#2d5a3d", fontSize: 16, marginTop: 1 }}>
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-lato)",
                        fontSize: 13,
                        color: "#2a2a2a",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/595981234567?text=Hola%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(
                  plan.nombre
                )}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  backgroundColor: plan.populares ? "#c4703b" : "#2d5a3d",
                  color: "#fff",
                  padding: "14px 24px",
                  borderRadius: 10,
                  fontFamily: "var(--font-lato)",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.3px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.opacity = "0.85";
                  (e.target as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.opacity = "1";
                  (e.target as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Elegir {plan.nombre} →
              </a>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-lato)",
            fontSize: 13,
            color: "#6b6b6b",
            marginTop: 28,
          }}
        >
          ¿Necesitás un plan a medida?{" "}
          <a
            href="#contacto"
            style={{ color: "#2d5a3d", fontWeight: 700 }}
          >
            Escribinos por WhatsApp
          </a>{" "}
          y lo armamos juntos.
        </p>

        <style>{`
          @media (max-width: 900px) {
            .planes-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
          }
        `}</style>
      </div>
    </section>
  );
}

function Calculadora() {
  const [gasto, setGasto] = useState(600000);
  const [tiempo, setTiempo] = useState(60);
  const [valorHora, setValorHora] = useState(25000);
  const [personas, setPersonas] = useState(2);
  const [plan, setPlan] = useState(400000);

  const PLANES_OPCIONES = [
    { label: "Individual", value: 400000 },
    { label: "Pareja", value: 650000 },
    { label: "Familia", value: 900000 },
  ];

  const gastoTiempo = tiempo * valorHora;
  const totalHoy = gasto + gastoTiempo;
  const ahorro = totalHoy - plan;
  const ahorraMas = ahorro > 0;

  const fmt = (n: number) =>
    n.toLocaleString("es-PY", { maximumFractionDigits: 0 });

  const text = `Hola! Usé la calculadora de Prep y:\n` +
    `• Gasto actual aprox: Gs. ${fmt(totalHoy)}/mes\n` +
    `• Plan elegido: ${PLANES_OPCIONES.find((p) => p.value === plan)?.label}\n` +
    `• Ahorro potencial: Gs. ${fmt(Math.abs(ahorro))}/mes\n\n` +
    `¿Podemos coordinar?`;

  return (
    <section
      id="calculadora"
      style={{
        padding: "100px 24px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 12,
              fontWeight: 700,
              color: "#c4703b",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ¿Te conviene?
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: "#2a2a2a",
              lineHeight: 1.15,
            }}
          >
            Calculá tu ahorro
          </h2>
        </div>

        <div
          style={{
            backgroundColor: "#faf7f2",
            borderRadius: 28,
            padding: "clamp(24px, 5vw, 48px)",
            border: "1px solid #e8e4dc",
          }}
          className="calc-grid"
        >
          {/* Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 20,
                fontWeight: 700,
                color: "#2a2a2a",
                marginBottom: 4,
              }}
            >
              Lo que gastás hoy (por mes)
            </h3>

            {[
              {
                label: "Super + carnicería + feria",
                value: gasto,
                set: setGasto,
                max: 2000000,
                step: 50000,
              },
              {
                label: "Valor de tu hora",
                value: valorHora,
                set: setValorHora,
                max: 100000,
                step: 5000,
              },
              {
                label: "Horas/mes en comprar + cocinar",
                value: tiempo,
                set: setTiempo,
                max: 150,
                step: 5,
                suffix: " hs",
              },
              {
                label: "Personas en el hogar",
                value: personas,
                set: setPersonas,
                max: 8,
                step: 1,
              },
            ].map((input) => (
              <div key={input.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <label
                    style={{
                      fontFamily: "var(--font-lato)",
                      fontSize: 13,
                      color: "#2a2a2a",
                      fontWeight: 400,
                    }}
                  >
                    {input.label}
                  </label>
                  <span
                    style={{
                      fontFamily: "var(--font-lato)",
                      fontSize: 13,
                      color: "#2d5a3d",
                      fontWeight: 700,
                    }}
                  >
                    {input.step >= 1000
                      ? `Gs. ${fmt(input.value)}`
                      : `${input.value}${input.suffix || ""}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={input.max}
                  step={input.step}
                  value={input.value}
                  onChange={(e) => input.set(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "#2d5a3d",
                    height: 4,
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <label
                  style={{
                    fontFamily: "var(--font-lato)",
                    fontSize: 13,
                    color: "#2a2a2a",
                  }}
                >
                  Plan a comparar
                </label>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {PLANES_OPCIONES.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPlan(p.value)}
                    style={{
                      flex: 1,
                      minWidth: 80,
                      padding: "10px 8px",
                      borderRadius: 10,
                      border: plan === p.value
                        ? "2px solid #2d5a3d"
                        : "2px solid #e8e4dc",
                      backgroundColor: plan === p.value ? "#e8f0e9" : "#fff",
                      fontFamily: "var(--font-lato)",
                      fontSize: 13,
                      fontWeight: 700,
                      color: plan === p.value ? "#2d5a3d" : "#6b6b6b",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {p.label}
                    <br />
                    <span style={{ fontSize: 11, fontWeight: 400 }}>
                      Gs. {fmt(p.value)}/mes
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 28,
                border: "1px solid #e8e4dc",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#2a2a2a",
                  marginBottom: 20,
                }}
              >
                Tu balance mensual
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#faf7f2",
                    borderRadius: 12,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-lato)",
                      fontSize: 11,
                      color: "#6b6b6b",
                      marginBottom: 4,
                    }}
                  >
                    Lo que gastás hoy
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#2a2a2a",
                    }}
                  >
                    Gs. {fmt(totalHoy)}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#faf7f2",
                    borderRadius: 12,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-lato)",
                      fontSize: 11,
                      color: "#6b6b6b",
                      marginBottom: 4,
                    }}
                  >
                    Nuestro plan ({PLANES_OPCIONES.find((p) => p.value === plan)?.label})
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#2d5a3d",
                    }}
                  >
                    Gs. {fmt(plan)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: 14,
                  padding: "16px 20px",
                  backgroundColor: ahorraMas ? "#e8f0e9" : "#fff3cd",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                {ahorraMas ? (
                  <>
                    <div
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#2d5a3d",
                      }}
                    >
                      Gs. {fmt(ahorro)}/mes
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-lato)",
                        fontSize: 13,
                        color: "#2d5a3d",
                        marginTop: 4,
                      }}
                    >
                      ⬆ Es lo que ahorrás con Prep
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#856404",
                      }}
                    >
                      Ya sos muy eficiente
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-lato)",
                        fontSize: 13,
                        color: "#856404",
                        marginTop: 4,
                      }}
                    >
                      Igual te conviene probar — el tiempo salvado tiene valor
                    </div>
                  </>
                )}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-lato)",
                  fontSize: 12,
                  color: "#6b6b6b",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                <strong>Desglose:</strong> Gasto directo{" "}
                <strong>Gs. {fmt(gasto)}</strong> + Valor del tiempo{" "}
                <strong>Gs. {fmt(gastoTiempo)}</strong> ({tiempo}h × Gs.{" "}
                {fmt(valorHora)}/h)
              </div>

              <a
                href={`https://wa.me/595981234567?text=${encodeURIComponent(text)}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  backgroundColor: "#2d5a3d",
                  color: "#fff",
                  padding: "14px 24px",
                  borderRadius: 10,
                  fontFamily: "var(--font-lato)",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.backgroundColor = "#3d7a52")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.backgroundColor = "#2d5a3d")
                }
              >
                {ahorraMas ? "¡Quiero ahorrar!" : "Igual quiero probar →"}
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 700px) {
            .calc-grid { display: flex !important; flex-direction: column !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        padding: "100px 24px",
        backgroundColor: "#faf7f2",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 12,
              fontWeight: 700,
              color: "#c4703b",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Resolvé tus dudas
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: "#2a2a2a",
              lineHeight: 1.15,
            }}
          >
            Preguntas frecuentes
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                border: "1px solid #e8e4dc",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-lato)",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#2a2a2a",
                    paddingRight: 16,
                  }}
                >
                  {faq.pregunta}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    color: "#2d5a3d",
                    transition: "transform 0.3s",
                    transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <div
                  style={{
                    padding: "0 24px 20px",
                    fontFamily: "var(--font-lato)",
                    fontSize: 14,
                    color: "#6b6b6b",
                    lineHeight: 1.7,
                    borderTop: "1px solid #e8e4dc",
                    paddingTop: 16,
                  }}
                >
                  {faq.respuesta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacto() {
  return (
    <section
      id="contacto"
      style={{
        padding: "100px 24px",
        backgroundColor: "#2d5a3d",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 24 }}>💬</div>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700,
            color: "#faf7f2",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Empezá esta semana
        </h2>
        <p
          style={{
            fontFamily: "var(--font-lato)",
            fontSize: 18,
            color: "rgba(250,247,242,0.75)",
            marginBottom: 40,
            lineHeight: 1.65,
          }}
        >
          Escribinos por WhatsApp. Te tomamos la lista, coordinamos la entrega
          y arrancás sin compromiso.
        </p>

        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 16,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 20,
            padding: "32px 48px",
            border: "1px solid rgba(255,255,255,0.15)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 20 }}>📍</span>
            <span
              style={{
                fontFamily: "var(--font-lato)",
                fontSize: 15,
                color: "#faf7f2",
              }}
            >
              San Lorenzo — Delivery en zona
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 20 }}>🛒</span>
            <span
              style={{
                fontFamily: "var(--font-lato)",
                fontSize: 15,
                color: "#faf7f2",
              }}
            >
              Compras: martes y viernes
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 20 }}>⏰</span>
            <span
              style={{
                fontFamily: "var(--font-lato)",
                fontSize: 15,
                color: "#faf7f2",
              }}
            >
              Respondemos en menos de 2 horas
            </span>
          </div>
        </div>

        <a
          href="https://wa.me/595981234567?text=Hola!%20Quiero%20empezar%20con%20Prep.%20¿Podemos%20coordinar%3F"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#25D366",
            color: "#fff",
            padding: "18px 40px",
            borderRadius: 14,
            fontFamily: "var(--font-lato)",
            fontSize: 17,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.3px",
            boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = "translateY(-3px)";
            (e.target as HTMLElement).style.boxShadow =
              "0 8px 32px rgba(37,211,102,0.45)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = "translateY(0)";
            (e.target as HTMLElement).style.boxShadow =
              "0 4px 24px rgba(37,211,102,0.35)";
          }}
        >
          <span style={{ fontSize: 24 }}>💬</span>
          Escribir por WhatsApp →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        padding: "40px 24px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: "#2d5a3d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              🥗
            </div>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 18,
                fontWeight: 700,
                color: "#faf7f2",
              }}
            >
              Prep
            </span>
            <span
              style={{
                fontFamily: "var(--font-lato)",
                fontSize: 11,
                color: "rgba(250,247,242,0.4)",
                borderLeft: "1px solid rgba(250,247,242,0.2)",
                paddingLeft: 10,
                marginLeft: 4,
              }}
            >
              De Abasto a Casa
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: 12,
              color: "rgba(250,247,242,0.4)",
            }}
          >
            © 2026 De Abasto a Casa. San Lorenzo, Paraguay.
          </p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            "Cómo funciona",
            "Planes",
            "Calculadora",
            "FAQ",
          ].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              style={{
                fontFamily: "var(--font-lato)",
                fontSize: 13,
                color: "rgba(250,247,242,0.5)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#faf7f2")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "rgba(250,247,242,0.5)")
              }
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ComoFunciona />
      <Planes />
      <Calculadora />
      <FAQ />
      <Contacto />
      <Footer />
    </main>
  );
}
