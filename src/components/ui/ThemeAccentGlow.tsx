"use client";

interface ThemeAccentGlowProps {
  color: string;
  className?: string;
}

export function ThemeAccentGlow({ color, className = "" }: ThemeAccentGlowProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${className}`}
      aria-hidden="true"
      style={{
        background: `radial-gradient(ellipse 60% 50% at 70% 30%, ${color}22 0%, transparent 70%)`,
      }}
    />
  );
}
