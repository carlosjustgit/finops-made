import Image from "next/image";

const LOGOS = [
  {
    src: "/aws.svg",
    alt: "AWS Partner",
    title: "AWS Partner",
    width: 120,
    height: 40,
  },
  {
    src: "/isg.svg",
    alt: "ISG Leader in Data & AI",
    title: "ISG Leader in Data & AI",
    width: 120,
    height: 40,
  },
  {
    src: "/google.svg",
    alt: "Google Cloud Partner",
    title: "Google Cloud Partner",
    width: 120,
    height: 40,
  },
  {
    src: "/azure.svg",
    alt: "Microsoft Azure Partner",
    title: "Microsoft Azure Partner",
    width: 120,
    height: 40,
  },
];

export function TrustStrip() {
  return (
    <section
      className="bg-white border-b border-[#E8ECF4] py-6"
      aria-label="Parceiros e certificações"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <span className="text-xs text-[#7A8BA8] uppercase tracking-widest font-medium whitespace-nowrap">
            Reconhecido por
          </span>
          {LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="opacity-40 hover:opacity-70 transition-opacity duration-200 flex items-center"
              title={logo.title}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-7 w-auto max-w-[110px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
