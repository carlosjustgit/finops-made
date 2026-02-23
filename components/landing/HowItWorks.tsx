import { MousePointerClick, BarChart3, FileCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "8 perguntas, tudo por clique",
    description:
      "Provedor de cloud, faixa de gasto mensal, setor e seus maiores desafios. Nenhum campo de texto, nenhum acesso ao seu ambiente. Você termina em menos de 30 segundos — no celular ou no computador.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "IA compara com benchmarks do seu setor",
    description:
      "Nossa IA cruza seu perfil com os benchmarks do FinOps Foundation State of FinOps 2026 para o seu segmento e faixa de gasto. O resultado não é genérico — é calibrado para a realidade de empresas brasileiras com o mesmo perfil que o seu.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Plano executivo em segundos",
    description:
      "Score de maturidade FinOps, governança de dados e controle de GenAI (0–100). Estimativa de economia em R$/mês. E 3 ações concretas para os próximos 30 dias — específicas para o seu provedor, setor e nível de maturidade.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20" aria-labelledby="how-it-works-heading">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#0047FF] text-sm font-bold uppercase tracking-widest mb-3">
            Simples, rápido e sem burocracia
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-4xl font-black text-[#0B1F3B] mb-4"
          >
            Como funciona o diagnóstico
          </h2>
          <p className="text-[#7A8BA8] text-lg max-w-xl mx-auto">
            Sem discovery demorado, sem reunião de alinhamento, sem proposta comercial.
            Você começa agora e já tem o resultado.
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
