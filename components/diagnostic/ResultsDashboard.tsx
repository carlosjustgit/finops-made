"use client";

import type { DiagnosticResult, FitTier } from "@/types/diagnostic";
import { calculateOpportunityBRL } from "@/constants/benchmarks";
import { ScoreRing } from "./ScoreRing";
import { ActionsList } from "./ActionsList";
import { RiskChecklist } from "./RiskChecklist";
import { CTAButton } from "@/components/ui/CTAButton";
import { trackReviewClicked, trackPdfRequested } from "@/lib/tracking";

interface ResultsDashboardProps {
  result: DiagnosticResult;
  fitScore: FitTier;
  monthlySpend: string;
  onReset: () => void;
}

const fitLabels: Record<FitTier, { label: string; color: string; bg: string }> = {
  high: { label: "Alto potencial", color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
  medium: { label: "Potencial médio", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  low: { label: "Potencial inicial", color: "text-[#0047FF]", bg: "bg-[#0047FF]/10 border-[#0047FF]/20" },
};

export function ResultsDashboard({
  result,
  fitScore,
  monthlySpend,
  onReset,
}: ResultsDashboardProps) {
  const { scores, optimization_opportunity, top_actions, risk_flags } = result;
  const opportunity = calculateOpportunityBRL(
    monthlySpend,
    optimization_opportunity.low_pct,
    optimization_opportunity.high_pct
  );
  const fit = fitLabels[fitScore];
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#";

  return (
    <div className="space-y-6 transition-opacity duration-200">
      {/* Header */}
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">
              Diagnóstico concluído
            </h3>
            <p className="text-white/50 text-sm">
              Resultado baseado em benchmarks de mercado para o seu perfil
            </p>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full border ${fit.bg} ${fit.color}`}
          >
            {fit.label}
          </span>
        </div>

        {/* Score rings */}
        <div className="grid grid-cols-3 gap-4">
          <ScoreRing
            score={scores.finops_maturity}
            label="FinOps"
            sublabel="Maturidade"
          />
          <ScoreRing
            score={scores.data_governance}
            label="Dados"
            sublabel="Governança"
          />
          <ScoreRing
            score={scores.genai_control}
            label="GenAI"
            sublabel="Controle"
          />
        </div>

        {/* Opportunity banner */}
        <div className="mt-6 bg-[#0047FF]/10 border border-[#0047FF]/20 px-5 py-4 text-center">
          <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">
            Oportunidade estimada de otimização / mês
          </p>
          <p className="text-2xl font-black text-white">
            {opportunity.low}{" "}
            <span className="text-white/40 text-lg font-bold">→</span>{" "}
            {opportunity.high}
          </p>
          <p className="text-white/40 text-xs mt-1">
            {optimization_opportunity.low_pct.toFixed(0)}–
            {optimization_opportunity.high_pct.toFixed(0)}% do gasto mensal em
            cloud
          </p>
        </div>
      </div>

      {/* Actions */}
      <ActionsList actions={top_actions} />

      {/* Risk checklist */}
      <RiskChecklist risks={risk_flags} />

      {/* CTAs */}
      <div className="bg-white/5 border border-white/10 p-6 space-y-4">
        <div className="text-center mb-2">
          <h4 className="text-lg font-bold text-white mb-1">
            Próximo passo recomendado
          </h4>
          <p className="text-white/50 text-sm">
            Agende uma revisão executiva e transforme esse diagnóstico em um
            plano de ação validado.
          </p>
        </div>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
          <CTAButton
            variant="primary"
            fullWidth
            onClick={() => trackReviewClicked(fitScore)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14A.75.75 0 008 13.25h-.01zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Agendar revisão executiva do diagnóstico
          </CTAButton>
        </a>

        <CTAButton
          variant="secondary"
          fullWidth
          onClick={() => trackPdfRequested(fitScore)}
        >
          Baixar relatório completo em PDF
        </CTAButton>

        <button
          onClick={onReset}
          className="w-full text-center text-xs text-white/30 hover:text-white/60 transition-colors py-1"
        >
          Refazer diagnóstico
        </button>
      </div>
    </div>
  );
}
