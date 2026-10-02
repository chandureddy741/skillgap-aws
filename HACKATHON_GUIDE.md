# AI Skill Gap Agent — Hackathon Guide

## 1. One-line idea

**AI Skill Gap Agent is a career-readiness platform that detects what a learner is missing for a target role, converts those gaps into a personalized roadmap, recommends portfolio projects, reviews resume evidence, and prepares the learner for interviews.**

The product is organized around one loop:

**Diagnose → Plan → Build → Prove → Prepare → Track**

---

## 2. The problem

Students often know their target job title but do not know:

- which skills they already have at a usable level;
- which important skills are still missing;
- what to learn first;
- which projects will actually strengthen their profile;
- whether their resume proves the right skills;
- whether they are ready for technical interviews.

Most learning platforms give courses. Most resume tools only score resumes. Most interview tools only generate questions. The gap is that these activities are disconnected.

---

## 3. The solution

AI Skill Gap Agent creates a single career-readiness loop.

### Module A — Skill Scan

Input:
- selected technology;
- completed topics;
- target role.

Processing:
- fetch the full topic map for the technology;
- compare completed topics against the expected knowledge map;
- retrieve relevant career/learning context from ChromaDB;
- send structured context to the LLM;
- return a strict JSON skill-gap report.

Output:
- current level;
- confidence score;
- known skills;
- missing concepts;
- weak areas;
- learning sequence;
- estimated learning time;
- recommended resources;
- project ideas;
- interview-readiness guidance.

### Module B — Adaptive Roadmap

Input:
- technology;
- completed topics;
- target role.

Output:
- Beginner stage;
- Intermediate stage;
- Advanced stage;
- Industry Ready stage;
- practice tasks;
- mini projects;
- major projects;
- estimated time.

Already-completed topics are compressed or skipped so the roadmap is not generic.

### Module C — Project Lab

Input:
- technology;
- current level;
- target role.

Output:
- six project recommendations across difficulty levels;
- estimated duration;
- required skills;
- technologies;
- learning outcome;
- portfolio value.

This rebuild makes project suggestions **target-role aware**, not just technology aware.

### Module D — Resume Lab

Input:
- PDF resume;
- target role.

Processing:
- secure PDF upload;
- text extraction;
- resume best-practice context retrieval;
- LLM analysis.

Output:
- ATS score;
- resume score;
- strengths;
- weak sections;
- missing skills;
- suggested projects;
- suggested certifications;
- concrete improvements.

### Module E — Interview Arena

Input:
- technology;
- current level;
- target role.

Output:
- technical questions;
- HR questions;
- coding challenges;
- MCQs;
- mock-interview questions;
- preparation tips.

This rebuild also makes interview generation explicitly target-role aware.

### Module F — Career Mission Control

The dashboard combines all activity into a single view:
- latest skill level;
- confidence score;
- career-readiness indicator;
- resume signal;
- interview-prep count;
- recommended skills;
- active roadmap;
- recent analyses;
- next best action.

---

## 4. End-to-end workflow

```text
User creates account
        |
        v
Select target role + technology
        |
        v
Mark completed topics honestly
        |
        v
Skill Gap Agent
  |-- technology knowledge map
  |-- ChromaDB context retrieval
  |-- Groq LLM structured reasoning
        |
        v
Skill-gap JSON report
        |
        +-------------------+
        |                   |
        v                   v
Adaptive Roadmap        Project Lab
        |                   |
        +---------+---------+
                  |
                  v
             Portfolio proof
                  |
                  v
              Resume Lab
                  |
                  v
           Interview Arena
                  |
                  v
         Career Mission Control
                  |
                  v
         Repeat after improvement
```

---

## 5. Technical architecture

```text
React + Vite Frontend
        |
        | Axios + JWT
        v
FastAPI REST API
        |
        +-- Authentication service
        +-- Skill Gap Agent
        +-- Roadmap Agent
        +-- Project Recommendation Agent
        +-- Resume Agent
        +-- Interview Agent
        |
        +------> LangChain -----> Groq LLM
        |
        +------> ChromaDB knowledge retrieval
        |
        +------> SQLAlchemy
                    |
                    v
             SQLite / PostgreSQL
```

### Frontend
- React 18
- React Router
- Axios
- Lucide icons
- redesigned dark "career mission control" interface

### Backend
- Python
- FastAPI
- Pydantic
- SQLAlchemy
- JWT authentication
- bcrypt password hashing

### AI layer
- LangChain
- Groq API
- strict JSON prompt schemas
- ChromaDB retrieval context

### Deployment
- Docker
- Docker Compose
- Nginx frontend image
- PostgreSQL production option

---

## 6. What was changed from the uploaded reference

The uploaded reference was analyzed and preserved as the functional base. This rebuild changes the product experience substantially while keeping API compatibility.

### UI/UX rebuild
- new dark technical visual identity;
- new public landing page;
- new authenticated sidebar navigation;
- new Mission Control dashboard;
- clearer hierarchy for metrics and next actions;
- redesigned assessment topic selection;
- redesigned report cards;
- mobile-responsive application shell.

### Product-flow improvement
The features are now presented as one connected loop:

**Skill Scan → Roadmap → Project Proof → Resume Proof → Interview Readiness**

### Backend improvement
- project recommendations now accept a `target_role`;
- interview preparation UI now sends a `target_role`;
- project prompts prioritize portfolio evidence for the selected role.

---

## 7. Hackathon differentiators to explain

Do not pitch this as "an LLM that gives suggestions." That is too weak.

Pitch these four points:

### 1. Closed career-readiness loop
The value is the connection between diagnosis, learning, projects, resume proof and interview preparation.

### 2. Structured outputs
Every agent asks the LLM for a defined JSON schema. This makes outputs predictable enough for a real product UI instead of displaying uncontrolled chat text.

### 3. Retrieval-grounded guidance
ChromaDB stores technology topic maps and career guidance context. The application retrieves relevant context before calling the LLM.

### 4. Persistent progress
Skill analyses, roadmaps and reports are stored per user. The dashboard can therefore show progress over time instead of treating every AI call as a separate chat.

---

## 8. Recommended next features if you have hackathon time

Build these in this order.

### Priority 1 — Job Description Matcher
User pastes a real job description. The system extracts required skills and compares them against the user's profile.

New output:
- matched skills;
- missing skills;
- readiness percentage;
- top 5 actions before applying.

Why it matters: it turns a generic career tool into an application-specific decision tool.

### Priority 2 — Adaptive Quiz Verification
Do not trust only self-reported completed topics. Ask 5–10 short questions and adjust the confidence score based on actual answers.

Why it matters: this makes the skill-gap score more defensible.

### Priority 3 — GitHub Proof Analyzer
Connect or paste a GitHub repository URL and inspect:
- languages;
- README quality;
- commits;
- project structure;
- tests;
- deployed link;
- role-relevant evidence.

Why it matters: "I know React" becomes "here is evidence that I can build React applications."

### Priority 4 — Dynamic Re-planning
After a learner completes roadmap tasks, regenerate only the remaining path instead of starting over.

### Priority 5 — Placement-cell dashboard
Aggregate anonymized skill gaps across a class or department so a college can plan workshops and training.

---

## 9. 90-second demo sequence

1. **Register/Login** — "Every learner gets a persistent profile."
2. **Skill Scan** — choose `Python` or `Java`, select a target role, tick known topics.
3. **Skill Gap Report** — show current level, missing concepts and ordered learning sequence.
4. **Roadmap** — show the four-stage adaptive plan.
5. **Project Lab** — generate target-role-aware projects.
6. **Resume Lab** — upload a sample PDF resume and show ATS/missing-skill analysis.
7. **Interview Arena** — generate technical and coding questions.
8. **Mission Control** — return to dashboard and explain how all results become one progress loop.

Do not spend the demo reading generated text. Show the transition between modules and the change in decision-making.

---

## 10. Simple explanation for judges

> A student usually says, "I want to become a backend developer," but does not know exactly what is missing. Our system first maps the student's current knowledge against a technology and target role. It then identifies the missing concepts and converts them into an ordered roadmap. After that, it recommends projects that create proof of those skills, checks whether the resume actually shows that proof, and generates interview preparation at the student's current level. All of this is saved and summarized in one career-readiness dashboard.

---

## 11. Local setup

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env   # Windows CMD
# or: cp .env.example .env

# Put a valid GROQ_API_KEY in .env
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

### Docker option

Create a root `.env` with:

```text
GROQ_API_KEY=your_key
JWT_SECRET_KEY=your_long_random_secret
```

Then run:

```bash
docker compose -f docker_compose.yml up --build
```

---

## 12. Important submission note

This package is a **rebuild derived from the uploaded reference code**. If the hackathon requires disclosure of pre-existing code, starter templates, public repositories or prior work, disclose that clearly and make sure the parts you claim as your team's work are genuinely built or substantially extended by your team.

For a stronger submission, implement at least one of the verification features above (JD matching, adaptive quiz or GitHub proof analysis) instead of relying only on UI changes.
