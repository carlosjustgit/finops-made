import { NextRequest, NextResponse } from "next/server";
import { DiagnosticRequestSchema } from "@/lib/validation";
import { runDiagnostic } from "@/lib/gemini";
import { computeFitTier } from "@/lib/scoring";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = DiagnosticRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const input = parsed.data;

  // Compute client-side fit tier on server for logging purposes
  const fitTier = computeFitTier({
    monthly_spend: input.monthly_spend,
    sector: input.sector,
    data_lake: input.data_lake,
    genai_maturity: input.genai_maturity,
  });

  const startTime = Date.now();

  try {
    const result = await runDiagnostic(input);
    const duration = Date.now() - startTime;

    // Anonymized session log (no PII)
    console.log(
      JSON.stringify({
        event: "diagnostic_completed",
        sector: input.sector,
        monthly_spend: input.monthly_spend,
        genai_maturity: input.genai_maturity,
        fit_tier: fitTier,
        scores: result.scores,
        duration_ms: duration,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const duration = Date.now() - startTime;
    const message = err instanceof Error ? err.message : String(err);

    console.error(
      JSON.stringify({
        event: "diagnostic_error",
        error: message,
        duration_ms: duration,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(
      { error: "diagnostic_unavailable" },
      { status: 503 }
    );
  }
}
