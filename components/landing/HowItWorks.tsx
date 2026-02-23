const steps = [
  {
    number: "01",
    title: "Seleções rápidas por faixa",
    description:
      "8 perguntas objetivas sobre seu ambiente cloud, tudo por botão ou seleção. Nenhum campo de texto. Nenhum acesso ao seu ambiente. Pronto em 30 segundos.",
  },
  {
    number: "02",
    title: "Análise comparada com benchmarks",
    description:
      "Nossa IA sênior cruza suas respostas com benchmarks de mercado do setor FinOps Foundation e Gartner para o seu segmento e nível de gasto.",
  },
  {
    number: "03",
    title: "Plano executivo imediato",
    description:
      "Você recebe scores de maturidade, estimativa de oportunidade de economia e 3 ações concretas para os próximos 30 dias. Sem espera.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20" aria-labelledby="how-it-works-heading">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-4xl font-black text-[#0B1F3B] mb-4"
          >
            Como funciona o diagnóstico
          </h2>
          <p className="text-[#7A8BA8] text-lg max-w-xl mx-auto">
            Tecnologia de IA enterprise aplicada em 3 etapas simples.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-[#E8ECF4]"
          />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-start md:items-center md:text-center">
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0B1F3B] text-white flex items-center justify-center mb-6 shrink-0">
                <span className="text-xs font-black text-blue-300 absolute top-2 right-2 leading-none">
                  {step.number}
                </span>
                <StepIcon index={i} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3B] mb-3">
                {step.title}
              </h3>
              <p className="text-[#7A8BA8] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepIcon({ index }: { index: number }) {
  const icons = [
    // Cursor click
    <svg key="click" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
    </svg>,
    // Chart bar
    <svg key="chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>,
    // Document check
    <svg key="doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];
  return icons[index] ?? null;
}
