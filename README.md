# AI Skill Gap Agent — Hackathon Rebuild

A full-stack AI career-readiness platform that connects **skill-gap diagnosis, adaptive learning roadmaps, project recommendations, resume analysis, interview preparation and progress tracking** in one workflow.

## Core product loop

**Diagnose → Plan → Build → Prove → Prepare → Track**

## Stack

- React + Vite
- FastAPI + Python
- SQLAlchemy + SQLite/PostgreSQL
- JWT + bcrypt
- LangChain + Groq
- ChromaDB
- Docker + Docker Compose

## Main features

- AI Skill Scan
- Role-aware Skill Gap Report
- Four-stage Adaptive Roadmap
- Role-aware Project Lab
- PDF Resume / ATS Analysis
- Role-aware Interview Arena
- Career Mission Control dashboard
- Persistent user history

## Start locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# add GROQ_API_KEY to .env
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend docs: `http://localhost:8000/docs`

## Environment variables

Use `backend/.env.example` as the template. A valid `GROQ_API_KEY` is required for live AI output.

## Hackathon explanation, workflow and demo plan

Read **[HACKATHON_GUIDE.md](HACKATHON_GUIDE.md)**.
