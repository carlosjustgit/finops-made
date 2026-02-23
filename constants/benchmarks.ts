// Industry benchmark data used to anchor LLM scoring
// Sources: FinOps Foundation State of FinOps 2024, Gartner Cloud Waste Report

export const BENCHMARK_TABLE = `
INDUSTRY BENCHMARKS FOR SCORING (use these as calibration anchors):

| Segment                     | Avg Cloud Waste % | FinOps Maturity (median) | Data Gov Score (median) |
|-----------------------------|-------------------|--------------------------|-------------------------|
| Financial sector, >R$2M/mo  | 18%               | 62                       | 71                      |
| Financial sector, <R$2M/mo  | 27%               | 45                       | 55                      |
| Retail/E-commerce, any      | 31%               | 38                       | 40                      |
| Health, any                 | 29%               | 42                       | 60                      |
| Manufacturing, any          | 34%               | 35                       | 38                      |
| Telecom/Tech, >R$2M/mo      | 22%               | 58                       | 65                      |
| Telecom/Tech, <R$2M/mo      | 28%               | 44                       | 50                      |
| Government, any             | 38%               | 30                       | 45                      |
| Other, any                  | 32%               | 36                       | 42                      |

GENAI CONTROL BENCHMARKS:
| GenAI Stage       | GenAI Control Score (median) | Typical API cost overage |
|-------------------|------------------------------|--------------------------|
| None              | 85 (no risk yet)             | N/A                      |
| Exploring         | 60                           | minimal                  |
| Pilot             | 40                           | 15-25% above budget      |
| Production        | 25 (high risk, low control)  | 30-60% above budget      |

SCORING GUIDANCE:
- FinOps Maturity: 0=no visibility, 50=partial governance, 100=full FinOps practice
- Data Governance: 0=no policies, 50=partial cataloging, 100=full governance
- GenAI Control: 0=uncontrolled spending, 50=some guardrails, 100=full cost observability
- Scores should reflect deviation from sector median. A company matching median = 50. Better = higher.
- More accounts with no FinOps practice = lower maturity score
- Data lake present and mature = +10-15 points on Data Governance
- Multi-cloud without unified governance = -10 to -15 on FinOps Maturity

OPTIMIZATION OPPORTUNITY (as % of monthly spend):
- Companies below median: 15-35% reducible
- Companies near median: 10-20% reducible
- Companies above median: 5-15% reducible
- Adjust upward for: multi-cloud, no FinOps team, production GenAI without controls
`;

export const SPEND_BANDS: Record<string, { low: number; high: number }> = {
  "<R$100k": { low: 50000, high: 100000 },
  "R$100k–R$500k": { low: 100000, high: 500000 },
  "R$500k–R$2M": { low: 500000, high: 2000000 },
  "R$2M+": { low: 2000000, high: 5000000 },
};

export function calculateOpportunityBRL(
  spendBand: string,
  lowPct: number,
  highPct: number
): { low: string; high: string } {
  const band = SPEND_BANDS[spendBand] ?? { low: 100000, high: 500000 };
  const midSpend = (band.low + band.high) / 2;

  const low = Math.round((midSpend * lowPct) / 100 / 1000) * 1000;
  const high = Math.round((midSpend * highPct) / 100 / 1000) * 1000;

  const fmt = (n: number) =>
    n >= 1000000
      ? `R$ ${(n / 1000000).toFixed(1)}M`
      : `R$ ${(n / 1000).toFixed(0)}k`;

  return { low: fmt(low), high: fmt(high) };
}
