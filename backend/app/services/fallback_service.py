"""Deterministic generators used when live AI is unavailable.

These are not hard-coded to one demo user: outputs are derived from the selected
technology, role, completed topics, level, and resume text.
"""
from __future__ import annotations

import re
from app.config.constants import TECHNOLOGIES


def _level_from_score(score: int) -> str:
    if score >= 80:
        return "Industry Ready"
    if score >= 55:
        return "Advanced"
    if score >= 30:
        return "Intermediate"
    return "Beginner"


def build_skill_gap(technology: str, completed_topics: list[str], target_role: str | None) -> dict:
    topics = TECHNOLOGIES.get(technology, [])
    completed = [t for t in completed_topics if t in topics]
    completed_set = set(completed)
    missing_all = [t for t in topics if t not in completed_set]
    score = round((len(completed_set) / max(1, len(topics))) * 100)
    level = _level_from_score(score)
    role_phrase = f" for a {target_role} path" if target_role else ""
    missing = missing_all[:10]
    sequence = missing_all[:7]
    return {
        "current_level": level,
        "confidence_score": score,
        "skill_gap_summary": (
            f"You currently have a {level.lower()} foundation in {technology}{role_phrase}. "
            "Focus on the next few high-impact gaps instead of trying to learn every topic at once."
        ),
        "current_knowledge": completed[:12],
        "missing_concepts": missing,
        "weak_areas": missing[:4],
        "learning_sequence": sequence,
        "industry_importance": (
            "Employers value evidence that you can apply fundamentals in complete, working projects and explain your technical decisions."
        ),
        "estimated_learning_time": f"{max(2, len(missing)//2 + 1)}–{max(4, len(missing) + 4)} weeks",
        "recommended_resources": [
            {"name": f"{technology} official documentation", "type": "docs"},
            {"name": "Build-and-explain practice exercises", "type": "practice"},
            {"name": f"{target_role or 'Software Developer'} interview drills", "type": "practice"},
        ],
        "recommended_projects": [
            {"name": f"{technology} Progress Tracker", "difficulty": "Beginner", "description": "Track learning goals and completion evidence."},
            {"name": f"{technology} Portfolio Dashboard", "difficulty": "Intermediate", "description": "Turn activity and progress into a role-focused dashboard."},
            {"name": f"{technology} Production Workflow", "difficulty": "Advanced", "description": "Ship an end-to-end workflow with testing and deployment."},
        ],
        "resume_improvements": [
            "Add measurable outcomes to your strongest project.",
            f"Explain how you used {technology} to solve a real problem.",
            "Link a working demo and a readable repository.",
        ],
        "interview_readiness": f"{score}% — " + ("building momentum" if score >= 65 else "needs focused practice"),
        "career_advice": (
            "Turn each priority gap into a small deliverable, then explain the trade-offs in your own words. "
            "Re-run the skill scan after completing a stage so the next action reflects your new state."
        ),
    }


def build_roadmap(technology: str, completed_topics: list[str], target_role: str | None) -> dict:
    topics = TECHNOLOGIES.get(technology, [])
    completed_set = set(completed_topics)
    remaining = [t for t in topics if t not in completed_set]
    # Preserve four visible stages even when few topics remain.
    chunks = [remaining[:5], remaining[5:11], remaining[11:17], remaining[17:]]
    levels = ["Beginner", "Intermediate", "Advanced", "Industry Ready"]
    stages = []
    for i, (level, chunk) in enumerate(zip(levels, chunks)):
        if not chunk:
            status = "completed" if i == 0 and completed_topics else "upcoming"
        else:
            status = "in_progress" if i == 0 else "upcoming"
        stages.append({
            "level": level,
            "status": status,
            "estimated_time": f"{max(1, len(chunk))} weeks",
            "topics": chunk,
            "practice_tasks": [f"Solve two focused exercises using {t}" for t in chunk[:3]],
            "mini_projects": [f"Build a small {technology} feature combining {', '.join(chunk[:2])}" if chunk else "Review and document completed skills"],
            "major_projects": [f"Create a {technology} portfolio project aligned to {target_role or 'your target role'}"] if i >= 2 else [],
            "skills_gained": chunk[:4],
        })
    return {
        "technology": technology,
        "summary": f"A focused {technology} path that starts from your current gaps and ends with portfolio-ready proof.",
        "total_estimated_time": f"{max(4, len(remaining))}–{max(8, len(remaining)*2)} weeks",
        "stages": stages,
    }


def build_projects(technology: str, level: str, target_role: str | None) -> dict:
    role = target_role or "Software Developer"
    items = [
        ("Beginner", "1 week", "Study Companion", "Track learning tasks, notes, and completion evidence.", ["Fundamentals", "Planning"]),
        ("Beginner", "1–2 weeks", "Practice Tracker", "Turn daily practice into visible streaks and topic-level progress.", ["Core concepts", "UI states"]),
        ("Intermediate", "2–3 weeks", "Portfolio Dashboard", "Build a dashboard that turns raw activity into clear progress signals.", ["Data handling", "API integration"]),
        ("Intermediate", "2–3 weeks", "Role Readiness Analyzer", f"Compare a learner profile with the skills expected for a {role}.", ["Data modeling", "Testing"]),
        ("Advanced", "4–5 weeks", "Production Workflow", "Ship an end-to-end workflow with authentication, persistence, and deployment.", ["Architecture", "Deployment"]),
        ("Advanced", "4–6 weeks", "Adaptive Career Agent", "Build a closed loop that diagnoses gaps, updates a plan, and tracks evidence.", ["System design", "AI integration"]),
    ]
    return {
        "technology": technology,
        "level": level,
        "projects": [
            {
                "name": f"{technology} {name}",
                "difficulty": difficulty,
                "duration": duration,
                "skills_required": skills,
                "technologies": [technology] + (["REST APIs"] if difficulty != "Beginner" else []),
                "learning_outcome": f"Build portfolio evidence for a {role} path.",
                "description": desc,
            }
            for difficulty, duration, name, desc, skills in items
        ],
    }


def build_interview(technology: str, level: str, target_role: str | None) -> dict:
    role = target_role or "Software Developer"
    technical = [
        (f"What are the core concepts of {technology}?", "Explain the fundamentals, when to use them, and one example from your own work."),
        (f"How would you debug a {technology} feature that works locally but fails after deployment?", "Check logs and environment differences, reproduce the smallest failing case, fix the root cause, then add a regression test."),
        (f"How do you structure a maintainable {technology} project?", "Separate concerns, keep interfaces explicit, validate inputs, and add tests around critical behavior."),
        (f"What performance issue would you watch for in {technology}?", "Identify the dominant time or memory cost, measure first, then optimize the bottleneck rather than guessing."),
        (f"How would you explain one difficult {technology} trade-off?", "State the goal, alternatives, constraints, decision, and what you would monitor after shipping."),
    ]
    return {
        "technology": technology,
        "level": level,
        "technical_questions": [{"question": q, "answer": a} for q, a in technical],
        "hr_questions": [
            {"question": f"Why are you targeting {role}?", "answer": "Connect the role to a specific problem you enjoy solving and evidence from your projects."},
            {"question": "Tell me about a time you learned something difficult.", "answer": "Use STAR: situation, task, action, result, and finish with what changed in your approach."},
            {"question": "Tell me about a project that did not go as planned.", "answer": "Describe the failure clearly, your debugging process, the corrective action, and the lesson you applied later."},
        ],
        "coding_challenges": [
            {"title": f"{technology} fundamentals exercise", "problem": f"Build a small feature using {technology} and explain your choices.", "hint": "Start by defining inputs and outputs.", "solution_outline": "Write a small test case, implement the simplest correct version, then discuss complexity."},
            {"title": "Data handling challenge", "problem": "Transform and validate a small collection of records.", "hint": "Separate validation from transformation.", "solution_outline": "Normalize the input, handle invalid cases, then transform and test edge cases."},
            {"title": "Debugging challenge", "problem": "Given a failing workflow, identify and fix the root cause.", "hint": "Use evidence from logs and isolate one variable at a time.", "solution_outline": "Reproduce, instrument, isolate, fix, and verify with a regression test."},
        ],
        "mcqs": [
            {"question": f"What is the best first step when solving a new {technology} problem?", "options": ["A. Guess and patch", "B. Clarify inputs and outputs", "C. Add dependencies", "D. Rewrite everything"], "correct": "B", "explanation": "A precise contract makes the solution testable."},
            {"question": "What should you optimize first?", "options": ["A. The measured bottleneck", "B. Every function", "C. Variable names", "D. Nothing"], "correct": "A", "explanation": "Measure before optimizing."},
            {"question": "What gives the strongest project evidence?", "options": ["A. A screenshot only", "B. A working demo and clear repository", "C. A title", "D. A long README only"], "correct": "B", "explanation": "Working proof plus readable implementation is defensible evidence."},
            {"question": "Why add tests after fixing a bug?", "options": ["A. Decoration", "B. Prevent regression", "C. Slower builds", "D. More files"], "correct": "B", "explanation": "A regression test protects the behavior that previously failed."},
            {"question": "What makes an interview answer stronger?", "options": ["A. Memorized jargon", "B. Concrete examples and trade-offs", "C. Very long answers", "D. Avoiding questions"], "correct": "B", "explanation": "Concrete evidence demonstrates understanding."},
        ],
        "mock_interview_questions": [
            f"Walk me through your strongest {technology} project.",
            "What was the hardest bug you solved?",
            "Which trade-off would you revisit and why?",
            f"How does your experience prepare you for a {role} role?",
            "What would you learn next if given two weeks?",
        ],
        "preparation_tips": [
            f"Review {technology} fundamentals at the {level} level.",
            "Practice explaining decisions without reading from notes.",
            "Prepare one project story with measurable results.",
            "Practice one coding problem with a spoken explanation each day.",
            "End answers with evidence, not just claims.",
        ],
    }


def build_resume_review(resume_text: str, target_role: str | None) -> dict:
    role = target_role or "Software Developer"
    text = resume_text.lower()
    length = len(resume_text.split())
    has_projects = "project" in text
    has_github = "github" in text
    has_linkedin = "linkedin" in text
    has_numbers = bool(re.search(r"\b\d+(?:\.\d+)?%?\b", resume_text))
    has_skills = "skill" in text
    base = 45
    base += 10 if has_projects else 0
    base += 8 if has_github else 0
    base += 5 if has_linkedin else 0
    base += 10 if has_numbers else 0
    base += 7 if has_skills else 0
    base += 5 if 180 <= length <= 900 else 0
    score = min(92, base)
    missing = []
    if not has_github: missing.append("GitHub / project repository link")
    if not has_numbers: missing.append("Quantified project outcomes")
    if not has_projects: missing.append("A strong projects section")
    if not has_skills: missing.append("Clearly grouped technical skills")
    strengths = ["Readable PDF text extracted successfully"]
    if has_projects: strengths.append("Projects are present")
    if has_github: strengths.append("Repository evidence is included")
    if has_numbers: strengths.append("Contains measurable or numeric evidence")
    return {
        "ats_score": score,
        "resume_score": max(35, score - 3),
        "summary": f"The resume has a usable foundation for a {role} application. Strengthen it by making technical evidence easier to verify and aligning the strongest projects with the target role.",
        "strengths": strengths,
        "weak_sections": missing[:3] or ["Improve specificity of project outcomes and technical decisions."],
        "missing_skills": missing or ["Role-specific keywords supported by real project evidence"],
        "suggested_projects": [f"Build and deploy one {role}-aligned project with a public repository."],
        "suggested_certifications": ["Choose certifications only when they support your target role; prioritize projects and fundamentals first."],
        "suggested_improvements": [
            "Use concise action-result bullets for projects.",
            "Add technologies used and the problem solved for each major project.",
            "Add measurable outcomes where truthful.",
            "Keep standard ATS-friendly section headings.",
        ],
    }
