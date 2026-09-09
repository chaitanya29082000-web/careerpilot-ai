"use client";

import { useState } from "react";
import type { InterviewQuestion as InterviewQuestionType } from "@/types/analysis";

interface InterviewQuestionsProps {
  questions: InterviewQuestionType[];
}

const typeConfig: Record<string, { color: string; label: string }> = {
  behavioral: { color: "bg-purple-100 text-purple-700", label: "Behavioral" },
  technical: { color: "bg-primary/10 text-primary", label: "Technical" },
  situational: { color: "bg-amber-100 text-amber-700", label: "Situational" },
  general: { color: "bg-gray-100 text-gray-700", label: "General" },
};

export default function InterviewQuestions({ questions }: InterviewQuestionsProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (questions.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-card-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-sm font-bold text-foreground">Likely Interview Questions</h3>
        <span className="ml-auto text-xs text-muted bg-muted/10 px-2 py-0.5 rounded-full">{questions.length} questions</span>
      </div>
      <div className="space-y-2">
        {questions.map((q, i) => {
          const config = typeConfig[q.type] || typeConfig.general;
          const isOpen = expanded === i;
          return (
            <div key={i} className="border border-card-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-start gap-3 p-3 text-left hover:bg-background/50 transition-colors"
              >
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-foreground font-medium">{q.question}</p>
                </div>
                <svg
                  className={`w-4 h-4 text-muted flex-shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 ml-9">
                  <div className="bg-primary/5 rounded-lg p-3">
                    <p className="text-xs font-semibold text-primary mb-1">Tips for answering:</p>
                    <p className="text-xs text-muted leading-relaxed">{q.tips}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
