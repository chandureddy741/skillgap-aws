from fastapi import HTTPException

from app.config.constants import TECHNOLOGIES


def validate_technology(technology: str) -> str:
    if technology not in TECHNOLOGIES:
        raise HTTPException(status_code=400, detail=f"Unsupported technology: {technology}")
    return technology
