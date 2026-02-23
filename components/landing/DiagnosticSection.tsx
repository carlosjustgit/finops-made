"use client";

import dynamic from "next/dynamic";

const DiagnosticTool = dynamic(
  () => import("@/components/diagnostic/DiagnosticTool"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0047FF] border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export function DiagnosticSection() {
  return (
    <section
      id="diagnostico"
      className="bg-[#0047FF] py-20"
      aria-labelledby="diagnostic-heading"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2
            id="diagnostic-heading"
            className="text-3xl md:text-4xl font-black text-white mb-4"
          >
            Faça seu diagnóstico agora
          </h2>
          <p className="text-white/60 text-lg">
            30 segundos. Resultado executivo imediato. Sem acesso ao seu
            ambiente.
          </p>
        </div>

        <DiagnosticTool />
      </div>
    </section>
  );
}
