// Industry benchmark data anchoring LLM scoring
// Sources: FinOps Foundation State of FinOps 2026, CloudZero FinOps in the AI Era 2026,
//          BCG Cloud Waste Report 2025, nOps State of FinOps 2026, Flexera State of the Cloud 2025

export const BENCHMARK_TABLE = `
=== 2026 FINOPS & GENAI INDUSTRY BENCHMARKS ===
Reference date: Q1 2026. All figures reflect the current AI-era landscape.

KEY MACRO CONTEXT (2026):
- 98% of organizations now manage AI spend as a core cost line (up from 31% in 2024)
- Enterprise generative AI spend surged 320% in 2025 ($11.5B → $37B globally)
- 40% of companies spend $10M+ annually on AI alone
- Cloud Efficiency Rate (CER) dropped across all segments despite FinOps maturity gains (AI paradox)
- The "easy waste" has been captured at mature orgs — savings now require architectural and engineering work
- 78% of FinOps practices now report to CTO/CIO (strategic seat at the table)
- 90% of FinOps teams now manage SaaS costs; 64% software licensing; 57% private cloud
- FOCUS (FinOps Open Cost and Usage Specification) adopted by ~68% of $100M+ spend organizations

CLOUD WASTE & FINOPS MATURITY BY SECTOR (2026 calibration):
| Segment                         | Avg Cloud Waste % | FinOps Maturity (median/100) | Data Gov Score (median/100) | Notes                                    |
|---------------------------------|-------------------|------------------------------|-----------------------------|------------------------------------------|
| Financial sector, >R$2M/mo      | 16%               | 70                           | 74                          | Highest FinOps adoption; CER pressured by compliance overhead |
| Financial sector, <R$2M/mo      | 25%               | 50                           | 58                          | Maturing fast; still spotty governance   |
| Retail / E-commerce, any        | 28%               | 42                           | 43                          | Seasonal spikes; underused commitments   |
| Health / Pharma, any            | 26%               | 46                           | 64                          | Strong data governance; weak cost opt.   |
| Manufacturing / Industry, any   | 31%               | 38                           | 40                          | Low FinOps maturity; high infra waste    |
| Telecom / Tech, >R$2M/mo        | 20%               | 62                           | 67                          | Highest optimization discipline          |
| Telecom / Tech, <R$2M/mo        | 26%               | 47                           | 53                          | Growing teams; partial governance        |
| Government / Public sector, any | 35%               | 33                           | 48                          | Lowest FinOps adoption; compliance risk  |
| Other, any                      | 29%               | 39                           | 44                          | Broad variance; assume conservative      |

GENAI COST CONTROL BENCHMARKS (2026):
| GenAI Stage                     | GenAI Control Score (median/100) | Typical forecast deviation | Key 2026 risk                             |
|---------------------------------|----------------------------------|----------------------------|-------------------------------------------|
| Not using GenAI yet             | 82 (low current risk)            | N/A                        | No risk now; rapid adoption pressure      |
| Exploring / Evaluating          | 58                               | 10-20% over budget         | Shadow AI spend; ungoverned API keys      |
| Pilots in progress              | 38                               | 20-40% over budget         | Token cost spikes; no per-team allocation |
| In production, multiple use cases | 22 (high complexity, low control) | 50%+ forecast miss       | Model sprawl; inference cost fragmentation; no unit economics |

CURRENT TOP RISKS IN 2026 (anchor risk flags to these):
1. No per-token / per-model cost visibility (83% of orgs use LLMs but most can't trace cost to product/team)
2. AI model sprawl — teams using multiple LLM providers without centralized governance
3. Lack of FOCUS-standard cost data across multi-cloud or multi-vendor environments
4. Commitment coverage gaps (many orgs at 70-80% coverage; not optimized to 90-99%)
5. Right-sizing backlog — right-sizing adoption jumped but still only at 43% of orgs
6. No chargeback / showback for AI costs (76% of orgs can't attribute AI spend to business unit)
7. Non-production environments not governed (non-prod = avg 23% of total cloud costs)
8. SaaS and software licensing not yet included in FinOps governance scope
9. Inference cost volatility — user behavior and prompt patterns drive unpredictable bills
10. FinOps team too small / not connected to engineering (central teams stay ~8-10 people)

SCORING GUIDANCE (2026 calibration):
- FinOps Maturity: 0=no visibility or tagging, 50=partial chargebacks + some commitment coverage, 100=full FinOps practice with FOCUS data, pre-deployment cost estimation, and engineering efficiency levers
- Data Governance: 0=no cataloging or policies, 50=partial data lake + some tagging, 100=full governance with lineage, access controls, and cost-per-dataset visibility
- GenAI Control: 0=no token observability or model governance, 50=some per-model budgets + alerts, 100=full unit economics per LLM call, per team, per product feature
- Score relative to sector median: sector median = ~50. Better than median = higher score.
- Multi-cloud with no FOCUS data = -10 to -15 on FinOps Maturity
- No chargeback for AI costs = -10 to -15 on GenAI Control
- Production GenAI without per-call observability = score drops to 15-30 range
- Data lake present and mature = +10-15 on Data Governance
- No dedicated FinOps team/function = -15 on FinOps Maturity

OPTIMIZATION OPPORTUNITY RANGES (as % of monthly cloud spend):
- Companies well above sector median (top quartile): 5-12% reducible (easy wins already captured)
- Companies near sector median: 12-22% reducible
- Companies below sector median: 20-38% reducible
- Adjust UPWARD for: production GenAI without controls (+5-8%), multi-cloud without FOCUS (+5%), no FinOps team (+5-10%), large non-prod environment (+3-5%)
- Adjust DOWNWARD for: existing commitment coverage >80%, dedicated FinOps team, mature tagging practice
`;

export const SPEND_BANDS: Record<string, { low: number; high: number }> = {
  "<R$100k":       { low: 50000,   high: 100000  },
  "R$100k–R$500k": { low: 100000,  high: 500000  },
  "R$500k–R$2M":   { low: 500000,  high: 2000000 },
  "R$2M+":         { low: 2000000, high: 6000000  },
};

export function calculateOpportunityBRL(
  spendBand: string,
  lowPct: number,
  highPct: number
): { low: string; high: string } {
  const band = SPEND_BANDS[spendBand] ?? { low: 100000, high: 500000 };
  const midSpend = (band.low + band.high) / 2;

  const low  = Math.round((midSpend * lowPct)  / 100 / 1000) * 1000;
  const high = Math.round((midSpend * highPct) / 100 / 1000) * 1000;

  const fmt = (n: number) =>
    n >= 1000000
      ? `R$ ${(n / 1000000).toFixed(1)}M`
      : `R$ ${(n / 1000).toFixed(0)}k`;

  return { low: fmt(low), high: fmt(high) };
}
