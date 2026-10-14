"use client";

const services = [
  {
    number: "01",
    code: "OSINT / DIGITAL INTELLIGENCE",
    title: "Inteligencia de fuentes abiertas",
    description:
      "Recopilación, análisis y correlación de información procedente de fuentes públicas y autorizadas.",
    tags: ["Open Source Intelligence", "Análisis de información"],
    href: "/osint",
    action: "Explorar plataforma",
    featured: true,
  },
  {
    number: "02",
    code: "REVERSE ENGINEERING",
    title: "Ingeniería inversa",
    description:
      "Análisis técnico de software, binarios y aplicaciones para comprender su funcionamiento e identificar riesgos.",
    tags: ["Análisis de software", "Análisis estático"],
    href: "#contacto",
    action: "Consultar servicio",
    featured: false,
  },
  {
    number: "03",
    code: "OFFENSIVE SECURITY",
    title: "Hacking ético",
    description:
      "Evaluaciones controladas de seguridad para identificar debilidades y fortalecer los sistemas tecnológicos.",
    tags: ["Pruebas autorizadas", "Evaluación de seguridad"],
    href: "#contacto",
    action: "Consultar servicio",
    featured: false,
  },
  {
    number: "04",
    code: "WEB APPLICATION SECURITY",
    title: "Seguridad de aplicaciones web",
    description:
      "Identificación y validación de vulnerabilidades en sitios web y aplicaciones mediante evaluaciones técnicas autorizadas.",
    tags: ["Web Vulnerability Assessment", "Web Pentest"],
    href: "#contacto",
    action: "Consultar servicio",
    featured: false,
  },
];

export default function Home() {
  return (
    <main className="landing">
      <header className="landing-header">
        <a className="landing-brand" href="#inicio" aria-label="Colombia Intelligence, inicio">
          <span className="landing-logo">CI<span>.</span></span>
          <span className="landing-brand-copy">
            <strong>COLOMBIA</strong>
            <small>INTELLIGENCE</small>
          </span>
        </a>

        <nav className="landing-nav" aria-label="Navegación principal">
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#aliados">Aliados</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <a className="header-cta" href="#servicios">
          Explorar servicios <span>↗</span>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-status">
            <span className="status-dot" />
            INTELIGENCIA DIGITAL · CIBERSEGURIDAD
          </div>

          <h1>
            Entender el entorno.
            <br />
            <span>Anticipar el riesgo.</span>
          </h1>

          <p className="hero-description">
            Inteligencia digital y seguridad tecnológica para comprender
            amenazas, identificar vulnerabilidades y tomar mejores decisiones.
          </p>

          <div className="hero-actions">
            <a className="primary-cta" href="#servicios">
              Descubrir servicios <span>→</span>
            </a>
            <a className="secondary-cta" href="#nosotros">
              Conocer la propuesta <span>↘</span>
            </a>
          </div>

          <div className="hero-footnote">
            <span>01 / INTELLIGENCE</span>
            <span>02 / SECURITY</span>
            <span>03 / ANALYSIS</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Visualización conceptual de inteligencia digital">
          <div className="visual-topline">
            <span>INTELLIGENCE SYSTEM</span>
            <span>CI / 001</span>
          </div>

          <div className="orbit orbit-outer" />
          <div className="orbit orbit-middle" />
          <div className="orbit orbit-inner" />

          <div className="visual-cross cross-one" />
          <div className="visual-cross cross-two" />

          <div className="visual-center">
            <div className="visual-center-inner">
              <span>CI</span>
              <small>ANALYSIS</small>
            </div>
          </div>

          <div className="node node-top"><span /></div>
          <div className="node node-right"><span /></div>
          <div className="node node-bottom"><span /></div>
          <div className="node node-left"><span /></div>

          <div className="visual-label label-top">
            <span>01 / DISCOVER</span>
            <strong>Intelligence</strong>
          </div>
          <div className="visual-label label-right">
            <span>02 / ANALYZE</span>
            <strong>Exposure</strong>
          </div>
          <div className="visual-label label-bottom">
            <span>03 / PROTECT</span>
            <strong>Security</strong>
          </div>

          <div className="visual-coordinates">
            <span>COL / DIGITAL</span>
            <span>SYSTEM STATUS: READY</span>
          </div>
        </div>

        <div className="hero-bottomline">
          <span>INFORMACIÓN · CONTEXTO · SEGURIDAD</span>
          <a href="#servicios">DESLIZA PARA EXPLORAR ↓</a>
        </div>
      </section>

      <section className="trust-strip" aria-label="Áreas de especialización">
        <span>ÁREAS DE ESPECIALIZACIÓN</span>
        <div>OPEN SOURCE INTELLIGENCE</div>
        <div>REVERSE ENGINEERING</div>
        <div>OFFENSIVE SECURITY</div>
        <div>WEB APPLICATION SECURITY</div>
      </section>

      <section className="about-section section-light" id="nosotros">
        <div className="section-kicker"><span>01</span> / NOSOTROS</div>

        <div className="about-layout">
          <h2>
            La información es
            <br />
            el inicio. <span>El análisis</span>
            <br />
            es la diferencia.
          </h2>

          <div className="about-copy">
            <p>
              Colombia Intelligence es un concepto de plataforma orientado a
              la inteligencia digital y la ciberseguridad, con servicios
              diseñados para descubrir información relevante, evaluar riesgos
              y comprender la exposición tecnológica.
            </p>
            <p>
              Integramos análisis técnico, investigación y herramientas
              especializadas bajo un enfoque responsable, trazable y basado
              en autorizaciones claras.
            </p>
            <a className="text-link" href="#servicios">
              Conoce nuestras capacidades <span>→</span>
            </a>
          </div>
        </div>

        <div className="principles-grid">
          <article>
            <span>01 /</span>
            <h3>Inteligencia</h3>
            <p>Transformar información disponible en contexto útil para el análisis.</p>
          </article>
          <article>
            <span>02 /</span>
            <h3>Precisión técnica</h3>
            <p>Evaluar sistemas y riesgos mediante metodologías estructuradas.</p>
          </article>
          <article>
            <span>03 /</span>
            <h3>Responsabilidad</h3>
            <p>Trabajar con límites definidos, autorización y respeto por los datos.</p>
          </article>
        </div>
      </section>

      <section className="services-section" id="servicios">
        <div className="section-kicker"><span>02</span> / SERVICIOS</div>

        <div className="services-heading">
          <div>
            <h2>
              Capacidades para
              <br />
              <span>un entorno digital complejo.</span>
            </h2>
          </div>
          <p>
            Servicios especializados para investigar, comprender y evaluar
            entornos digitales. Selecciona una capacidad para conocer su
            alcance.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article
              className={`service-card${service.featured ? " service-featured" : ""}`}
              key={service.number}
            >
              <div className="service-card-top">
                <span>{service.number} / 04</span>
                <span className="service-arrow">↗</span>
              </div>

              <div className="service-graphic" aria-hidden="true">
                {service.number === "01" && (
                  <div className="graphic-osint">
                    <span className="graphic-ring ring-a" />
                    <span className="graphic-ring ring-b" />
                    <span className="graphic-ring ring-c" />
                    <i className="graphic-point point-a" />
                    <i className="graphic-point point-b" />
                    <i className="graphic-point point-c" />
                    <i className="graphic-point point-d" />
                    <span className="graphic-core">CI</span>
                  </div>
                )}
                {service.number === "02" && (
                  <div className="graphic-code">
                    <span>01001001</span>
                    <span>10110100</span>
                    <span>01101010</span>
                    <span>11001001</span>
                  </div>
                )}
                {service.number === "03" && (
                  <div className="graphic-shield"><span>+</span></div>
                )}
                {service.number === "04" && (
                  <div className="graphic-browser">
                    <div><i /><i /><i /></div>
                    <span />
                    <span />
                    <span />
                    <b>!</b>
                  </div>
                )}
              </div>

              <span className="service-code">{service.code}</span>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <div className="service-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>

              <a className="service-link" href={service.href}>
                {service.action} <span>→</span>
              </a>
            </article>
          ))}
        </div>

        <div className="services-disclaimer">
          <span>!</span>
          Las evaluaciones técnicas y pruebas de seguridad se realizan
          exclusivamente sobre activos propios o con autorización expresa
          del titular.
        </div>
      </section>

      <section className="partners-section section-light" id="aliados">
        <div className="section-kicker"><span>03</span> / ALIADOS</div>
        <div className="partners-layout">
          <h2>
            La seguridad
            <br />
            es un trabajo
            <br />
            <span>colaborativo.</span>
          </h2>
          <div className="partners-copy">
            <p>
              Buscamos construir relaciones con profesionales, organizaciones
              y proveedores tecnológicos que compartan una visión responsable
              de la inteligencia digital y la ciberseguridad.
            </p>
            <a className="text-link" href="#contacto">
              Hablemos de colaboración <span>→</span>
            </a>
          </div>
        </div>

        <div className="partner-placeholder">
          <span className="partner-symbol">+</span>
          <div>
            <strong>Red de colaboración</strong>
            <p>Espacio para aliados y socios tecnológicos verificados.</p>
          </div>
          <span className="partner-label">ALIADOS POR DEFINIR</span>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-grid" aria-hidden="true" />
        <div className="section-kicker"><span>04</span> / CONTACTO</div>

        <div className="contact-layout">
          <div>
            <span className="contact-eyebrow">INICIEMOS UNA CONVERSACIÓN</span>
            <h2>
              El siguiente paso
              <br />
              <span>empieza aquí.</span>
            </h2>
            <p>
              ¿Buscas evaluar la seguridad de tus activos, explorar un
              proyecto de inteligencia digital o establecer una alianza?
              Conversemos sobre el alcance y los objetivos.
            </p>
          </div>

          <div className="contact-card">
            <span className="contact-card-label">CONTACTO PROFESIONAL</span>
            <h3>Cuéntanos qué necesitas.</h3>
            <p>
              Escríbenos para conversar sobre servicios, evaluaciones
              autorizadas y oportunidades de colaboración.
            </p>
            <a href="mailto:contacto@colombia-intelligence.com">
              Consultar por correo <span>↗</span>
            </a>
            <small>
              Correo provisional: reemplazar por el canal oficial antes
              de publicar la web.
            </small>
          </div>
        </div>

        <footer className="landing-footer">
          <a className="landing-brand footer-brand" href="#inicio">
            <span className="landing-logo">CI<span>.</span></span>
            <span className="landing-brand-copy">
              <strong>COLOMBIA</strong>
              <small>INTELLIGENCE</small>
            </span>
          </a>

          <span>INTELIGENCIA DIGITAL · CIBERSEGURIDAD</span>
          <a href="#inicio">VOLVER AL INICIO ↑</a>
          <small>© {new Date().getFullYear()} Colombia Intelligence</small>
        </footer>
      </section>
    </main>
  );
}