# SKILLGAP.AI — Recovered Hackathon Build

This recovery package was rebuilt from the uploaded **AI-Skill-Gap-Agent** ZIPs.
The React frontend is the same source family used by the screenshots: dark navy UI,
cyan/purple gradient actions, Mission Control, Skill Scan, Skill Gap Report, Roadmap,
Project Lab, Resume Lab, Interview Arena, Profile and Settings.

## Why this edition is safer to deploy

- One public service: FastAPI serves both the React build and `/api`.
- SPA deep links work (`/login`, `/dashboard`, `/roadmap`, etc.).
- SQLite persistence works out of the box.
- Groq is optional at runtime. Add `GROQ_API_KEY` for live AI; if it is missing or
  Groq temporarily fails, deterministic personalized fallbacks keep the demo working.
- Resume PDF analysis has a functional local fallback instead of failing the whole flow.
- Heavy ChromaDB/LangChain dependencies were removed from the deployment path to make
  Replit installation faster and less fragile.

## Replit import

1. Replit → **Import** → upload this ZIP.
2. In **Secrets**, add:
   - `GROQ_API_KEY` (recommended for live AI)
   - `JWT_SECRET_KEY` (any long random string)
3. Press **Run**. The script installs dependencies and builds the frontend automatically.
4. Open the web preview.
5. Publish/Deploy when the smoke test passes.

## Smoke test before hackathon submission

1. `/` redirects to Login.
2. Create Account.
3. Mission Control opens.
4. Skill Scan → select Data Structures + target role + topics → Analyze.
5. Skill Gap Report renders.
6. Generate Roadmap.
7. Project Lab → Recommend Projects.
8. Resume Lab → upload a text-based PDF.
9. Interview Arena → generate prep.
10. Logout and login again.

## Important

Do not hard-code the Groq API key into source files. Keep it in Replit Secrets.

## Fastest Replit-Agent handoff

After importing the ZIP, open `REPLIT_AI_PROMPT.txt` and paste it into Replit AI.
It tells the agent to deploy the existing build without redesigning the UI.
