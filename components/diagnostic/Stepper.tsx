import { ProgressBar } from "@/components/ui/ProgressBar";
import { TOTAL_STEPS } from "@/constants/questions";

interface StepperProps {
  currentStep: number; // 0-indexed
}

export function Stepper({ currentStep }: StepperProps) {
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;
  const displayStep = currentStep + 1;

  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60 font-medium">
          Pergunta {displayStep} de {TOTAL_STEPS}
        </span>
        <span className="text-white font-bold">
          {Math.round(progress)}%
        </span>
      </div>
      <ProgressBar
        value={progress}
        className="!bg-white/10 [&>div]:bg-[#0047FF]"
      />
    </div>
  );
}
