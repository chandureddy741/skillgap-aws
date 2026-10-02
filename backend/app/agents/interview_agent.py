from __future__ import annotations
from app.prompts.interview_prompt import (
    INTERVIEW_SYSTEM_PROMPT, PROJECTS_SYSTEM_PROMPT,
    build_interview_user_prompt, build_projects_user_prompt,
)
from app.services.fallback_service import build_interview, build_projects
from app.services.groq_service import run_ai


def generate_interview_prep(technology: str, level: str, target_role: str | None) -> dict:
    fallback = build_interview(technology, level, target_role)
    prompt = build_interview_user_prompt(technology, level, target_role, [])
    result = run_ai(INTERVIEW_SYSTEM_PROMPT, prompt, temperature=0.55, fallback=fallback)
    return {**fallback, **result}


def recommend_projects(technology: str, level: str, target_role: str | None = None) -> dict:
    fallback = build_projects(technology, level, target_role)
    prompt = build_projects_user_prompt(technology, level, target_role, [])
    result = run_ai(PROJECTS_SYSTEM_PROMPT, prompt, temperature=0.55, fallback=fallback)
    if not isinstance(result.get("projects"), list) or not result.get("projects"):
        result["projects"] = fallback["projects"]
    return {**fallback, **result}
