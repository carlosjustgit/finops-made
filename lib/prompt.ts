import { BENCHMARK_TABLE } from "@/constants/benchmarks";
import type { ValidatedDiagnosticRequest } from "@/lib/validation";

const SYSTEM_PROMPT = `You are a Senior Enterprise FinOps and Cloud Governance Architect operating in Q1 2026. You have 15+ years of hands-on experience advising Fortune 500 and large enterprise companies in Brazil and Latin America, and you are fully up to date with the realities of the AI-era FinOps landscape.

CURRENT 2026 CONTEXT YOU MUST APPLY:
- AI cost management is now the #1 FinOps priority globally. 98% of organizations manage AI spend as a core cost line.
- Enterprise generative AI spending surged 320% in 2025. 40% of companies spend $10M+/year on AI alone.
- The "FinOps paradox": FinOps maturity improved industry-wide, but cloud efficiency rates dropped — because AI introduced volatile, consumption-based costs (tokens, API calls, model selection) that break traditional forecasting.
- AI-native organizations still miss AI cost forecasts by 50%+ even with mature FinOps practices.
- The biggest gap in 2026: organizations can't attribute AI spend to business unit, product, team, or customer. Most have zero per-token or per-model cost visibility.
- Easy cloud waste has been largely captured at mature orgs. Remaining savings require engineering efficiency and architectural changes — not just commitment coverage.
- FOCUS (FinOps Open Cost and Usage Specification) is the emerging standard for normalizing costs across cloud and AI providers. ~68% of large organizations ($100M+ spend) are adopting it.
- FinOps now covers SaaS, software licensing, private cloud, data center, AND AI — not just AWS/Azure/GCP.
- Right-sizing is resurging: adoption jumped from 30% to 43% YoY but still leaves major opportunity.
- Non-production environments represent an average of 23% of total cloud costs — typically under-governed.
- Commitment coverage: most teams reach 70-80% easily. Pushing to 90-99% requires automation.
- In Brazil/LATAM: GPU instances for AI workloads in South America (São Paulo region) are among the most expensive globally — making AI cost control even more critical than in North America.

YOUR ROLE:
You diagnose a company's FinOps and GenAI cost control maturity based on the profile provided, then deliver a calibrated, executive-grade result grounded in 2026 benchmarks. Your output must feel like it came from a senior consultant who knows the current market — not generic advice.

YOU MUST RESPOND ONLY WITH A VALID JSON OBJECT matching the exact schema below. No markdown, no explanations, no text outside the JSON.

REQUIRED JSON SCHEMA:
{
  "scores": {
    "finops_maturity": <integer 0-100>,
    "data_governance": <integer 0-100>,
    "genai_control": <integer 0-100>
  },
  "optimization_opportunity": {
    "low_pct": <number, e.g. 14.0>,
    "high_pct": <number, e.g. 28.0>
  },
  "top_actions": [
    { "title": "<max 80 chars>", "description": "<max 280 chars, highly specific and actionable>", "impact": "<high|medium|low>" },
    { "title": "<max 80 chars>", "description": "<max 280 chars, highly specific and actionable>", "impact": "<high|medium|low>" },
    { "title": "<max 80 chars>", "description": "<max 280 chars, highly specific and actionable>", "impact": "<high|medium|low>" }
  ],
  "risk_flags": [
    { "label": "<max 110 chars>", "present": <true|false> },
    ... (4 to 6 items)
  ],
  "fit_tier": "<high|medium|low>"
}

STRICT RULES:
- All scores are integers 0–100 calibrated against the 2026 benchmark table provided
- top_actions must contain EXACTLY 3 items focused on the next 30 days
- Action descriptions MUST be specific to this company's cloud provider, sector, spend level, and pain points — never generic
- If the company uses AWS: reference Savings Plans, Cost Explorer, AWS Compute Optimizer, Amazon Bedrock cost controls
- If Azure: reference Azure Advisor, Cost Management + Billing, Azure OpenAI cost governance
- If GCP: reference Committed Use Discounts, GCP Cost Management, Vertex AI cost observability
- If multi-cloud: reference FOCUS data standard and unified cost allocation
- Actions must be written in Brazilian Portuguese (pt-BR), executive tone
- risk_flags must be 4 to 6 items, in pt-BR, grounded in 2026 realities (AI cost chaos, token visibility, FOCUS adoption, etc.)
- fit_tier: "high" = large spend (R$500k+/mo) + enterprise maturity signal; "medium" = mid-market with growth potential; "low" = small spend or very early stage
- Optimization opportunity must be a realistic percentage range of monthly cloud spend — never exceed 45%, never below 4%
- GenAI control score: if company uses production GenAI with no governance mentioned → score 15-30 range
- Do NOT mention specific internal company data, real client names, or fabricated product names`;

const LABEL_MAPS: Record<string, Record<string, string>> = {
  sector: {
    financial:     "Financeiro / Bancário",
    retail:        "Varejo / E-commerce",
    health:        "Saúde / Farmacêutico",
    manufacturing: "Indústria / Manufatura",
    telecom:       "Telecom / Tecnologia",
    government:    "Governo / Setor Público",
    other:         "Outro",
  },
  cloud_provider: {
    aws:   "AWS (Amazon Web Services)",
    azure: "Microsoft Azure",
    gcp:   "Google Cloud Platform (GCP)",
    multi: "Multi-cloud (AWS + Azure e/ou GCP)",
    other: "Outro / On-premise híbrido",
  },
  genai_maturity: {
    none:       "Não utiliza GenAI / IA Generativa ainda",
    exploring:  "Explorando / Avaliando modelos e casos de uso",
    pilot:      "Pilotos em andamento (pré-produção)",
    production: "Em produção com múltiplos casos de uso",
  },
  data_lake: {
    yes_mature: "Sim, Data Lake estruturado e ativo",
    yes_partial: "Sim, mas subutilizado ou parcialmente implantado",
    no_planned:  "Não possui, mas está no roadmap",
    no:          "Não possui Data Lake",
  },
};

const PAIN_POINT_LABELS: Record<string, string> = {
  unpredictable_costs:    "Custos de cloud imprevisíveis mês a mês",
  invisible_waste:        "Desperdício invisível — recursos provisionados sem uso",
  no_governance:          "Ausência de governança e políticas de cloud",
  genai_costs:            "Custos de GenAI / LLMs fora de controle",
  compliance:             "Riscos de compliance, segurança e auditoria",
  rightsizing:            "Superprovisionamento e falta de rightsizing contínuo",
  multi_cloud_visibility: "Visibilidade fragmentada em ambiente multi-cloud",
};

export function buildSystemPrompt(): string {
  return SYSTEM_PROMPT;
}

export function buildUserPrompt(input: ValidatedDiagnosticRequest): string {
  const sector    = LABEL_MAPS.sector[input.sector]          ?? input.sector;
  const provider  = LABEL_MAPS.cloud_provider[input.cloud_provider] ?? input.cloud_provider;
  const genai     = LABEL_MAPS.genai_maturity[input.genai_maturity] ?? input.genai_maturity;
  const dataLake  = LABEL_MAPS.data_lake[input.data_lake]    ?? input.data_lake;
  const painPoints = input.pain_points
    .map((p) => PAIN_POINT_LABELS[p] ?? p)
    .join("; ");

  return `COMPANY PROFILE FOR DIAGNOSIS (Q1 2026):

- Setor: ${sector}
- Provedor principal de cloud: ${provider}
- Gasto mensal em cloud: ${input.monthly_spend}
- Número de contas / assinaturas cloud: ${input.num_accounts}
- Volume de dados armazenados: ${input.storage_range}
- Situação do Data Lake: ${dataLake}
- Maturidade de GenAI / IA Generativa: ${genai}
- Principais dores declaradas: ${painPoints}

${BENCHMARK_TABLE}

DIAGNOSTIC INSTRUCTIONS:
1. Cross the company profile against the 2026 benchmark table. Calculate all three scores relative to the sector median (median ≈ 50). Companies above sector median score higher; below score lower.
2. Apply 2026 AI-era adjustments: production GenAI without cost observability = GenAI Control score 15-30. Multi-cloud without FOCUS data = -10 to -15 on FinOps Maturity.
3. Estimate a realistic optimization opportunity range as a percentage of their monthly cloud spend. Factor in their cloud provider's specific discount mechanisms (Savings Plans, Reserved Instances, CUDs) and their stated pain points.
4. Generate EXACTLY 3 specific, actionable 30-day actions in pt-BR. Each action must:
   - Reference their specific cloud provider's tools and services by name
   - Be tailored to their sector and declared pain points
   - Reflect 2026 best practices (FOCUS data, AI cost observability, unit economics, engineering efficiency)
   - Be executive-grade: "O quê fazer", "Como fazer" and "Impacto esperado" implied in the description
5. Identify 4 to 6 risk flags in pt-BR. Mark present=true if the risk clearly applies to this company's profile. Anchor flags to 2026 realities: token cost visibility, AI model sprawl, FOCUS adoption gap, non-prod governance, chargeback gaps.
6. Set fit_tier: "high" for large enterprise spend + complexity, "medium" for growing mid-market, "low" for early-stage or very small spend.

Respond ONLY with the JSON object. No explanations. No markdown.`;
}
