import os
import uuid

from fastapi import HTTPException, UploadFile
from pypdf import PdfReader

from app.config.settings import settings


def save_resume(file: UploadFile) -> str:
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    contents = file.file.read()
    if len(contents) > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 5 MB)")
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    path = os.path.join(settings.UPLOAD_DIR, f"{uuid.uuid4().hex}.pdf")
    with open(path, "wb") as f:
        f.write(contents)
    return path


def extract_pdf_text(path: str) -> str:
    reader = PdfReader(path)
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from the PDF")
    return text[:15000]
