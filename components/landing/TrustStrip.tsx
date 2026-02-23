export function TrustStrip() {
  const badges = [
    { label: "AWS Partner", abbr: "AWS" },
    { label: "ISG Leader in Data & AI", abbr: "ISG" },
    { label: "Google Cloud Partner", abbr: "GCP" },
    { label: "Microsoft Azure Partner", abbr: "AZURE" },
  ];

  return (
    <section
      className="bg-white border-b border-[#E8ECF4] py-6"
      aria-label="Parceiros e certificações"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <span className="text-xs text-[#7A8BA8] uppercase tracking-widest font-medium whitespace-nowrap">
            Reconhecido por
          </span>
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity"
              title={badge.label}
            >
              <div className="w-8 h-8 rounded bg-[#0B1F3B] flex items-center justify-center">
                <span className="text-[8px] font-black text-white tracking-tighter">
                  {badge.abbr}
                </span>
              </div>
              <span className="text-sm font-semibold text-[#3D5070] hidden sm:block">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
