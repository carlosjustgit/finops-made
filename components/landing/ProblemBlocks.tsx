const problems = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
    title: "Custos imprevisíveis",
    description:
      "Empresas enterprise gastam até 35% acima do necessário em cloud sem perceber. Recursos ociosos, instâncias superprovisionadas e APIs sem limite acumulam despesas invisíveis.",
    stat: "35%",
    statLabel: "de desperdício médio",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
    ),
    title: "Desperdício invisível",
    description:
      "Sem visibilidade unificada entre contas e provedores, líderes tomam decisões às cegas. Data Lakes subutilizados e pipelines redundantes drenam budget sem entregar valor.",
    stat: "60%",
    statLabel: "das empresas sem visibilidade",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
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
          {problems.map((problem) => (
            <article
              key={problem.title}
              className="bg-white rounded-2xl p-8 border border-[#E8ECF4] hover:border-[#1E4DFF]/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E4DFF]/10 text-[#1E4DFF] flex items-center justify-center mb-6">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">
                {problem.title}
              </h3>
              <p className="text-[#7A8BA8] text-sm leading-relaxed mb-6">
                {problem.description}
              </p>
              <div className="pt-4 border-t border-[#E8ECF4]">
                <span className="text-2xl font-black text-[#1E4DFF]">
                  {problem.stat}
                </span>
                <span className="text-xs text-[#7A8BA8] ml-2">
                  {problem.statLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
