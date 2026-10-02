from app.database.connection import Base, engine
from app.models import user_model, skill_model, roadmap_model, report_model  # noqa: F401


def init_db():
    Base.metadata.create_all(bind=engine)
