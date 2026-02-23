import { z } from "zod";

export const DiagnosticResultSchema = z.object({
  scores: z.object({
    finops_maturity: z.number().int().min(0).max(100),
    data_governance: z.number().int().min(0).max(100),
    genai_control: z.number().int().min(0).max(100),
  }),
  optimization_opportunity: z.object({
    low_pct: z.number().min(0).max(100),
    high_pct: z.number().min(0).max(100),
  }),
  top_actions: z
    .array(
      z.object({
        title: z.string().max(80),
        description: z.string().max(250),
        impact: z.enum(["high", "medium", "low"]),
      })
    )
    .length(3),
  risk_flags: z
    .array(
      z.object({
        label: z.string().max(100),
        present: z.boolean(),
      })
    )
    .min(3)
    .max(6),
  fit_tier: z.enum(["high", "medium", "low"]),
});

export const DiagnosticRequestSchema = z.object({
  cloud_provider: z.string().min(1),
  monthly_spend: z.string().min(1),
  num_accounts: z.string().min(1),
  storage_range: z.string().min(1),
  data_lake: z.string().min(1),
  genai_maturity: z.string().min(1),
  pain_points: z.array(z.string()).min(1).max(5),
  sector: z.string().min(1),
  utm: z
    .object({
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_term: z.string().optional(),
    })
    .optional()
    .default({}),
});

export type ValidatedDiagnosticRequest = z.infer<typeof DiagnosticRequestSchema>;
