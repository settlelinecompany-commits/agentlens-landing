"use client";

import { ReactNode } from "react";

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  liftAmount?: number;
  scaleAmount?: number;
  duration?: number;
}

// CSS-only hover effect for better scroll performance
export function HoverLift({
  children,
  className = "",
}: HoverLiftProps) {
  return (
    <div
      className={`transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] ${className}`}
    >
      {children}
    </div>
  );
}
