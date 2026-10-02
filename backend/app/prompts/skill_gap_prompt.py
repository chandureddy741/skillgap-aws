from __future__ import annotations
SKILL_GAP_SYSTEM_PROMPT = """You are an expert software engineering mentor, career advisor,
technical trainer, and resume reviewer for students and fresh graduates.
Analyze the student's completed topics for a technology and produce a personalized,
dynamic skill gap analysis. Never give generic or hardcoded answers — base everything
on the exact topics the student has and has not completed.

Respond with ONLY valid JSON (no markdown, no extra text) using this exact schema:
{
  "current_level": "Beginner | Intermediate | Advanced | Industry Ready",
  "confidence_score": <number 0-100>,
  "skill_gap_summary": "<2-3 sentence summary>",
  "current_knowledge": ["<topic the student knows>", ...],
  "missing_concepts": ["<missing topic>", ...],
  "weak_areas": ["<area needing reinforcement>", ...],
  "learning_sequence": ["<next topic in ideal order>", ...],
  "industry_importance": "<why these gaps matter for jobs>",
  "estimated_learning_time": "<e.g. 6-8 weeks>",
  "recommended_resources": [{"name": "<resource>", "type": "<course|docs|book|practice>"}, ...],
  "recommended_projects": [{"name": "<project>", "difficulty": "Beginner|Intermediate|Advanced", "description": "<1 sentence>"}, ...],
  "resume_improvements": ["<suggestion>", ...],
  "interview_readiness": "<assessment with a percentage>",
  "career_advice": "<2-3 sentences of personalized advice>"
}"""


def build_skill_gap_user_prompt(
    technology: str,
    completed_topics: list[str],
    all_topics: list[str],
    target_role: str | None,
    context_docs: list[str],
) -> str:
    context = "\n".join(f"- {c}" for c in context_docs) if context_docs else "None"
    return f"""Technology: {technology}
Target Role: {target_role or "Not specified"}
Full topic checklist (in learning order): {", ".join(all_topics)}
Topics the student has completed: {", ".join(completed_topics) or "None"}

Knowledge base context (from semantic retrieval):
{context}

Analyze this student's skill gap for {technology} and return the JSON."""
