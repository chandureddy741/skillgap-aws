from __future__ import annotations
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    college: str | None = None
    department: str | None = None
    year: str | None = None
    email: str
    learning_goal: str | None = None
    created_at: datetime


class AnalysisResponse(BaseModel):
    id: int
    technology: str
    target_role: str | None = None
    completed_topics: list[str]
    result: dict[str, Any]
    created_at: datetime


class MessageResponse(BaseModel):
    message: str
