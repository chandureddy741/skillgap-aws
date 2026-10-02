from __future__ import annotations
RESUME_SYSTEM_PROMPT = """You are an expert resume reviewer, ATS specialist, and career
advisor for students and fresh graduates. Analyze the resume text and produce an honest,
specific, actionable review based only on the actual resume content.

Respond with ONLY valid JSON (no markdown, no extra text) using this exact schema:
{
  "ats_score": <number 0-100>,
  "resume_score": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength>", ...],
  "weak_sections": ["<weak section and why>", ...],
  "missing_skills": ["<skill missing for the target role>", ...],
  "suggested_projects": ["<project to add>", ...],
  "suggested_certifications": ["<certification>", ...],
  "suggested_improvements": ["<specific improvement>", ...]
}"""


def build_resume_user_prompt(resume_text: str, target_role: str | None, context_docs: list[str]) -> str:
    context = "\n".join(f"- {c}" for c in context_docs) if context_docs else "None"
    return f"""Target Role: {target_role or "Software Developer (fresher)"}

Knowledge base context:
{context}

Resume text:
\"\"\"
{resume_text}
\"\"\"

Analyze this resume and return the JSON."""
