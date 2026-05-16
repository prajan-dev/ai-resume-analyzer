
from openai import OpenAI
from app.core.config import OPENAI_API_KEY
client = OpenAI(api_key=OPENAI_API_KEY)
import json

def analyze_resume(resume_text, job_description):
    prompt = f"""
    Analyze this resume and provide:
    
    1.Skills
    2.Strengths
    3.Missing Skills
    4.Resume Summary
    Analyze the following resume.

    Return the response in this format:

    
    {{
       "skills":[],
       "strength":[],
       "missing_skills":[],
       "resume_score":0,
       "suggestions":[]
    }}
    
    Job Description:
    {job_description}
     
    Resume:
    {resume_text}
    Rules:
- resume_score must be a NUMBER from 0 to 10
- skills must be array of strings
- strength must be array of strings
- missing_skills must be array of strings
- No explanation outside JSON
     """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",

        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    content = response.choices[0].message.content

    print(content)

    content = content.replace("```json", "").replace("```", "").strip()

    return json.loads(content)