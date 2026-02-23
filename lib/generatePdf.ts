import type { DiagnosticResult, FitTier } from "@/types/diagnostic";
import { calculateOpportunityBRL } from "@/constants/benchmarks";

const BRAND_BLUE = [0, 71, 255] as const;      // #0047FF
const WHITE      = [255, 255, 255] as const;
const DARK       = [11, 31, 59] as const;       // #0B1F3B
const LIGHT_GRAY = [240, 243, 250] as const;
const MID_GRAY   = [140, 152, 170] as const;

function scoreColor(score: number): [number, number, number] {
  if (score >= 70) return [34, 197, 94];   // green
  if (score >= 40) return [251, 191, 36];  // amber
  return [239, 68, 68];                     // red
}

async function loadLogoBase64(): Promise<string | null> {
  try {
    const res = await fetch("/logo-made-branco.png");
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateDiagnosticPdf(
  result: DiagnosticResult,
  fitScore: FitTier,
  monthlySpend: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pw = doc.internal.pageSize.getWidth();   // 210
  const ph = doc.internal.pageSize.getHeight();  // 297

  const opportunity = calculateOpportunityBRL(
    monthlySpend,
    result.optimization_opportunity.low_pct,
    result.optimization_opportunity.high_pct
  );

  const fitLabels: Record<FitTier, string> = {
    high: "Alto potencial",
    medium: "Potencial médio",
    low: "Potencial inicial",
  };

  // ── HEADER ────────────────────────────────────────────────────────────────
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, pw, 42, "F");

  const logo = await loadLogoBase64();
  if (logo) {
    doc.addImage(logo, "PNG", 14, 10, 44, 15);
  } else {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...WHITE);
    doc.text("Made", 14, 22);
  }

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255, 0.7);
  doc.text("Diagnóstico FinOps & GenAI — Relatório Executivo", pw - 14, 18, { align: "right" });

  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  doc.setFontSize(8);
  doc.text(today, pw - 14, 25, { align: "right" });

  // Fit badge
  const fitLabel = fitLabels[fitScore];
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const badgeW = doc.getTextWidth(fitLabel) + 8;
  doc.setFillColor(255, 255, 255, 0.2);
  doc.setTextColor(...WHITE);
  doc.text(fitLabel, pw - 14 - badgeW / 2 + 4, 34, { align: "center" });

  // ── SECTION: SCORES ───────────────────────────────────────────────────────
  let y = 52;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Scores de Maturidade", 14, y);
  y += 8;

  const scoreItems = [
    { label: "FinOps", sublabel: "Maturidade", value: result.scores.finops_maturity },
    { label: "Dados", sublabel: "Governança", value: result.scores.data_governance },
    { label: "GenAI", sublabel: "Controle", value: result.scores.genai_control },
  ];

  const boxW = (pw - 28 - 8) / 3;
  scoreItems.forEach((s, i) => {
    const bx = 14 + i * (boxW + 4);
    const color = scoreColor(s.value);

    doc.setFillColor(...LIGHT_GRAY);
    doc.rect(bx, y, boxW, 28, "F");

    // score number
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...color);
    doc.text(`${s.value}`, bx + boxW / 2, y + 14, { align: "center" });

    // /100
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MID_GRAY);
    doc.text("/100", bx + boxW / 2, y + 20, { align: "center" });

    // labels
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...DARK);
    doc.text(s.label, bx + boxW / 2, y + 25, { align: "center" });
  });
  y += 36;

  // ── SECTION: OPPORTUNITY ─────────────────────────────────────────────────
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(14, y, pw - 28, 20, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text("OPORTUNIDADE ESTIMADA DE OTIMIZAÇÃO / MÊS", pw / 2, y + 6, { align: "center" });
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`${opportunity.low}  →  ${opportunity.high}`, pw / 2, y + 14, { align: "center" });
  y += 28;

  // ── SECTION: TOP ACTIONS ──────────────────────────────────────────────────
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Plano de Ação Prioritário", 14, y);
  y += 7;

  const impactColors: Record<string, [number, number, number]> = {
    high:   [239, 68, 68],
    medium: [251, 191, 36],
    low:    [34, 197, 94],
  };
  const impactLabel: Record<string, string> = {
    high: "Alto", medium: "Médio", low: "Baixo",
  };

  result.top_actions.forEach((action, idx) => {
    if (y > ph - 60) {
      doc.addPage();
      y = 20;
    }
    const ic = impactColors[action.impact] ?? BRAND_BLUE;

    doc.setFillColor(...LIGHT_GRAY);
    doc.rect(14, y, pw - 28, 22, "F");

    // number badge
    doc.setFillColor(...ic);
    doc.circle(20, y + 8, 4, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...WHITE);
    doc.text(`${idx + 1}`, 20, y + 10.5, { align: "center" });

    // title
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...DARK);
    doc.text(action.title, 27, y + 7);

    // impact pill
    const impText = `Impacto ${impactLabel[action.impact]}`;
    doc.setFontSize(7);
    doc.setTextColor(...ic);
    doc.text(impText, pw - 14, y + 7, { align: "right" });

    // description — wrap text
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MID_GRAY);
    const lines = doc.splitTextToSize(action.description, pw - 42);
    doc.text(lines[0] ?? "", 27, y + 13);

    y += 26;
  });

  // ── SECTION: RISK FLAGS ───────────────────────────────────────────────────
  if (y > ph - 70) { doc.addPage(); y = 20; }

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Checklist de Riscos", 14, y);
  y += 7;

  result.risk_flags.forEach((flag) => {
    if (y > ph - 20) { doc.addPage(); y = 20; }

    const dotColor: [number, number, number] = flag.present ? [239, 68, 68] : [34, 197, 94];
    doc.setFillColor(...dotColor);
    doc.circle(18, y + 2.5, 2, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", flag.present ? "bold" : "normal");
    doc.setTextColor(...DARK);
    doc.text(flag.label, 24, y + 4);
    y += 9;
  });

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(...BRAND_BLUE);
    doc.rect(0, ph - 12, pw, 12, "F");
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...WHITE);
    doc.text("made.com.br  ·  Diagnóstico FinOps & GenAI", 14, ph - 4);
    doc.text(`${p} / ${totalPages}`, pw - 14, ph - 4, { align: "right" });
  }

  doc.save("diagnostico-finops-made.pdf");
}
