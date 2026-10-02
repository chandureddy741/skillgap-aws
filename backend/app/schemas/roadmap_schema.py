from __future__ import annotations
from datetime import datetime
from typing import Any

from pydantic import BaseModel


class RoadmapResponse(BaseModel):
    id: int
    technology: str
    target_role: str | None = None
    content: dict[str, Any]
    created_at: datetime
