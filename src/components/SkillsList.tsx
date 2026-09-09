import type { Skill } from "@/types/analysis";

interface SkillsListProps {
  title: string;
  skills: Skill[];
  icon: React.ReactNode;
}

const categoryColors: Record<string, string> = {
  technical: "bg-primary/10 text-primary",
  soft: "bg-emerald-100 text-emerald-700",
  tool: "bg-amber-100 text-amber-700",
  certification: "bg-purple-100 text-purple-700",
  domain: "bg-cyan-100 text-cyan-700",
};

export default function SkillsList({ title, skills, icon }: SkillsListProps) {
  return (
    <div className="bg-card rounded-2xl border border-card-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-primary">{icon}</span>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <span className="ml-auto text-xs text-muted bg-muted/10 px-2 py-0.5 rounded-full">{skills.length}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${categoryColors[skill.category] || "bg-gray-100 text-gray-700"}`}
          >
            {skill.name}
            {skill.proficiency && (
              <span className="text-[10px] opacity-60 ml-0.5">
                {skill.proficiency === "expert" ? "★" : skill.proficiency === "advanced" ? "●" : skill.proficiency === "intermediate" ? "◆" : "○"}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
