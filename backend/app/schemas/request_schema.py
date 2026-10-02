from __future__ import annotations
from pydantic import BaseModel, Field


class SkillAnalysisRequest(BaseModel):
    technology: str = Field(..., min_length=1, max_length=120)
    completed_topics: list[str] = Field(default_factory=list)
    target_role: str | None = Field(None, max_length=120)


class RoadmapRequest(BaseModel):
    technology: str = Field(..., min_length=1, max_length=120)
    completed_topics: list[str] = Field(default_factory=list)
    target_role: str | None = Field(None, max_length=120)


class InterviewRequest(BaseModel):
    technology: str = Field(..., min_length=1, max_length=120)
    level: str = Field("Beginner", max_length=40)
    target_role: str | None = Field(None, max_length=120)


class ProjectRequest(BaseModel):
    technology: str = Field(..., min_length=1, max_length=120)
    level: str = Field("Beginner", max_length=40)
    target_role: str | None = Field(None, max_length=120)


class ProfileUpdateRequest(BaseModel):
    full_name: str | None = Field(None, min_length=2, max_length=120)
    college: str | None = Field(None, max_length=200)
    department: str | None = Field(None, max_length=120)
    year: str | None = Field(None, max_length=40)
    learning_goal: str | None = Field(None, max_length=200)


class PasswordChangeRequest(BaseModel):
    current_password: str = Field(..., min_length=6, max_length=128)
    new_password: str = Field(..., min_length=6, max_length=128)
