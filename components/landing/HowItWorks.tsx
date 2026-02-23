import { MousePointerClick, BarChart3, FileCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Seleções rápidas por faixa",
    description:
      "8 perguntas objetivas sobre seu ambiente cloud, tudo por botão ou seleção. Nenhum campo de texto. Nenhum acesso ao seu ambiente. Pronto em 30 segundos.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Análise comparada com benchmarks",
    description:
      "Nossa IA sênior cruza suas respostas com benchmarks de mercado do setor FinOps Foundation e Gartner para o seu segmento e nível de gasto.",
  },
  {
    number: "03",
    icon: FileCheck,
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
            className="hidden md:block absolute top-6 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-[#E8ECF4]"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col items-start md:items-center md:text-center"
              >
                <div className="relative z-10 mb-6 shrink-0">
                  <span className="text-[10px] font-black text-[#7A8BA8] block mb-2 md:text-center">
                    {step.number}
                  </span>
                  <Icon size={28} strokeWidth={1.5} className="text-[#0047FF]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3B] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#7A8BA8] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
