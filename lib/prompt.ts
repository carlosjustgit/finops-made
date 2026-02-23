import { BENCHMARK_TABLE } from "@/constants/benchmarks";
import type { ValidatedDiagnosticRequest } from "@/lib/validation";

const SYSTEM_PROMPT = `You are a Senior Enterprise FinOps and Cloud Governance Architect with 15 years of experience advising Fortune 500 and enterprise companies in Brazil and Latin America.

You MUST respond ONLY with a valid JSON object matching the exact schema provided below. Do NOT include explanations, markdown code blocks, or any text outside the JSON object.

REQUIRED JSON SCHEMA:
{
  "scores": {
    "finops_maturity": <integer 0-100>,
    "data_governance": <integer 0-100>,
    "genai_control": <integer 0-100>
  },
  "optimization_opportunity": {
    "low_pct": <number representing % of monthly spend, e.g. 12.5>,
    "high_pct": <number representing % of monthly spend, e.g. 28.0>
  },
  "top_actions": [
    { "title": "<max 80 chars>", "description": "<max 250 chars, specific and actionable>", "impact": "<high|medium|low>" },
    { "title": "<max 80 chars>", "description": "<max 250 chars, specific and actionable>", "impact": "<high|medium|low>" },
    { "title": "<max 80 chars>", "description": "<max 250 chars, specific and actionable>", "impact": "<high|medium|low>" }
  ],
  "risk_flags": [
    { "label": "<max 100 chars>", "present": <true|false> },
    ... (3 to 6 items)
  ],
  "fit_tier": "<high|medium|low>"
}

RULES:
- All scores are integers 0–100 calibrated against the benchmark table provided
- top_actions must contain EXACTLY 3 items, focused on the next 30 days
- Action descriptions must be SPECIFIC to the company's inputs, never generic
- Actions must be in Brazilian Portuguese (pt-BR)
- risk_flags must be 3 to 6 items in Brazilian Portuguese
- fit_tier: high = large spend + enterprise maturity, medium = mid-market, low = small spend + low maturity
- Optimization opportunity range must be realistic percentages of monthly spend
- Do NOT fabricate specific product names or internal company information`;

const LABEL_MAPS: Record<string, Record<string, string>> = {
  sector: {
    financial: "Financeiro / Bancário",
    retail: "Varejo / E-commerce",
    health: "Saúde / Farmacêutico",
    manufacturing: "Indústria / Manufatura",
    telecom: "Telecom / Tecnologia",
    government: "Governo / Público",
    other: "Outro",
  },
  cloud_provider: {
    aws: "AWS",
    azure: "Microsoft Azure",
    gcp: "Google Cloud (GCP)",
    multi: "Multi-cloud",
    other: "Outro / On-premise híbrido",
  },
  genai_maturity: {
    none: "Não utiliza ainda",
    exploring: "Explorando / Avaliando",
    pilot: "Pilotos em andamento",
    production: "Em produção, múltiplos casos",
  },
  data_lake: {
    yes_mature: "Sim, estruturado e em uso",
    yes_partial: "Sim, mas subutilizado",
    no_planned: "Não, mas está planejado",
    no: "Não possui",
  },
};

const PAIN_POINT_LABELS: Record<string, string> = {
  unpredictable_costs: "Custos imprevisíveis",
  invisible_waste: "Desperdício invisível de recursos",
  no_governance: "Falta de governança de cloud",
  genai_costs: "Custos de GenAI fora de controle",
  compliance: "Riscos de compliance e segurança",
  rightsizing: "Superprovisionamento de infraestrutura",
  multi_cloud_visibility: "Visibilidade multi-cloud limitada",
};

export function buildSystemPrompt(): string {
  return SYSTEM_PROMPT;
}

export function buildUserPrompt(input: ValidatedDiagnosticRequest): string {
  const sector = LABEL_MAPS.sector[input.sector] ?? input.sector;
  const provider = LABEL_MAPS.cloud_provider[input.cloud_provider] ?? input.cloud_provider;
  const genai = LABEL_MAPS.genai_maturity[input.genai_maturity] ?? input.genai_maturity;
  const dataLake = LABEL_MAPS.data_lake[input.data_lake] ?? input.data_lake;
  const painPoints = input.pain_points
    .map((p) => PAIN_POINT_LABELS[p] ?? p)
    .join(", ");

  return `COMPANY PROFILE FOR DIAGNOSIS:

- Setor: ${sector}
- Provedor principal de cloud: ${provider}
- Gasto mensal em cloud: ${input.monthly_spend}
- Número de contas/assinaturas: ${input.num_accounts}
- Volume de dados armazenados: ${input.storage_range}
- Data Lake: ${dataLake}
- Estágio de GenAI: ${genai}
- Principais desafios: ${painPoints}

${BENCHMARK_TABLE}

INSTRUCTIONS:
1. Cross the company profile against the benchmark table above.
2. Calculate all three scores relative to the sector median. A company matching the median gets ~50. Better than median = higher score.
3. Estimate the optimization opportunity as a realistic percentage range of their monthly cloud spend.
4. Generate exactly 3 specific, actionable 30-day actions in pt-BR tailored to this company's profile and pain points.
5. Identify 4-5 risk flags relevant to this company's profile (present=true if the risk applies to them).
6. Assign fit_tier based on spend level and enterprise complexity.

Respond ONLY with the JSON object.`;
}
