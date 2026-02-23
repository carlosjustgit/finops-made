import { TrendingUp, EyeOff, BrainCircuit } from "lucide-react";

const problems = [
  {
    icon: TrendingUp,
    title: "Custos imprevisíveis",
    description:
      "Empresas enterprise gastam até 35% acima do necessário em cloud sem perceber. Recursos ociosos, instâncias superprovisionadas e APIs sem limite acumulam despesas invisíveis.",
    stat: "35%",
    statLabel: "de desperdício médio",
  },
  {
    icon: EyeOff,
    title: "Desperdício invisível",
    description:
      "Sem visibilidade unificada entre contas e provedores, líderes tomam decisões às cegas. Data Lakes subutilizados e pipelines redundantes drenam budget sem entregar valor.",
    stat: "60%",
    statLabel: "das empresas sem visibilidade",
  },
  {
    icon: BrainCircuit,
    title: "GenAI sem governança",
    description:
      "Empresas em produção com GenAI gastam 30–60% acima do orçamento em APIs de LLM. Sem guardrails de custo e observabilidade, cada novo projeto de IA vira um risco financeiro.",
    stat: "30-60%",
    statLabel: "acima do budget em GenAI",
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
          <h2
            id="problems-heading"
            className="text-3xl md:text-4xl font-black text-[#0B1F3B] mb-4"
          >
            Os três problemas que custam mais caro
          </h2>
          <p className="text-[#7A8BA8] text-lg max-w-2xl mx-auto">
            Toda empresa enterprise com cloud acima de R$ 100k/mês enfrenta ao
            menos um desses desafios. A maioria enfrenta os três.
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
