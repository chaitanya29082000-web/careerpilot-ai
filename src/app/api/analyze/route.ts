import { NextResponse } from "next/server";
import PDFParser from "pdf2json";
import type { AnalysisResult } from "@/types/analysis";
import { mockAnalysisResult } from "@/lib/mock-data";

const MODEL = "google/gemma-4-26b-a4b-it:free";
const REQUEST_TIMEOUT_MS = 50_000;
const MAX_OUTPUT_TOKENS = 4096;

const SYSTEM_PROMPT = `Analyze a resume against a job description. Return ONLY valid JSON — no markdown, no commentary.

Schema:
{"summary":"2-3 sentence assessment","matchScore":0-100,"resumeSkills":[{"name":"","category":"technical|soft|tool|certification|domain","proficiency":"beginner|intermediate|advanced|expert"}],"jobSkills":[{"name":"","category":"technical|soft|tool|certification|domain"}],"missingSkills":[{"skill":"","importance":"critical|important|nice-to-have","whyItMatters":"why this skill is needed for this specific job","suggestion":"actionable advice tailored to candidate's current skills"}],"strengths":[{"skill":"","relevance":"high|medium|low","note":"cite the resume evidence proving this strength"}],"recommendations":[{"title":"","description":"personalized to candidate's gaps and existing skills","priority":"high|medium|low","category":"skill|experience|certification|project"}],"interviewQuestions":[{"question":"","type":"behavioral|technical|situational|general","tips":"what a strong answer covers"}]}

MATCH SCORE — calculate as: (matched job skills / total job skills) × 100, rounded. Score must reflect actual match ratio, not arbitrary. Proficiency mismatch = partial match at best.

STRENGTHS — evidence only. Each note must reference specific resume content. Never invent experience, education, certifications, projects, skills, or achievements.

SKILL GAPS — for each job-required skill missing/weak in resume: explain why it matters for THIS job. Suggestion must reference candidate's existing skills as a learning bridge.

RECOMMENDATIONS — each must address a specific gap, be actionable with clear next step, and reference candidate's current skill set.

INTERVIEW QUESTIONS — 6-8 total: ≥2 technical (testing core job skills), ≥2 behavioral (role-relevant), ≥1 targeting a skill gap, ≥1 cultural fit. All job-specific, not generic.

RULES:
- resumeSkills: only skills explicitly in resume. proficiency based on evidence depth.
- jobSkills: only skills explicitly required by job description.
- Never invent work experience, education, certs, projects, skills, achievements, or years of experience.
- missingSkills sorted by importance desc. recommendations sorted by priority desc.`;

function buildUserPrompt(resumeText: string, jobDescription: string): string {
  return `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`;
}

function validateAnalysisResult(data: unknown): AnalysisResult {
  if (!data || typeof data !== "object") throw new Error("Response is not an object");

  const obj = data as Record<string, unknown>;

  if (typeof obj.summary !== "string") throw new Error("Missing or invalid summary");
  if (typeof obj.matchScore !== "number" || obj.matchScore < 0 || obj.matchScore > 100) {
    throw new Error("matchScore must be a number between 0 and 100");
  }
  if (!Array.isArray(obj.resumeSkills)) throw new Error("Missing or invalid resumeSkills");
  if (!Array.isArray(obj.jobSkills)) throw new Error("Missing or invalid jobSkills");
  if (!Array.isArray(obj.missingSkills)) throw new Error("Missing or invalid missingSkills");
  if (!Array.isArray(obj.strengths)) throw new Error("Missing or invalid strengths");
  if (!Array.isArray(obj.recommendations)) throw new Error("Missing or invalid recommendations");
  if (!Array.isArray(obj.interviewQuestions)) throw new Error("Missing or invalid interviewQuestions");

  const missingSkills = obj.missingSkills.map((g: Record<string, unknown>) => ({
    skill: g.skill,
    importance: g.importance,
    whyItMatters: g.whyItMatters || "",
    suggestion: g.suggestion,
  }));

  return {
    summary: obj.summary,
    matchScore: Math.round(obj.matchScore),
    resumeSkills: obj.resumeSkills as AnalysisResult["resumeSkills"],
    jobSkills: obj.jobSkills as AnalysisResult["jobSkills"],
    missingSkills: missingSkills as AnalysisResult["missingSkills"],
    strengths: obj.strengths as AnalysisResult["strengths"],
    recommendations: obj.recommendations as AnalysisResult["recommendations"],
    interviewQuestions: obj.interviewQuestions as AnalysisResult["interviewQuestions"],
    source: "ai",
  };
}

async function tryAiAnalysis(
  resumeText: string,
  jobDescription: string,
  apiKey: string
): Promise<AnalysisResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        max_tokens: MAX_OUTPUT_TOKENS,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(resumeText, jobDescription) },
        ],
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`OpenRouter HTTP ${response.status}`);
    }

    const completion = await response.json();
    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) throw new Error("AI returned empty response");

    const parsed = JSON.parse(raw);
    return validateAnalysisResult(parsed);
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "Server misconfiguration: OPENROUTER_API_KEY is not set." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const resume = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!resume) {
      return NextResponse.json(
        { error: "Please upload a PDF resume." },
        { status: 400 }
      );
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide a job description (at least 20 characters)." },
        { status: 400 }
      );
    }

    if (resume.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported." },
        { status: 400 }
      );
    }

    let resumeText: string;
    try {
      const arrayBuffer = await resume.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      console.log(`[PDF] Parsing resume (${resume.name}, ${uint8.length} bytes)`);

      const pdfParser = new PDFParser(null, false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfData = await new Promise<any>((resolve, reject) => {
        let settled = false;
        pdfParser.on("pdfParser_dataError", (errMsg: { parserError: Error } | Error) => {
          if (settled) return;
          settled = true;
          reject(errMsg instanceof Error ? errMsg : errMsg.parserError);
        });
        pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
          if (settled) return;
          settled = true;
          resolve(pdfData);
        });
        const buffer = Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength);
        pdfParser.parseBuffer(buffer);
      });

      const pages = pdfData.Pages as
        | { Texts?: { R?: { T?: string }[] }[] }[]
        | undefined;
      const textParts: string[] = [];
      if (pages) {
        for (const page of pages) {
          const texts = page.Texts;
          if (!texts) continue;
          for (const textItem of texts) {
            const runs = textItem.R;
            if (!runs) continue;
            for (const run of runs) {
              if (run.T) {
                try {
                  textParts.push(decodeURIComponent(run.T));
                } catch {
                  textParts.push(run.T);
                }
              }
            }
          }
        }
      }
      resumeText = textParts.join(" ");

      console.log(`[PDF] Extracted ${resumeText.length} characters from ${pages?.length ?? 0} page(s)`);
    } catch (pdfErr: unknown) {
      const msg = pdfErr instanceof Error ? pdfErr.message : String(pdfErr);
      console.error("[PDF] Extraction failed:", msg);
      return NextResponse.json(
        { error: "Failed to extract text from the PDF. The file may be corrupted or image-based." },
        { status: 422 }
      );
    }

    if (!resumeText || resumeText.trim().length < 50) {
      console.log(`[PDF] Insufficient text extracted: ${resumeText?.length ?? 0} chars`);
      return NextResponse.json(
        { error: "Could not extract meaningful text from the PDF. Please ensure it contains selectable text." },
        { status: 422 }
      );
    }

    try {
      const result = await tryAiAnalysis(
        resumeText,
        jobDescription.trim(),
        process.env.OPENROUTER_API_KEY!
      );
      return NextResponse.json(result);
    } catch (aiErr) {
      console.warn("[AI] Real AI failed, falling back to demo data:", aiErr);
      return NextResponse.json({ ...mockAnalysisResult, source: "fallback" });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
