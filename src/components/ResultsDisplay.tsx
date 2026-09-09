import type { AnalysisResult } from "@/types/analysis";
import MatchScoreCard from "./MatchScoreCard";
import SkillsList from "./SkillsList";
import GapAnalysis from "./GapAnalysis";
import StrengthsList from "./StrengthsList";
import RecommendationsList from "./RecommendationsList";
import InterviewQuestions from "./InterviewQuestions";

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-success" />
        <h2 className="text-lg font-bold text-foreground">Analysis Results</h2>
      </div>

      <MatchScoreCard score={result.matchScore} summary={result.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsList
          title="Resume Skills"
          skills={result.resumeSkills}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <SkillsList
          title="Job-Required Skills"
          skills={result.jobSkills}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      <GapAnalysis gaps={result.missingSkills} />
      <StrengthsList strengths={result.strengths} />
      <RecommendationsList recommendations={result.recommendations} />
      <InterviewQuestions questions={result.interviewQuestions} />
    </div>
  );
}
