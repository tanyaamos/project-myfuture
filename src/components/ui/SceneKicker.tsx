import type { HTMLAttributes, ReactNode } from "react";

interface SceneKickerProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

/** Intro label — gold highlight, black text */
export function SceneKicker({ children, className = "", ...props }: SceneKickerProps) {
  return (
    <p
      {...props}
      className={`inline-block bg-asu-gold px-2.5 py-1 font-mono text-[11px] leading-none font-semibold tracking-[0.22em] text-charcoal uppercase ${className}`}
    >
      {children}
    </p>
  );
}
