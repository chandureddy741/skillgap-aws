from __future__ import annotations
from app.config.constants import TECHNOLOGIES
from app.prompts.roadmap_prompt import ROADMAP_SYSTEM_PROMPT, build_roadmap_user_prompt
from app.services.fallback_service import build_roadmap
from app.services.groq_service import run_ai


def generate_roadmap(technology: str, completed_topics: list[str], target_role: str | None) -> dict:
    all_topics = TECHNOLOGIES.get(technology, [])
    fallback = build_roadmap(technology, completed_topics, target_role)
    prompt = build_roadmap_user_prompt(technology, completed_topics, all_topics, target_role, [])
    result = run_ai(ROADMAP_SYSTEM_PROMPT, prompt, temperature=0.35, fallback=fallback)
    if not isinstance(result.get("stages"), list) or not result.get("stages"):
        result["stages"] = fallback["stages"]
    return {**fallback, **result}
