import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  SchemaType,
} from "@google/generative-ai";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";
import { DiagnosticResultSchema } from "@/lib/validation";
import type { ValidatedDiagnosticRequest } from "@/lib/validation";
import type { DiagnosticResult } from "@/types/diagnostic";

const MODEL_NAME = "gemini-3-flash-preview";
const MAX_RETRIES = 1;

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  return new GoogleGenerativeAI(apiKey);
}

async function callGemini(
  input: ValidatedDiagnosticRequest,
  signal: AbortSignal
): Promise<DiagnosticResult> {
  const genAI = getClient();

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: buildSystemPrompt(),
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 8000,
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          scores: {
            type: SchemaType.OBJECT,
            properties: {
              finops_maturity: { type: SchemaType.INTEGER },
              data_governance: { type: SchemaType.INTEGER },
              genai_control: { type: SchemaType.INTEGER },
            },
            required: ["finops_maturity", "data_governance", "genai_control"],
          },
          optimization_opportunity: {
            type: SchemaType.OBJECT,
            properties: {
              low_pct: { type: SchemaType.NUMBER },
              high_pct: { type: SchemaType.NUMBER },
            },
            required: ["low_pct", "high_pct"],
          },
          top_actions: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                title: { type: SchemaType.STRING },
                description: { type: SchemaType.STRING },
                impact: { type: SchemaType.STRING, enum: ["high", "medium", "low"] },
              },
              required: ["title", "description", "impact"],
            },
          },
          risk_flags: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                label: { type: SchemaType.STRING },
                present: { type: SchemaType.BOOLEAN },
              },
              required: ["label", "present"],
            },
          },
          fit_tier: { type: SchemaType.STRING, enum: ["high", "medium", "low"] },
        },
        required: ["scores", "optimization_opportunity", "top_actions", "risk_flags", "fit_tier"],
      },
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  const userPrompt = buildUserPrompt(input);

  const result = await Promise.race([
    model.generateContent(userPrompt),
    new Promise<never>((_, reject) => {
      signal.addEventListener("abort", () =>
        reject(new Error("Gemini call timed out"))
      );
    }),
  ]);

  const text = result.response.text();

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from Gemini: ${text.substring(0, 200)}`);
  }

  const validated = DiagnosticResultSchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(
      `Gemini response failed validation: ${JSON.stringify(validated.error.issues)}`
    );
  }

  return validated.data;
}

export async function runDiagnostic(
  input: ValidatedDiagnosticRequest
): Promise<DiagnosticResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 50000);

  try {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await callGemini(input, controller.signal);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Gemini attempt ${attempt} failed: ${msg}`);
        const isLastAttempt = attempt === MAX_RETRIES;
        if (isLastAttempt) throw err;
        await new Promise((r) => setTimeout(r, 500));
      }
    }
    throw new Error("Unreachable");
  } finally {
    clearTimeout(timeoutId);
  }
}
