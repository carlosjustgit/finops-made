"use client";

import { useState } from "react";

const faqs = [
  {
    question: "O que é FinOps?",
    answer:
      "FinOps (Financial Operations) é uma prática de gestão financeira de cloud que une equipes de engenharia, finanças e negócio para maximizar o valor de negócio dos investimentos em cloud. Envolve visibilidade de custos, alocação de despesas, otimização contínua e governança de recursos.",
  },
  {
    question: "Por que GenAI aumenta o risco de custo?",
    answer:
      "Modelos de IA Generativa consomem GPU e tokens de forma imprevisível. Sem observabilidade de custo por chamada de API, por modelo e por time, empresas em produção com GenAI costumam gastar 30–60% acima do orçamento previsto. A falta de guardrails, rate limits e alertas transforma cada novo caso de uso em risco financeiro.",
  },
  {
    question: "Como medir a maturidade de cloud da minha empresa?",
    answer:
      "A maturidade de cloud é avaliada em três dimensões: visibilidade (você sabe onde cada centavo é gasto?), governança (há políticas e alertas ativos?) e otimização (há processos contínuos de rightsizing, reservas e desconto?). Nossa ferramenta de diagnóstico avalia as três dimensões em 30 segundos com base em benchmarks do setor.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="bg-white py-20"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-black text-[#0B1F3B] mb-4"
          >
            Perguntas frequentes
          </h2>
        </div>

        <dl className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="border border-[#E8ECF4] rounded-xl overflow-hidden"
            >
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[#0B1F3B] hover:bg-[#F4F6FA] transition-colors"
                  aria-expanded={open === i}
                >
                  <span>{faq.question}</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-5 h-5 text-[#7A8BA8] transition-transform duration-200 shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </dt>
              {open === i && (
                <dd className="px-6 pb-5 text-[#7A8BA8] text-sm leading-relaxed">
                  {faq.answer}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
