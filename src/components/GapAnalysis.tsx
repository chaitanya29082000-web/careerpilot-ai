import type { SkillGap } from "@/types/analysis";

interface GapAnalysisProps {
  gaps: SkillGap[];
}

const importanceConfig: Record<string, { color: string; badge: string; icon: string }> = {
  critical: { color: "border-l-danger", badge: "bg-danger/10 text-danger", icon: "!!" },
  important: { color: "border-l-warning", badge: "bg-warning/10 text-warning", icon: "!" },
  "nice-to-have": { color: "border-l-muted", badge: "bg-muted/10 text-muted", icon: "~" },
};

export default function GapAnalysis({ gaps }: GapAnalysisProps) {
  if (gaps.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-card-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 className="text-sm font-bold text-foreground">Skill Gaps</h3>
        <span className="ml-auto text-xs text-muted bg-muted/10 px-2 py-0.5 rounded-full">{gaps.length} gaps</span>
      </div>
      <div className="space-y-3">
        {gaps.map((gap, i) => {
          const config = importanceConfig[gap.importance] || importanceConfig["nice-to-have"];
          return (
            <div
              key={i}
              className={`border-l-4 ${config.color} pl-4 py-2 bg-background/50 rounded-r-lg`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${config.badge}`}>
                  {config.icon} {gap.importance.replace("-", " ")}
                </span>
                <span className="text-sm font-semibold text-foreground">{gap.skill}</span>
              </div>
              {gap.whyItMatters && (
                <p className="text-xs text-foreground/70 leading-relaxed mb-1 italic">Why it matters: {gap.whyItMatters}</p>
              )}
              <p className="text-xs text-muted leading-relaxed">{gap.suggestion}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
