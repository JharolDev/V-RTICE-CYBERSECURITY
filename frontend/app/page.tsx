
"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    code: "INT-OSINT",
    title: "OSINT",
    description:
      "Inteligencia de fuentes abiertas, correlación de información y análisis de exposición digital.",
    href: "/osint",
    action: "Acceder a la plataforma",
  },
  {
    number: "02",
    code: "REV-ENG",
    title: "Ingeniería inversa",
    description:
      "Análisis técnico de software, binarios y comportamiento de aplicaciones.",
    href: "#contacto",
    action: "Explorar servicio",
  },
  {
    number: "03",
    code: "OFF-SEC",
    title: "Hacking ético",
    description:
      "Evaluación controlada de sistemas para identificar debilidades de seguridad.",
    href: "#contacto",
    action: "Explorar servicio",
  },
  {
    number: "04",
    code: "APP-SEC",
    title: "Seguridad de aplicaciones web",
    description:
      "Identificación y validación de vulnerabilidades en sitios y aplicaciones.",
    href: "#contacto",
    action: "Explorar servicio",
  },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let offset = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const spacing = 34;
      const columns = Math.ceil(width / spacing);
      const rows = Math.ceil(height / 18);

      context.font = "10px monospace";
      context.textAlign = "center";

      for (let col = 0; col < columns; col++) {
        const x = col * spacing + 10;

        for (let row = 0; row < rows; row++) {
          const y = ((row * 18 + offset * (1 + (col % 3) * 0.2)) %
            (height + 30)) - 15;

          const seed = Math.sin(col * 12.9898 + row * 78.233);
          const active = (row * 7 + col * 13) % 11 === 0;
          const glyph = seed > 0 ? "1" : "0";

          context.fillStyle = active
            ? "rgba(139, 145, 160, 0.20)"
            : "rgba(115, 125, 145, 0.07)";

          context.fillText(glyph, x, y);
        }
      }

      offset += 0.22;
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="vertex-site">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Vértice, inicio">
          <span className="brand-symbol">V</span>
          <span className="brand-name">
            VÉRTICE
            <small>CYBERSECURITY</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#aliados">Aliados</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <a className="header-cta" href="#contacto">
          Hablemos <span>↗</span>
        </a>
      </header>

      <section className="hero" id="inicio">
        <canvas
          ref={canvasRef}
          className="matrix-canvas"
          aria-hidden="true"
        />

        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            INTELIGENCIA DIGITAL / SEGURIDAD
          </p>

          <h1>
            La seguridad
            <br />
            empieza <span>antes.</span>
          </h1>

          <p className="hero-description">
            Anticipamos amenazas, investigamos riesgos y fortalecemos
            la seguridad digital de las organizaciones.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#servicios">
              Explorar capacidades <span>↗</span>
            </a>
            <a className="button-secondary" href="#nosotros">
              Conocer Vértice <span>↓</span>
            </a>
          </div>

          <div className="hero-meta">
            <span>INTELIGENCIA</span>
            <span className="meta-separator" />
            <span>ANÁLISIS</span>
            <span className="meta-separator" />
            <span>PROTECCIÓN</span>
          </div>
        </div>

        <div className="cube-stage" aria-label="Cubo tridimensional animado">
          <div className="cube-glow" />
          <div className="cube-shadow" />
          <div className="cube">
            <div className="cube-face cube-front">
              <span>V.</span>
              <small>VERTEX / 001</small>
            </div>
            <div className="cube-face cube-back" />
            <div className="cube-face cube-right" />
            <div className="cube-face cube-left" />
            <div className="cube-face cube-top" />
            <div className="cube-face cube-bottom" />
          </div>
          <div className="cube-orbit orbit-one" />
          <div className="cube-orbit orbit-two" />
          <span className="cube-coordinate coordinate-one">01 / INT</span>
          <span className="cube-coordinate coordinate-two">SECURE SYSTEMS</span>
        </div>

        <div className="hero-bottom">
          <span>VÉRTICE / DIGITAL SECURITY</span>
          <a href="#nosotros">
            DESPLAZAR PARA DESCUBRIR <span>↓</span>
          </a>
          <span>BOGOTÁ · COLOMBIA</span>
        </div>
      </section>

      <section className="intro-section section-wrap" id="nosotros">
        <div className="section-label">
          <span>01</span> / NOSOTROS
        </div>

        <div className="intro-content">
          <h2>
            Entender el riesgo.
            <br />
            <span>Actuar con precisión.</span>
          </h2>
          <div className="intro-detail">
            <p>
              Vértice es una iniciativa de ciberseguridad e inteligencia
              digital enfocada en comprender la exposición tecnológica,
              identificar debilidades y convertir hallazgos en acciones.
            </p>
            <span className="micro-label">
              ANÁLISIS TÉCNICO · CRITERIO · CONFIANZA
            </span>
          </div>
        </div>
      </section>

      <section className="services-section section-wrap" id="servicios">
        <div className="section-heading">
          <div>
            <div className="section-label">
              <span>02</span> / CAPACIDADES
            </div>
            <h2>Nuestros servicios</h2>
          </div>
          <p>
            Capacidades especializadas para comprender, evaluar
            y fortalecer la seguridad digital.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-topline">
                <span>{service.code}</span>
                <span>{service.number}</span>
              </div>

              <div className="service-icon" aria-hidden="true">
                {service.number === "01" && "⌕"}
                {service.number === "02" && "⟐"}
                {service.number === "03" && "⬡"}
                {service.number === "04" && "⌗"}
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <a href={service.href} className="service-link">
                {service.action} <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="allies-section section-wrap" id="aliados">
        <div className="section-label">
          <span>03</span> / ALIADOS
        </div>
        <div className="allies-content">
          <h2>
            La seguridad se construye
            <br />
            <span>en colaboración.</span>
          </h2>
          <p>
            Un espacio para integrar capacidades, conocimiento y
            colaboración tecnológica con organizaciones especializadas.
          </p>
        </div>
        <a className="text-link" href="#contacto">
          Conversemos sobre alianzas <span>↗</span>
        </a>
      </section>

      <section className="contact-section section-wrap" id="contacto">
        <div className="section-label">
          <span>04</span> / CONTACTO
        </div>
        <p className="eyebrow">EL SIGUIENTE PASO</p>
        <h2>
          Hablemos de
          <br />
          <span>seguridad.</span>
        </h2>
        <p className="contact-description">
          Cuéntanos qué necesitas evaluar, investigar o proteger.
        </p>
        <a
          className="button-primary"
          href="mailto:contacto@verticecybersecurity.com"
        >
          Contactar a Vértice <span>↗</span>
        </a>
        <p className="contact-note">
          Correo provisional: configura el correo corporativo antes de publicar.
        </p>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-symbol">V</span>
          <span className="brand-name">
            VÉRTICE
            <small>CYBERSECURITY</small>
          </span>
        </a>
        <span>ANTICIPAR. INVESTIGAR. PROTEGER.</span>
        <span>© {new Date().getFullYear()} VÉRTICE</span>
      </footer>
    </main>
  );
}
