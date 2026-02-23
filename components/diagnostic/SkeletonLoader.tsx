export function SkeletonLoader() {
  return (
    <div
      className="animate-pulse space-y-6 p-6"
      role="status"
      aria-label="Analisando seus dados..."
    >
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-full border-4 border-[#0047FF] border-t-transparent animate-spin mx-auto" />
        <p className="text-white/60 text-sm font-medium">
          Analisando seu perfil com benchmarks de mercado...
        </p>
      </div>

      {/* Score placeholders */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4 space-y-3">
            <div className="w-14 h-14 rounded-full bg-white/10 mx-auto" />
            <div className="h-3 bg-white/10 rounded-full w-3/4 mx-auto" />
            <div className="h-2 bg-white/5 rounded-full w-1/2 mx-auto" />
          </div>
        ))}
      </div>

      {/* Actions placeholder */}
      <div className="space-y-3 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4 flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-white/10 rounded-full w-2/3" />
              <div className="h-2 bg-white/5 rounded-full w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
