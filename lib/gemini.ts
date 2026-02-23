import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";
import { DiagnosticResultSchema } from "@/lib/validation";
import type { ValidatedDiagnosticRequest } from "@/lib/validation";
import type { DiagnosticResult } from "@/types/diagnostic";

const MODEL_NAME = "gemini-3-flash-preview";
const MAX_RETRIES = 1;

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
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
      maxOutputTokens: 1000,
      responseMimeType: "application/json",
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
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await callGemini(input, controller.signal);
        return result;
      } catch (err) {
        const isLastAttempt = attempt === MAX_RETRIES;
        if (isLastAttempt) throw err;
        // brief pause before retry
        await new Promise((r) => setTimeout(r, 500));
      }
    }
    throw new Error("Unreachable");
  } finally {
    clearTimeout(timeoutId);
  }
}
