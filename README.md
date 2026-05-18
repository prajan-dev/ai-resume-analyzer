AI Resume Analyzer

An AI-powered full-stack web application that analyzes resumes against job descriptions and provides ATS-style insights using OpenAI APIs.

Features

* Upload resume (.docx)
* Paste job description
* AI-powered resume analysis
* ATS match score
* Matching skills extraction
* Missing skills detection
* Resume strengths analysis
* Modern responsive UI
* PostgreSQL database integration
* Cloud deployment with Render and Vercel

Tech Stack

Frontend
React
Vite
Tailwind CSS
Axios
React Icons

Backend
FastAPI
Python
OpenAI API
SQLAlchemy
PostgreSQL

Database
Neon PostgreSQL

Deployment
Render (Backend)
Vercel (Frontend)

Architecture Flow

1. User uploads resume from React frontend.
2. Frontend sends resume and job description to FastAPI backend.
3. Backend extracts text from uploaded resume.
4. Backend sends structured prompt to OpenAI API.
5. OpenAI returns resume analysis.
6. Backend stores results in PostgreSQL database.
7. Backend returns JSON response.
8. Frontend displays ATS score, skills, and suggestions.


Live Deployment

Frontend deployed on Vercel
Backend deployed on Render
Database hosted on Neon PostgreSQL

AI Features

* Resume skill extraction
* Job description comparison
* ATS-style scoring
* Missing skill analysis
* AI-generated recommendations

GitHub: [https://github.com/prajan-dev](https://github.com/prajan-dev)

Live Demo: 
https://ai-resume-analyzer-i7zp.onrender.com