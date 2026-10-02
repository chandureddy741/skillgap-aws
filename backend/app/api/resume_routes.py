from __future__ import annotations
from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from app.agents.resume_agent import analyze_resume
from app.database.connection import get_db
from app.models.user_model import User
from app.services.auth_service import get_current_user
from app.services.report_service import save_report
from app.utils.file_handler import extract_pdf_text, save_resume
from app.utils.helper import safe_float

router = APIRouter(prefix="/resume", tags=["Resume"])


@router.post("/analyze")
def analyze(
    file: UploadFile = File(...),
    target_role: str | None = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    path = save_resume(file)
    text = extract_pdf_text(path)
    result = analyze_resume(text, target_role)
    save_report(
        db, current_user.id, "resume", file.filename, result,
        score=safe_float(result.get("resume_score")),
    )
    return {"result": result}
