from fastapi import APIRouter

from app.api.auth_routes import router as auth_router
from app.api.report_routes import router as report_router
from app.api.resume_routes import router as resume_router
from app.api.skill_routes import router as skill_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(skill_router)
api_router.include_router(resume_router)
api_router.include_router(report_router)
