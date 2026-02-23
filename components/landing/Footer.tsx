import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0047FF] text-white/70 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <Image
          src="/logo-made-branco.png"
          alt="Made logo"
          title="Made"
          width={120}
          height={40}
          className="h-8 w-auto object-contain"
        />
        <p className="text-center text-white/60">
          Diagnóstico FinOps e controle de custos GenAI para empresas enterprise.
        </p>
        <p className="text-white/60">© {new Date().getFullYear()} Made</p>
      </div>
    </footer>
  );
}
