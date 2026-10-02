import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.agents.interview_agent import generate_interview_prep, recommend_projects
from app.agents.roadmap_agent import generate_roadmap
from app.agents.skill_gap_agent import analyze_skill_gap
from app.config.constants import TARGET_ROLES, TECHNOLOGIES
from app.database.connection import get_db
from app.models.roadmap_model import Roadmap
from app.models.skill_model import SkillAnalysis
from app.models.user_model import User
from app.schemas.request_schema import (
    InterviewRequest,
    ProjectRequest,
    RoadmapRequest,
    SkillAnalysisRequest,
)
from app.services.auth_service import get_current_user
from app.services.report_service import save_report, save_roadmap, save_skill_analysis
from app.utils.validators import validate_technology

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("/technologies")
def list_technologies():
    return {"technologies": TECHNOLOGIES, "target_roles": TARGET_ROLES}


@router.post("/analyze")
def analyze(
    payload: SkillAnalysisRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    validate_technology(payload.technology)
    result = analyze_skill_gap(payload.technology, payload.completed_topics, payload.target_role)
    record = save_skill_analysis(
        db, current_user.id, payload.technology, payload.target_role,
        payload.completed_topics, result,
    )
    return {"id": record.id, "technology": payload.technology, "result": result}


@router.get("/analyses")
def list_analyses(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    records = (
        db.query(SkillAnalysis)
        .filter(SkillAnalysis.user_id == current_user.id)
        .order_by(SkillAnalysis.created_at.desc())
        .all()
    )
    return [
        {
            "id": r.id,
            "technology": r.technology,
            "target_role": r.target_role,
            "completed_topics": r.completed_topics,
            "current_level": r.current_level,
            "confidence_score": r.confidence_score,
            "result": json.loads(r.result) if r.result else {},
            "created_at": r.created_at,
        }
        for r in records
    ]


@router.post("/roadmap")
def roadmap(
    payload: RoadmapRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    validate_technology(payload.technology)
    content = generate_roadmap(payload.technology, payload.completed_topics, payload.target_role)
    record = save_roadmap(db, current_user.id, payload.technology, payload.target_role, content)
    return {"id": record.id, "technology": payload.technology, "roadmap": content}


@router.get("/roadmaps")
def list_roadmaps(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    records = (
        db.query(Roadmap)
        .filter(Roadmap.user_id == current_user.id)
        .order_by(Roadmap.created_at.desc())
        .all()
    )
    return [
        {
            "id": r.id,
            "technology": r.technology,
            "target_role": r.target_role,
            "roadmap": json.loads(r.content),
            "created_at": r.created_at,
        }
        for r in records
    ]


@router.post("/projects")
def projects(
    payload: ProjectRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    validate_technology(payload.technology)
    content = recommend_projects(payload.technology, payload.level, payload.target_role)
    save_report(db, current_user.id, "projects", f"{payload.technology} projects", content)
    return {"technology": payload.technology, "projects": content}


@router.post("/interview")
def interview(
    payload: InterviewRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    validate_technology(payload.technology)
    content = generate_interview_prep(payload.technology, payload.level, payload.target_role)
    save_report(db, current_user.id, "interview", f"{payload.technology} interview prep", content)
    return {"technology": payload.technology, "interview": content}
