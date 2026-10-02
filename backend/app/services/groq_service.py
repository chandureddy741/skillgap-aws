"""Small Groq client with deterministic fallback support.

The app works even when GROQ_API_KEY is missing or Groq is temporarily unavailable.
When a key is present, the live model is used; on any network/JSON/schema failure, the
caller-provided fallback keeps the hackathon demo functional.
"""
from __future__ import annotations

import json
import re
from typing import Any

import httpx

from app.config.settings import settings
from app.utils.logger import logger


def _extract_json(text: str) -> dict[str, Any]:
    text = (text or "").strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        value = json.loads(text)
        return value if isinstance(value, dict) else {"result": value}
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if not match:
            raise
        value = json.loads(match.group(0))
        return value if isinstance(value, dict) else {"result": value}


def run_ai(
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.4,
    fallback: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Call Groq directly and return JSON; fall back safely for demo reliability."""
    fallback = fallback or {}
    if not settings.GROQ_API_KEY:
        return fallback

    try:
        response = httpx.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": settings.GROQ_MODEL,
                "temperature": temperature,
                "response_format": {"type": "json_object"},
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            },
            timeout=45.0,
        )
        response.raise_for_status()
        data = response.json()
        content = data["choices"][0]["message"]["content"]
        result = _extract_json(content)
        return result or fallback
    except Exception as exc:
        logger.warning("Groq call failed; using deterministic fallback: %s", exc)
        return fallback
