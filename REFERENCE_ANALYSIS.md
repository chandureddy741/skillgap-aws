# Reference Project Analysis

## What the uploaded project already did well

The uploaded project is a legitimate full-stack application rather than a static prototype. Its strongest architectural decision is separating AI capabilities into small agents while keeping a common FastAPI backend.

### Existing capability map

| Capability | Reference implementation |
|---|---|
| Authentication | JWT + bcrypt + protected routes |
| Skill analysis | Technology checklist + LLM structured report |
| Roadmap | Four-stage AI roadmap |
| Resume analysis | PDF text extraction + ATS-style AI review |
| Project recommendations | AI-generated projects by technology/level |
| Interview preparation | Technical/HR/coding/MCQ generation |
| Retrieval | ChromaDB knowledge documents |
| Persistence | SQLAlchemy models for users, analyses, roadmaps and reports |
| Frontend | React/Vite with route-based pages |
| Deployment | Docker, Nginx, Docker Compose |

## Original request flow

```text
React form
  -> Axios API call
  -> FastAPI route
  -> agent function
  -> ChromaDB context lookup
  -> prompt builder
  -> Groq through LangChain
  -> JSON parser
  -> SQLAlchemy persistence
  -> JSON response
  -> React results page
```

## Strong points

1. **Clear separation of concerns** — API routes, agents, prompts, services, models and vector store are separated.
2. **Structured LLM responses** — prompts require JSON schemas, which is much more product-friendly than free-form chat output.
3. **Persistent history** — user analyses and reports are stored rather than lost after each call.
4. **Reasonable security baseline** — password hashing, JWT, upload validation and environment-based secrets.
5. **Good hackathon breadth** — diagnosis, learning, portfolio, resume and interview preparation can be demonstrated in one product.

## Weak points in the reference

1. The modules feel like separate tools rather than one adaptive career system.
2. The dashboard mostly reports counts/scores and does not strongly tell the user what to do next.
3. Project recommendations were not target-role aware.
4. The interview backend supported a target role, but the original interview UI did not send one.
5. Skill confidence depends heavily on self-reported completed topics; there is no knowledge verification quiz.
6. ChromaDB content is small and mostly seeded guidance/topic lists, so this is lightweight RAG rather than a deep knowledge system.
7. There is no job-description matcher or GitHub evidence verification.
8. A pure UI clone would not create enough technical differentiation for a competitive hackathon.

## Changes in this rebuild

- new product identity and dark mission-control UI;
- sidebar application shell;
- redesigned landing page;
- redesigned dashboard centered on "next best action";
- clearer career loop: Diagnose -> Plan -> Build -> Prove -> Prepare;
- role-aware project recommendation input and prompt;
- target-role input added to Interview Arena;
- updated hackathon documentation and demo flow.

## Best technical upgrade to build next

Add an **adaptive verification assessment** after self-reporting. The user checks topics they believe they know, then the agent asks a short generated quiz. Use the verified result to alter `confidence_score` and the roadmap. This directly improves the reliability of the core "skill gap" claim.
