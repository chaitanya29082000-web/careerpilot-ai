"use client";

import { useState } from "react";

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescription({ value, onChange }: JobDescriptionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-foreground">
          Job Description
        </label>
        <span className="text-xs text-muted">
          {wordCount} words
        </span>
      </div>
      <div
        className={`
          rounded-xl border-2 transition-all duration-200 overflow-hidden
          ${isFocused
            ? "border-primary shadow-[0_0_0_3px_rgba(99,102,241,0.1)]"
            : value
              ? "border-card-border"
              : "border-card-border hover:border-primary/30"
          }
        `}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={"Paste the full job description here...\n\nInclude the job title, responsibilities, required skills, qualifications, and any other relevant details for the best analysis."}
          rows={10}
          className="w-full px-4 py-3 text-sm text-foreground placeholder:text-muted/60 resize-none focus:outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
