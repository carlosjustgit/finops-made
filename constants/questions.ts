import type { Question } from "@/types/diagnostic";

export const QUESTIONS: Question[] = [
  {
    id: "sector",
    text: "Qual é o setor da sua empresa?",
    type: "single",
    options: [
      { value: "financial", label: "Financeiro / Bancário" },
      { value: "retail", label: "Varejo / E-commerce" },
      { value: "health", label: "Saúde / Farmacêutico" },
      { value: "manufacturing", label: "Indústria / Manufatura" },
      { value: "telecom", label: "Telecom / Tecnologia" },
      { value: "government", label: "Governo / Público" },
      { value: "other", label: "Outro" },
    ],
  },
  {
    id: "cloud_provider",
    text: "Qual é o seu principal provedor de cloud?",
    type: "single",
    options: [
      { value: "aws", label: "AWS" },
      { value: "azure", label: "Microsoft Azure" },
      { value: "gcp", label: "Google Cloud (GCP)" },
      { value: "multi", label: "Multi-cloud" },
      { value: "other", label: "Outro / On-premise híbrido" },
    ],
  },
  {
    id: "monthly_spend",
    text: "Qual é o gasto mensal médio em cloud?",
    type: "single",
    options: [
      { value: "<R$100k", label: "Até R$ 100 mil" },
      { value: "R$100k–R$500k", label: "R$ 100 mil – R$ 500 mil" },
      { value: "R$500k–R$2M", label: "R$ 500 mil – R$ 2 milhões" },
      { value: "R$2M+", label: "Acima de R$ 2 milhões" },
    ],
  },
  {
    id: "num_accounts",
    text: "Quantas contas / assinaturas cloud sua empresa opera?",
    type: "single",
    options: [
      { value: "1-5", label: "1 a 5 contas" },
      { value: "6-20", label: "6 a 20 contas" },
      { value: "21-100", label: "21 a 100 contas" },
      { value: "100+", label: "Mais de 100 contas" },
    ],
  },
  {
    id: "data_lake",
    text: "Sua empresa possui Data Lake ou plataforma de dados centralizada?",
    type: "single",
    options: [
      { value: "yes_mature", label: "Sim, estruturado e em uso" },
      { value: "yes_partial", label: "Sim, mas subutilizado" },
      { value: "no_planned", label: "Não, mas está planejado" },
      { value: "no", label: "Não possui" },
    ],
  },
  {
    id: "storage_range",
    text: "Qual é o volume aproximado de dados armazenados em cloud?",
    type: "single",
    options: [
      { value: "<10TB", label: "Menos de 10 TB" },
      { value: "10-100TB", label: "10 TB a 100 TB" },
      { value: "100TB-1PB", label: "100 TB a 1 PB" },
      { value: "1PB+", label: "Acima de 1 PB" },
    ],
  },
  {
    id: "genai_maturity",
    text: "Qual é o estágio atual de uso de IA Generativa na sua empresa?",
    type: "single",
    options: [
      { value: "none", label: "Não utiliza ainda" },
      { value: "exploring", label: "Explorando / Avaliando" },
      { value: "pilot", label: "Pilotos em andamento" },
      { value: "production", label: "Em produção, múltiplos casos" },
    ],
  },
  {
    id: "pain_points",
    text: "Quais são os principais desafios que sua empresa enfrenta? (Selecione até 3)",
    type: "multiselect",
    maxSelect: 3,
    options: [
      { value: "unpredictable_costs", label: "Custos imprevisíveis" },
      { value: "invisible_waste", label: "Desperdício invisível de recursos" },
      { value: "no_governance", label: "Falta de governança de cloud" },
      { value: "genai_costs", label: "Custos de GenAI fora de controle" },
      { value: "compliance", label: "Riscos de compliance e segurança" },
      { value: "rightsizing", label: "Superprovisionamento de infraestrutura" },
      { value: "multi_cloud_visibility", label: "Visibilidade multi-cloud limitada" },
    ],
  },
];

export const TOTAL_STEPS = QUESTIONS.length;
