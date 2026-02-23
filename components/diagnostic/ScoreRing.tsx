"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  label: string;
  sublabel?: string;
  color?: string;
}

function getColor(score: number): string {
  if (score >= 70) return "#22c55e"; // green
  if (score >= 45) return "#f59e0b"; // amber
  return "#ef4444"; // red
}

function getLabel(score: number): string {
  if (score >= 70) return "Bom";
  if (score >= 45) return "Regular";
  return "Crítico";
}

export function ScoreRing({ score, label, sublabel }: ScoreRingProps) {
  const [animated, setAnimated] = useState(0);
  const color = getColor(score);
  const statusLabel = getLabel(score);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (animated / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            style={{ transition: "stroke-dasharray 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black text-white leading-none">
            {score}
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-white">{label}</div>
        {sublabel && (
          <div className="text-xs text-white/40 mt-0.5">{sublabel}</div>
        )}
        <div
          className="text-xs font-bold mt-1"
          style={{ color }}
        >
          {statusLabel}
        </div>
      </div>
    </div>
  );
}
