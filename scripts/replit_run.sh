#!/usr/bin/env bash
set -euo pipefail

# Workspace convenience: install/build only when the project has not been prepared yet.
if ! python -c "import fastapi, uvicorn" >/dev/null 2>&1; then
  python -m pip install -r backend/requirements.txt
fi

if [ ! -f frontend/dist/index.html ]; then
  cd frontend
  npm ci --include=dev --no-audit --no-fund
  npm run build
  cd ..
fi

cd backend
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}"
