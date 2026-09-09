interface MatchScoreCardProps {
  score: number;
  summary: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-danger";
}

function getScoreRingColor(score: number): string {
  if (score >= 80) return "stroke-success";
  if (score >= 60) return "stroke-warning";
  return "stroke-danger";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent Match";
  if (score >= 60) return "Good Match";
  if (score >= 40) return "Partial Match";
  return "Low Match";
}

export default function MatchScoreCard({ score, summary }: MatchScoreCardProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-card-border"
            />
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={`${getScoreRingColor(score)} transition-all duration-1000 ease-out`}
              style={{ strokeDashoffset: offset }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</span>
            <span className="text-[10px] text-muted font-medium uppercase tracking-wider">Match</span>
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
            <h3 className="text-lg font-bold text-foreground">{getScoreLabel(score)}</h3>
          </div>
          <p className="text-sm text-muted leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  );
}
