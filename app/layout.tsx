import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://finops-made.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Diagnóstico FinOps e GenAI para empresas enterprise no Brasil",
  description:
    "Ferramenta gratuita de diagnóstico FinOps e controle de custos de GenAI para empresas enterprise brasileiras. Resultado executivo em 30 segundos. Sem formulário, sem acesso ao ambiente.",
  keywords: [
    "finops brasil",
    "finops enterprise",
    "controle de custos cloud brasil",
    "redução de custos aws azure gcp",
    "governança de genai",
    "custos de llm produção",
    "diagnóstico finops gratuito",
    "cloud cost optimization brasil",
    "finops foundation brasil",
    "controle de custos de ia generativa",
    "maturidade finops",
    "lgpd governança cloud",
  ],
  authors: [{ name: "Made", url: "https://www.made.com.br" }],
  creator: "Made",
  publisher: "Made",
  alternates: {
    canonical: BASE_URL,
    languages: { "pt-BR": BASE_URL },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "Made — FinOps & GenAI para empresas enterprise",
    title: "Diagnóstico FinOps e GenAI para empresas enterprise no Brasil",
    description:
      "Descubra em 30 segundos quanto sua empresa está desperdiçando em cloud e IA Generativa. Diagnóstico gratuito, sem formulário, resultado executivo imediato.",
    images: [
      {
        url: `${BASE_URL}/banner.webp`,
        width: 1200,
        height: 630,
        alt: "Diagnóstico FinOps e GenAI — Made",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico FinOps e GenAI para empresas enterprise no Brasil",
    description:
      "Descubra em 30 segundos quanto sua empresa está desperdiçando em cloud e IA Generativa. Sem formulário. Resultado imediato.",
    images: [`${BASE_URL}/banner.webp`],
  },
  icons: {
    icon: "/favicon-made.png",
    shortcut: "/favicon-made.png",
    apple: "/favicon-made.png",
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

// ── JSON-LD Structured Data ────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Made",
  alternateName: "MadeinWeb",
  url: "https://www.made.com.br",
  logo: `${BASE_URL}/logo-made-branco.png`,
  description:
    "Consultoria tecnológica brasileira especializada em arquitetura cloud, FinOps enterprise e governança de custos de IA Generativa para grandes empresas no Brasil.",
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsAbout: [
    "FinOps",
    "Cloud Cost Optimization",
    "AWS",
    "Microsoft Azure",
    "Google Cloud Platform",
    "GenAI Cost Governance",
    "LLM Cost Observability",
    "LGPD Cloud Compliance",
    "Data Governance",
    "FinOps Foundation FOCUS Standard",
  ],
  sameAs: [
    "https://www.made.com.br",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: "Portuguese",
    url: process.env.NEXT_PUBLIC_BOOKING_URL ?? BASE_URL,
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Made — Diagnóstico FinOps & GenAI",
  inLanguage: "pt-BR",
  publisher: { "@id": `${BASE_URL}/#organization` },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Diagnóstico FinOps e GenAI para empresas enterprise no Brasil",
  description:
    "Ferramenta gratuita de diagnóstico FinOps e controle de custos de GenAI. Score de maturidade, estimativa de economia e plano de ação executivo em 30 segundos.",
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  datePublished: "2025-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
    ],
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/#tool`,
  name: "Diagnóstico FinOps e GenAI — Made",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  description:
    "Ferramenta de diagnóstico gratuita que avalia maturidade FinOps, governança de dados e controle de GenAI em 30 segundos, com base em benchmarks do setor FinOps Foundation 2026. Para empresas enterprise no Brasil.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Avaliação de maturidade FinOps calibrada por setor",
    "Score de governança de dados",
    "Score de controle de GenAI e LLMs",
    "Plano de ação executivo para 30 dias",
    "Estimativa de oportunidade de economia em R$",
    "Benchmarks baseados no FinOps Foundation State of FinOps 2026",
    "Diagnóstico sem acesso ao ambiente",
    "Resultado em português brasileiro",
  ],
  author: { "@id": `${BASE_URL}/#organization` },
  provider: { "@id": `${BASE_URL}/#organization` },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como fazer o diagnóstico FinOps e GenAI da sua empresa",
  description:
    "Em 3 etapas simples, descubra o nível de maturidade FinOps da sua empresa, identifique desperdícios em cloud e receba um plano de ação executivo.",
  inLanguage: "pt-BR",
  totalTime: "PT1M",
  tool: [{ "@type": "HowToTool", name: "Diagnóstico FinOps Made" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Responda 8 perguntas objetivas",
      text: "Selecione seu provedor de cloud (AWS, Azure ou GCP), faixa de gasto mensal, setor da empresa e principais desafios. Tudo por clique — sem campos de texto, sem acesso ao ambiente, pronto em menos de 30 segundos.",
      url: `${BASE_URL}/#diagnostico`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "A IA analisa e compara com benchmarks do mercado",
      text: "Nossa IA cruza seu perfil com os benchmarks do FinOps Foundation State of FinOps 2026 e CloudZero AI Era Report para o seu setor específico, calculando scores de maturidade em FinOps, governança de dados e controle de GenAI.",
      url: `${BASE_URL}/#diagnostico`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Receba seu plano executivo imediato",
      text: "Em segundos você recebe: scores de maturidade (0-100), estimativa de oportunidade de economia em R$ por mês, e 3 ações concretas e específicas para os próximos 30 dias — calibradas para o seu provedor, setor e nível de gasto.",
      url: `${BASE_URL}/#diagnostico`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é FinOps e por que empresas brasileiras precisam disso agora?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FinOps (Financial Operations) é a prática que une engenharia, finanças e negócio para controlar e maximizar o retorno dos investimentos em cloud. No Brasil, empresas enterprise com gastos acima de R$ 100k/mês em AWS, Azure ou GCP desperdiçam em média 28-35% do budget — o equivalente a R$ 28k a R$ 35k a cada R$ 100k gastos. Com a pressão cambial sobre contratos dolarizados e a explosão dos custos de IA Generativa em 2025-2026, o FinOps deixou de ser opcional e virou prioridade de boardroom.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto as empresas brasileiras desperdiçam em cloud por ano?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Segundo o relatório State of FinOps 2026 (FinOps Foundation) e dados da BCG, empresas sem práticas estruturadas de FinOps desperdiçam entre 28% e 35% do gasto mensal em cloud. Para uma empresa que gasta R$ 500k/mês, isso representa R$ 140k-175k desperdiçados todo mês — mais de R$ 1,6 milhão por ano. Os principais culpados: instâncias superprovisionadas, ambientes de desenvolvimento rodando 24/7, dados duplicados em múltiplos buckets e APIs de LLM sem rate limit.",
      },
    },
    {
      "@type": "Question",
      name: "Por que os custos de GenAI e LLMs são tão difíceis de controlar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diferente da infraestrutura cloud tradicional, os custos de GenAI escalam com o comportamento do usuário e padrões de prompt. Um usuário fazendo perguntas mais longas pode dobrar o custo de uma sessão. Em produção, empresas com múltiplos casos de uso de IA Generativa erram as previsões de custo em mais de 50%. No Brasil, instâncias de GPU em São Paulo são 40-60% mais caras que nos EUA.",
      },
    },
    {
      "@type": "Question",
      name: "O diagnóstico acessa meus sistemas ou dados internos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. O diagnóstico é 100% baseado em perguntas objetivas sobre o seu perfil — provedor de cloud, faixa de gasto, setor e desafios. Nenhuma credencial, nenhum acesso a ambiente, nenhum dado sensível é coletado.",
      },
    },
    {
      "@type": "Question",
      name: "Como medir a maturidade FinOps da minha empresa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A maturidade FinOps é avaliada em três dimensões: Visibilidade (você sabe exatamente onde cada real é gasto, por time, produto e serviço?), Governança (há políticas, alertas e chargeback ativos?) e Otimização (há processos contínuos de rightsizing, cobertura de compromissos e automação?). Nossa ferramenta gera um score de 0-100 em cada dimensão, calibrado contra benchmarks do seu setor.",
      },
    },
    {
      "@type": "Question",
      name: "Quais setores no Brasil mais se beneficiam de FinOps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Todos os setores com cloud acima de R$ 100k/mês se beneficiam, mas os impactos são maiores em: Financeiro/Bancário (LGPD, BACEN, múltiplas contas); Varejo/E-commerce (picos como Black Friday geram superprovisionamento crônico); Saúde/Farmacêutico (dados de pacientes em múltiplos provedores); e Telecom/Tecnologia (maior adoção de GenAI, maior risco de runaway cost em LLMs).",
      },
    },
    {
      "@type": "Question",
      name: "O que é LGPD e como ela se relaciona com governança de cloud?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A LGPD (Lei Geral de Proteção de Dados) exige que empresas saibam onde os dados pessoais estão armazenados, quem tem acesso e por quanto tempo são retidos. Isso cria uma intersecção direta com governança de cloud: sem visibilidade de cada conta cloud e bucket de dados, a empresa corre risco de não conformidade com a LGPD — além de pagar por dados que deveriam ter sido deletados. FinOps e LGPD andam juntos.",
      },
    },
    {
      "@type": "Question",
      name: "Como a Made ajuda depois do diagnóstico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Com os scores e o plano de 30 dias em mãos, você pode agendar uma revisão executiva com um especialista Made para validar a estimativa de economia e montar um roadmap de implementação. A Made atua com times enterprise no Brasil com foco em AWS, Azure e GCP, e especialização em governança de custos de GenAI.",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
