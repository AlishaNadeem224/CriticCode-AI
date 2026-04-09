from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="CriticCode AI",
    description="AI-Powered Code Review Assistant",
    version="1.0.0"
)

# CORS Middleware (allows frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class CodeReviewRequest(BaseModel):
    code: str
    language: str = "Python"
    pr_description: str = ""

# Groq Client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# System Prompt for AI
SYSTEM_PROMPT = """You are an expert senior software engineer conducting a strict and professional code review.
Analyze the given code and provide:

1. Overall Rating (out of 10)
2. Critical Bugs & Security Issues (if any)
3. Performance & Optimization Suggestions
4. Code Quality & Best Practices
5. Refactored Code Snippet (if major improvements are needed)

Be concise, actionable, and constructive. Use markdown formatting."""

@app.post("/review")
async def review_code(request: CodeReviewRequest):
    if not request.code or not request.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")

    try:
        prompt = f"""
Language: {request.language}
PR / Context: {request.pr_description if request.pr_description else 'No additional context provided'}

Here is the code to review:

```{request.language.lower()}
{request.code}
