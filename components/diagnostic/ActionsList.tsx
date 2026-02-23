import type { DiagnosticAction } from "@/types/diagnostic";

interface ActionsListProps {
  actions: DiagnosticAction[];
}

const impactConfig = {
  high: { label: "Alto impacto", color: "text-green-400", bg: "bg-green-400/10" },
  medium: { label: "Médio impacto", color: "text-amber-400", bg: "bg-amber-400/10" },
  low: { label: "Baixo impacto", color: "text-blue-400", bg: "bg-blue-400/10" },
};

export function ActionsList({ actions }: ActionsListProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-blue-200/70 uppercase tracking-widest">
        Top 3 ações — próximos 30 dias
      </h4>
      <div className="space-y-3">
        {actions.map((action, i) => {
          const impact = impactConfig[action.impact];
          return (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1E4DFF]/20 text-[#1E4DFF] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-black text-blue-300">
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
                <p className="text-xs text-blue-200/60 leading-relaxed">
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
