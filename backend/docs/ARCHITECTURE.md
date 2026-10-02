# Architecture

```
React (Vite) ──axios──▶ FastAPI ──LangChain──▶ Groq API (LLM)
                          │
                          ├──▶ PostgreSQL (users, analyses, roadmaps, reports)
                          └──▶ ChromaDB (semantic retrieval / RAG context)
```

## AI Flow

1. The user submits completed topics (or a resume PDF) from the React frontend.
2. The FastAPI route validates the request with Pydantic and queries ChromaDB for
   relevant knowledge-base context (roadmap levels, project guidance, topic checklists).
3. The agent builds a structured prompt (system + user) and calls the Groq model via
   LangChain (`langchain-groq`).
4. The model returns strict JSON, which is parsed, persisted to PostgreSQL, and returned
   to the frontend for rendering.

## Agents

- `skill_gap_agent` — skill gap analysis (level, missing concepts, learning sequence…)
- `roadmap_agent` — four-stage learning roadmap timeline
- `resume_agent` — ATS/resume scoring and improvement suggestions
- `interview_agent` — interview prep and project recommendations
