import type { Strength } from "@/types/analysis";

interface StrengthsListProps {
  strengths: Strength[];
}

const relevanceColors: Record<string, string> = {
  high: "bg-success/10 text-success",
  medium: "bg-primary/10 text-primary",
  low: "bg-muted/10 text-muted",
};

export default function StrengthsList({ strengths }: StrengthsListProps) {
  if (strengths.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-card-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <h3 className="text-sm font-bold text-foreground">Your Strengths</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {strengths.map((s, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-background/50 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{s.skill}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${relevanceColors[s.relevance]}`}>
                  {s.relevance}
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
