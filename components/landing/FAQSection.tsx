const faqs = [
  {
    question: "O que é FinOps e por que empresas brasileiras precisam disso agora?",
    answer:
      "FinOps (Financial Operations) é a prática que une engenharia, finanças e negócio para controlar e maximizar o retorno dos investimentos em cloud. No Brasil, empresas enterprise com gastos acima de R$ 100k/mês em AWS, Azure ou GCP desperdiçam em média 28-35% do budget — o equivalente a R$ 28k a R$ 35k a cada R$ 100k gastos. Com a pressão cambial sobre contratos dolarizados e a explosão dos custos de IA Generativa em 2025-2026, o FinOps deixou de ser opcional e virou prioridade de boardroom.",
  },
  {
    question: "Quanto as empresas brasileiras desperdiçam em cloud por ano?",
    answer:
      "Segundo o relatório State of FinOps 2026 (FinOps Foundation) e dados da BCG, empresas sem práticas estruturadas de FinOps desperdiçam entre 28% e 35% do gasto mensal em cloud. Para uma empresa que gasta R$ 500k/mês, isso representa R$ 140k-175k desperdiçados todo mês — mais de R$ 1,6 milhão por ano. Os principais culpados: instâncias superprovisionadas, ambientes de desenvolvimento rodando 24/7, dados duplicados em múltiplos buckets e APIs de LLM sem rate limit.",
  },
  {
    question: "Por que os custos de GenAI e LLMs são tão difíceis de controlar?",
    answer:
      "Diferente da infraestrutura cloud tradicional (que escala com decisões de engenharia), os custos de GenAI escalam com o comportamento do usuário e padrões de prompt. Um usuário fazendo perguntas mais longas pode dobrar o custo de uma sessão. Em produção, empresas com múltiplos casos de uso de IA Generativa erram as previsões de custo em mais de 50% — mesmo aquelas com práticas maduras de FinOps. No Brasil, o problema é amplificado: instâncias de GPU na região São Paulo são as mais caras globalmente, chegando a custar 40-60% mais que regiões norte-americanas.",
  },
  {
    question: "O diagnóstico acessa meus sistemas ou dados internos?",
    answer:
      "Não. O diagnóstico é 100% baseado em perguntas objetivas sobre o seu perfil — provedor de cloud, faixa de gasto, setor e desafios. Nenhuma credencial, nenhum acesso a ambiente, nenhum dado sensível. É o mesmo princípio de uma consulta médica preliminar: o especialista faz perguntas estruturadas e, a partir do seu perfil, cruza com benchmarks do mercado para identificar onde estão os maiores riscos. Em 30 segundos você tem um diagnóstico executivo calibrado para o seu setor.",
  },
  {
    question: "Como o diagnóstico é diferente de uma consultoria tradicional?",
    answer:
      "Uma consultoria tradicional de FinOps leva semanas de discovery, acesso a ambientes, entrevistas com times e custa entre R$ 50k e R$ 200k só na fase de diagnóstico. Nossa ferramenta entrega um diagnóstico executivo calibrado por IA em 30 segundos, sem burocracia e sem custo. O resultado não substitui uma consultoria aprofundada — mas te diz com precisão se vale a pena investir nela, e onde focar primeiro.",
  },
  {
    question: "Quais setores mais se beneficiam de FinOps no Brasil?",
    answer:
      "Todos os setores com cloud acima de R$ 100k/mês se beneficiam, mas os impactos são maiores em: Financeiro/Bancário (alta densidade de dados, múltiplas contas, requisitos de LGPD e BACEN); Varejo/E-commerce (picos sazonais como Black Friday geram superprovisionamento crônico); Saúde/Farmacêutico (dados de pacientes em múltiplos provedores, baixa governança); e Telecom/Tecnologia (maior adoção de GenAI, maior risco de runaway cost em APIs de LLM).",
  },
  {
    question: "O que é maturidade FinOps e como ela é medida?",
    answer:
      "A maturidade FinOps é avaliada em três dimensões: Visibilidade (você sabe exatamente onde cada real é gasto, por time, produto e serviço?), Governança (há políticas, alertas e chargeback ativos?) e Otimização (há processos contínuos de rightsizing, cobertura de compromissos e automação?). Nossa ferramenta gera um score de 0-100 em cada dimensão, calibrado contra benchmarks do seu setor. Uma empresa no setor financeiro com score 70 em FinOps está acima da mediana do setor (62) — o que significa economia comprovada de ~16% do gasto mensal.",
  },
  {
    question: "Como a Made ajuda depois do diagnóstico?",
    answer:
      "O diagnóstico é o ponto de partida. Com os scores e o plano de 30 dias em mãos, você pode agendar uma revisão executiva com um especialista Made para aprofundar os achados, validar a estimativa de economia e montar um roadmap de implementação. A Made atua com times enterprise no Brasil há anos, com foco em AWS, Azure e GCP — e com especialização crescente em governança de custos de GenAI, que se tornou a prioridade #1 do FinOps em 2026.",
  },
  {
    question: "O que é LGPD e como ela se relaciona com governança de cloud?",
    answer:
      "A LGPD (Lei Geral de Proteção de Dados) exige que empresas saibam onde os dados pessoais estão armazenados, quem tem acesso e por quanto tempo são retidos. Isso cria uma intersecção direta com governança de cloud: sem saber exatamente o que roda em cada conta cloud e bucket de dados, a empresa corre risco de não conformidade com LGPD — além de pagar por dados que deveriam ter sido deletados. FinOps e LGPD andam juntos: visibilidade de dados é visibilidade de custo.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-white py-20" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-black text-[#0B1F3B] mb-4"
          >
            Perguntas frequentes
          </h2>
          <p className="text-[#7A8BA8] text-lg">
            Tudo que você precisa saber antes de começar o diagnóstico.
          </p>
        </div>

        {/* Using <details>/<summary> so answers are present in SSR HTML for AI crawlers */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border border-[#E8ECF4] overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-[#0B1F3B] hover:bg-[#F4F6FA] transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-[#7A8BA8] shrink-0 ml-4 transition-transform duration-200 group-open:rotate-180"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <p className="px-6 pb-5 pt-1 text-[#7A8BA8] text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
