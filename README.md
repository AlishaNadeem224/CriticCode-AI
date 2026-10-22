# CriticCode AI

AI-powered code review assistant. Paste in a code snippet and get back structured, line-level feedback on bugs, security issues, performance, and best practices — streamed in real time from an LLM-backed review pipeline.

<!--![screenshot placeholder — add a screenshot or short GIF of a real review here](docs/demo.gif) -->
<!-- Record a 10–15s screen capture of pasting code and the review streaming in. Save it as docs/demo.gif or docs/screenshot.png and update the path above. This is the single highest-impact addition to this README. -->

---

## Overview

CriticCode AI takes a block of code as input and returns an expert-style review: what's broken, what's risky, and what could be cleaner — without needing a human reviewer in the loop first. It's built as a full-stack application with a typed frontend, a Python API layer, and an LLM doing the actual analysis.

## Features

- Paste code and receive a structured review covering bugs, security issues, and performance concerns
- Streaming response — feedback appears incrementally rather than after a long wait
<!--- [ADD: which languages are currently supported, if limited]
- [ADD: any other real feature — e.g. syntax highlighting, review history, export] -->

## Tech Stack

| Layer     | Technology                  |
|-----------|------------------------------|
| Frontend  | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| Backend   | Python, FastAPI              |
| AI Engine | Groq LLM API                 |
<!--| [ADD]     | [Any DB, auth, or deployment tooling actually used] |-->

## Setup

### Prerequisites
- Node.js [ADD version, e.g. 18+]
- Python [ADD version, e.g. 3.11+]
- A Groq API key ([console.groq.com](https://console.groq.com))

### Backend
```bash
cd backend
pip install -r requirements.txt

# Create a .env file (never commit this) with:
# GROQ_API_KEY=your_key_here

uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install

# Create a .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

The app should now be running at `http://localhost:3000`.

<!-- ADD: adjust the folder names/commands above to match your actual repo structure if it differs from backend/ and frontend/ -->

## Usage

1. Paste a code snippet into the input panel
2. Submit for review
3. Feedback streams in, organized by category (bugs, security, performance, style)

<!--[ADD: a short example — a before/after, or a sample review output — if you have one handy]-->

## Project Structure

```
criticcode-ai/
├── backend/          # FastAPI app, review pipeline, Groq integration
├── frontend/          # Next.js app
└── README.md
```
<!-- ADD: replace with your actual top-level structure -->

## Roadmap

<!-- - [ ] [ADD: anything genuinely planned — e.g. multi-language support, review history] -->

## License

MIT — see [LICENSE](LICENSE).
