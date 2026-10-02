from __future__ import annotations
from app.prompts.resume_prompt import RESUME_SYSTEM_PROMPT, build_resume_user_prompt
from app.services.fallback_service import build_resume_review
from app.services.groq_service import run_ai


def analyze_resume(resume_text: str, target_role: str | None) -> dict:
    fallback = build_resume_review(resume_text, target_role)
    prompt = build_resume_user_prompt(resume_text, target_role, [])
    result = run_ai(RESUME_SYSTEM_PROMPT, prompt, temperature=0.25, fallback=fallback)
    return {**fallback, **result}
