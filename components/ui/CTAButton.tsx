"use client";

import { ButtonHTMLAttributes } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function CTAButton({
  variant = "primary",
  fullWidth = false,
  icon,
  children,
  className = "",
  ...props
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#0047FF] text-white px-8 py-4 text-base hover:bg-[#0038CC] active:scale-95 focus-visible:ring-[#0047FF]",
    secondary:
      "bg-white text-[#0B1F3B] border-2 border-[#C8D0E0] px-8 py-4 text-base hover:border-[#0047FF] hover:text-[#0047FF] active:scale-95 focus-visible:ring-[#0047FF]",
    white:
      "bg-white text-[#0047FF] px-8 py-4 text-base hover:bg-white/90 active:scale-95 focus-visible:ring-white",
  };

  return (
    <button
      className={[base, variants[variant], fullWidth ? "w-full" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
