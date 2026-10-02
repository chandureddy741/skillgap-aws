from __future__ import annotations
ROADMAP_SYSTEM_PROMPT = """You are an expert learning advisor and technical trainer.
Generate a personalized, visual learning roadmap timeline for a student, structured
into four stages: Beginner, Intermediate, Advanced, Industry Ready.
Tailor each stage to what the student already knows — skip or compress what is done.

Respond with ONLY valid JSON (no markdown, no extra text) using this exact schema:
{
  "technology": "<technology>",
  "summary": "<2 sentence overview of the roadmap>",
  "total_estimated_time": "<e.g. 4-6 months>",
  "stages": [
    {
      "level": "Beginner",
      "status": "completed | in_progress | upcoming",
      "estimated_time": "<e.g. 3 weeks>",
      "topics": ["<topic>", ...],
      "practice_tasks": ["<task>", ...],
      "mini_projects": ["<project>", ...],
      "major_projects": ["<project>", ...],
      "skills_gained": ["<skill>", ...]
    },
    { "level": "Intermediate", ... },
    { "level": "Advanced", ... },
    { "level": "Industry Ready", ... }
  ]
}"""


def build_roadmap_user_prompt(
    technology: str,
    completed_topics: list[str],
    all_topics: list[str],
    target_role: str | None,
    context_docs: list[str],
) -> str:
    context = "\n".join(f"- {c}" for c in context_docs) if context_docs else "None"
    return f"""Technology: {technology}
Target Role: {target_role or "Not specified"}
Full topic checklist: {", ".join(all_topics)}
Completed topics: {", ".join(completed_topics) or "None"}

Knowledge base context:
{context}

Generate the personalized four-stage roadmap JSON."""
