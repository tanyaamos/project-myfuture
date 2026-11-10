"use client";

import { motion } from "framer-motion";
import { useExperienceStore } from "@/store/experience-store";

interface ProgressIndicatorProps {
  progress: number;
}

const LIGHT_SCENES = new Set(["interests", "campus-choice"]);

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  const percentage = Math.round(progress * 100);
  const currentScene = useExperienceStore((s) => s.currentScene);
  const isLight = LIGHT_SCENES.has(currentScene);

  return (
    <div
      className="flex items-center gap-3"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Experience progress: ${percentage} percent`}
    >
      <div
        className={`h-[2px] flex-1 overflow-hidden rounded-full ${
          isLight ? "bg-charcoal/10" : "bg-white/10"
        }`}
      >
        <motion.div
          className="h-full origin-left rounded-full bg-asu-gold"
          style={{ scaleX: progress }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
        />
      </div>
      <span
        className={`min-w-[2.5rem] text-right font-mono text-[10px] tracking-widest tabular-nums ${
          isLight ? "text-charcoal/50" : "text-white/60"
        }`}
      >
        {percentage.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
