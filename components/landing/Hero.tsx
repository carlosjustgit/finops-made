import Image from "next/image";
import { CTAButton } from "@/components/ui/CTAButton";

interface HeroProps {
  onStartDiagnostic?: () => void;
}

export function Hero({ onStartDiagnostic }: HeroProps) {
  return (
    <section
      className="relative bg-[#0B1F3B] text-white overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <Image
        src="/banner.webp"
        alt=""
        fill
        priority
        quality={85}
        className="object-cover object-center"
        aria-hidden="true"
      />
      {/* Dark overlay so text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#0B1F3B]/70"
      />

      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#0047FF]/10 border border-[#0047FF]/20 text-white/70 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-[#0047FF] animate-pulse" />
          FinOps + Governança de GenAI para o mercado brasileiro
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight text-balance mb-6">
          Sua empresa está desperdiçando{" "}
          <span className="text-[#0047FF]">até 35% do orçamento de cloud.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Diagnóstico executivo gratuito em 30 segundos. Sem formulário, sem
          acesso ao seu ambiente. Resultado calibrado pelos benchmarks do
          FinOps Foundation 2026 para o seu setor no Brasil.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#diagnostico">
            <CTAButton
              variant="primary"
              onClick={onStartDiagnostic}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Fazer diagnóstico agora (é grátis)
            </CTAButton>
          </a>
          <p className="text-sm text-white/50">
            Grátis · Sem cadastro · Resultado em 30 segundos
          </p>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { value: "30s", label: "Para concluir o diagnóstico", source: null },
            { value: "35%", label: "Desperdício médio em cloud no Brasil", source: "BCG 2025" },
            { value: "100%", label: "Sem acesso ao seu ambiente", source: null },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              {stat.source && (
                <div className="text-[10px] text-white/25 mt-0.5">{stat.source}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
