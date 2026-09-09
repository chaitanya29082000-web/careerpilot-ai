export interface Skill {
  name: string;
  category: "technical" | "soft" | "tool" | "certification" | "domain";
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface SkillGap {
  skill: string;
  importance: "critical" | "important" | "nice-to-have";
  whyItMatters: string;
  suggestion: string;
}

export interface Strength {
  skill: string;
  relevance: "high" | "medium" | "low";
  note: string;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "skill" | "experience" | "certification" | "project";
}

export interface InterviewQuestion {
  question: string;
  type: "behavioral" | "technical" | "situational" | "general";
  tips: string;
}

export interface AnalysisResult {
  resumeSkills: Skill[];
  jobSkills: Skill[];
  matchScore: number;
  missingSkills: SkillGap[];
  strengths: Strength[];
  recommendations: Recommendation[];
  interviewQuestions: InterviewQuestion[];
  summary: string;
  source?: "ai" | "fallback";
}

export interface AnalysisState {
  status: "idle" | "uploading" | "analyzing" | "complete" | "error";
  progress: number;
  result: AnalysisResult | null;
  error: string | null;
}
