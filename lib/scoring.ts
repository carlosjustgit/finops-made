import type { Answers, FitTier } from "@/types/diagnostic";

export function computeFitTier(answers: Answers): FitTier {
  const spend = answers.monthly_spend as string;
  const sector = answers.sector as string;
  const dataLake = answers.data_lake as string;
  const genai = answers.genai_maturity as string;

  const isHighSpend = spend === "R$2M+" || spend === "R$500k–R$2M";
  const isMidSpend = spend === "R$100k–R$500k";
  const isLowSpend = spend === "<R$100k";
  const isFinancial = sector === "financial";
  const hasDataLake = dataLake === "yes_mature" || dataLake === "yes_partial";
  const noGenAI = genai === "none";

  if (isHighSpend && isFinancial) return "high";
  if (isHighSpend) return "high";
  if (isMidSpend && isFinancial) return "high";
  if (isMidSpend || hasDataLake) return "medium";
  if (isLowSpend && noGenAI) return "low";

  return "medium";
}
