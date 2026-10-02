"""Compatibility shim for the original RAG module.

The recovered deployment intentionally avoids a heavy vector-database dependency.
The public functions remain so older imports do not break if the code is extended.
"""
from __future__ import annotations


def query_knowledge(query: str, n_results: int = 4) -> list[str]:
    return []
