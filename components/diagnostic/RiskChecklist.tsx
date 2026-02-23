import type { RiskFlag } from "@/types/diagnostic";

interface RiskChecklistProps {
  risks: RiskFlag[];
}

export function RiskChecklist({ risks }: RiskChecklistProps) {
  const activeRisks = risks.filter((r) => r.present);
  const inactiveRisks = risks.filter((r) => !r.present);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest">
        Checklist de riscos
      </h4>
      <div className="bg-white/5 border border-white/10 divide-y divide-white/5">
        {[...activeRisks, ...inactiveRisks].map((risk, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3"
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                risk.present
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {risk.present ? (
                <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3">
                  <path d="M9.53 2.47a.75.75 0 010 1.06L7.06 6l2.47 2.47a.75.75 0 11-1.06 1.06L6 7.06 3.53 9.53a.75.75 0 01-1.06-1.06L4.94 6 2.47 3.53a.75.75 0 011.06-1.06L6 4.94l2.47-2.47a.75.75 0 011.06 0z" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9.78 2.72a.75.75 0 010 1.06L5.03 8.53 2.22 5.72a.75.75 0 111.06-1.06l1.75 1.75 4.69-4.69a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm ${
                risk.present ? "text-red-300" : "text-white/40 line-through"
              }`}
            >
              {risk.label}
            </span>
            {risk.present && (
              <span className="ml-auto text-xs text-red-400 font-semibold shrink-0">
                Risco
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
