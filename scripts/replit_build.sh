#!/usr/bin/env bash
set -euo pipefail
python -m pip install -r backend/requirements.txt
# A production Vite build is bundled in frontend/dist so deployment does not
# depend on npm/network availability. Source code remains editable in frontend/src.
test -f frontend/dist/index.html
