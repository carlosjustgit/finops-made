import type { DiagnosticResult, FitTier } from "@/types/diagnostic";
import { calculateOpportunityBRL } from "@/constants/benchmarks";

// Solid RGB colours only — jsPDF interprets 4-param calls as CMYK, not RGBA
const BRAND_BLUE  = [0, 71, 255]   as const;  // #0047FF
const WHITE       = [255, 255, 255] as const;
const WHITE_DIM   = [200, 215, 255] as const;  // "white/70" equivalent on blue bg
const WHITE_FAINT = [150, 175, 230] as const;  // "white/40" equivalent on blue bg
const DARK        = [11, 31, 59]    as const;  // #0B1F3B
const LIGHT_GRAY  = [240, 243, 250] as const;
const MID_GRAY    = [140, 152, 170] as const;

function scoreColor(score: number): [number, number, number] {
  if (score >= 70) return [34, 197, 94];
  if (score >= 40) return [251, 191, 36];
  return [239, 68, 68];
}

interface LogoData { base64: string; w: number; h: number }

async function loadLogo(maxW = 50, maxH = 18): Promise<LogoData | null> {
  try {
    const res  = await fetch("/logo-made-branco.png");
    const blob = await res.blob();
    const base64: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    // Get natural dimensions via an offscreen Image element
    const dims: { w: number; h: number } = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ w: maxW, h: maxH });
      img.src = base64;
    });
    // Scale to fit within maxW × maxH while preserving aspect ratio
    const ratio  = dims.w / dims.h;
    let finalW = maxW;
    let finalH = maxW / ratio;
    if (finalH > maxH) { finalH = maxH; finalW = maxH * ratio; }
    return { base64, w: finalW, h: finalH };
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
    high:   "Alto potencial",
    medium: "Potencial médio",
    low:    "Potencial inicial",
  };

  // ── HEADER ────────────────────────────────────────────────────────────────
  const headerH = 44;
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, pw, headerH, "F");

  const logo = await loadLogo(52, 18);
  if (logo) {
    // Centre logo vertically in header
    const logoY = (headerH - logo.h) / 2;
    doc.addImage(logo.base64, "PNG", 14, logoY, logo.w, logo.h);
  } else {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...WHITE);
    doc.text("Made", 14, 22);
  }

  // Right-side header text — use solid colours, never 4-param calls
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...WHITE);
  doc.text("Diagnóstico FinOps & GenAI · Relatório Executivo", pw - 14, 16, { align: "right" });

  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...WHITE_DIM);
  doc.text(today, pw - 14, 23, { align: "right" });

  // Fit badge (text only — no semi-transparent box)
  const fitLabel = fitLabels[fitScore];
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...WHITE);
  doc.text(fitLabel, pw - 14, 33, { align: "right" });

  // ── SECTION: SCORES ───────────────────────────────────────────────────────
  let y = headerH + 12;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Scores de Maturidade", 14, y);
  y += 8;

  const scoreItems = [
    { label: "FinOps",  sublabel: "Maturidade", value: result.scores.finops_maturity },
    { label: "Dados",   sublabel: "Governança",  value: result.scores.data_governance },
    { label: "GenAI",   sublabel: "Controle",    value: result.scores.genai_control },
  ];

  const boxW = (pw - 28 - 8) / 3;
  scoreItems.forEach((s, i) => {
    const bx    = 14 + i * (boxW + 4);
    const color = scoreColor(s.value);

    doc.setFillColor(...LIGHT_GRAY);
    doc.rect(bx, y, boxW, 30, "F");

    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...color);
    doc.text(`${s.value}`, bx + boxW / 2, y + 15, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MID_GRAY);
    doc.text("/100", bx + boxW / 2, y + 21, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...DARK);
    doc.text(s.label, bx + boxW / 2, y + 27, { align: "center" });
  });
  y += 38;

  // ── OPPORTUNITY BANNER ────────────────────────────────────────────────────
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(14, y, pw - 28, 22, "F");

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...WHITE_DIM);
  doc.text("OPORTUNIDADE ESTIMADA DE OTIMIZAÇÃO / MÊS", pw / 2, y + 7, { align: "center" });

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...WHITE);
  doc.text(`${opportunity.low}  →  ${opportunity.high}`, pw / 2, y + 16, { align: "center" });
  y += 30;

  // ── TOP ACTIONS ──────────────────────────────────────────────────────────
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Plano de Ação Prioritário", 14, y);
  y += 8;

  const impactColors: Record<string, [number, number, number]> = {
    high:   [239, 68, 68],
    medium: [251, 191, 36],
    low:    [34, 197, 94],
  };
  const impactLabel: Record<string, string> = {
    high: "Alto", medium: "Médio", low: "Baixo",
  };

  result.top_actions.forEach((action, idx) => {
    if (y > ph - 60) { doc.addPage(); y = 20; }

    const ic = impactColors[action.impact] ?? ([...BRAND_BLUE] as [number, number, number]);

    doc.setFillColor(...LIGHT_GRAY);
    doc.rect(14, y, pw - 28, 24, "F");

    // Number badge
    doc.setFillColor(...ic);
    doc.circle(21, y + 9, 4.5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...WHITE);
    doc.text(`${idx + 1}`, 21, y + 11.5, { align: "center" });

    // Title
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...DARK);
    doc.text(action.title, 29, y + 8);

    // Impact label
    doc.setFontSize(7);
    doc.setTextColor(...ic);
    doc.text(`Impacto ${impactLabel[action.impact] ?? action.impact}`, pw - 16, y + 8, { align: "right" });

    // Description (first line only to keep row height fixed)
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MID_GRAY);
    const lines = doc.splitTextToSize(action.description, pw - 44) as string[];
    doc.text(lines[0] ?? "", 29, y + 15);
    if (lines[1]) doc.text(lines[1], 29, y + 20);

    y += 28;
  });

  // ── RISK FLAGS ────────────────────────────────────────────────────────────
  if (y > ph - 70) { doc.addPage(); y = 20; }

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Checklist de Riscos", 14, y);
  y += 8;

  result.risk_flags.forEach((flag) => {
    if (y > ph - 20) { doc.addPage(); y = 20; }

    const dotColor: [number, number, number] = flag.present ? [239, 68, 68] : [34, 197, 94];
    doc.setFillColor(...dotColor);
    doc.circle(18.5, y + 2.5, 2.2, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", flag.present ? "bold" : "normal");
    doc.setTextColor(...DARK);
    doc.text(flag.label, 25, y + 4.5);
    y += 10;
  });

  // ── FOOTER on every page ──────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(...BRAND_BLUE);
    doc.rect(0, ph - 12, pw, 12, "F");
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...WHITE_DIM);
    doc.text("made.com.br  ·  Diagnóstico FinOps & GenAI", 14, ph - 4);
    doc.setTextColor(...WHITE_FAINT);
    doc.text(`${p} / ${totalPages}`, pw - 14, ph - 4, { align: "right" });
  }

  doc.save("diagnostico-finops-made.pdf");
}
