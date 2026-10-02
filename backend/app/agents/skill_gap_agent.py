from __future__ import annotations
from app.config.constants import TECHNOLOGIES
from app.prompts.skill_gap_prompt import SKILL_GAP_SYSTEM_PROMPT, build_skill_gap_user_prompt
from app.services.fallback_service import build_skill_gap
from app.services.groq_service import run_ai


def analyze_skill_gap(technology: str, completed_topics: list[str], target_role: str | None) -> dict:
    all_topics = TECHNOLOGIES.get(technology, [])
    fallback = build_skill_gap(technology, completed_topics, target_role)
    prompt = build_skill_gap_user_prompt(technology, completed_topics, all_topics, target_role, [])
    result = run_ai(SKILL_GAP_SYSTEM_PROMPT, prompt, temperature=0.35, fallback=fallback)
    # Protect the UI from partial model responses.
    return {**fallback, **result}
