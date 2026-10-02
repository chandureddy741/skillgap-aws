from __future__ import annotations
import json

from sqlalchemy.orm import Session

from app.models.report_model import Report
from app.models.roadmap_model import Roadmap
from app.models.skill_model import SkillAnalysis
from app.utils.helper import safe_float


def save_skill_analysis(
    db: Session, user_id: int, technology: str, target_role: str | None,
    completed_topics: list[str], result: dict,
) -> SkillAnalysis:
    record = SkillAnalysis(
        user_id=user_id,
        technology=technology,
        target_role=target_role,
        completed_topics=completed_topics,
        result=json.dumps(result),
        current_level=result.get("current_level"),
        confidence_score=safe_float(result.get("confidence_score")),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def save_roadmap(
    db: Session, user_id: int, technology: str, target_role: str | None, content: dict
) -> Roadmap:
    record = Roadmap(
        user_id=user_id, technology=technology, target_role=target_role,
        content=json.dumps(content),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def save_report(
    db: Session, user_id: int, report_type: str, title: str | None,
    content: dict, score: float | None = None,
) -> Report:
    record = Report(
        user_id=user_id, report_type=report_type, title=title,
        content=json.dumps(content), score=score,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
