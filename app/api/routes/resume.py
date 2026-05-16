import os

from fastapi import APIRouter, UploadFile, File, Form
from app.services.openai_service import analyze_resume
import shutil
from app.db.database import SessionLocal
from app.models.resume_model import Resume

from app.services.resume_parser import(
    extract_text_from_docx,
    extract_text_from_pdf
)

router = APIRouter() # creates a router object

@router.post("/upload-resume")
async def upload_resume(
        file: UploadFile = File(...),
        job_description: str = Form(...)):

    file_location = f"uploads/{file.filename}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    extracted_text = ""

    if file.filename.endswith(".docx"):
        extracted_text = extract_text_from_docx(file_location)
    elif file.filename.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(file_location)
    analysis = analyze_resume(extracted_text, job_description)

    db = SessionLocal()
    resume_data = Resume(filename=file.filename,job_description=job_description, analysis=str(analysis))

    db.add(resume_data)
    db.commit()
    db.close()

    return {
        "filename": file.filename,
        "analysis": analysis

    }