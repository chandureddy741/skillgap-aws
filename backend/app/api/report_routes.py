from __future__ import annotations
import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.report_model import Report
from app.models.roadmap_model import Roadmap
from app.models.skill_model import SkillAnalysis
from app.models.user_model import User
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("")
def list_reports(
    report_type: str | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(Report).filter(Report.user_id == current_user.id)
    if report_type:
        query = query.filter(Report.report_type == report_type)
    records = query.order_by(Report.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "report_type": r.report_type,
            "title": r.title,
            "content": json.loads(r.content),
            "score": r.score,
            "created_at": r.created_at,
        }
        for r in records
    ]


@router.get("/dashboard")
def dashboard_stats(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    analyses = (
        db.query(SkillAnalysis)
        .filter(SkillAnalysis.user_id == current_user.id)
        .order_by(SkillAnalysis.created_at.desc())
        .all()
    )
    roadmaps = (
        db.query(Roadmap)
        .filter(Roadmap.user_id == current_user.id)
        .order_by(Roadmap.created_at.desc())
        .all()
    )
    resume_reports = (
        db.query(Report)
        .filter(Report.user_id == current_user.id, Report.report_type == "resume")
        .order_by(Report.created_at.desc())
        .all()
    )
    interview_reports = (
        db.query(Report)
        .filter(Report.user_id == current_user.id, Report.report_type == "interview")
        .count()
    )

    latest = analyses[0] if analyses else None
    latest_result = json.loads(latest.result) if latest and latest.result else {}
    completed_topics = sorted({t for a in analyses for t in (a.completed_topics or [])})
    latest_resume = resume_reports[0] if resume_reports else None

    return {
        "current_skill_level": latest.current_level if latest else None,
        "confidence_score": latest.confidence_score if latest else None,
        "resume_score": latest_resume.score if latest_resume else None,
        "interview_readiness": latest_result.get("interview_readiness"),
        "career_readiness": latest_result.get("career_advice"),
        "recommended_skills": latest_result.get("learning_sequence", [])[:8],
        "active_roadmap": (
            {"technology": roadmaps[0].technology, "id": roadmaps[0].id} if roadmaps else None
        ),
        "completed_topics": completed_topics,
        "completed_topics_count": len(completed_topics),
        "total_analyses": len(analyses),
        "total_roadmaps": len(roadmaps),
        "total_resume_reports": len(resume_reports),
        "total_interview_preps": interview_reports,
        "recent_analyses": [
            {
                "id": a.id,
                "technology": a.technology,
                "current_level": a.current_level,
                "confidence_score": a.confidence_score,
                "created_at": a.created_at,
            }
            for a in analyses[:5]
        ],
    }
