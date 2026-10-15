
import json
import os
import re
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit
from urllib.request import Request, urlopen

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.osint import (
    OSINTSourceResult,
    PhoneSearchRequest,
    PhoneSearchResponse,
    SourceStatus,
)


app = FastAPI(
    title="VÉRTICE OSINT API",
    version="0.5.0",
    description="API para consultar fuentes públicas de información.",
)

# Permite que el frontend local consulte el backend desde el navegador.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

SEARXNG_URL = os.getenv(
    "SEARXNG_URL",
    "http://localhost:8080",
).rstrip("/")

SOCIAL_PLATFORMS = [
    "Facebook",
    "WhatsApp",
    "Telegram",
    "X",
]


def normalize_phone(phone: str, country: str = "CO") -> str:
    """Acepta móviles colombianos y los normaliza a +57XXXXXXXXXX."""
    if country.upper() != "CO":
        raise ValueError(
            "Solo se permiten números móviles de Colombia."
        )

    value = phone.strip()

    if re.fullmatch(r"3\d{9}", value):
        return f"+57{value}"

    if re.fullmatch(r"\+573\d{9}", value):
        return value

    if re.fullmatch(r"573\d{9}", value):
        return f"+{value}"

    raise ValueError(
        "Número inválido. Ingresa un móvil colombiano de 10 dígitos "
        "que comience por 3, o utiliza el formato +573XXXXXXXXX."
    )


def phone_appears_in_text(text: str, phone: str) -> bool:
    """Comprueba la aparición textual, no la identidad del titular."""
    digits = re.sub(r"\D", "", phone)
    local_digits = digits[-10:]

    candidates = re.findall(
        r"(?<!\d)\+?\d[\d\s().-]{5,}\d(?!\d)",
        text,
    )

    for candidate in candidates:
        candidate_digits = re.sub(r"\D", "", candidate)

        if candidate_digits == local_digits:
            return True

        if (
            len(candidate_digits) == 12
            and candidate_digits.startswith("57")
            and candidate_digits[-10:] == local_digits
        ):
            return True

    return False


def classify_web_result(
    item: dict,
    phone: str,
) -> tuple[SourceStatus, str]:
    """Clasifica la relevancia textual del resultado web."""
    title = str(item.get("title") or "Resultado sin título")
    snippet = str(item.get("content") or "")
    url = str(item.get("url") or "")
    text = f"{title}\n{snippet}\n{url}"

    if not phone_appears_in_text(text, phone):
        return (
            SourceStatus.NO_MATCH,
            "El número consultado no aparece claramente "
            "en el título, fragmento o URL.",
        )

    text_lower = text.lower()

    example_indicators = (
        "ejemplo",
        "tutorial",
        "generador",
        "cómo crear",
        "como crear",
        "documentación",
        "developers",
        "api de",
        "test data",
        "sample number",
        "dummy number",
        "placeholder",
    )

    if any(indicator in text_lower for indicator in example_indicators):
        return (
            SourceStatus.UNVERIFIED,
            "El número aparece en contenido que podría ser "
            "un ejemplo o material técnico.",
        )

    return (
        SourceStatus.UNVERIFIED,
        "El número aparece textualmente, pero no se ha "
        "verificado su relación con una persona.",
    )


def normalize_result_url(url: str) -> str:
    """Normaliza URLs para reducir resultados duplicados."""
    url = url.strip()

    try:
        parsed = urlsplit(url)
        scheme = parsed.scheme.lower()
        hostname = (parsed.hostname or "").lower()

        if not scheme or not hostname:
            return url.rstrip("/").lower()

        port = parsed.port

        if port and not (
            (scheme == "http" and port == 80)
            or (scheme == "https" and port == 443)
        ):
            hostname = f"{hostname}:{port}"

        path = parsed.path.rstrip("/") or "/"

        tracking_names = {
            "fbclid",
            "gclid",
            "dclid",
            "msclkid",
            "ref",
            "source",
        }

        query_items = []

        for key, value in parse_qsl(
            parsed.query,
            keep_blank_values=True,
        ):
            key_lower = key.lower()

            if key_lower in tracking_names:
                continue

            if key_lower.startswith("utm_"):
                continue

            query_items.append((key, value))

        query_items.sort()
        query = urlencode(query_items)

        return urlunsplit(
            (scheme, hostname, path, query, "")
        ).lower()

    except (ValueError, TypeError):
        return url.rstrip("/").lower()


def deduplicate_web_results(items: list[dict]) -> list[dict]:
    """Conserva la primera aparición de cada URL normalizada."""
    unique = []
    seen = set()

    for item in items:
        url = str(item.get("url") or "").strip()

        if not url:
            continue

        normalized_url = normalize_result_url(url)

        if normalized_url in seen:
            continue

        seen.add(normalized_url)
        unique.append(item)

    return unique
def search_public_web(phone: str) -> list[dict]:
    """Consulta la web pública con prioridad para Facebook."""
    digits = re.sub(r"\D", "", phone)
    local_digits = digits[-10:]

    queries = [
        f'site:facebook.com "{local_digits}"',
        f'site:facebook.com "{phone}"',
        f'"{local_digits}"',
    ]

    collected_results: list[dict] = []

    for query in queries:
        params = urlencode({
            "q": query,
            "format": "json",
        })

        url = f"{SEARXNG_URL}/search?{params}"

        request = Request(
            url,
            headers={
                "User-Agent": "VerticeOSINT/0.5",
                "Accept": "application/json",
            },
        )

        with urlopen(request, timeout=20) as response:
            payload = json.loads(
                response.read().decode("utf-8")
            )

        raw_results = payload.get("results", [])

        if isinstance(raw_results, list):
            collected_results.extend(
                item
                for item in raw_results
                if isinstance(item, dict)
            )

    return collected_results



@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "vertice-osint-api",
    }


@app.get("/api/osint/sources")
def get_osint_sources():
    """Describe las fuentes disponibles y las pendientes."""
    sources = [
        {
            "source": "Búsqueda web pública",
            "provider": "SearXNG",
            "status": "configured",
        }
    ]

    for platform in SOCIAL_PLATFORMS:
        sources.append({
            "source": platform,
            "provider": platform,
            "status": "unconfigured",
        })

    return {
        "total_sources": len(sources),
        "sources": sources,
    }


@app.post(
    "/api/osint/search",
    response_model=PhoneSearchResponse,
)
def search_phone(
    request: PhoneSearchRequest,
) -> PhoneSearchResponse:
    """Busca apariciones públicas de un móvil colombiano."""
    try:
        normalized_phone = normalize_phone(
            request.phone,
            request.country,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=422,
            detail=str(exc),
        ) from exc

    results: list[OSINTSourceResult] = []
    web_match_count = 0
    web_results: list[dict] = []

    try:
        web_results = deduplicate_web_results(
            search_public_web(normalized_phone)
        )
        for item in web_results:
            title = str(
                item.get("title") or "Resultado sin título"
            )
            snippet = str(item.get("content") or "")
            engine = str(item.get("engine") or "SearXNG")
            evidence_url = str(item.get("url") or "")

            status, relevance_summary = classify_web_result(
                item,
                normalized_phone,
            )

            if status == SourceStatus.NO_MATCH:
                continue

            web_match_count += 1

            results.append(
                OSINTSourceResult(
                    source=f"Búsqueda web ({engine})",
                    status=status,
                    summary=f"{title}. {relevance_summary}",
                    evidence_url=evidence_url or None,
                    evidence=snippet or None,
                )
            )

        if web_results and web_match_count == 0:
            results.append(
                OSINTSourceResult(
                    source="Búsqueda web pública",
                    status=SourceStatus.NO_MATCH,
                    summary=(
                        "La búsqueda se completó, pero no se "
                        "encontraron coincidencias textuales "
                        "relevantes en los resultados obtenidos."
                    ),
                )
            )

    except HTTPError as exc:


        results.append(
            OSINTSourceResult(
                source="Búsqueda web pública",
                status=SourceStatus.ERROR,
                summary=(
                    f"SearXNG devolvió un error HTTP ({exc.code})."
                ),
            )
        )

    except (
        URLError,
        TimeoutError,
        OSError,
        ValueError,
        json.JSONDecodeError,
    ) as exc:
        results.append(
            OSINTSourceResult(
                source="Búsqueda web pública",
                status=SourceStatus.ERROR,
                summary=(
                    "No fue posible completar la consulta web. "
                    f"Tipo de error: {type(exc).__name__}."
                ),
            )
        )

    # Estas plataformas aún no tienen conectores configurados.
    for platform in SOCIAL_PLATFORMS:
        results.append(
            OSINTSourceResult(
                source=platform,
                status=SourceStatus.UNCONFIGURED,
                summary=(
                    "Fuente pendiente de integración. "
                    "No se realizó una consulta directa."
                ),
            )
        )

    total_hits = sum(
        result.status == SourceStatus.HIT
        for result in results
    )

    web_results_found = any(
        result.source.startswith("Búsqueda web")
        and result.status in (
            SourceStatus.HIT,
            SourceStatus.UNVERIFIED,
        )
        for result in results
    )

    web_search_failed = any(
        result.source == "Búsqueda web pública"
        and result.status == SourceStatus.ERROR
        for result in results
    )

    
    if web_search_failed:
        message = (
            "No fue posible completar la búsqueda web. "
            "Revisa la disponibilidad de SearXNG e inténtalo "
            "nuevamente. Las fuentes sociales siguen pendientes "
            "de integración."
        )
    elif web_results_found:
        message = (
            "Consulta finalizada. Se encontraron apariciones "
            "textuales que requieren revisión. Estas coincidencias "
            "no verifican la identidad del propietario."
        )
    elif web_results and web_match_count == 0:
        message = (
            "La búsqueda web devolvió resultados, pero ninguno "
            "presentó una coincidencia textual relevante con "
            "el número consultado."
        )
    else:
        message = (
            "La búsqueda web no devolvió resultados. Esto no "
            "demuestra que el número carezca de presencia pública."
        )

    return PhoneSearchResponse(
        normalized_phone=normalized_phone,
        results=results,
        total_sources=(
            0
            if web_search_failed
            else 1
        ),
        total_hits=total_hits,
        message=message,
    )
