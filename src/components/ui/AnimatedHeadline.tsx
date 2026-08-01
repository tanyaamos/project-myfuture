"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";

interface AnimatedLine {
  text: string;
  emphasis?: boolean;
  className?: string;
}

interface AnimatedHeadlineProps {
  lines: AnimatedLine[];
  className?: string;
  stagger?: number;
  startDelay?: number;
}

export function AnimatedHeadline({
  lines,
  className = "",
  stagger = 0.12,
  startDelay = 0.4,
}: AnimatedHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGSAP();
      const lines = containerRef.current?.querySelectorAll("[data-line]");
      if (!lines?.length) return;

      gsap.fromTo(
        lines,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.1,
          stagger,
          delay: startDelay,
          ease: "power4.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <p
            data-line
            className={`text-display-xl ${line.emphasis ? "text-asu-gold" : ""} ${line.className ?? ""}`}
          >
            {line.text}
          </p>
        </div>
      ))}
    </div>
  );
}
