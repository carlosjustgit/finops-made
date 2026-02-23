import { getStoredUTM } from "@/lib/utm";
import type { FitTier, UTMParams } from "@/types/diagnostic";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function push(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: event.event, ...event });
}

function withUTM(payload: Record<string, unknown>): Record<string, unknown> {
  const utm: UTMParams = getStoredUTM();
  return { ...payload, ...utm };
}

export function trackPageView(): void {
  push(withUTM({ event: "page_view", timestamp: Date.now() }));
}

export function trackDiagnosticStarted(): void {
  push(withUTM({ event: "diagnostic_started", timestamp: Date.now() }));
}

export function trackStepCompleted(
  stepNumber: number,
  questionId: string,
  answerValue: string | string[] | boolean
): void {
  push(
    withUTM({
      event: "step_completed",
      step_number: stepNumber,
      question_id: questionId,
      answer_value: Array.isArray(answerValue)
        ? answerValue.join("|")
        : String(answerValue),
    })
  );
}

export function trackDiagnosticCompleted(
  fitTier: FitTier,
  finopsScore: number,
  dgScore: number,
  genaiScore: number,
  durationMs: number
): void {
  push(
    withUTM({
      event: "diagnostic_completed",
      fit_tier: fitTier,
      finops_score: finopsScore,
      dg_score: dgScore,
      genai_score: genaiScore,
      duration_ms: durationMs,
    })
  );
}

export function trackReviewClicked(fitTier: FitTier): void {
  push(withUTM({ event: "review_clicked", fit_tier: fitTier }));
}

export function trackPdfRequested(fitTier: FitTier): void {
  push(withUTM({ event: "pdf_requested", fit_tier: fitTier }));
}
