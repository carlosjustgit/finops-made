const stats = [
  { value: "+10 anos", label: "Entregando projetos de cloud enterprise no Brasil" },
  { value: "AWS · Azure · GCP", label: "Certificados nos três principais provedores" },
  { value: "R$ 2B+", label: "Em gastos de cloud gerenciados e otimizados" },
  { value: "LGPD-ready", label: "Governança de dados alinhada à legislação brasileira" },
];

const sectors = [
  "Financeiro & Bancário",
  "Varejo & E-commerce",
  "Saúde & Farmacêutico",
  "Indústria & Manufatura",
  "Telecom & Tecnologia",
  "Governo & Setor Público",
];

export function CredibilitySection() {
  return (
    <section
      className="bg-[#F4F6FA] py-20 border-t border-[#E8ECF4]"
      aria-labelledby="credibility-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#0047FF] text-sm font-bold uppercase tracking-widest mb-3">
            Por que confiar no diagnóstico
          </p>
          <h2
            id="credibility-heading"
            className="text-3xl md:text-4xl font-black text-[#0B1F3B] mb-4"
          >
            Especialistas brasileiros em cloud enterprise
          </h2>
          <p className="text-[#7A8BA8] text-lg max-w-2xl mx-auto">
            A Made é uma consultoria tecnológica brasileira especializada em
            arquitetura cloud, FinOps e governança de IA para grandes empresas.
            Não somos uma ferramenta genérica — somos especialistas que conhecem
            os desafios reais do mercado brasileiro.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-[#E8ECF4] p-6 text-center"
            >
              <div className="text-xl font-black text-[#0047FF] mb-2 leading-tight">
                {s.value}
              </div>
              <div className="text-xs text-[#7A8BA8] leading-snug">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sectors served */}
        <div className="text-center">
          <p className="text-sm font-semibold text-[#0B1F3B] uppercase tracking-wider mb-5">
            Setores atendidos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="bg-white border border-[#E8ECF4] text-[#7A8BA8] text-sm px-4 py-2 font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* Methodology note — important for GEO trust signals */}
        <div className="mt-14 bg-white border border-[#E8ECF4] p-8 text-center">
          <p className="text-[#0B1F3B] font-bold mb-2">
            Metodologia baseada em dados públicos de mercado
          </p>
          <p className="text-[#7A8BA8] text-sm max-w-2xl mx-auto leading-relaxed">
            Os benchmarks usados no diagnóstico são derivados do{" "}
            <strong>FinOps Foundation State of FinOps 2026</strong>, relatório{" "}
            <strong>CloudZero FinOps in the AI Era 2026</strong> e análises da{" "}
            <strong>BCG Cloud Waste Report 2025</strong>. Os scores são
            calculados comparando o perfil da empresa com a mediana do seu setor
            — não são estimativas genéricas.
          </p>
        </div>
      </div>
    </section>
  );
}
