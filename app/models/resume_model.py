from sqlalchemy import Column, Integer, String, Text

from app.db.database import Base

class Resume(Base):
    __tablename__ = "resumes"
    id=Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    job_description = Column(Text)
    analysis = Column(Text)
