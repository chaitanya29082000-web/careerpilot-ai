import type { Recommendation } from "@/types/analysis";

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

const priorityConfig: Record<string, { color: string; dot: string }> = {
  high: { color: "border-l-danger", dot: "bg-danger" },
  medium: { color: "border-l-warning", dot: "bg-warning" },
  low: { color: "border-l-muted", dot: "bg-muted" },
};

const categoryIcons: Record<string, string> = {
  skill: "🎯",
  experience: "💼",
  certification: "📜",
  project: "🚀",
};

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-card-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-sm font-bold text-foreground">Recommendations</h3>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const config = priorityConfig[rec.priority] || priorityConfig["low"];
          return (
            <div
              key={i}
              className={`border-l-4 ${config.color} pl-4 py-3 bg-background/50 rounded-r-lg`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{categoryIcons[rec.category] || "📌"}</span>
                <span className="text-sm font-semibold text-foreground">{rec.title}</span>
              </div>
              <p className="text-xs text-muted leading-relaxed ml-6">{rec.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
