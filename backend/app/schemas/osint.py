
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class SourceStatus(str, Enum):
    HIT = "hit"
    NO_MATCH = "no_match"
    RESTRICTED = "restricted"
    ERROR = "error"
    UNCONFIGURED = "unconfigured"
    UNVERIFIED = "unverified"


class PhoneSearchRequest(BaseModel):
    phone: str = Field(
        min_length=7,
        max_length=30,
        description="Número telefónico que se desea investigar",
    )
    country: str = Field(
        default="CO",
        min_length=2,
        max_length=2,
        description="Código ISO del país",
    )


class OSINTSourceResult(BaseModel):
    source: str
    status: SourceStatus
    summary: str
    evidence_url: Optional[str] = None
    evidence: Optional[str] = None
    checked_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class PhoneSearchResponse(BaseModel):
    query_type: str = "phone"
    normalized_phone: str
    results: list[OSINTSourceResult]
    total_sources: int
    total_hits: int
    message: str
