"use client";

import { useState } from "react";
import type { Question } from "@/types/diagnostic";
import { Button } from "@/components/ui/Button";

interface QuestionStepProps {
  question: Question;
  currentAnswer: string | string[] | undefined;
  onAnswer: (answer: string | string[]) => void;
  onBack: () => void;
  isFirst: boolean;
}

export function QuestionStep({
  question,
  currentAnswer,
  onAnswer,
  onBack,
  isFirst,
}: QuestionStepProps) {
  const [selected, setSelected] = useState<string[]>(() => {
    if (!currentAnswer) return [];
    if (Array.isArray(currentAnswer)) return currentAnswer;
    return [currentAnswer];
  });

  function handleSingleSelect(value: string) {
    onAnswer(value);
  }

  function handleMultiToggle(value: string) {
    setSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      if (question.maxSelect && prev.length >= question.maxSelect) {
        return prev;
      }
      return [...prev, value];
    });
  }

  function handleMultiConfirm() {
    if (selected.length > 0) {
      onAnswer(selected);
    }
  }

  const isMulti = question.type === "multiselect";

  return (
    <div className="space-y-5">
      <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
        {question.text}
      </h3>

      {isMulti && (
        <p className="text-sm text-blue-200/60">
          Selecione até {question.maxSelect} opções
        </p>
      )}

      <div className="grid gap-2.5">
        {question.options.map((option) => {
          const isActive = isMulti
            ? selected.includes(option.value)
            : currentAnswer === option.value;

          return (
            <button
              key={option.value}
              onClick={() =>
                isMulti
                  ? handleMultiToggle(option.value)
                  : handleSingleSelect(option.value)
              }
              className={[
                "w-full text-left px-5 py-4 rounded-xl border font-medium text-sm transition-all duration-150 cursor-pointer",
                isActive
                  ? "bg-[#1E4DFF] border-[#1E4DFF] text-white shadow-lg shadow-blue-500/20"
                  : "bg-white/5 border-white/10 text-blue-100 hover:bg-white/10 hover:border-white/20",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="flex items-center gap-3">
                {isMulti && (
                  <span
                    className={[
                      "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                      isActive
                        ? "border-white bg-white/20"
                        : "border-white/30",
                    ].join(" ")}
                  >
                    {isActive && (
                      <svg
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        className="w-2.5 h-2.5 text-white"
                      >
                        <path d="M10 2.5L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    )}
                  </span>
                )}
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        {!isFirst ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-blue-300/70 hover:text-blue-200 hover:bg-white/5"
          >
            ← Voltar
          </Button>
        ) : (
          <div />
        )}

        {isMulti && (
          <Button
            variant="primary"
            size="sm"
            onClick={handleMultiConfirm}
            disabled={selected.length === 0}
            className="ml-auto"
          >
            Continuar →
          </Button>
        )}
      </div>
    </div>
  );
}
