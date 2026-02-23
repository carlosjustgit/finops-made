import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Diagnóstico FinOps e GenAI para empresas enterprise",
  description:
    "Diagnóstico gratuito em 30 segundos para avaliar custos de cloud e governança de IA. Sem formulário. Resultado executivo imediato.",
  keywords: [
    "finops enterprise",
    "redução de custos de cloud",
    "governança de genai",
    "controle de custos aws",
    "diagnóstico finops",
    "finops brasil",
    "cloud cost optimization",
  ],
  authors: [{ name: "FinOps-made" }],
  creator: "FinOps-made",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://finops-made.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "FinOps-made",
    title: "Diagnóstico FinOps e GenAI para empresas enterprise",
    description:
      "Diagnóstico gratuito em 30 segundos para avaliar custos de cloud e governança de IA. Sem formulário.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico FinOps e GenAI para empresas enterprise",
    description:
      "Diagnóstico gratuito em 30 segundos para avaliar custos de cloud e governança de IA. Sem formulário.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FinOps-made",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://finops-made.vercel.app",
  description:
    "Especialistas em FinOps, Cloud Governance e controle de custos de GenAI para empresas enterprise no Brasil.",
  sameAs: [],
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Diagnóstico FinOps e GenAI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Ferramenta de diagnóstico gratuita que avalia maturidade FinOps, governança de dados e controle de GenAI em 30 segundos.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Avaliação de maturidade FinOps",
    "Score de governança de dados",
    "Score de controle de GenAI",
    "Plano de ação executivo",
    "Estimativa de oportunidade de economia",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é FinOps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FinOps (Financial Operations) é uma prática de gestão financeira de cloud que une equipes de engenharia, finanças e negócio para maximizar o valor de negócio dos investimentos em cloud. Envolve visibilidade de custos, alocação de despesas, otimização contínua e governança de recursos em AWS, Azure e GCP.",
      },
    },
    {
      "@type": "Question",
      name: "Por que GenAI aumenta o risco de custo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modelos de IA Generativa consomem GPU e tokens de forma imprevisível. Sem observabilidade de custo por chamada de API, por modelo e por time, empresas em produção com GenAI costumam gastar 30–60% acima do orçamento previsto. A falta de guardrails e alertas transforma cada novo caso de uso em risco financeiro.",
      },
    },
    {
      "@type": "Question",
      name: "Como medir a maturidade de cloud da minha empresa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A maturidade de cloud é avaliada em três dimensões: visibilidade (você sabe onde cada centavo é gasto?), governança (há políticas e alertas ativos?) e otimização (há processos contínuos de rightsizing e reservas?). A ferramenta de diagnóstico FinOps-made avalia as três dimensões em 30 segundos com base em benchmarks do setor.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
