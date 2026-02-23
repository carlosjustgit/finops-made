export function Footer() {
  return (
    <footer className="bg-[#0B1F3B] text-blue-200/60 py-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="font-bold text-white">
          FinOps<span className="text-[#1E4DFF]">.</span>made
        </div>
        <p className="text-center">
          Diagnóstico FinOps e controle de custos GenAI para empresas enterprise.
        </p>
        <p>© {new Date().getFullYear()} FinOps-made</p>
      </div>
    </footer>
  );
}
