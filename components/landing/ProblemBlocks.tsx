import { TrendingUp, EyeOff, BrainCircuit } from "lucide-react";

const problems = [
  {
    icon: TrendingUp,
    title: "Custos imprevisíveis todo mês",
    description:
      "Empresas enterprise no Brasil gastam até 35% acima do necessário em AWS, Azure e GCP. Recursos ociosos, instâncias superprovisionadas e ambientes de dev rodando 24/7 acumulam despesas invisíveis mês a mês, e ninguém fica sabendo até chegar a fatura.",
    stat: "35%",
    statLabel: "de desperdício médio no Brasil",
    source: "BCG Cloud Waste Report 2025",
  },
  {
    icon: EyeOff,
    title: "Visibilidade fragmentada",
    description:
      "Sem uma visão unificada entre contas, provedores e squads, o CFO toma decisão às cegas. Data Lakes subutilizados, pipelines redundantes e dados duplicados drenam budget sem gerar valor e sem aparecer em nenhum dashboard.",
    stat: "64%",
    statLabel: "das empresas sem chargeback por time",
    source: "FinOps Foundation State of FinOps 2026",
  },
  {
    icon: BrainCircuit,
    title: "GenAI virou risco financeiro",
    description:
      "Empresas em produção com IA Generativa erram a previsão de custo em mais de 50%. No Brasil, instâncias de GPU em São Paulo são 40-60% mais caras que nos EUA. Cada novo projeto de LLM sem guardrails vira uma bomba no orçamento.",
    stat: "+320%",
    statLabel: "de crescimento no gasto com GenAI em 2025",
    source: "CloudZero AI Era Report 2026",
  },
];

export function ProblemBlocks() {
  return (
    <section
      className="bg-[#F4F6FA] py-20"
      aria-labelledby="problems-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#0047FF] text-sm font-bold uppercase tracking-widest mb-3">
            Os desafios reais do mercado
          </p>
          <h2
            id="problems-heading"
            className="text-3xl md:text-4xl font-black text-[#0B1F3B] mb-4"
          >
            Os três problemas que custam mais caro
          </h2>
          <p className="text-[#7A8BA8] text-lg max-w-2xl mx-auto">
            Toda empresa brasileira com cloud acima de R$&nbsp;100k/mês enfrenta
            ao menos um desses desafios. A maioria enfrenta os três ao mesmo
            tempo, sem saber por onde começar a resolver.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <article
                key={problem.title}
                className="bg-white p-8 border border-[#E8ECF4] hover:border-[#0047FF]/40 transition-colors duration-200"
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-[#0047FF] mb-6"
                />
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">
                  {problem.title}
                </h3>
                <p className="text-[#7A8BA8] text-sm leading-relaxed mb-6">
                  {problem.description}
                </p>
                <div className="pt-4 border-t border-[#E8ECF4]">
                  <span className="text-2xl font-black text-[#0047FF]">
                    {problem.stat}
                  </span>
                  <span className="text-xs text-[#7A8BA8] ml-2">
                    {problem.statLabel}
                  </span>
                  <p className="text-[10px] text-[#C8D0E0] mt-1">
                    Fonte: {problem.source}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
