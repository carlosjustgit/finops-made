# AI Diagnostic Tool Spec

## UX Requirements
- Stepper interface
- Maximum 8 questions
- Completion time target: 30–40 seconds
- Only buttons, ranges and multi-select inputs
- No free typing fields

## Input Variables
- Cloud provider
- Monthly cloud spend range
- Number of accounts
- Storage range
- Data lake presence
- GenAI maturity
- Pain points (multi-select)
- Sector

## Backend Logic
LLM role:
Senior Enterprise FinOps and Cloud Governance Architect.

Must:
- Cross input variables
- Deduce inefficiencies
- Estimate maturity scores
- Generate opportunity range
- Suggest 3 concrete 30-day actions
- Identify governance risks

## Output Dashboard
Single executive-style screen containing:
- FinOps maturity score (0–100)
- Data governance score (0–100)
- GenAI control score (0–100)
- Estimated optimization opportunity range
- Top 3 actions (30-day focus)
- Risk checklist

Primary conversion:
Agendar revisão executiva

Secondary:
Baixar relatório completo
