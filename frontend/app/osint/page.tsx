"use client";

import { useState } from "react";

export default function Home() {
  const [searchType, setSearchType] = useState<"phone" | "email">("phone");
  const [query, setQuery] = useState("");

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">CI</div>
          <div>
            <strong>COLOMBIA</strong>
            <span>INTELLIGENCE</span>
          </div>
        </div>

        <p className="menu-label">PLATAFORMA</p>

        <nav className="navigation">
          <a className="nav-item active" href="#search">⌕ <span>Centro de búsqueda</span></a>
          <a className="nav-item" href="#results">▤ <span>Resultados</span></a>
          <a className="nav-item" href="#sources">◎ <span>Fuentes de información</span></a>
          <a className="nav-item" href="#history">◷ <span>Historial</span></a>
        </nav>

        <div className="sidebar-status">
          <span className="status-dot" />
          <div>
            <strong>Entorno local</strong>
            <small>Infraestructura activa</small>
          </div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <span>Plataforma / <strong>Inicio</strong></span>
          <span className="environment"><i /> DESARROLLO</span>
        </header>

        <div className="page-container">
          <section className="welcome">
            <span className="eyebrow">INTELIGENCIA DIGITAL · COLOMBIA</span>
            <h1>Centro de búsqueda</h1>
            <p>Centraliza y analiza información de fuentes públicas y autorizadas desde un solo lugar.</p>
          </section>

          <section className="search-card" id="search">
            <div className="section-heading">
              <div>
                <span className="step-label">01 / CONSULTA</span>
                <h2>Iniciar una búsqueda</h2>
              </div>
              <span className="demo-tag">MODO DEMOSTRACIÓN</span>
            </div>

            <div className="search-tabs">
              <button
                className={searchType === "phone" ? "search-tab selected" : "search-tab"}
                onClick={() => { setSearchType("phone"); setQuery(""); }}
                type="button"
              >
                ☎ Número telefónico
              </button>
              <button
                className={searchType === "email" ? "search-tab selected" : "search-tab"}
                onClick={() => { setSearchType("email"); setQuery(""); }}
                type="button"
              >
                ✉ Correo electrónico
              </button>
            </div>

            <form onSubmit={(event) => {
              event.preventDefault();
              alert("La interfaz está lista. Las búsquedas reales se implementarán posteriormente.");
            }}>
              <label htmlFor="search-query">
                {searchType === "phone" ? "Número telefónico" : "Correo electrónico"}
              </label>
              <div className="input-row">
                <input
                  id="search-query"
                  type={searchType === "phone" ? "tel" : "email"}
                  placeholder={searchType === "phone" ? "+57 300 123 4567" : "usuario@dominio.com"}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  required
                />
                <button className="search-button" type="submit">Iniciar consulta →</button>
              </div>
            </form>

            <p className="privacy-note">
              Las consultas reales aún no están habilitadas. Utiliza únicamente información que estés autorizado a consultar.
            </p>
          </section>

          <div className="section-heading overview-heading" id="results">
            <div>
              <span className="step-label">02 / ESPACIO DE TRABAJO</span>
              <h2>Panel de inteligencia</h2>
            </div>
            <span className="muted-label">Sin consultas ejecutadas</span>
          </div>

          <section className="overview-grid">
            <article className="metric-card">
              <div className="metric-icon blue">⌕</div>
              <span className="metric-label">Consultas realizadas</span>
              <strong>—</strong>
              <small>Pendiente de integración</small>
            </article>
            <article className="metric-card">
              <div className="metric-icon violet">◎</div>
              <span className="metric-label">Fuentes conectadas</span>
              <strong>0</strong>
              <small>Sin conectores configurados</small>
            </article>
            <article className="metric-card">
              <div className="metric-icon green">◷</div>
              <span className="metric-label">Última actividad</span>
              <strong className="metric-text">Sin actividad</strong>
              <small>Historial pendiente</small>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel-card" id="sources">
              <div className="panel-title"><h3>Fuentes de información</h3><span>00</span></div>
              <div className="empty-state">
                <div className="empty-icon">◎</div>
                <strong>Sin fuentes configuradas</strong>
                <p>Las fuentes autorizadas aparecerán aquí cuando implementemos la capa de integración.</p>
              </div>
            </article>
            <article className="panel-card" id="history">
              <div className="panel-title"><h3>Actividad reciente</h3><span>00</span></div>
              <div className="empty-state">
                <div className="empty-icon">◷</div>
                <strong>Sin actividad registrada</strong>
                <p>El historial se habilitará cuando implementemos el registro de consultas.</p>
              </div>
            </article>
          </section>

          <footer className="page-footer">
            <span>COLOMBIA INTELLIGENCE</span>
            <span>Prototipo local · Versión 0.1.0</span>
          </footer>
        </div>
      </section>
    </main>
  );
}