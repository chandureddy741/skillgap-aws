# One-link Replit deployment

This edition is intentionally configured as **one public web service**:

- React/Vite is built to `frontend/dist`.
- FastAPI serves that React build and all deep links such as `/login`, `/dashboard`, `/roadmap`.
- The frontend calls `/api`, so frontend and backend share one public origin.
- Visiting `/` sends an unauthenticated visitor to `/login`.
- The original marketing/landing page remains available at `/home`.

## Replit secrets

Add these in **Tools → Secrets**:

- `GROQ_API_KEY`
- `JWT_SECRET_KEY`
- Optional: `GROQ_MODEL` (defaults to `llama-3.3-70b-versatile`)
- Optional: `DATABASE_URL` if you want an external PostgreSQL database. For a quick demo, the app defaults to SQLite.

Do not commit your real API key.

## Publish

The included `.replit` defines:

- Build: `bash scripts/replit_build.sh`
- Run: `bash scripts/replit_run.sh`
- Internal port: `8000`

In Replit, import this ZIP/repository, add the secrets, run the build once, then publish/deploy the app. Your public URL will look like:

`https://<your-subdomain>.replit.app`

Opening that one URL starts at the login experience. Users can register, log in, and then access the protected full app.

## Direct routes

All of these are SPA-safe and can be pasted directly after deployment:

- `/login`
- `/register`
- `/home`
- `/dashboard` (redirects to login if signed out)
- `/assessment`
- `/analysis`
- `/roadmap`
- `/projects`
- `/resume`
- `/interview`
- `/profile`
- `/settings`
- `/health`

## First smoke test

1. Open `/` in a private/incognito browser → it should land on `/login`.
2. Register a new account.
3. Confirm dashboard opens.
4. Run Skill Scan.
5. Generate Roadmap.
6. Generate Projects.
7. Analyze a small PDF resume.
8. Generate Interview Prep.
9. Log out and log back in.
10. Confirm history remains visible.
