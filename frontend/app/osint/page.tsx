
"use client";

import { useState } from "react";
import "./osint.css";

type SearchType = "phone" | "email";

type OSINTResult = {
  source: string;
  status: "hit" | "no_match" | "unverified" | "restricted" | "error" | "unconfigured";
  summary: string;
  evidence_url?: string | null;
  evidence?: string | null;
  checked_at?: string;
};

type SearchResponse = {
  query_type: string;
  normalized_phone: string;
  results: OSINTResult[];
  total_sources: number;
  total_hits: number;
  message: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function normalizeColombianPhone(value: string): string | null {
  const phone = value.trim();

  if (/^3\d{9}$/.test(phone)) {
    return `+57${phone}`;
  }

  if (/^\+573\d{9}$/.test(phone)) {
    return phone;
  }

  if (/^573\d{9}$/.test(phone)) {
    return `+${phone}`;
  }

  return null;
}

export default function Home() {
  const [searchType, setSearchType] = useState<SearchType>("phone");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [lastActivity, setLastActivity] = useState("");

  const phonePreview =
    searchType === "phone" && query.trim()
      ? normalizeColombianPhone(query)
      : null;

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setData(null);

    if (searchType === "email") {
      setError(
        "La búsqueda por correo electrónico todavía no está implementada en el backend."
      );
      return;
    }

    const normalizedPhone = normalizeColombianPhone(query);

    if (!normalizedPhone) {
      setError(
        "Número inválido. Introduce un móvil colombiano de 10 dígitos que comience por 3, o utiliza el formato +573XXXXXXXXX."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/osint/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: normalizedPhone,
          country: "CO",
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof payload.detail === "string"
            ? payload.detail
            : "No fue posible realizar la consulta."
        );
      }

      setData(payload as SearchResponse);
      setSearchCount((count) => count + 1);
      setLastActivity(new Date().toLocaleString("es-CO"));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error de conexión con el backend."
      );
    } finally {
      setLoading(false);
    }
  }

  function changeSearchType(type: SearchType) {
    setSearchType(type);
    setQuery("");
    setData(null);
    setError("");
  }

  function statusLabel(status: OSINTResult["status"]) {
    const labels: Record<OSINTResult["status"], string> = {
      hit: "Coincidencia",
      no_match: "Sin coincidencia",
      unverified: "No verificado",
      restricted: "Acceso restringido",
      error: "Error",
      unconfigured: "No configurada",
    };

    return labels[status];
  }

  return (
    <main className="app-shell osint-app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">CI</div>
          <div>
            <strong>VERTICE</strong>
            <span>INTELLIGENCE</span>
          </div>
        </div>

        <p className="menu-label">PLATAFORMA</p>

        <nav className="navigation">
          <a className="nav-item active" href="#search">
            ⌕ <span>Centro de búsqueda</span>
          </a>
          <a className="nav-item" href="#results">
            ▤ <span>Resultados</span>
          </a>
          <a className="nav-item" href="#sources">
            ◎ <span>Fuentes de información</span>
          </a>
          <a className="nav-item" href="#history">
            ◷ <span>Historial</span>
          </a>
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
          <span>
            Plataforma / <strong>Inicio</strong>
          </span>
          <span className="environment">
            <i /> DESARROLLO
          </span>
        </header>

        <div className="page-container">
          <section className="welcome">
            <span className="eyebrow">INTELIGENCIA DIGITAL</span>
            <h1>Centro de búsqueda</h1>
            <p>
              Centraliza y analiza información de fuentes públicas y
              autorizadas desde un solo lugar.
            </p>
          </section>

          <section className="search-card" id="search">
            <div className="section-heading">
              <div>
                <span className="step-label">01 / CONSULTA</span>
                <h2>Iniciar una búsqueda</h2>
              </div>
              <span className="demo-tag">BÚSQUEDA EN VIVO</span>
            </div>

            <div className="search-tabs">
              <button
                className={
                  searchType === "phone"
                    ? "search-tab selected"
                    : "search-tab"
                }
                onClick={() => changeSearchType("phone")}
                type="button"
              >
                ☎ Número telefónico
              </button>

              <button
                className={
                  searchType === "email"
                    ? "search-tab selected"
                    : "search-tab"
                }
                onClick={() => changeSearchType("email")}
                type="button"
              >
                ✉ Correo electrónico
              </button>
            </div>

            <form onSubmit={handleSearch}>
              <label htmlFor="search-query">
                {searchType === "phone"
                  ? "Número móvil colombiano"
                  : "Correo electrónico"}
              </label>

              <div className="input-row">
                <input
                  id="search-query"
                  type={searchType === "phone" ? "tel" : "email"}
                  inputMode={
                    searchType === "phone" ? "tel" : "email"
                  }
                  autoComplete="off"
                  placeholder={
                    searchType === "phone"
                      ? "+57 300 123 4567"
                      : "usuario@dominio.com"
                  }
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-describedby="phone-help"
                  required
                />

                <button
                  className="search-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Consultando..."
                    : "Iniciar consulta →"}
                </button>
              </div>

              {searchType === "phone" && (
                <p id="phone-help" className="privacy-note">
                  Formato permitido: móvil colombiano de 10 dígitos
                  que comience por 3, con o sin prefijo +57.
                  {query.trim() && (
                    <>
                      {" "}
                      {phonePreview
                        ? `Formato normalizado: ${phonePreview}`
                        : "El formato introducido no es válido."}
                    </>
                  )}
                </p>
              )}

              {error && (
                <div className="osint-feedback osint-error" role="alert">
                  {error}
                </div>
              )}
            </form>

            <p className="privacy-note">
              Solo consulta información pública. Una aparición textual
              no confirma la identidad del propietario del número.
            </p>
          </section>

          <div className="section-heading overview-heading" id="results">
            <div>
              <span className="step-label">02 / ESPACIO DE TRABAJO</span>
              <h2>Panel de inteligencia</h2>
            </div>
            <span className="muted-label">
              {data ? "Consulta completada" : "Esperando consulta"}
            </span>
          </div>

          <section className="overview-grid">
            <article className="metric-card">
              <div className="metric-icon blue">⌕</div>
              <span className="metric-label">Consultas realizadas</span>
              <strong>{searchCount}</strong>
              <small>En esta sesión de pantalla</small>
            </article>

            <article className="metric-card">
              <div className="metric-icon violet">◎</div>
              <span className="metric-label">Fuentes declaradas</span>
              <strong>{data?.total_sources ?? "—"}</strong>
              <small>Incluye fuentes aún no integradas</small>
            </article>

            <article className="metric-card">
              <div className="metric-icon green">◷</div>
              <span className="metric-label">Coincidencias verificadas</span>
              <strong>{data?.total_hits ?? "—"}</strong>
              <small>No equivale al total de menciones</small>
            </article>
          </section>

          {data && (
            <section className="panel-card osint-results">
              <div className="panel-title">
                <h3>Resultados de la consulta</h3>
                <span>{data.results.length.toString().padStart(2, "0")}</span>
              </div>

              <p className="privacy-note">
                Número consultado: {data.normalized_phone}
              </p>

              <p>{data.message}</p>

              {data.results.length === 0 ? (
                <div className="empty-state">
                  <strong>No hay resultados relevantes</strong>
                  <p>
                    La búsqueda no devolvió menciones que cumplan los
                    criterios actuales. Esto no demuestra que no exista
                    información pública.
                  </p>
                </div>
              ) : (
                <div className="osint-result-list">
                  {data.results.map((result, index) => (
                    <article
                      className="osint-result"
                      key={`${result.source}-${result.evidence_url ?? "none"}-${index}`}
                    >
                      <div className="osint-result-header">
                        <strong>{result.source}</strong>
                        <span className={`osint-status status-${result.status}`}>
                          {statusLabel(result.status)}
                        </span>
                      </div>

                      <p>{result.summary}</p>

                      {result.evidence && (
                        <p className="osint-evidence">
                          {result.evidence}
                        </p>
                      )}

                      {result.evidence_url && (
                        <a
                          href={result.evidence_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Abrir fuente original ↗
                        </a>
                      )}

                      {result.checked_at && (
                        <small className="osint-timestamp">
                          Consultado:{" "}
                          {new Date(result.checked_at).toLocaleString("es-CO")}
                        </small>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          <section className="bottom-grid">
            <article className="panel-card" id="sources">
              <div className="panel-title">
                <h3>Fuentes de información</h3>
                <span>{data?.total_sources ?? "—"}</span>
              </div>

              <div className="empty-state">
                <div className="empty-icon">◎</div>
                <strong>
                  {data
                    ? "Fuentes declaradas en la consulta"
                    : "Fuentes pendientes de consulta"}
                </strong>
                <p>
                  La búsqueda web utiliza SearXNG. Las plataformas
                  sociales todavía no tienen conectores directos.
                </p>
              </div>
            </article>

            <article className="panel-card" id="history">
              <div className="panel-title">
                <h3>Actividad reciente</h3>
                <span>{searchCount.toString().padStart(2, "0")}</span>
              </div>

              <div className="empty-state">
                <div className="empty-icon">◷</div>
                <strong>
                  {lastActivity || "Sin actividad en esta sesión"}
                </strong>
                <p>
                  La actividad se conserva solo mientras esta pantalla
                  permanezca abierta. El historial persistente está pendiente.
                </p>
              </div>
            </article>
          </section>

          <footer className="page-footer">
            <span>INTELLIGENCE VERTICE</span>
            <span>Prototipo local · Versión 0.2.0</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
