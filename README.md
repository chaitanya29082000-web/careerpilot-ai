# CareerPilot AI

AI-powered career assistant that analyzes your resume against job descriptions and provides actionable insights.

## Features

- **PDF Resume Upload** — drag-and-drop or browse to upload your resume
- **Job Description Analysis** — paste any job posting for comparison
- **Match Score** — visual percentage showing how well your resume fits
- **Skill Gap Analysis** — identifies missing skills ranked by importance
- **Strengths Highlight** — what your resume does well for the role
- **Improvement Recommendations** — prioritized action items
- **Interview Questions** — AI-generated questions with answering tips

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** Geist Sans / Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/analyze/route.ts   # API endpoint (placeholder for LLM)
│   ├── globals.css             # Theme & animations
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main dashboard page
├── components/
│   ├── Header.tsx              # App header
│   ├── ResumeUpload.tsx        # PDF upload with drag-and-drop
│   ├── JobDescription.tsx      # Job description textarea
│   ├── AnalyzeButton.tsx       # Analyze action button
│   ├── AnalysisProgress.tsx    # Loading state with progress
│   ├── ResultsDisplay.tsx      # Results orchestrator
│   ├── MatchScoreCard.tsx      # Circular score visualization
│   ├── SkillsList.tsx          # Skill tags with categories
│   ├── GapAnalysis.tsx         # Missing skills breakdown
│   ├── StrengthsList.tsx       # Strengths cards
│   ├── RecommendationsList.tsx # Improvement suggestions
│   └── InterviewQuestions.tsx  # Expandable Q&A list
├── lib/
│   └── mock-data.ts            # Demo data for UI testing
└── types/
    └── analysis.ts             # TypeScript interfaces
```

## What Remains to Implement

The UI is complete and uses mock data. To make this fully functional:

1. **PDF Text Extraction** — add a library like `pdf-parse` or `pdfjs-dist` to extract text from uploaded PDFs.

2. **LLM Integration** — connect an LLM API (OpenAI, Anthropic, etc.) in `src/app/api/analyze/route.ts`:
   - Send the extracted resume text + job description
   - Prompt the LLM to return a structured JSON matching `AnalysisResult`
   - Parse the response and return it

3. **Streaming (optional)** — use streaming responses for a better UX during analysis.

See `src/app/api/analyze/route.ts` for the placeholder endpoint that needs implementation.

## License

MIT
