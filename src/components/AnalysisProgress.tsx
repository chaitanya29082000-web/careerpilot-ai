interface AnalysisProgressProps {
  status: "uploading" | "analyzing";
  progress: number;
}

const steps = [
  { key: "uploading", label: "Reading resume" },
  { key: "parsing", label: "Extracting skills" },
  { key: "matching", label: "Matching with job" },
  { key: "generating", label: "Generating insights" },
];

export default function AnalysisProgress({ status, progress }: AnalysisProgressProps) {
  const activeStep = status === "uploading" ? 0 : Math.min(3, Math.floor(progress / 25));

  return (
    <div className="bg-card rounded-2xl border border-card-border p-8 shadow-sm animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-card-border" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">
            {status === "uploading" ? "Reading your resume..." : "Analyzing match..."}
          </p>
          <p className="text-xs text-muted mt-1">This usually takes a few seconds</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="flex justify-between mb-2">
            {steps.map((step, i) => (
              <div key={step.key} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                    i <= activeStep
                      ? "bg-primary text-white"
                      : "bg-muted/20 text-muted"
                  }`}
                >
                  {i < activeStep ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-[9px] font-medium hidden sm:block ${i <= activeStep ? "text-primary" : "text-muted"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-muted/20 rounded-full h-1.5 mt-3">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
