// Shared types for the diagnostic tool

export type Phase = "idle" | "active" | "loading" | "results" | "error";

export type QuestionType = "single" | "range" | "multiselect";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  maxSelect?: number; // for multiselect
}

export type Answers = Record<string, string | string[] | boolean>;

export type FitTier = "high" | "medium" | "low";

export type ImpactLevel = "high" | "medium" | "low";

export interface DiagnosticAction {
  title: string;
  description: string;
  impact: ImpactLevel;
}

export interface RiskFlag {
  label: string;
  present: boolean;
}

export interface DiagnosticScores {
  finops_maturity: number;
  data_governance: number;
  genai_control: number;
}

export interface OptimizationOpportunity {
  low_pct: number;
  high_pct: number;
}

export interface DiagnosticResult {
  scores: DiagnosticScores;
  optimization_opportunity: OptimizationOpportunity;
  top_actions: DiagnosticAction[];
  risk_flags: RiskFlag[];
  fit_tier: FitTier;
}

export interface DiagnosticState {
  phase: Phase;
  currentStep: number;
  answers: Answers;
  fitScore: FitTier | null;
  result: DiagnosticResult | null;
  startedAt: number | null;
}

export type DiagnosticAction_Dispatch =
  | { type: "START" }
  | { type: "ANSWER_STEP"; questionId: string; answer: string | string[] | boolean }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT" }
  | { type: "RECEIVE_RESULT"; result: DiagnosticResult; fitScore: FitTier }
  | { type: "ERROR" }
  | { type: "RESET" };

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
}

export interface DiagnosticRequest {
  cloud_provider: string;
  monthly_spend: string;
  num_accounts: string;
  storage_range: string;
  data_lake: string;
  genai_maturity: string;
  pain_points: string[];
  sector: string;
  utm: UTMParams;
}
