"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import ResumeUpload from "@/components/ResumeUpload";
import JobDescription from "@/components/JobDescription";
import AnalyzeButton from "@/components/AnalyzeButton";
import ResultsDisplay from "@/components/ResultsDisplay";
import AnalysisProgress from "@/components/AnalysisProgress";
import type { AnalysisState, AnalysisResult } from "@/types/analysis";

export default function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisState>({
    status: "idle",
    progress: 0,
    result: null,
    error: null,
  });

  const canAnalyze =
    resumeFile !== null &&
    jobDescription.trim().length > 20 &&
    analysis.status === "idle";

  const handleAnalyze = useCallback(async () => {
    if (!resumeFile || !jobDescription.trim()) return;

    setAnalysis({ status: "uploading", progress: 10, result: null, error: null });

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      setAnalysis((prev) => ({ ...prev, status: "analyzing", progress: 30 }));

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      setAnalysis((prev) => ({ ...prev, progress: 80 }));

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const result: AnalysisResult = await res.json();
      setAnalysis({ status: "complete", progress: 100, result, error: null });
    } catch (err) {
      setAnalysis({
        status: "idle",
        progress: 0,
        result: null,
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }, [resumeFile, jobDescription]);

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription("");
    setAnalysis({ status: "idle", progress: 0, result: null, error: null });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {analysis.status === "idle" || analysis.status === "error" ? (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Analyze Your Career Fit
                </h2>
                <p className="text-sm text-muted max-w-md mx-auto">
                  Upload your resume and paste a job description. Our AI will
                  analyze the match and provide actionable insights.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm space-y-5">
                <ResumeUpload
                  onFileSelect={setResumeFile}
                  fileName={resumeFile?.name ?? null}
                />
                <JobDescription
                  value={jobDescription}
                  onChange={setJobDescription}
                />

                {analysis.error && (
                  <div className="bg-danger/10 border border-danger/20 rounded-xl p-3">
                    <p className="text-xs text-danger font-medium">
                      {analysis.error.includes("rate-limited") || analysis.error.includes("429")
                        ? "AI service is temporarily busy. Please wait a few seconds and try again."
                        : analysis.error}
                    </p>
                  </div>
                )}

                <AnalyzeButton
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  isLoading={false}
                />
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-muted pt-2">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Your data stays private
                </span>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Instant analysis
                </span>
              </div>
            </div>
          ) : analysis.status === "uploading" ||
            analysis.status === "analyzing" ? (
            <div className="max-w-lg mx-auto py-16">
              <AnalysisProgress
                status={analysis.status}
                progress={analysis.progress}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {analysis.result?.source === "fallback" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <p className="text-xs text-amber-700">
                    AI service temporarily unavailable — showing demo analysis.
                  </p>
                </div>
              )}
              <div className="flex items-center justify-end">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  New Analysis
                </button>
              </div>
              {analysis.result && <ResultsDisplay result={analysis.result} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
