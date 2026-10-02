# START HERE — AI Skill Gap Agent

## What opens from the public URL?

- `/` → Login when signed out, Dashboard when already signed in.
- `/home` → Public product landing page.
- `/register` → Create account.
- After login the sidebar exposes Mission Control, Skill Scan, Roadmap, Project Lab, Resume Lab, Interview Arena, Profile and Settings.

## One-link deployment

Import this project into Replit, add these Secrets, then Publish:

- `GROQ_API_KEY`
- `JWT_SECRET_KEY`

Optional:

- `GROQ_MODEL=llama-3.3-70b-versatile`
- `DATABASE_URL=<managed PostgreSQL URL>` for stronger production persistence.

The repository already contains `.replit`, build/run scripts, SPA deep-link handling, and same-origin `/api` integration.

## Demo smoke test

Open the final `.replit.app` URL in an incognito browser and verify:

1. Login appears first.
2. Register a new account.
3. Dashboard opens after registration.
4. Skill Scan produces a report.
5. Roadmap generates.
6. Project Lab generates recommendations.
7. Resume Lab accepts a PDF and returns analysis.
8. Interview Arena generates preparation.
9. Logout returns to Login.
10. Login again and confirm stored history is present.

If all ten pass, the deployment is ready for a hackathon live demo.
