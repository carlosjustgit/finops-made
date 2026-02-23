"use client";

import { useReducer, useEffect, useCallback } from "react";
import { QUESTIONS } from "@/constants/questions";
import { computeFitTier } from "@/lib/scoring";
import { getStoredUTM } from "@/lib/utm";
import {
  trackDiagnosticStarted,
  trackStepCompleted,
  trackDiagnosticCompleted,
} from "@/lib/tracking";
import type {
  DiagnosticState,
  DiagnosticAction_Dispatch,
  DiagnosticResult,
  FitTier,
} from "@/types/diagnostic";
import { Stepper } from "./Stepper";
import { QuestionStep } from "./QuestionStep";
import { SkeletonLoader } from "./SkeletonLoader";
import { ResultsDashboard } from "./ResultsDashboard";
import { CTAButton } from "@/components/ui/CTAButton";

const initialState: DiagnosticState = {
  phase: "idle",
  currentStep: 0,
  answers: {},
  fitScore: null,
  result: null,
  startedAt: null,
};

function reducer(
  state: DiagnosticState,
  action: DiagnosticAction_Dispatch
): DiagnosticState {
  switch (action.type) {
    case "START":
      return { ...initialState, phase: "active", startedAt: Date.now() };

    case "ANSWER_STEP": {
      const newAnswers = {
        ...state.answers,
        [action.questionId]: action.answer,
      };
      const isLast = state.currentStep === QUESTIONS.length - 1;
      return {
        ...state,
        answers: newAnswers,
        phase: isLast ? "loading" : "active",
        currentStep: isLast ? state.currentStep : state.currentStep + 1,
      };
    }

    case "PREV_STEP":
      if (state.currentStep === 0) return state;
      return { ...state, currentStep: state.currentStep - 1 };

    case "SUBMIT":
      return { ...state, phase: "loading" };

    case "RECEIVE_RESULT":
      return {
        ...state,
        phase: "results",
        result: action.result,
        fitScore: action.fitScore,
      };

    case "ERROR":
      return { ...state, phase: "error" };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function DiagnosticTool() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitDiagnostic = useCallback(
    async (answers: DiagnosticState["answers"]) => {
      const utm = getStoredUTM();
      const fitScore = computeFitTier(answers);

      const payload = {
        cloud_provider: String(answers.cloud_provider ?? ""),
        monthly_spend: String(answers.monthly_spend ?? ""),
        num_accounts: String(answers.num_accounts ?? ""),
        storage_range: String(answers.storage_range ?? ""),
        data_lake: String(answers.data_lake ?? ""),
        genai_maturity: String(answers.genai_maturity ?? ""),
        pain_points: Array.isArray(answers.pain_points)
          ? (answers.pain_points as string[])
          : [String(answers.pain_points ?? "")],
        sector: String(answers.sector ?? ""),
        utm,
      };

      try {
        const res = await fetch("/api/diagnostic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          dispatch({ type: "ERROR" });
          return;
        }

        const result: DiagnosticResult = await res.json();
        const duration = Date.now() - (state.startedAt ?? Date.now());

        trackDiagnosticCompleted(
          fitScore,
          result.scores.finops_maturity,
          result.scores.data_governance,
          result.scores.genai_control,
          duration
        );

        dispatch({ type: "RECEIVE_RESULT", result, fitScore });
      } catch {
        dispatch({ type: "ERROR" });
      }
    },
    [state.startedAt]
  );

  // Trigger API call when phase transitions to loading
  useEffect(() => {
    if (state.phase === "loading") {
      submitDiagnostic(state.answers);
    }
  }, [state.phase, state.answers, submitDiagnostic]);

  function handleStart() {
    trackDiagnosticStarted();
    dispatch({ type: "START" });
  }

  function handleAnswer(answer: string | string[]) {
    const question = QUESTIONS[state.currentStep];
    trackStepCompleted(state.currentStep + 1, question.id, answer);
    dispatch({ type: "ANSWER_STEP", questionId: question.id, answer });
  }

  function handleBack() {
    dispatch({ type: "PREV_STEP" });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  // IDLE phase — just the start CTA
  if (state.phase === "idle") {
    return (
      <div className="bg-white/15 border border-white/30 p-8 text-center">
        <div className="flex items-center justify-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-10 h-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          Diagnóstico FinOps & GenAI
        </h3>
        <p className="text-white/70 text-sm mb-8 max-w-sm mx-auto">
          8 perguntas. 30 segundos. Score de maturidade e plano de ação
          executivo. Sem acesso ao seu ambiente.
        </p>
        <CTAButton
          variant="white"
          onClick={handleStart}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Começar diagnóstico
        </CTAButton>
      </div>
    );
  }

  // LOADING phase
  if (state.phase === "loading") {
    return (
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        <SkeletonLoader />
      </div>
    );
  }

  // ERROR phase
  if (state.phase === "error") {
    return (
      <div className="bg-white/5 border border-white/10 p-8 text-center space-y-4">
        <div className="flex items-center justify-center mx-auto">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-6 h-6 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-white font-bold">
          Diagnóstico temporariamente indisponível
        </h3>
        <p className="text-white/50 text-sm">
          Nosso servidor de análise está sobrecarregado. Fale diretamente com
          um especialista.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={
              process.env.NEXT_PUBLIC_BOOKING_URL ?? "#"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <CTAButton variant="primary">Falar com especialista</CTAButton>
          </a>
          <CTAButton variant="secondary" onClick={handleReset}>
            Tentar novamente
          </CTAButton>
        </div>
      </div>
    );
  }

  // RESULTS phase
  if (state.phase === "results" && state.result && state.fitScore) {
    return (
      <ResultsDashboard
        result={state.result}
        fitScore={state.fitScore as FitTier}
        monthlySpend={String(state.answers.monthly_spend ?? "")}
        onReset={handleReset}
      />
    );
  }

  // ACTIVE phase — question stepper
  const question = QUESTIONS[state.currentStep];
  const currentAnswer = state.answers[question.id];

  return (
    <div className="bg-white/5 border border-white/10 p-6 md:p-8">
      <Stepper currentStep={state.currentStep} />
      <QuestionStep
        question={question}
        currentAnswer={
          currentAnswer as string | string[] | undefined
        }
        onAnswer={handleAnswer}
        onBack={handleBack}
        isFirst={state.currentStep === 0}
      />
    </div>
  );
}
