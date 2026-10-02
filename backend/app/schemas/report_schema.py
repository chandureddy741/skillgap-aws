from __future__ import annotations
from datetime import datetime
from typing import Any

from pydantic import BaseModel


class ReportResponse(BaseModel):
    id: int
    report_type: str
    title: str | None = None
    content: dict[str, Any]
    score: float | None = None
    created_at: datetime
