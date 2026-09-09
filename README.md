# CareerPilot AI

AI-powered resume-to-job matching and career guidance assistant.

## Problem

Candidates often struggle to understand how well their resume matches a specific job description and which skills they need to improve. Traditional self-assessment is subjective and time-consuming, leaving job seekers unsure of where to focus their preparation.

## Solution

CareerPilot AI accepts a resume PDF and a target job description. It extracts relevant information, sends it to an AI model, and returns a structured analysis including a match score, skill gap breakdown, strength identification, personalized recommendations, and tailored interview questions — all in seconds.

## Features

- Resume PDF analysis
- Job description analysis
- Resume/job skill matching
- Match score
- Skill gap analysis
- Strength identification
- Personalized recommendations
- AI-generated interview questions
- Graceful fallback when the AI provider is temporarily unavailable

## AI Usage

- Resume text is extracted server-side from the uploaded PDF.
- The application sends relevant resume and job information to OpenRouter.
- Model: `google/gemma-4-26b-a4b-it:free`
- The AI produces structured JSON analysis that is validated and returned to the frontend.
- The API key is stored server-side in environment variables and is never exposed to the client.

If the external AI provider is temporarily unavailable, the application returns a pre-built demo analysis so the demo can still run. A banner indicates when the demo fallback is in use.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- OpenRouter
- Google Gemma
- PDF parsing

## How to Run

```bash
npm install
npm run dev
```

Create an `.env.local` file in the project root with:

```
OPENROUTER_API_KEY=your_key_here
```

Replace `your_key_here` with a valid OpenRouter API key. Never commit this file to version control.

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Impact

CareerPilot AI helps students and job seekers understand their readiness for a target role. Instead of guessing which skills matter most, candidates receive a concrete, personalized breakdown that lets them focus their preparation on the areas that will have the greatest impact.

## Future Scope

- Resume improvement suggestions
- Career roadmap
- Multiple job comparison
- Interview preparation
- Downloadable reports
