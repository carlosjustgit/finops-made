import type { DiagnosticAction } from "@/types/diagnostic";

interface ActionsListProps {
  actions: DiagnosticAction[];
}

const impactConfig = {
  high: { label: "Alto impacto", color: "text-green-400", bg: "bg-green-400/10" },
  medium: { label: "Médio impacto", color: "text-amber-400", bg: "bg-amber-400/10" },
  low: { label: "Baixo impacto", color: "text-[#0047FF]", bg: "bg-[#0047FF]/10" },
};

export function ActionsList({ actions }: ActionsListProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest">
        Top 3 ações — próximos 30 dias
      </h4>
      <div className="space-y-3">
        {actions.map((action, i) => {
          const impact = impactConfig[action.impact];
          return (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-4 flex gap-4"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-black text-[#0047FF]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h5 className="text-sm font-bold text-white leading-snug">
                    {action.title}
                  </h5>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${impact.bg} ${impact.color}`}
                  >
                    {impact.label}
                  </span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
