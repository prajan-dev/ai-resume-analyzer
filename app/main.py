from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.resume import router as resume_router
from app.db.database import engine, Base
from app.models.resume_model import Resume

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-resume-analyzer-three-virid.vercel.app"
        "https://ai-resume-analyzer-git-main-padmasujah-rajan-s-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(resume_router)

@app.get("/")
def home():
    return {"Message": "AI Resume Analyzer Running"}