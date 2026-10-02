from __future__ import annotations
INTERVIEW_SYSTEM_PROMPT = """You are an expert technical interviewer and career coach.
Generate personalized interview preparation material matched to the candidate's
technology and skill level.

Respond with ONLY valid JSON (no markdown, no extra text) using this exact schema:
{
  "technology": "<technology>",
  "level": "<level>",
  "technical_questions": [{"question": "<q>", "answer": "<answer with explanation>"}, ...],
  "hr_questions": [{"question": "<q>", "answer": "<suggested approach>"}, ...],
  "coding_challenges": [{"title": "<title>", "problem": "<statement>", "hint": "<hint>", "solution_outline": "<approach>"}, ...],
  "mcqs": [{"question": "<q>", "options": ["A...", "B...", "C...", "D..."], "correct": "<option letter>", "explanation": "<why>"}, ...],
  "mock_interview_questions": ["<question>", ...],
  "preparation_tips": ["<tip>", ...]
}
Include 5 technical questions, 3 HR questions, 3 coding challenges, 5 MCQs,
and 5 mock interview questions."""


def build_interview_user_prompt(
    technology: str, level: str, target_role: str | None, context_docs: list[str]
) -> str:
    context = "\n".join(f"- {c}" for c in context_docs) if context_docs else "None"
    return f"""Technology: {technology}
Candidate level: {level}
Target Role: {target_role or "Not specified"}

Knowledge base context:
{context}

Generate the interview preparation JSON."""


PROJECTS_SYSTEM_PROMPT = """You are an expert project mentor for students.
Recommend projects matched to the student's technology and level.

Respond with ONLY valid JSON (no markdown, no extra text) using this exact schema:
{
  "technology": "<technology>",
  "level": "<level>",
  "projects": [
    {
      "name": "<project name>",
      "difficulty": "Beginner | Intermediate | Advanced",
      "duration": "<e.g. 1-2 weeks>",
      "skills_required": ["<skill>", ...],
      "technologies": ["<tech>", ...],
      "learning_outcome": "<what the student gains>",
      "description": "<2 sentence description>"
    }, ...
  ]
}
Include 6 projects: 2 beginner, 2 intermediate, 2 advanced."""


def build_projects_user_prompt(
    technology: str, level: str, target_role: str | None, context_docs: list[str]
) -> str:
    context = "\n".join(f"- {c}" for c in context_docs) if context_docs else "None"
    return f"""Technology: {technology}
Student's current level: {level}
Target Role: {target_role or "Not specified"}

Knowledge base context:
{context}

Prioritize projects that create strong portfolio evidence for the target role.
Generate the project recommendations JSON."""
