import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { ProblemBlocks } from "@/components/landing/ProblemBlocks";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DiagnosticSection } from "@/components/landing/DiagnosticSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { PageAnalytics } from "@/components/PageAnalytics";

export default function Home() {
  return (
    <>
      <PageAnalytics />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemBlocks />
        <HowItWorks />
        <DiagnosticSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
